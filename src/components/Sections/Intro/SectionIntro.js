import React, { Component } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import WebGLHandler from './WebglHandler'
import VideoSrc from '../../../assets/video/test-face-150.mp4'
import Hexagon from '../../../assets/images/hexagon.svg'
import { theme } from '../../Layout/Theme'


/*==============================================================================
  # Styles
==============================================================================*/

const rotate = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`

const dash = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`

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
      animation: ${rotate} 90s linear infinite;
    }

    &.second {
      animation: ${rotate} 120s linear infinite -5s;
    }

    path {
      stroke: ${theme.colors.textInactive};
      stroke-dasharray: 3000;
      stroke-dashoffset: 3000;
      animation: ${dash} 10000ms linear forwards;
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
  }

  removeListeners() {
    cancelAnimationFrame(this.animationFrame)
    window.removeEventListener('resize', this.resize.bind(this));
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

  render () {

    return (
      <IntroWrapper>
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