// import * as THREE from "three";
// import gsap from "gsap";
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const valuePI = document.querySelector(".piValue");
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
const group = new THREE.Group();
const mouse = {
  x: undefined,
  y: undefined,
};
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
const geometry = new THREE.IcosahedronGeometry(25);
const material = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  wireframe: true,
  wireframeLinewidth: 2.5,
});
const icosa = new THREE.Mesh(geometry, material);
const mesh3 = new THREE.Mesh(
  new THREE.SphereGeometry(25, 40, 40),
  new THREE.MeshBasicMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0.06,
    wireframe: true,
    wireframeLinewidth: 2.5,
  })
);
group.add(icosa, mesh3);
scene.add(group);
var main = {
  w: 500,
  h: 500,
};
var sphere = {
  x: main.w / 2,
  y: main.h / 2,
  z: main.h / 2,
  r: main.h / 2,
};

var data = {
  pIn: 0,
  pOut: 0,
  pTotal: 0,
  pi: 0,
};

const btn = document.querySelector(".btn");
const piVal = document.querySelector(".piVal");
const download = document.querySelector(".click");

btn.addEventListener("click", function (e) {
  e.preventDefault();
  let itt = Number(piVal.value);
  for (let i = 1; i <= itt; i++) {
    const geometry = new THREE.BufferGeometry();
    let x = Math.floor(Math.random() * (main.h + 1));
    let y = Math.floor(Math.random() * (main.h + 1));
    let z = Math.floor(Math.random() * (main.h + 1));
    setTimeout(() => {
      if (
        Math.sqrt(
          (x - sphere.x) * (x - sphere.x) +
          (y - sphere.y) * (y - sphere.y) +
          (z - sphere.z) * (z - sphere.z)
        ) < sphere.r
      ) {
        data.pIn++;
        var randomDirection = new THREE.Vector3(
          Math.random() - 0.4,
          Math.random() - 0.4,
          Math.random() - 0.4
        ).normalize();
        let difference = 23;
        let rand = Math.random();
        rand = Math.floor(rand * difference) + 0;
        var randomParticle = randomDirection.multiplyScalar(rand);
        geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(randomParticle, 3)
        );

        let particles = new THREE.Points(
          geometry,
          new THREE.PointsMaterial({ color: 0xffffffff })
        );
        mesh3.add(particles);
      } else {
        data.pOut++;
        var randomDirection = new THREE.Vector3(
          Math.random() - 0.4,
          Math.random() - 0.4,
          Math.random() - 0.4,
        ).normalize();
        let diff = 2;
        let rand2 = Math.random();
        rand2 = Math.floor(rand2 * diff) + 22;
        var randomPartice = randomDirection.multiplyScalar(rand2);
        geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(randomPartice, 3)
        );
        let particls = new THREE.Points(
          geometry,
          new THREE.PointsMaterial({ color: 0xffff00 })
        );
        icosa.add(particls);
      }
      var piiii = 1.67 * (data.pTotal / data.pIn);
      valuePI.textContent = piiii;
      data.pTotal++;
      pi_data.push(piiii);
      interval.push(i);
    }, 1000);
  }
});
addEventListener("mousemove", function (e) {
  mouse.x = (e.clientX / innerWidth) * 4 - 1;
  mouse.y = (e.clientY / innerHeight) * 4 + 1;
});
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  icosa.rotation.y += 0.01;
  mesh3.rotation.y += 0.01;
  gsap.to(group.rotation, {
    y: mouse.x * 0.5,
    x: -mouse.y * 0.5,
    duration: 2,
  });
}
animate();
const pi_data = [];
const interval = [];
var listing = [];

download.addEventListener("click", function (e) {
  e.preventDefault();
  for (let p = 0; p < interval.length; p++) {
    listing.push([interval[p], pi_data[p]]);
  }
  var rows = ["Iteration", "Calculated Pi \n"];
  var jaiho = listing;

  jaiho.forEach(function (cell) {
    rows += cell.join(",");
    rows += "\n";
  });

  var hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(rows);
  hiddenElement.target = "_blank";
  hiddenElement.download = "Monte-carlo-3d graph data.csv";
  hiddenElement.click();
});