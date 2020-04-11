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
  left: 30%;
  width: 50%;
  max-width: 400px;
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
            title="<span>Nogrann och</span><span>tillmötesgående</span>"
            size="hero"
            paragraphs={[
              "En bra hemsida för mig är en sida som är logisk och tydligt uppbyggd men samtidigt vacker och levande att utforska.",
              "Att försöka skapa sådana sidor är vad jag älskar med att utveckla."
            ]}
            tagTitle="Erfarenheter"
            tags={[
              'React',
              'Gatsby.js',
              'Wordpress',
              'PHP'
            ]}
            secondaryTags={[
              'Docker',
              'Git',
              'Netlify',
              'Webpack',
              'Node.js',
              'npm/yarn/bower',
              'jQuery',
              'Bootstrap',
              'Vue.js',
              'Styled-components',
              'Emotion',
              'SASS/LESS',
              'GraphQL',
              'MySQL',
              'Three.js',
              'ACF',
              'Woocommerce',
              'E-handel',
              'SEO',
              'UX/UI',
              'Illustrator',
              'Photoshop'
            ]}
          />
        </Content>
      </AboutWrapper>
    )
  }  
}

export default SectionAbout