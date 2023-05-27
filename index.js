

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene();

const loader = new THREE.GLTFLoader();
let mixer;
loader.load( "assets/Projectver6.glb", function ( glb ) {
    //gltf.scene.position.set(10,0,0);
    scene.add( glb.scene );
    mixer = new THREE.AnimationMixer(glb.scene);
    const clips = glb.animations;
    clips.forEach(function(clip) {
        const action = mixer.clipAction(clip);
        action.play();
    });

}, undefined, function ( error ) {
    console.error( error );
} );

const clock = new THREE.Clock();


const geometry = new THREE.BoxGeometry(1, 1, 1);
                var material = [
                    new THREE.MeshPhongMaterial({color: '#ee0000'}), //right
                    new THREE.MeshPhongMaterial({color: '#00ee00'}), //left
                    new THREE.MeshPhongMaterial({color: '#0000ee'}), //top
                    new THREE.MeshPhongMaterial({color: '#e00ee0'}), //bottom
                    new THREE.MeshPhongMaterial({color: '#115533'}), //front
                    new THREE.MeshPhongMaterial({color: '#779900'}), //back
                ];

                const cube = new THREE.Mesh(geometry, material);
                cube.position.x = -14.5;
                cube.position.y = 15.5;
                cube.position.z = 13.5
                scene.add(cube);

const directionalLight = new THREE.PointLight( 0xffffff, 1, 70 );

directionalLight.position.set( -14.5, 15.5, 13.5 );
        
scene.add(directionalLight );

const directionalLight1 = new THREE.PointLight( 0xffffff, 1, 100 );

directionalLight1.position.set( -14.5, 15, 1 );
        
scene.add(directionalLight1 );

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
camera.position.set(0,1,2)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ canvas: canvas});
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', function() { 
    var width = window.innerWidth; 
    var height = window.innerHeight; 	
    renderer.setSize(width, height); 
    camera.aspect = width / height; 	
    camera.updateProjectionMatrix(); 
});

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);



    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    //controls.update() must be called after any manual changes to the camera's transform
    camera.position.set(0, 20, 100);
    controls.update();

    function animate_orbit() {

        requestAnimationFrame(animate_orbit);

        // required if controls.enableDamping or controls.autoRotate are set to true
        controls.update();

        renderer.render(scene, camera);

    }
    animate_orbit();

function animate_model()
    {
        requestAnimationFrame(animate_model);
        var delta = clock.getDelta(); // clock is an instance of THREE.Clock
        if ( mixer ) mixer.update( delta );
        renderer.render(scene, camera);
    }
animate_model();