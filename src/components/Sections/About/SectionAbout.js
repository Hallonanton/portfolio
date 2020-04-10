import React, { Component } from 'react'
import styled from '@emotion/styled'
import WebGLHandler from '../../WebGL/WebglHandler'
import VideoSrc from '../../../assets/video/test-face-150.mp4'



/*==============================================================================
  # Styles
==============================================================================*/

const AboutWrapper = styled('div')`
  position: relative;
  width: 100vw;
  height: 100vh;
`

const Mount = styled('div')`
  position: relative;
  width: 50%;
  margin-left: 50%;
  height: 100%;
  z-index: 2;
  background: #333333;
`


/*==============================================================================
  # Component
==============================================================================*/

class SectionAbout extends Component {

  componentDidMount() {
    window.addEventListener('sectionScroll', this.handleSectionScroll);
  }

  componentWillUnmount() {
    this.WebGLHandler.destroyObject();
  }

  refHandler =  mount => {

    if ( !this.mount && mount ) {
      this.mount = mount;
      const { anchor } = this.props;
      this.WebGLHandler = new WebGLHandler(mount, VideoSrc, anchor);

      const hash = window.location.hash?.replace('#','')

      // Check if first section, start animation if it is
      if ( !hash || hash === anchor ) {
        this.WebGLHandler.startAnimation();
      }
    }
  }

  handleSectionScroll = e => {

    const { anchor } = this.props
    const destination = e.destination.anchor

    // Start animation if target section is this section
    if ( destination === anchor ) {
      this.WebGLHandler.startAnimation();

    // Pause animation if target section is another section
    } else {
      this.WebGLHandler.pauseAnimation(anchor);
    }
  }

  render () {
    return (
      <AboutWrapper>
        <Mount ref={(mount) => this.refHandler(mount)} />
      </AboutWrapper>
    )
  }  
}

export default SectionAbout