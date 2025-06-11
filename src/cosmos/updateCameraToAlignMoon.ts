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

// Cache for frequently computed values
let _cachedFov = 0
let _cachedAspect = 0
let _cachedTanHalfFov = 0
let _cachedAspectTanHalfFov = 0

export function updateCameraToAlignMoon(
  camera: THREE.PerspectiveCamera,
  moon: THREE.Mesh,
  scrollPercentage: number,
  cameraAngularSpeed: number = 0.1
) {
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
  _desiredQuaternion.setFromRotationMatrix(_tempMatrix)

  // Smoothly interpolate to desired rotation
  camera.quaternion.slerp(_desiredQuaternion, cameraAngularSpeed)
}