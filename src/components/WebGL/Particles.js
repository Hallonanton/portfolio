import * as THREE from 'three';
import { TweenLite } from 'gsap';
import TouchTexture from './Interactive/TouchTexture';

const glslify = require("glslify");


export default class Particles {
  
  constructor(webgl, anchor) {
    this.webgl = webgl;
    this.anchor = anchor;
    this.container = new THREE.Object3D();

    // Fallback for iOs
    this.width = 150
    this.height = 150
  }

  load( video ) {

    // Create a video element to read data from
    this.video = video

    // Extract data after load
    this.video.addEventListener('loadeddata', e => {
      
      var texture = new THREE.VideoTexture( this.video );

      this.width = this.video.videoWidth
      this.height = this.video.videoHeight

      this.texture = texture;
      this.texture.minFilter = THREE.LinearFilter;
      this.texture.magFilter = THREE.LinearFilter;
      this.texture.format = THREE.RGBFormat;

      // Initiate animation
      this.createHitArea();
      this.addListeners();
      this.resize();
    })
  }

  createPoints() {

    // Uniforms for shaders
    /* variables that the shaders use to calculate position/color */
    const uniforms = {
      uColor: { value: new THREE.Color(0x2ecc71) },
      uDepth: { value: 1.0 }, // Set from this.show()
      uSize: { value: 1.5 },  // Set from this.show()
      uTextureSize: { value: new THREE.Vector2(this.width, this.height) },
      uTexture: { value: this.texture },
      uTouch: { value: null },
    };

    // Create material
    const material = new THREE.RawShaderMaterial({
      uniforms,
      vertexShader: glslify(require("./Shaders/particle.vert")),
      fragmentShader: glslify(require("./Shaders/particle.frag")),
      depthTest: false,
      transparent: true,
    });

    const geometry = new THREE.InstancedBufferGeometry();

    // Positions
    const positions = new THREE.BufferAttribute(new Float32Array(4 * 3), 3);
    positions.setXYZ(0, -0.5,  0.5,  0.0);
    positions.setXYZ(1,  0.5,  0.5,  0.0);
    positions.setXYZ(2, -0.5, -0.5,  0.0);
    positions.setXYZ(3,  0.5, -0.5,  0.0);
    geometry.setAttribute('position', positions);

    // UVs
    /* UV mapping is the 3D modelling process of projecting a 2D image to a 3D model's surface for texture mapping. */
    const uvs = new THREE.BufferAttribute(new Float32Array(4 * 2), 2);
    uvs.setXYZ(0,  0.0,  0.0);
    uvs.setXYZ(1,  1.0,  0.0);
    uvs.setXYZ(2,  0.0,  1.0);
    uvs.setXYZ(3,  1.0,  1.0);
    geometry.setAttribute('uv', uvs);

    // Index
    geometry.setIndex(new THREE.BufferAttribute(new Uint16Array([ 0, 2, 1, 2, 3, 1 ]), 1));

    // Calcluate pixels
    let numPoints = this.width * this.height;

    //Remove one row and one column
    let numVisible = numPoints / 2 / 2;

    // Pixel grid
    const indices = new Uint16Array(numVisible);
    const offsets = new Float32Array(numVisible * 3);
    const angles = new Float32Array(numVisible);

    for (let i = 0; i <= numVisible; i++) {

      const j = i*2
      const offsetX = j % this.width
      const offsetY = Math.floor(j / this.width) * 2

      offsets[i * 3 + 0] = offsetX;
      offsets[i * 3 + 1] = offsetY;

      indices[i] = i;

      angles[i] = Math.random() * Math.PI;
    }

    geometry.setAttribute('pindex', new THREE.InstancedBufferAttribute(indices, 1, false));
    geometry.setAttribute('offset', new THREE.InstancedBufferAttribute(offsets, 3, false));
    geometry.setAttribute('angle', new THREE.InstancedBufferAttribute(angles, 1, false));

    // Create object that will be visible in the render
    this.object3D = new THREE.Mesh(geometry, material);
    this.container.add(this.object3D);

    this.pointsCreated = true
  }

  createTouch() {
    // Create only once
    if (!this.touch) this.touch = new TouchTexture(this, this.anchor);
    this.object3D.material.uniforms.uTouch.value = this.touch.texture;
  }

