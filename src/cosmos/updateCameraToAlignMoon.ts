import * as THREE from 'three'

const CAMERA_CENTER = new THREE.Vector3(0, 0, -1)

export function updateCameraToAlignMoon(camera: THREE.PerspectiveCamera, moon: THREE.Mesh, scrollPercentage: number, cameraAngularSpeed: number = 0.05) {
  // Convert FOV to radians
  const fov = camera.fov * (Math.PI / 180)
  const aspect = camera.aspect

  // Compute the bottom right direction in camera space.
  const bottomRightCamera = new THREE.Vector3(
    aspect * Math.tan(fov / 2), // x: right offset
    -Math.tan(fov / 2),         // y: down offset
    -1                         // z: forward (-z is forward in camera space)
  ).normalize()

  const targetRayCamera = bottomRightCamera.lerp(CAMERA_CENTER, scrollPercentage).normalize()

  // Get current target ray in world space.
  const targetRayWorld = targetRayCamera.clone().applyQuaternion(camera.quaternion)

  // Find the direction from the camera to the moon.
  const desiredDir = new THREE.Vector3().subVectors(moon.position, camera.position).normalize()

  // Calculate target look direction
  const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(targetRayWorld, desiredDir)
  const tempCamera = camera.clone()
  tempCamera.quaternion.premultiply(targetQuaternion)

  // Get the target look position
  const targetLookDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(tempCamera.quaternion)
  const targetLookAt = camera.position.clone().add(targetLookDirection)

  // Create desired quaternion using lookAt with fixed up vector
  const desiredQuaternion = new THREE.Quaternion()
  const tempMatrix = new THREE.Matrix4().lookAt(camera.position, targetLookAt, new THREE.Vector3(0, 1, 0))
  desiredQuaternion.setFromRotationMatrix(tempMatrix)

  // Smoothly interpolate to desired rotation
  camera.quaternion.slerp(desiredQuaternion, cameraAngularSpeed)
}
