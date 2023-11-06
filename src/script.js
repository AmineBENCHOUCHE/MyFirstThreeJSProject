import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import gsap from "gsap";

THREE.ColorManagement.enabled = false;

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//axes helper

// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/1.png");
const matcapTexture2 = textureLoader.load("/textures/matcaps/2.png");
const matcapTexture3 = textureLoader.load("/textures/matcaps/3.png");
const matcapTexture4 = textureLoader.load("/textures/matcaps/4.png");
const matcapTexture5 = textureLoader.load("/textures/matcaps/5.png");
const matcapTexture6 = textureLoader.load("/textures/matcaps/6.png");
const matcapTexture7 = textureLoader.load("/textures/matcaps/7.png");
const matcapTexture8 = textureLoader.load("/textures/matcaps/8.png");

const texture = [
  matcapTexture,
  matcapTexture2,
  matcapTexture3,
  matcapTexture4,
  matcapTexture5,
  matcapTexture6,
  matcapTexture7,
  matcapTexture8,
];
/**
 * Fonts
 */

const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("DANIA EL GNAOUI", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  const textGeometry2 = new TextGeometry("PROFESSIONAL HR", {
    font,
    size: 0.4,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  //   textGeometry.computeBoundingBox();
  //   textGeometry.translate(
  //     -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
  //     -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
  //     -(textGeometry.boundingBox.max.z - 0.03) * 0.5
  //   );
  textGeometry.center();
  textGeometry2.center();
  textGeometry2.translate(0, -1, 0);
  //console.log(textGeometry.boundingBox);

  /**
   * Material
   */
  //   const textMaterial = new THREE.MeshBasicMaterial({ wireframe: true });
  const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  const text = new THREE.Mesh(textGeometry, textMaterial);
  const text2 = new THREE.Mesh(textGeometry2, textMaterial);

  // Donuts geometry

  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
  const sphereGeometry = new THREE.SphereGeometry(0.8);
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

  const geometries = [donutGeometry, sphereGeometry, cubeGeometry];
  //   console.time("donuts");
  for (let i = 0; i < 500; i++) {
    const materialObject = new THREE.MeshMatcapMaterial({
      matcap: texture[Math.floor(Math.random() * 7)],
    });
    const geometry = geometries[Math.floor(Math.random() * 3)];
    const object = new THREE.Mesh(geometry, materialObject);
    object.position.x = (Math.random() - 0.5) * 50;
    object.position.y = (Math.random() - 0.5) * 50;
    object.position.z = (Math.random() - 0.5) * 50;
    object.rotation.x = Math.random() * Math.PI;
    object.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();
    object.scale.set(scale, scale, scale);
    scene.add(object);
  }
  //   console.timeEnd("donuts");

  scene.add(text, text2);
});

/**
 * Object
 */
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial()
// );

// scene.add(cube);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = 800;
  sizes.height = 600;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  50
);
camera.position.x = 1;
camera.position.y = 0;
camera.position.z = 4;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
