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
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x000000, 0)

if (renderer.capabilities.isWebGL2) {
  renderer.getContext().getExtension('EXT_texture_filter_anisotropic')
}

renderer.setPixelRatio(window.devicePixelRatio)

// Materials
const material = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 0 })

const texture = new THREE.TextureLoader().load('assets/texture.png')
texture.anisotropy = 8
texture.minFilter = THREE.LinearMipmapLinearFilter
texture.magFilter = THREE.LinearFilter
material.map = texture

const bumpTexture = new THREE.TextureLoader().load('assets/displacement.jpg')
bumpTexture.anisotropy = 8
bumpTexture.minFilter = THREE.LinearMipmapLinearFilter
bumpTexture.magFilter = THREE.LinearFilter
material.bumpMap = bumpTexture
material.bumpScale = 0.25

material.displacementMap = bumpTexture
material.displacementMap.wrapS = THREE.RepeatWrapping
material.displacementMap.wrapT = THREE.RepeatWrapping
material.displacementScale = 2
material.displacementBias = 1

// Geometries
const geometry = createAdaptiveGeometry()
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  render()
}

function createAdaptiveGeometry() {
  const widthSegmentMax = 512, widthSegmentBase = 256, widthSegmentMin = 64
  const heightSegmentMax = 256, heightSegmentBase = 128, heightSegmentMin = 32

  const pixelRatio = window.devicePixelRatio || 1
  const screenArea = window.innerWidth * window.innerHeight
  const scaleFactor = Math.sqrt(screenArea / (1920 * 1080)) * pixelRatio

  const widthSegments = Math.min(widthSegmentMax, Math.max(widthSegmentMin, Math.floor(widthSegmentBase * scaleFactor)))
  const heightSegments = Math.min(heightSegmentMax, Math.max(heightSegmentMin, Math.floor(heightSegmentBase * scaleFactor)))

  return new THREE.SphereGeometry(30, widthSegments, heightSegments)
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

// interactions

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

let scrollPercentage = 0
window.addEventListener('scroll', onScroll, false)
function onScroll() {
  const scroll = window.scrollY
  scrollPercentage = scroll / (document.body.scrollHeight - window.innerHeight)
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
  const handle = requestAnimationFrame(animate)
  mesh.rotation.y += 0.00005

  // add camera parallax
  const parallaxRatio = 5
  const parallaxSpeed = 0.005

  const cameraPositionTarget = {
    x: (x - 0.5) * parallaxRatio + scrollPercentage * 50,
    y: (-y + 0.5) * parallaxRatio - scrollPercentage * 100
  }

  camera.position.x = THREE.MathUtils.lerp(camera.position.x, cameraPositionTarget.x, parallaxSpeed)
  camera.position.y = THREE.MathUtils.lerp(camera.position.y, cameraPositionTarget.y, parallaxSpeed)

  // look at the mesh
  updateCameraToAlignMoon(camera, mesh)
  render()
  return handle
}

function render() {
  renderer.render(scene, camera)
}

export { renderer, animate }