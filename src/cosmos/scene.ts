import * as THREE from 'three'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000)

// Light
const light = new THREE.PointLight(0xffffff, 1)
light.position.set(-40, 10, 30)
scene.add(light)

// Camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 80

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x000000, 0)

// Materials
const material = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 0 })

const texture = new THREE.TextureLoader().load('assets/texture.png')
texture.anisotropy = 8
material.map = texture

const bumpTexture = new THREE.TextureLoader().load('assets/displacement.jpg')
bumpTexture.anisotropy = 8
material.bumpMap = bumpTexture
material.bumpScale = 0.2

material.displacementMap = bumpTexture
material.displacementMap.wrapS = THREE.RepeatWrapping
material.displacementMap.wrapT = THREE.RepeatWrapping
material.displacementScale = 2
material.displacementBias = 1

// Geometries
const geometry = new THREE.SphereGeometry(30, 64, 32)
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}

function addStarsToSky() {
  const starsGeometry = new THREE.BufferGeometry()
  const starsMaterial = new THREE.PointsMaterial({ color: 0x888888 })

  const stars = []
  for (let i = 0; i < 1000; i++) {
    const star = new THREE.Vector3()
    star.x = THREE.MathUtils.randFloatSpread(2000)
    star.y = THREE.MathUtils.randFloatSpread(2000)
    star.z = THREE.MathUtils.randFloatSpread(2000)
    stars.push(star)
  }

  starsGeometry.setFromPoints(stars)
  const starField = new THREE.Points(starsGeometry, starsMaterial)
  scene.add(starField)
}

let x = 0.5
let y = 0.5

window.addEventListener('mousemove', onMouseMove, false)
function onMouseMove(event: MouseEvent) {
  x = event.clientX / window.innerWidth
  y = event.clientY / window.innerHeight

  if (event.buttons !== 1) {
    return
  }
}

function updateCameraToAlignMoon(camera: THREE.PerspectiveCamera, moon: THREE.Mesh) {
  // Convert FOV to radians
  const fov = camera.fov * (Math.PI / 180)
  const aspect = camera.aspect

  // Compute the bottom right direction in camera space.
  // The vector (x, y, z) is from the camera center to the bottom right of the near plane.
  // Normalize so that the length doesn't matter.
  const brCam = new THREE.Vector3(
    aspect * Math.tan(fov / 2), // x: right offset
    -Math.tan(fov / 2),         // y: down offset
    -1                         // z: forward (-z is forward in camera space)
  ).normalize()

  // Get current bottom right ray in world space.
  const currentBRWorld = brCam.clone().applyQuaternion(camera.quaternion)

  // Find the direction from the camera to the moon.
  const desiredDir = new THREE.Vector3().subVectors(moon.position, camera.position).normalize()

  // Compute the rotation that turns the current bottom right direction to the desired direction.
  const q = new THREE.Quaternion().setFromUnitVectors(currentBRWorld, desiredDir)

  // Update camera rotation.
  camera.quaternion.premultiply(q)
}

addStarsToSky()

function animate() {
  requestAnimationFrame(animate)
  mesh.rotation.y += 0.00005

  // add camera parallax
  const parallaxRatio = 1.5
  const parallaxSpeed = 0.05
  camera.position.x = THREE.MathUtils.lerp(camera.position.x, (x - 0.5) * parallaxRatio, parallaxSpeed)
  camera.position.y = THREE.MathUtils.lerp(camera.position.y, (-y + 0.5) * parallaxRatio, parallaxSpeed)

  // look at the mesh
  updateCameraToAlignMoon(camera, mesh)
  render()
}

function render() {
  renderer.render(scene, camera)
}

animate()

export { renderer }