import React, { Component } from 'react'
import styled from '@emotion/styled'
import TextReveal from '../../UI/TextReveal'
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
  position: absolute;
  top: 0;
  left: 75%;
  width: 50%;
  height: 100%;
  transform: translateX(-50%);
`

const Content = styled('div')`
  position: absolute;
  top: 50%;
  left: 33.33%;
  width: 50%;
  max-width: 300px;
  transform: translate(-50%,-50%);
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
      if ( hash === anchor ) {
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
      <AboutWrapper>
        <Mount ref={(mount) => this.refHandler(mount)} />
        <Content>
          <TextReveal 
            reveal={this.state.visbile}
            title="Kunskap"
            size="hero"
            paragraphs={[
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non auctor diam. Donec imperdiet, enim sit amet tincidunt vehicula.",
              "Massa purus elementum ex, a lobortis ex turpis sit amet turpis. Suspendisse non porttitor arcu.",
              "Nullam maximus ut ex id finibus. Quisque id accumsan ligula, eget fringilla dui. Curabitur semper ante quis efficitur pharetra.",
              "Pellentesque eros tortor, finibus vitae consequat nec, faucibus et sapien."
            ]}
          />
        </Content>
      </AboutWrapper>
    )
  }  
}

export default SectionAbout