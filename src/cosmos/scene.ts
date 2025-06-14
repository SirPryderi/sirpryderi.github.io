import * as THREE from 'three'
import { getCameraOrbitPosition, getCameraOrbitPositionSmooth, getCameraRotationQuat } from './cameraControls'

const mouseOrbitRatio = 0.01
const cameraPositionSpeed = 0.02
const cameraRotationSpeed = 0.1

let [_viewportWidth, _viewportHeight] = getViewportSize()

let scrollPercentage = window.scrollY / (document.body.scrollHeight - _viewportHeight)
const mousePositionPercentage = new THREE.Vector2(.5, .5)

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x0a0e0c)

// Light
const light = new THREE.PointLight(0xffffff, 1)
light.position.set(-2000, 0, 0)
scene.add(light)

// Camera
const camera = new THREE.PerspectiveCamera(
  35,
  _viewportWidth / _viewportHeight,
  0.1,
  1000
)

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" })
renderer.setSize(_viewportWidth, _viewportHeight)
renderer.setClearColor(0x000000, 0)

if (renderer.capabilities.isWebGL2) {
  renderer.getContext().getExtension('EXT_texture_filter_anisotropic')
}

renderer.setPixelRatio(window.devicePixelRatio)

// Materials
const material = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 0, emissive: 0x0a0e0c })

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
material.bumpScale = 0.3

material.displacementMap = bumpTexture
material.displacementMap.wrapS = THREE.RepeatWrapping
material.displacementMap.wrapT = THREE.RepeatWrapping
material.displacementScale = 2
material.displacementBias = 1

// Geometries
const geometry = createAdaptiveGeometry()
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

camera.position.copy(getCameraOrbitPosition(mousePositionPercentage, scrollPercentage, mouseOrbitRatio, camera.aspect))
camera.quaternion.copy(getCameraRotationQuat(camera, mesh, scrollPercentage))

function getViewportSize() {
  const newWidth = window.visualViewport?.width || window.innerWidth
  const newHeight = window.visualViewport?.height || window.innerHeight
  return [newWidth, newHeight]
}

window.addEventListener('resize', onWindowResize, false)
window.visualViewport?.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  const [newWidth, newHeight] = getViewportSize()
  if (newWidth === _viewportWidth && newHeight === _viewportHeight) return
  _viewportWidth = newWidth
  _viewportHeight = newHeight
  camera.aspect = _viewportWidth / _viewportHeight
  renderer.setSize(_viewportWidth, _viewportHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  camera.updateProjectionMatrix()
  render()
}

function createAdaptiveGeometry() {
  const widthSegmentMax = 512, widthSegmentBase = 256, widthSegmentMin = 64
  const heightSegmentMax = 256, heightSegmentBase = 128, heightSegmentMin = 32

  const pixelRatio = window.devicePixelRatio || 1
  const screenArea = _viewportWidth * _viewportHeight
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


window.addEventListener('mousemove', onMouseMove, false)
function onMouseMove(event: MouseEvent) {
  mousePositionPercentage.set(
    event.clientX / _viewportWidth,
    event.clientY / _viewportHeight
  )

  if (event.buttons !== 1) {
    return
  }
}

window.addEventListener('scroll', onScroll, false)
function onScroll() {
  scrollPercentage = window.scrollY / (document.body.scrollHeight - _viewportHeight)
}

addStarsToSky()

function render() {
  renderer.render(scene, camera)
}

function setup() {
  let animationHandle = 0

  function animate() {
    mesh.rotation.y = Date.now() / 500_000

    camera.position.copy(getCameraOrbitPositionSmooth(camera, mousePositionPercentage, scrollPercentage, mouseOrbitRatio, cameraPositionSpeed))
    camera.quaternion.slerp(getCameraRotationQuat(camera, mesh, scrollPercentage), cameraRotationSpeed)

    render()
    animationHandle = requestAnimationFrame(animate)
  }

  function stop() {
    cancelAnimationFrame(animationHandle)
  }

  return { animate, stop, renderer }
}

export { setup }