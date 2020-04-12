import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js'
import InteractiveControls from './Interactive/InteractiveControls';
import Particles from './Particles';

export default class WebGLView {

	/*
	 * Init
	 */

	constructor(mount, video, anchor) {

		// Variable check
		if ( !mount || !video ) {
			console.log('WebGLView: Missing initial value...')
			return
		}

		// Basic variables
		this.useStats = false;
		this.mount = mount
    this.anchor = anchor

		// Setup
		this.addListeners();

		// Init
		this.init( video );
    this.resize();
	}

	init( video ) {

		// Get width of mount
		this.width = this.mount.offsetWidth;
		this.height = this.mount.offsetHeight;

		// Scene
		this.scene = new THREE.Scene();

		// Camera
		this.camera = new THREE.PerspectiveCamera(50, this.width / this.height, 1, 10000);
		this.camera.position.set(
      0,
      0, 
      300
    )
		this.camera.lookAt(0, 0, 0);

		// Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.mount.appendChild(this.renderer.domElement);

    if ( this.useStats ) {
      this.stats = new Stats();
      this.mount.appendChild(this.stats.dom);
    }

		// Content
		this.initParticles(video);
		this.initControls();
	}


  /*
   * Setup animation
   */

	initParticles(video) {
		this.particles = new Particles(this, this.anchor);
		this.scene.add(this.particles.container);
		this.particles.load(video);
	}

  initControls() {
		this.interactive = new InteractiveControls(this.camera, this.renderer.domElement, this.anchor);
    if (this.interactive) this.interactive.resize();
	}


  /*
   * Handle animation
   */

  animate() {

  	// Update animation
    if (this.particles) {
    	this.particles.update();
    } 
    this.renderer.render(this.scene, this.camera);

    // Update stats
    if ( this.useStats ) {
      this.stats.update();
    }

    // Loop
    this.animationFrame = requestAnimationFrame(this.handlerAnimate);
  }


  /*
   * Controls
   */

  startAnimation() {
  	if (this.particles) this.particles.start();
  	this.animate();

    setTimeout(() => {
      this.resize();
    }, 1000)
  }

  pauseAnimation(anchor) {
  	if (this.particles) {
  		this.particles.pause().then(() => {
  			this.cancel(anchor)
  		}).catch(() => {
  			this.cancel(anchor)
  		})
  	} else {
  		this.cancel(anchor)
  	}
  }

  cancel(anchor) {
  	const destination = window.sectionScroll.anchor
  	if( destination && anchor && destination === anchor ) return
  	cancelAnimationFrame(this.animationFrame)
  }

  destroyObject() {
  	if (this.particles) {
  		this.particles.destroy();
  	}
  	this.mount.removeChild(this.renderer.domElement)
  	this.removeListeners();
  }


  /*
	 * Event listeners
	 */

	addListeners() {
    this.handlerAnimate = this.animate.bind(this);
    window.addEventListener('resize', this.resize.bind(this));
  }

  removeListeners() {
    cancelAnimationFrame(this.animationFrame)
    window.removeEventListener('resize', this.resize.bind(this));
    if (this.interactive) this.interactive.removeListeners();
		if (this.particles) this.particles.removeListeners();
  }

	resize() {
		if (!this.renderer) return;
		
		this.width = this.mount.offsetWidth;
		this.height = this.mount.offsetHeight;

		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();

		this.fovHeight = 2 * Math.tan((this.camera.fov * Math.PI) / 180 / 2) * this.camera.position.z;

		this.renderer.setSize(this.width, this.height);

		if (this.interactive) this.interactive.resize();
		if (this.particles) this.particles.resize();
	}
}
