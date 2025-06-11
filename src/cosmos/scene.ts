import * as THREE from 'three'
import { updateCameraToAlignMoon } from './updateCameraToAlignMoon'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000)

// Light
const light = new THREE.PointLight(0xffffff, 1)
light.position.set(-2000, 0, 0)
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

const texture = new THREE.TextureLoader().load('/assets/texture.png')
texture.anisotropy = 8
texture.minFilter = THREE.LinearMipmapLinearFilter
texture.magFilter = THREE.LinearFilter
material.map = texture

const bumpTexture = new THREE.TextureLoader().load('/assets/displacement.jpg')
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

let scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight)
window.addEventListener('scroll', onScroll, false)
function onScroll() {
  scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight)
}

addStarsToSky()

function animate() {
  const handle = requestAnimationFrame(animate)
  mesh.rotation.y += 0.00005

  const mouseOrbitRatio = 0.01
  const cameraInterpolationSpeed = 0.02

  const initialDistance = 80, finalDistance = 160

  // Target orbital parameters based on scroll
  const targetDistance = THREE.MathUtils.lerp(initialDistance, finalDistance, scrollPercentage)
  let targetHorizontalAngle = (x - 0.5) * Math.PI * 2 * -mouseOrbitRatio
  let targetVerticalAngle = (y - 0.5) * Math.PI * mouseOrbitRatio
  targetHorizontalAngle = targetHorizontalAngle - THREE.MathUtils.lerp(0, Math.PI * 1.2, scrollPercentage)

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
  const distance = THREE.MathUtils.lerp(currentDistance, targetDistance, cameraInterpolationSpeed)
  const horizontalAngle = THREE.MathUtils.lerp(currentHorizontalAngle, smoothTargetHorizontalAngle, cameraInterpolationSpeed)
  const verticalAngle = THREE.MathUtils.lerp(currentVerticalAngle, targetVerticalAngle, cameraInterpolationSpeed)

  // Convert back to position
  camera.position.set(
    Math.sin(horizontalAngle) * Math.cos(verticalAngle) * distance,
    Math.sin(verticalAngle) * distance,
    Math.cos(horizontalAngle) * Math.cos(verticalAngle) * distance,
  )

  // look at the mesh
  updateCameraToAlignMoon(camera, mesh, scrollPercentage)
  render()
  return handle
}

function render() {
  renderer.render(scene, camera)
}

export { renderer, animate }