import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js";

// standard global variables
var container, stats;

// custom global variables
const canvas = document.querySelector(".webgl");

// SCENE
const scene = new THREE.Scene();

// BACKGROUND LOADER
const roomLoader = new GLTFLoader();
let mixer;
roomLoader.load(
  "assets/Projectver6.glb",
  function (glb) {
    //gltf.scene.position.set(10,0,0);
    scene.add(glb.scene);
    mixer = new THREE.AnimationMixer(glb.scene);
    const clips = glb.animations;
    clips.forEach(function (clip) {
      const action = mixer.clipAction(clip);
      action.play();
    });
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// CLOCK
const clock = new THREE.Clock();

// // CUBE
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// var material = [
//   new THREE.MeshPhongMaterial({ color: "#ee0000" }), //right
//   new THREE.MeshPhongMaterial({ color: "#00ee00" }), //left
//   new THREE.MeshPhongMaterial({ color: "#0000ee" }), //top
//   new THREE.MeshPhongMaterial({ color: "#e00ee0" }), //bottom
//   new THREE.MeshPhongMaterial({ color: "#115533" }), //front
//   new THREE.MeshPhongMaterial({ color: "#779900" }), //back
// ];

// const cube = new THREE.Mesh(geometry, material);
// cube.position.x = -14.5;
// cube.position.y = 15.5;
// cube.position.z = 13.5;
// scene.add(cube);

// // DIRECTIONAL LIGHT
// const directionalLight = new THREE.PointLight(0xffffff, 1, 70);
// directionalLight.position.set(-14.5, 15.5, 13.5);
// scene.add(directionalLight);
// const directionalLight1 = new THREE.PointLight(0xffffff, 1, 100);
// directionalLight1.position.set(-14.5, 15, 1);
// scene.add(directionalLight1);

// CAMERA
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const fov = 60;
const aspect = sizes.width / sizes.height;
const near = 1.0;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, 1.0, 1000);
// camera.position.set(0, 1, 2);
camera.position.y = 10;
camera.position.z = 1;
camera.position.x = -30;
scene.add(camera);

// // RERENDER
// const renderer = new THREE.WebGLRenderer({ canvas: canvas });
// renderer.setSize(window.innerWidth, window.innerHeight);

// // RESIZE HANDLER
// window.addEventListener("resize", function () {
//   var width = window.innerWidth;
//   var height = window.innerHeight;
//   renderer.setSize(width, height);
//   camera.aspect = width / height;
//   camera.updateProjectionMatrix();
// });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // CONTROLS
// const controls = new THREE.OrbitControls(camera, renderer.domElement);
// // camera.position.set(30, 20, 100);
// controls.update(); // must be called after any manual changes to the camera's transform

// // ORBIT HANDLER
// function animate_orbit() {
//   requestAnimationFrame(animate_orbit);
//   // required if controls.enableDamping or controls.autoRotate are set to true
//   controls.update();
//   renderer.render(scene, camera);
// }
// animate_orbit();

// // MODEL HANDLER
// function animate_model() {
//   requestAnimationFrame(animate_model);
//   var delta = clock.getDelta(); // clock is an instance of THREE.Clock
//   if (mixer) mixer.update(delta);
//   renderer.render(scene, camera);
// }
// animate_model();

// ///////////
// // VIDEO //
// ///////////

// var video, videoImage, videoImageContext, videoTexture;
// // create the video element
// video = document.getElementById("myVideo");
// // video.id = 'video';
// // video.type = ' video/ogg; codecs="theora, vorbis" ';
// //video.src = 'assets/gawrt.mp4';
// video.muted = true;
// video.load(); // must call after setting/changing source
// video.play();

// // alternative method --
// // create DIV in HTML:
// // <video id="myVideo" autoplay style="display:none">
// //		<source src="videos/sintel.ogv" type='video/ogg; codecs="theora, vorbis"'>
// // </video>
// // and set JS variable:
// // video = document.getElementById( 'myVideo' );

// videoImage = document.createElement("canvas");
// videoImage.width = 1280;
// videoImage.height = 720;

// videoImageContext = videoImage.getContext("2d");
// // background color if no video present
// videoImageContext.fillStyle = "#ffffff";
// videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

// videoTexture = new THREE.Texture(videoImage);
// videoTexture.minFilter = THREE.LinearFilter;
// videoTexture.magFilter = THREE.LinearFilter;

// var movieMaterial = new THREE.MeshBasicMaterial({
//   map: videoTexture,
//   overdraw: true,
//   side: THREE.DoubleSide,
// });
// // the geometry on which the movie will be displayed;
// // 		movie image will be scaled to fit these dimensions.
// var movieGeometry = new THREE.PlaneGeometry(7.6, 3.88, 4, 4);
// var movieScreen = new THREE.Mesh(movieGeometry, movieMaterial);
// movieScreen.rotation.y = -Math.PI / 2;
// movieScreen.position.set(-1.15, 10, 0);
// scene.add(movieScreen);

// function animate() {
//   requestAnimationFrame(animate);
//   render();
//   update();
// }
// animate();

// function update() {
//   document.onkeydown = function (e) {
//     if (e.keyCode === "p") video.play();

//     if (e.keyCode === "x") video.pause();

//     if (e.keyCode === "s") {
//       // stop video
//       video.pause();
//       video.currentTime = 0;
//     }

//     if (e.keyCode === "r")
//       // rewind video
//       video.currentTime = 0;
//   };
// }

// function render() {
//   if (video.readyState === video.HAVE_ENOUGH_DATA) {
//     if (video.canPlayType("video/mp4")) {
//       console.log("READY");
//     }
//     videoImageContext.drawImage(video, 0, 0);
//     if (videoTexture) videoTexture.needsUpdate = true;
//   }

//   renderer.render(scene, camera);
// }

///////////////
// CHARACTER //
///////////////
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { FBXLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";

class BasicCharacterControls {
  constructor(params) {
    this._Init(params);
  }

  _Init(params) {
    this._params = params;
    this._move = {
      forward: false,
      backward: false,
      left: false,
      right: false,
    };
    this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
    this._acceleration = new THREE.Vector3(1, 0.25, 50.0);
    this._velocity = new THREE.Vector3(0, 0, 0);

    document.addEventListener("keydown", (e) => this._onKeyDown(e), false);
    document.addEventListener("keyup", (e) => this._onKeyUp(e), false);
  }

  _onKeyDown(event) {
    switch (event.keyCode) {
      case 87: // w
        this._move.forward = true;
        break;
      case 65: // a
        this._move.left = true;
        break;
      case 83: // s
        this._move.backward = true;
        break;
      case 68: // d
        this._move.right = true;
        break;
      case 38: // up
      case 37: // left
      case 40: // down
      case 39: // right
        break;
    }
  }

  _onKeyUp(event) {
    switch (event.keyCode) {
      case 87: // w
        this._move.forward = false;
        break;
      case 65: // a
        this._move.left = false;
        break;
      case 83: // s
        this._move.backward = false;
        break;
      case 68: // d
        this._move.right = false;
        break;
      case 38: // up
      case 37: // left
      case 40: // down
      case 39: // right
        break;
    }
  }

  Update(timeInSeconds) {
    const velocity = this._velocity;
    const frameDecceleration = new THREE.Vector3(
      velocity.x * this._decceleration.x,
      velocity.y * this._decceleration.y,
      velocity.z * this._decceleration.z
    );
    frameDecceleration.multiplyScalar(timeInSeconds);
    frameDecceleration.z =
      Math.sign(frameDecceleration.z) *
      Math.min(Math.abs(frameDecceleration.z), Math.abs(velocity.z));

    velocity.add(frameDecceleration);

    const controlObject = this._params.target;
    const _Q = new THREE.Quaternion();
    const _A = new THREE.Vector3();
    const _R = controlObject.quaternion.clone();

    if (this._move.forward) {
      velocity.z += this._acceleration.z * timeInSeconds;
    }
    if (this._move.backward) {
      velocity.z -= this._acceleration.z * timeInSeconds;
    }
    if (this._move.left) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, Math.PI * timeInSeconds * this._acceleration.y);
      _R.multiply(_Q);
    }
    if (this._move.right) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, -Math.PI * timeInSeconds * this._acceleration.y);
      _R.multiply(_Q);
    }

    controlObject.quaternion.copy(_R);

    const oldPosition = new THREE.Vector3();
    oldPosition.copy(controlObject.position);

    const forward = new THREE.Vector3(0, 0, 1);
    forward.applyQuaternion(controlObject.quaternion);
    forward.normalize();

    const sideways = new THREE.Vector3(1, 0, 0);
    sideways.applyQuaternion(controlObject.quaternion);
    sideways.normalize();

    sideways.multiplyScalar(velocity.x * timeInSeconds);
    forward.multiplyScalar(velocity.z * timeInSeconds);

    controlObject.position.add(forward);
    controlObject.position.add(sideways);

    oldPosition.copy(controlObject.position);
  }
}

