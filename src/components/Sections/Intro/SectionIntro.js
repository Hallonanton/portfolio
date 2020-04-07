import React, { Component } from 'react'
import styled from '@emotion/styled'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import WebGLHandler from './WebglHandler'
import VideoSrc from '../../../assets/video/test-face-150.mp4'
import Hexagon from '../../../assets/images/hexagon.svg'
import { theme } from '../../Layout/Theme'


/*==============================================================================
  # Styles
==============================================================================*/

const IntroWrapper = styled('div')`
  position: relative;
  width: 100vw;
  height: 100vh;

  .canvas-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  .hexagon {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 80%;
    z-index: 1;

    &.first {
      transform: translate(-50%, -50%) rotate( ${({rotation}) => rotation}deg );
    }

    &.second {
      transform: translate(-50%, -50%) rotate( ${({rotation}) => rotation*1.5}deg );
    }

    path {
      stroke: ${theme.colors.white};
    }
  }
`


/*==============================================================================
  # Component
==============================================================================*/

class SectionIntro extends Component {

  componentDidMount() {
    this.useStats = false;
    this.initWebGL();
    this.addListeners();
    this.animate();
    this.resize();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  state = {
    rotation: 0
  }

  initWebGL() {
    this.webgl = new WebGLHandler(this, VideoSrc);
    this.mount.appendChild(this.webgl.renderer.domElement);
    if ( this.useStats ) {
      this.stats = new Stats();
      this.mount.appendChild(this.stats.dom);
    }
  }

  addListeners() {
    this.handlerAnimate = this.animate.bind(this);

    window.addEventListener('resize', this.resize.bind(this));
    this.mount.addEventListener('mousemove', this.mousemove.bind(this));
  }

  removeListeners() {
    cancelAnimationFrame(this.animationFrame)
    window.removeEventListener('resize', this.resize.bind(this));
    clearTimeout(this.rotationTimeout)
    this.mount.removeEventListener('mousemove', this.mousemove.bind(this));
  }

  animate() {
    this.update();
    this.draw();

    if ( this.useStats ) {
      this.stats.update();
    }

    this.animationFrame = requestAnimationFrame(this.handlerAnimate);
  }

  update() {
    if (this.webgl) this.webgl.update();
  }

  draw() {
    if (this.webgl) this.webgl.draw();
  }

  resize() {
    if (this.webgl) this.webgl.resize();
  }

  mousemove(e) {
    const { rotation } = this.state
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const mouseX = e.clientX
    const mouseY = e.clientY
    const distanceCenter = Math.floor(this.getDistance(centerX, centerY, mouseX, mouseY))
  }

  getDistance(x1, y1, x2, y2) {
    var xDistance = x2 - x1;
    var yDistance = y2 - y1;
    
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  }

  render () {

    const { rotation } = this.state

    return (
      <IntroWrapper rotation={rotation}>
        <div 
          ref={(mount) => {this.mount = mount}} 
          className="canvas-wrapper"
        />
        <Hexagon className="hexagon first" />
        <Hexagon className="hexagon second" />
      </IntroWrapper>
    )
  }  
}

export default SectionIntro