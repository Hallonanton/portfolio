import React, { Component } from 'react'
import styled from '@emotion/styled'
import { SectionContainer, Row, Col } from '../../UI/Grid'
import TextReveal from '../../UI/TextReveal'
import { theme } from '../../Layout/Theme'
import WebGLHandler from '../../WebGL/WebglHandler'
import VideoSrc from '../../../assets/video/face-2.mp4'


/*==============================================================================
  # Styles
==============================================================================*/

const IntroContainer = styled(SectionContainer)`
  ${theme.below.md} {
    padding-top: 10px;
  }
`

const IntroRow = styled(Row)`
  height: 100%;
  align-items: center;
`

const MountCol = styled(Col)`
  position: relative;
  padding-bottom: 100%;

  ${theme.above.sm} {
    padding-bottom: 66.66%;
  }

  ${theme.above.md} {
    height: 100%;
    padding-bottom: 0;
  }

  .mount {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.bg};
  }

  video {
    position: absolute;
    width: 150px;
    height: 150px;
  }
`

const ContentCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;

  ${theme.below.md} {
    margin-top: 20px;
  }
`


/*==============================================================================
  # Component
==============================================================================*/

class SectionIntro extends Component {

  componentDidMount() {
    window.addEventListener('click', this.simulateVideoStart);
    window.addEventListener('touchstart', this.simulateVideoStart);
    window.addEventListener('sectionScroll', this.handleSectionScroll);
  }

  componentWillUnmount() {
    this.WebGLHandler.destroyObject();
    clearTimeout(this.revealDelay);
    window.removeEventListener('click', this.simulateVideoStart);
    window.removeEventListener('touchstart', this.simulateVideoStart);
    window.removeEventListener('sectionScroll', this.handleSectionScroll);
  }

  state = {
    visbile: false,
    revealDelay: 1000
  }

  // iOs is very strict on autoplay videos so 
  // this is a workaround to start the video
  simulateVideoStart = e => {
    if ( this.video ) {
      const videoIsPlaying = !!(this.video.currentTime > 0 && !this.video.paused && !this.video.ended && this.video.readyState > 2);
      if ( !videoIsPlaying ) {
        this.video.play();
      }
    }
  }

  mountHandler =  mount => {
    if ( !this.mount && mount ) {
      this.mount = mount;
      this.initWebGL();
    }
  }

  videoHandler =  video => {
    if ( !this.video && video ) {
      this.video = video;
      this.initWebGL();
    }
  }

  initWebGL = () => {
    if ( this.video && this.mount ) {
      const { anchor } = this.props;
      this.WebGLHandler = new WebGLHandler(this.mount, this.video, anchor);

      const hash = window.location.hash?.replace('#','')

      // Check if first section, start animation if it is
      if ( !hash || hash === anchor ) {
        this.reveal();
      }
    }
  }

  refHandler = ref => {
    if ( !this.ref && ref ) {
      this.ref = ref
      const { anchor, refCallback } = this.props
      refCallback(anchor, ref)
    }
  }

  handleSectionScroll = e => {
    if ( this.video && this.mount ) {
      const { anchor } = this.props
      const destination = e.anchor

      // Start animation if target section is this section
      if ( destination === anchor ) {
        this.reveal();

      // Pause animation if target section is another section
      } else {
        this.WebGLHandler.pauseAnimation(anchor);
      }
    }
  }

  reveal = () => {
    this.WebGLHandler.startAnimation();
    if ( !this.state.visbile ) {
      this.revealDelay = setTimeout(() => {
        this.setState({
          visbile: true
        })
      }, this.state.revealDelay)
    }
  }

  render () {
    return (
      <IntroContainer ref={(ref) => this.refHandler(ref)} fullWidth={true}>
        <IntroRow>
        
          <MountCol col={12} md={6}>
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              src={VideoSrc}
              style={{opacity: 0}}
              ref={(video) => this.videoHandler(video)}
            />
            <div className="mount" ref={(mount) => this.mountHandler(mount)} />
          </MountCol>
          <ContentCol col={12} md={6}>
            <TextReveal 
              reveal={this.state.visbile}
              title="<span>Hej</span>"
              paragraphs={[
                "Mitt namn är Anton Pedersen.",
                "Jag är en social Front-end-utvecklare",
                "med erfarenhet av båda stora och ",
                "små projekt. Baserad i Göteborg.",
              ]}
            />
          </ContentCol>

        </IntroRow>
      </IntroContainer>
    )
  }  
}

export default SectionIntro