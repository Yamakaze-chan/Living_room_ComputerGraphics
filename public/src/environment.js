import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js'
import { movieScreen, video, videoImage, videoImageContext, videoTexture } from './video.js'
import { directionalLight, directionalLight1 } from './room.js'

const canvas = document.querySelector('.webgl')

// SCENE
const scene = new THREE.Scene()

// CAMERA
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}
const fov = 60
const aspect = sizes.width / sizes.height
const near = 1.0
const far = 1000
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.set(-35, 40, 25)
scene.add(camera)

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas })
renderer.setSize(window.innerWidth, window.innerHeight)

// RESIZE HANDLER
window.addEventListener('resize', function () {
    var width = window.innerWidth
    var height = window.innerHeight
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement)
// camera.position.set(30, 20, 100);
controls.update() // must be called after any manual changes to the camera's transform

// ORBIT HANDLER
function animate_orbit() {
    requestAnimationFrame(animate_orbit)
    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update()
    renderer.render(scene, camera)
}
animate_orbit()

function play_video() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        videoImageContext.drawImage(video, 0, 0)
        if (videoTexture) videoTexture.needsUpdate = true
    }

    renderer.render(scene, camera)
}

//
function animate() {
    requestAnimationFrame(animate)
    play_video()
}
animate()

// ADD SCENCE
scene.add(directionalLight)
scene.add(directionalLight1)

scene.add(movieScreen)

export { scene, renderer, camera }