  createHitArea() {
    const geometry = new THREE.PlaneGeometry(this.width, this.height, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true, depthTest: false });
    material.visible = false;
    this.hitArea = new THREE.Mesh(geometry, material);
    this.container.add(this.hitArea);
  }

  addListeners() {
    this.handlerInteractiveMove = this.onInteractiveMove.bind(this);

    this.webgl.interactive.addListener('interactive-move', this.handlerInteractiveMove);
    this.webgl.interactive.objects.push(this.hitArea);
    this.webgl.interactive.enable();
  }

  removeListeners() {
    this.webgl.interactive.removeListener('interactive-move', this.handlerInteractiveMove);
    
    const index = this.webgl.interactive.objects.findIndex(obj => obj === this.hitArea);
    this.webgl.interactive.objects.splice(index, 1);
    this.webgl.interactive.disable();

    clearTimeout(this.loadAwait);
    //if ( this.video ) this.video.pause(); Removed because of iOs
  }

  // ---------------------------------------------------------------------------------------------
  // PUBLIC
  // ---------------------------------------------------------------------------------------------

  start() {

    //this.debugParticles()

    // Do not createPoints before the video has started
    if ( this.video.currentTime > 0 ) {

      if ( !this.pointsCreated ) {
        // Initiate animation
        // Fallback for iOs
        this.createPoints();
        this.createTouch();
        this.resize();
      }

      this.video.play();
      this.show();
    } else {
      this.loadAwait = setTimeout(() => this.start(), 10)
    }
  }

  pause() {
    return new Promise((resolve, reject) => {
      this.hide().then(() => {
        resolve();
      }).catch(() => {
        reject();
      })
    })
  }

  destroy() {
    this.removeListeners();

    if (!this.object3D) {
      return;
    }
    this.object3D.parent.remove(this.object3D);
    this.object3D.geometry.dispose();
    this.object3D.material.dispose();
    this.object3D = null;
    if (!this.hitArea) {
      return;
    }
    this.hitArea.parent.remove(this.hitArea);
    this.hitArea.geometry.dispose();
    this.hitArea.material.dispose();
    this.hitArea = null;
  }

  update() {
    if (!this.object3D) return;
    if (this.touch) this.touch.update();
  }

  show(time = 1.0) {
    if (!this.object3D) return;
    // reset
    TweenLite.fromTo(this.object3D.material.uniforms.uSize, time, { value: 0 }, { value: 1.5 });
    TweenLite.fromTo(this.object3D.material.uniforms.uDepth, time * 1.5, { value: 20.0 }, { value: 1.0 });
  }

  hide(time = 1.6) {
    if (!this.object3D) return;
    return new Promise((resolve, reject) => {
      TweenLite.to(this.object3D.material.uniforms.uSize, time, {
        value: 0.0,
        onComplete: () => {
          //if ( this.video ) this.video.pause(); Removed because of iOs
          resolve();
        },
      });
    });
  }

  // ---------------------------------------------------------------------------------------------
  // EVENT HANDLERS
  // ---------------------------------------------------------------------------------------------

  resize() {
    if (!this.object3D) return;

    const scale = (this.webgl.fovHeight / this.height) * 0.95;
    this.object3D.scale.set(scale, scale, 1);
    this.hitArea.scale.set(scale, scale, 1);
  }

  onInteractiveMove(e) {
    const uv = e.intersectionData.uv;
    if (this.touch) this.touch.addTouch(uv);
  }


  debugParticles () {
    if ( this.anchor === 'intro' ) {   
      if ( this.table ) {  

        console.log('update table')  

        const row = document.createElement('tr');  

        let anchor = document.createElement('td')  
        anchor.innerHTML = this.anchor  

        let videoIsPlaying = document.createElement('td')  
        videoIsPlaying.innerHTML = this.video.currentTime > 0  

        let currentTime = document.createElement('td')  
        currentTime.innerHTML = this.video.currentTime  

        row.appendChild(anchor)  
        row.appendChild(videoIsPlaying)  
        row.appendChild(currentTime)  
        this.table.appendChild(row)  

      } else {  

        console.log('create table')  

        let tableWrapper = document.createElement('div');  
        tableWrapper.classList.add('debug-particles');  
        tableWrapper.style.height = '200px'
        this.table = document.createElement('table');  
        tableWrapper.appendChild(this.table);  
        document.body.appendChild( tableWrapper );  

      }  
    }
  }
}
