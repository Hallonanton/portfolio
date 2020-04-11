import React, { Component } from 'react'
import styled from '@emotion/styled'
import { SectionContainer, Row, Col } from '../../UI/Grid'
import TextReveal from '../../UI/TextReveal'
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
  height: 100%;

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

  refHandler =  mount => {

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

  handleSectionScroll = e => {

    const { anchor } = this.props
    const destination = e.destination.anchor

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
      <SectionContainer>
        <IntroRow>
        
          <MountCol col={6}>
            <div className="mount" ref={(mount) => this.refHandler(mount)} />
          </MountCol>

          <ContentCol col={6}>
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