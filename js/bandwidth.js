var THREE = require("three");

function init(){
    // Grab canvas
    var canvas = document.getElementById('bandwidth');
    var renderer = new THREE.WebGLRenderer( { antialias : true, canvas: canvas } );
    var cameraDistance = 100;
    var camera = new THREE.PerspectiveCamera( 50, canvas.width / canvas.height, 1, 400 );
    var cameraAngle=0;
    var scene = new THREE.Scene();
    var splineGeometry = new THREE.Geometry();
    var splineMaterial = new THREE.LineBasicMaterial({
        color: 0x6FC0BA,
        opacity: 0,
        transparent: true
    });

    var backdropGeometry = new THREE.Geometry();
    var backdropMaterial = new THREE.LineBasicMaterial({
        color: 0x1b2f2d,
        opacity: 1,
        transparent: true
    });

    var cameraUp = false;

    renderer.setSize(canvas.width, canvas.height);
    camera.position.z = cameraDistance;
    camera.lookAt(scene.position);

    lastRenderDate = new Date();

    var calc = function(x){
        return (x+200)*(x+100)*(x+280)*(x+10)*(x-300)*(x-250)*(x-150) / Math.pow(10,14)/1.5;
    }

    for(var i = 0; i< 500; i++){
        var y = calc(i-250) * Math.sin(2 * Math.PI * (i % 6) / 6 + i/500) + Math.cos(i) * 5;
        var z = calc(i-250) * Math.cos(2 * Math.PI * (i % 6) / 6 + i/500);
        splineGeometry.vertices.push(new THREE.Vector3(i - 250, y, z));
    }
    splineGeometry.verticesNeedUpdate = true;

    var splineLine = new THREE.Line(splineGeometry, splineMaterial);
    scene.add(splineLine);

    for(var i = 0; i< 25; i++){
        backdropGeometry.vertices.push(new THREE.Vector3(-500,100-i*8,-100));
        backdropGeometry.vertices.push(new THREE.Vector3(500,100-i*8,-100));
    }
    var backdropLine = new THREE.Line(backdropGeometry, backdropMaterial, THREE.LinePieces);
    // TODO: remove backdrop lines?
    // scene.add(backdropLine);

    renderer.render( scene, camera );

    var firstRun = null;
    var introAnimationDone = false;

    return {
        tick: function (){
            if(firstRun === null){
                firstRun = Date.now() + 2500;
            }
            // renderer.render( this.scene, this.camera );
            var renderTime = new Date() - lastRenderDate;
            var timeSinceStart = Date.now() - firstRun;
            lastRenderDate = new Date();

            var rotateCameraBy = (2 * Math.PI)/(10000/renderTime);
            cameraAngle += rotateCameraBy;

            if(timeSinceStart < 3000){
                backdropMaterial.opacity = Math.max(0,(timeSinceStart-2000)/3000);
                splineMaterial.opacity = timeSinceStart/3000;
            } else if(!introAnimationDone){
                introAnimationDone = true;
                backdropMaterial.opacity = .333;
                splineMaterial.opacity = 1;
            }


            camera.position.x = Math.sin(cameraAngle) * 20;
            renderer.render(scene, camera );

            splineLine.rotation.x += .01;

        }, 
        reset: function(){
            firstRun = null;
        }
    };

}
let x = init();

setInterval(() => x.tick(), 10)