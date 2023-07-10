import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilePondFile, FilePondOptions } from 'filepond';
import { Login, User } from 'src/app/models/types';
import { LoginService } from 'src/app/services/login.service';
import { MediaService } from 'src/app/services/media.service';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  public login!: Login;
  public userForm!: FormGroup;
  public email = '';
  public pass = '';
  private mediaService = inject(MediaService);

  constructor(private loginService: LoginService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {
  }

  toggle(): void {
    const pInput = <HTMLInputElement>document.getElementById('password');
    pInput.type == 'password'
      ? (pInput.type = 'text')
      : (pInput.type = 'password');
    const btn = <HTMLButtonElement>document.getElementById('btnToggle');

    btn.classList.toggle('active');

    btn.classList.contains('active')
      ? (btn.innerHTML = '<i class="bx bx-hide bx-xs"></i>')
      : (btn.innerHTML = '<i class="bx bx-show bx-xs"></i>');
  }

  submitForm(): void {
    this.email = this.userForm.get('email')?.value;
    this.pass = this.userForm.get('password')?.value;

    this.login = {
      email: this.email,
      password: this.pass,
    };

    this.loginService.login(this.login);
  }

  // FilePond
  imageUrl = '';

  onProcessFile(event: any) {
    const file: FilePondFile = event.file;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(file.file);
  }

  pondOptions: FilePondOptions = {
    labelIdle: 'Drag and Drop your files or <span>Browse</span>',
    acceptedFileTypes: ['image/*'],
    allowImagePreview: true,
    imagePreviewHeight: 250,
    maxFileSize: '8MB',
  };

  pondHandleAddFile(event: any) {
    console.log('A file was added', event.file.file);
    const formData = new FormData();
    const file = event.file.file;
    formData.append('file', file);

    this.mediaService.uploadFile(formData).subscribe((res) => {
      const imgUrl = res.url;
      // this.enableButton = true;
      console.log(imgUrl);
    });
  }

  private initScene() {
    // Select the container for the scene
    const container = document.getElementById('container')!;

    // Create the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Load the panoramic image and create a texture
    const loader = new THREE.TextureLoader();
    const texture = loader.load('../../../assets/pana.jpg');

    // Create a spherical geometry and map the texture to it
    const geometry = new THREE.SphereGeometry(500, 60, 40);

    // Flip the geometry inside out
    geometry.scale(-1, 1, 1);

    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Set up the camera and controls
    camera.position.set(0, 0, 0.1);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;

    controls.rotateSpeed = 0.3;

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize, false);

    // Animation loop
    let lastTime = 0;
    const rotationSpeed = 0.00005;

    function animate(time: any) {
      const delta = time - lastTime;
      lastTime = time;
      requestAnimationFrame(animate);

      sphere.rotation.y += rotationSpeed * delta;

      controls.update();
      renderer.render(scene, camera);
    }

    animate(0);
  }
}
