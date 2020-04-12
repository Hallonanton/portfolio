import React, { Component } from 'react'
import styled from '@emotion/styled'
import { SectionContainer, Row, Col } from '../../UI/Grid'
import TextReveal from '../../UI/TextReveal'
import { theme } from '../../Layout/Theme'
import WebGLHandler from '../../WebGL/WebglHandler'
import VideoSrc from '../../../assets/video/test-face-150.mp4'


/*==============================================================================
  # Styles
==============================================================================*/

const IntroRow = styled(Row)`
  height: 100%;
  align-items: center;
`

const MountCol = styled(Col)`
  position: relative;
  padding-bottom: 66.66%;

  ${theme.above.md} {
    height: 100%;
    padding-bottom: 0;
  }

  .mount {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`

const ContentCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
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
    clearTimeout(this.revealDelay);
  }

  state = {
    visbile: false,
    revealDelay: 1000
  }

  mountHandler =  mount => {
    if ( !this.mount && mount ) {
      this.mount = mount;
      const { anchor } = this.props;
      this.WebGLHandler = new WebGLHandler(mount, VideoSrc, anchor);

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
      <SectionContainer ref={(ref) => this.refHandler(ref)}>
        <IntroRow>
        
          <MountCol col={12} md={6}>
            <div className="mount" ref={(mount) => this.mountHandler(mount)} />
          </MountCol>
          
          <ContentCol col={12} md={6}>
            <TextReveal 
              reveal={this.state.visbile}
              title="<span>Hej.</span>"
              paragraphs={[
                "Mitt namn är Anton Pedersen.",
                "Jag är en social Front-end utvecklare",
                "som kodar och designar hemsidor.",
                "Baserad i Göteborg.",
              ]}
            />
          </ContentCol>

        </IntroRow>
      </SectionContainer>
    )
  }  
}

export default SectionIntro