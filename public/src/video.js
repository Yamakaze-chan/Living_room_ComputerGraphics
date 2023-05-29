import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js'

var video, videoImage, videoImageContext, videoTexture

// create the video element
video = document.getElementById('myVideo')
video.muted = true
video.load() // must call after setting/changing source
video.play()

videoImage = document.createElement('canvas')
videoImage.width = 1280
videoImage.height = 720

videoImageContext = videoImage.getContext('2d')

// background color if no video present
videoImageContext.fillStyle = '#ffffff'
videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height)

videoTexture = new THREE.Texture(videoImage)
videoTexture.minFilter = THREE.LinearFilter
videoTexture.magFilter = THREE.LinearFilter

var movieMaterial = new THREE.MeshBasicMaterial({
    map: videoTexture,
    overdraw: true,
    side: THREE.DoubleSide,
})

// the geometry on which the movie will be displayed;
// 		movie image will be scaled to fit these dimensions.
var movieGeometry = new THREE.PlaneGeometry(7.6, 3.88, 4, 4)
var movieScreen = new THREE.Mesh(movieGeometry, movieMaterial)
movieScreen.rotation.y = -Math.PI / 2
movieScreen.position.set(-1.15, 10, 0)

export { movieScreen, video, videoImage, videoImageContext, videoTexture }
