import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js'
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js'
import { scene } from './environment.js'

// BACKGROUND LOADER
const roomLoader = new GLTFLoader()
let mixer
roomLoader.load(
    '../../assets/room/Projectver6.glb',
    function (glb) {
        // console.log(glb)
        // room = glb.scene
        scene.add(glb.scene)
        mixer = new THREE.AnimationMixer(glb.scene)
        const clips = glb.animations
        clips.forEach(function (clip) {
            const action = mixer.clipAction(clip)
            action.play()
        })
    },
    undefined,
    function (error) {
        console.error(error)
    }
)

// DIRECTIONAL LIGHT
const directionalLight = new THREE.PointLight(0xffffff, 1, 70)
directionalLight.position.set(-14.5, 15.5, 13.5)
directionalLight.castShadow = true
directionalLight.shadow.bias = -0.001
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048
directionalLight.shadow.camera.near = 0.1
directionalLight.shadow.camera.far = 500.0
directionalLight.shadow.camera.near = 0.5
directionalLight.shadow.camera.far = 500.0
directionalLight.shadow.camera.right = -100
directionalLight.shadow.camera.top = 100
directionalLight.shadow.camera.bottom = -100

const directionalLight1 = new THREE.PointLight(0xffffff, 1, 100)
directionalLight1.position.set(-14.5, 15, 1)
directionalLight1.castShadow = true
directionalLight1.shadow.bias = -0.001
directionalLight1.shadow.mapSize.width = 2048
directionalLight1.shadow.mapSize.height = 2048
directionalLight1.shadow.camera.near = 0.1
directionalLight1.shadow.camera.far = 500.0
directionalLight1.shadow.camera.near = 0.5
directionalLight1.shadow.camera.far = 500.0
directionalLight1.shadow.camera.right = 100
directionalLight1.shadow.camera.top = -100
directionalLight1.shadow.camera.bottom = 100

export { directionalLight, directionalLight1 }
