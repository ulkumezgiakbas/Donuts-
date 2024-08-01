import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.153.0/build/three.module.js';

let scene, camera, renderer;
let donuts = [];
let ADD = 0.1;

// Rastgele bir sayı için fonksiyon
let randomInRange = function (from, to) {
    let x = Math.random() * (to - from);
    return x + from;
};

// Torus geometrisi oluşturan fonksiyon
let createDonut = function () {
    // Torus geometrisi ve materyali tanımla
    let geometry = new THREE.TorusGeometry(1, 0.5, 5, 30);
    let material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });

    // Mesh oluştur
    let d = new THREE.Mesh(geometry, material);

    // Donutun başlangıç konumunu ayarla
    d.position.x = randomInRange(-15, 15);
    d.position.z = randomInRange(-15, 15);
    d.position.y = 15;

    // Sahneye ekle ve donuts listesine ekle
    scene.add(d);
    donuts.push(d);
};

// Sahne, kamera ve renderer'ı başlatma fonksiyonu
let init = function () {
    // Sahne oluştur
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Arka plan rengini siyah yap

    // Kamera oluştur ve konumunu ayarla
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 20;
    camera.position.y = -10;

    // Renderer oluştur
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Renderer'ı sayfaya ekle
    document.getElementById('container').appendChild(renderer.domElement);

    // Window boyutu değiştiğinde render boyutunu güncelle
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
};

// Ana döngü
let mainLoop = function () {
    let x = Math.random();
    if (x < 0.1) {
        createDonut(); // Donut oluşturma
    }

    // Her donut için konumu güncelle
    donuts.forEach(d => d.position.y -= ADD);

    // Sahneyi render et
    renderer.render(scene, camera);

    // Animasyonu devam ettir
    requestAnimationFrame(mainLoop);
};

init();  // Başlatma
mainLoop(); // Ana döngü
