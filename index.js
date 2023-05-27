
// standard global variables
var container, stats;

// custom global variables
var video, videoImage, videoImageContext, videoTexture;
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


///////////
// VIDEO //
///////////

// create the video element
video = document.getElementById( 'myVideo' );
// video.id = 'video';
// video.type = ' video/ogg; codecs="theora, vorbis" ';
//video.src = 'assets/gawrt.mp4';
video.muted = true;
video.load(); // must call after setting/changing source
video.play();

// alternative method -- 
// create DIV in HTML:
// <video id="myVideo" autoplay style="display:none">
//		<source src="videos/sintel.ogv" type='video/ogg; codecs="theora, vorbis"'>
// </video>
// and set JS variable:
// video = document.getElementById( 'myVideo' );

videoImage = document.createElement( 'canvas' );
videoImage.width = 1280;
videoImage.height = 720;

videoImageContext = videoImage.getContext( '2d' );
// background color if no video present
videoImageContext.fillStyle = '#ffffff';
videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );

videoTexture = new THREE.Texture( videoImage );
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;

var movieMaterial = new THREE.MeshBasicMaterial( { map: videoTexture, overdraw: true, side:THREE.DoubleSide } );
// the geometry on which the movie will be displayed;
// 		movie image will be scaled to fit these dimensions.
var movieGeometry = new THREE.PlaneGeometry( 7.6, 3.88, 4, 4 );
var movieScreen = new THREE.Mesh( movieGeometry, movieMaterial );
movieScreen.rotation.y = (-Math.PI / 2);
movieScreen.position.set(-1.15, 10, 0);
scene.add(movieScreen);



function animate() 
{
    requestAnimationFrame( animate );
	render();		
	update();
}
animate()

function update()
{
    document.onkeydown = function(e) {
        if (e.keyCode === 'p')
                video.play();
                
        if (e.keyCode === 'x')
                video.pause();

        if (e.keyCode === 's') // stop video
            {
                video.pause();
                video.currentTime = 0;
            }
            
        if (e.keyCode === 'r') // rewind video
                video.currentTime = 0;
    }
}

function render() 
{	
	if ( video.readyState === video.HAVE_ENOUGH_DATA ) 
	{
        if (video.canPlayType('video/mp4')) {
            console.log('READY');
        }
		videoImageContext.drawImage( video, 0, 0 );
		if ( videoTexture ) 
			videoTexture.needsUpdate = true;
	}

	renderer.render( scene, camera );
}