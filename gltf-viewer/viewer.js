const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

const loader = new THREE.GLTFLoader();

const dropArea = document.getElementById('dropArea');

dropArea.addEventListener('drop', (event) => {
    // ... [rest of the drop event listener]

    reader.onload = (event) => {
        loader.load(event.target.result, (gltf) => {
            scene.add(gltf.scene);

            // Extract and display the model's stats
            const polyCount = gltf.scene.children.reduce((count, child) => {
                if (child.geometry) {
                    count += child.geometry.attributes.position.count / 3;
                }
                return count;
            }, 0);
            
            document.getElementById('polyCount').textContent = polyCount;

            // Display the stats div
            document.getElementById('stats').style.display = 'block';

            // Similarly, you can extract and display other stats like textures, size, etc.
        });
    };
});

dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.style.background = 'rgba(200, 200, 200, 0.5)';
});

dropArea.addEventListener('dragleave', () => {
    dropArea.style.background = 'rgba(255, 255, 255, 0.5)';
});

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.style.display = 'none';

    const file = event.dataTransfer.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (event) => {
        loader.load(event.target.result, (gltf) => {
            scene.add(gltf.scene);

            // Here, you can extract the model's stats and display them
            const polyCount = gltf.scene.children.reduce((count, child) => {
                if (child.geometry) {
                    count += child.geometry.attributes.position.count / 3;
                }
                return count;
            }, 0);
            console.log(`Poly Count: ${polyCount}`);
            // Similarly, you can extract other stats like textures, size, etc.
        });
    };
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();