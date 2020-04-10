import React, { Component } from 'react'
import styled from '@emotion/styled'
import WebGLHandler from '../../WebGL/WebglHandler'
import VideoSrc from '../../../assets/video/test-face-150.mp4'



/*==============================================================================
  # Styles
==============================================================================*/

const IntroWrapper = styled('div')`
  position: relative;
  width: 100vw;
  height: 100vh;
`

const Mount = styled('div')`
  position: absolute;
  top: 0;
  left: 25%;
  width: 50%;
  height: 100%;
  transform: translateX(-50%);
`

const Content = styled('div')`
  position: absolute;
  top: 50%;
  left: 66.66%;
  width: 50%;
  max-width: 300px;
  transform: translate(-50%,-50%);

  .title {
    margin-bottom: 20px;
  }

  .text {

  }
`


/*==============================================================================
  # Component
==============================================================================*/

class SectionIntro extends Component {

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
      <IntroWrapper>
        <Mount ref={(mount) => this.refHandler(mount)} />
        <Content>
          <h2 className="title mega">Hej.</h2>
          <div className="text description">
            <p>Mitt namn är Anton Pedersen och skapar hemsidor.</p>
          </div>
        </Content>
      </IntroWrapper>
    )
  }  
}

export default SectionIntro