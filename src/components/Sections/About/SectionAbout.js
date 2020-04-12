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

const AboutRow = styled(Row)`
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
      <SectionContainer>
        <AboutRow>

          <ContentCol col={12} md={6}>
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
          </ContentCol>

          <MountCol col={12} md={6}>
            <div className="mount" ref={(mount) => this.refHandler(mount)} />
          </MountCol>

        </AboutRow>
      </SectionContainer>
    )
  }  
}

export default SectionAbout