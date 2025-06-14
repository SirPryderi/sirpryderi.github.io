import * as THREE from 'three'

// Pre-allocated objects to avoid garbage collection
const _cameraBottomRightRay = new THREE.Vector3()
const _targetRayCamera = new THREE.Vector3()
const _targetRayWorld = new THREE.Vector3()
const _desiredDir = new THREE.Vector3()
const _targetQuaternion = new THREE.Quaternion()
const _targetLookDirection = new THREE.Vector3()
const _targetLookAt = new THREE.Vector3()
const _desiredQuaternion = new THREE.Quaternion()
const _tempMatrix = new THREE.Matrix4()
const _upVector = new THREE.Vector3(0, 1, 0)
const _cameraCenterRay = new THREE.Vector3(0, 0, -1)
const _cameraPosition = new THREE.Vector3()

// Cache for frequently computed values
let _cachedFov = 0
let _cachedAspect = 0
let _cachedTanHalfFov = 0
let _cachedAspectTanHalfFov = 0

export function getCameraRotationQuat(
  camera: THREE.PerspectiveCamera,
  moon: THREE.Mesh,
  scrollPercentage: number
): THREE.Quaternion {
  // Cache expensive trigonometric calculations
  if (_cachedFov !== camera.fov || _cachedAspect !== camera.aspect) {
    _cachedFov = camera.fov
    _cachedAspect = camera.aspect
    const fovRadians = camera.fov * (Math.PI / 180)
    _cachedTanHalfFov = Math.tan(fovRadians / 2)
    _cachedAspectTanHalfFov = _cachedAspect * _cachedTanHalfFov
  }

  // Reuse pre-allocated vector for bottom right direction
  _cameraBottomRightRay.set(
    _cachedAspectTanHalfFov,  // x: right offset
    -_cachedTanHalfFov,       // y: down offset
    -1                        // z: forward
  ).normalize()

  // Reuse pre-allocated vector for target ray interpolation
  _targetRayCamera.copy(_cameraBottomRightRay).lerp(_cameraCenterRay, scrollPercentage).normalize()

  // Get current target ray in world space using pre-allocated vector
  _targetRayWorld.copy(_targetRayCamera).applyQuaternion(camera.quaternion)

  // Find direction from camera to moon using pre-allocated vector
  _desiredDir.subVectors(moon.position, camera.position).normalize()

  // Calculate target look direction using pre-allocated objects
  _targetQuaternion.setFromUnitVectors(_targetRayWorld, _desiredDir)

  // Apply rotation to get target look direction
  _targetLookDirection.set(0, 0, -1).applyQuaternion(camera.quaternion).applyQuaternion(_targetQuaternion)

  // Get target look position
  _targetLookAt.copy(camera.position).add(_targetLookDirection)

  // Create desired quaternion using lookAt with pre-allocated objects
  _tempMatrix.lookAt(camera.position, _targetLookAt, _upVector)
  return _desiredQuaternion.setFromRotationMatrix(_tempMatrix)
}

export function getOrbitalParameters(
  mousePositionPercentage: THREE.Vector2,
  scrollPercentage: number,
  mouseOrbitRatio: number,
  aspectRatio: number,
): [number, number, number] {
  let initialDistance = 80, finalDistance = 160
  const initialRotation = 0, finalRotation = Math.PI * 1.2

  if (aspectRatio < 1) {
    // adjust orbit distance for vertical devices
    initialDistance = THREE.MathUtils.lerp(160, 80, aspectRatio)
    finalDistance = 360
  }

  // Target orbital parameters based on scroll
  const targetDistance = THREE.MathUtils.lerp(initialDistance, finalDistance, scrollPercentage)
  let targetHorizontalAngle = (mousePositionPercentage.x - 0.5) * Math.PI * 2 * -mouseOrbitRatio
  let targetVerticalAngle = (mousePositionPercentage.y - 0.5) * Math.PI * mouseOrbitRatio
  targetHorizontalAngle = targetHorizontalAngle - THREE.MathUtils.lerp(initialRotation, finalRotation, scrollPercentage)

  return [targetDistance, targetHorizontalAngle, targetVerticalAngle]
}

export function getCameraOrbitPosition(
  mousePositionPercentage: THREE.Vector2,
  scrollPercentage: number,
  mouseOrbitRatio: number,
  aspectRatio: number,
): THREE.Vector3 {
  const [distance, horizontalAngle, verticalAngle] = getOrbitalParameters(mousePositionPercentage, scrollPercentage, mouseOrbitRatio, aspectRatio)

  return _cameraPosition.set(
    Math.sin(horizontalAngle) * Math.cos(verticalAngle) * distance,
    Math.sin(verticalAngle) * distance,
    Math.cos(horizontalAngle) * Math.cos(verticalAngle) * distance,
  )
}

export function getCameraOrbitPositionSmooth(
  camera: THREE.PerspectiveCamera,
  mousePositionPercentage: THREE.Vector2,
  scrollPercentage: number,
  mouseOrbitRatio: number,
  cameraPositionSpeed: number,
): THREE.Vector3 {
  const [targetDistance, targetHorizontalAngle, targetVerticalAngle] = getOrbitalParameters(mousePositionPercentage, scrollPercentage, mouseOrbitRatio, camera.aspect)

  // Get current orbital parameters from camera position
  const currentDistance = camera.position.length()
  const currentHorizontalAngle = Math.atan2(camera.position.x, camera.position.z)
  const currentVerticalAngle = Math.asin(camera.position.y / currentDistance)

  // Handle angle wrapping for smooth interpolation
  let angleDiff = targetHorizontalAngle - currentHorizontalAngle
  if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI
  if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI
  const smoothTargetHorizontalAngle = currentHorizontalAngle + angleDiff

  // Interpolate orbital parameters instead of position
  const distance = THREE.MathUtils.lerp(currentDistance, targetDistance, cameraPositionSpeed)
  const horizontalAngle = THREE.MathUtils.lerp(currentHorizontalAngle, smoothTargetHorizontalAngle, cameraPositionSpeed)
  const verticalAngle = THREE.MathUtils.lerp(currentVerticalAngle, targetVerticalAngle, cameraPositionSpeed)

  return _cameraPosition.set(
    Math.sin(horizontalAngle) * Math.cos(verticalAngle) * distance,
    Math.sin(verticalAngle) * distance,
    Math.cos(horizontalAngle) * Math.cos(verticalAngle) * distance,
  )
}