export default class LoadModelDemo {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this._threejs = new THREE.WebGLRenderer({
      antialias: true,
    });
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.setPixelRatio(window.devicePixelRatio);
    this._threejs.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this._threejs.domElement);

    window.addEventListener(
      "resize",
      () => {
        this._OnWindowResize();
      },
      false
    );

    // const fov = 60;
    // const aspect = 1920 / 1080;
    // const near = 1.0;
    // const far = 1000.0;
    this._camera = camera;

    this._scene = scene;

    let light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(20, 100, 10);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 100;
    light.shadow.camera.right = -100;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -100;
    this._scene.add(light);

    light = new THREE.AmbientLight(0xffffff, 4.0);
    this._scene.add(light);

    const controls = new OrbitControls(this._camera, this._threejs.domElement);
    controls.target.set(0, 20, 0);
    controls.update();

    // const loader = new THREE.CubeTextureLoader();
    // const texture = loader.load([
    //   "./resources/posx.jpg",
    //   "./resources/negx.jpg",
    //   "./resources/posy.jpg",
    //   "./resources/negy.jpg",
    //   "./resources/posz.jpg",
    //   "./resources/negz.jpg",
    // ]);
    // this._scene.background = texture;

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100, 10, 10),
      new THREE.MeshStandardMaterial({
        color: 0x202020,
      })
    );
    plane.castShadow = false;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    this._scene.add(plane);

    this._mixers = [];
    this._previousRAF = null;

    this._LoadAnimatedModel();
    // this._LoadAnimatedModelAndPlay(
    //     './resources/dancer/', 'girl.fbx', 'dance.fbx', new THREE.Vector3(0, -1.5, 5));
    // this._LoadAnimatedModelAndPlay(
    //     './resources/dancer/', 'dancer.fbx', 'Silly Dancing.fbx', new THREE.Vector3(12, 0, -10));
    // this._LoadAnimatedModelAndPlay(
    //     './resources/dancer/', 'dancer.fbx', 'Silly Dancing.fbx', new THREE.Vector3(-12, 0, -10));
    this._RAF();
  }

  _LoadAnimatedModel() {
    const loader = new FBXLoader();
    loader.setPath("./resources/zombie/");
    loader.load("mremireh_o_desbiens.fbx", (fbx) => {
      fbx.scale.setScalar(0.1);
      fbx.traverse((c) => {
        c.castShadow = true;
      });

      const params = {
        target: fbx,
        camera: this._camera,
      };
      this._controls = new BasicCharacterControls(params);

      const anim = new FBXLoader();
      anim.setPath("./resources/zombie/");
      anim.load("walk.fbx", (anim) => {
        const m = new THREE.AnimationMixer(fbx);
        this._mixers.push(m);
        const idle = m.clipAction(anim.animations[0]);
        idle.play();
      });
      this._scene.add(fbx);
    });
  }

  _LoadAnimatedModelAndPlay(path, modelFile, animFile, offset) {
    const loader = new FBXLoader();
    loader.setPath(path);
    loader.load(modelFile, (fbx) => {
      fbx.scale.setScalar(0.1);
      fbx.traverse((c) => {
        c.castShadow = true;
      });
      fbx.position.copy(offset);

      const anim = new FBXLoader();
      anim.setPath(path);
      anim.load(animFile, (anim) => {
        const m = new THREE.AnimationMixer(fbx);
        this._mixers.push(m);
        const idle = m.clipAction(anim.animations[0]);
        idle.play();
      });
      this._scene.add(fbx);
    });
  }

  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
  }

  _RAF() {
    requestAnimationFrame((t) => {
      if (this._previousRAF === null) {
        this._previousRAF = t;
      }

      this._RAF();

      this._threejs.render(this._scene, this._camera);
      this._Step(t - this._previousRAF);
      this._previousRAF = t;
    });
  }

  _Step(timeElapsed) {
    const timeElapsedS = timeElapsed * 0.001;
    if (this._mixers) {
      this._mixers.map((m) => m.update(timeElapsedS));
    }

    if (this._controls) {
      this._controls.Update(timeElapsedS);
    }
  }
}

let app = new LoadModelDemo();
