import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/core'
import ReactFullpage from '@fullpage/react-fullpage'
import SectionIntro from './Intro/SectionIntro'
import SectionAbout from './About/SectionAbout'
import SectionCases from './Cases/SectionCases'
import { theme } from '../Layout/Theme'
import ContactNav from '../UI/ContactNav'


/*==============================================================================
  # Styles
==============================================================================*/

const nMainDelay = 1500
const nDelay = 250
const nDuration = 300

const navWait = keyframes`
  0%, 100% {
    opacity: 0;
    transform-origin: top center;
    transform: scaleY(0)
  }
`

const navReveal = keyframes`
  0% {
    opacity: 0;
    transform-origin: top center;
    transform: scaleY(0)
  }
  100% {
    opacity: 1;
    transform-origin: top center;
    transform: scaleY(1)
  }
`

const CustomNav = styled('div')`
  position: absolute !important;
  top: 50% !important;
  right: 25px !important;
  transform: translate( -50%, -50% ) translateZ(0px) !important;
  z-index: 9999 !important;

  ul {

    li {
      width: 1px !important;
      height: 50px !important;
      margin: 0px 0px 12px 0px!important;

      &:last-of-type {
        margin-bottom: 0px !important;
      }

      a {
        background: ${theme.colors.textInactive} !important;
        transition: ${theme.easings.secondary};

        &.active {
          background-color: ${theme.colors.text} !important;
        }

        &:hover {
          background-color: ${theme.colors.textActive} !important;
        }
      }

      //Loop out delay for reveal animation
      ${[...Array(4)].map((item, i) => css`
        &:nth-of-type(${i+1}){
          animation: ${navWait} ${i * nDelay + nMainDelay}ms linear 0ms,
                     ${navReveal} ${nDuration}ms ${theme.easings.primary} ${i * nDelay + nMainDelay}ms;
        }
      `)}
    }
  }
`


/*==============================================================================
  # Component
==============================================================================*/

const CustomReactFullpageNav = ({ sections, activeSection }) => {

  return sections ? (
    <CustomNav id="fp-nav">
      <ul>
        {sections.map((section, i) => {

          let isActive = activeSection === section.anchor ? true : false;
            
          return (
            <li key={i}>
              <a 
                href={`#${section.anchor}`} 
                className={isActive ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  if ( typeof window !== 'undefined' && window.fullpage_api) {
                    window.fullpage_api.moveTo(i)
                  }
                }}
              >
                <span className="fp-sr-only" />
              </a>
            </li>
          )
        })}
      </ul>
    </CustomNav>
  ) : null
}

class SectionBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: 'intro',
      destination: null,
      origin: null,
      fullpages: [
        {
          anchor: 'intro',
          section: SectionIntro
        },
        {
          anchor: 'about',
          section: SectionAbout
        },
        {
          anchor: 'cases',
          section: SectionCases
        },
        {
          anchor: 'contact',
          section: null
        }
      ],
    };
  }

  componentDidMount() {
    window.sectionScroll = new CustomEvent('sectionScroll', { 
      detail:   "Triggers when fullpage.js changes section",
      bubbles:   true
    })
  }

  onLeave(origin, destination, direction) {

    if ( window.sectionScroll ) {   
      window.sectionScroll.origin = origin
      window.sectionScroll.destination = destination
      window.sectionScroll.direction = direction
      window.dispatchEvent( window.sectionScroll )
    }

    this.setState({
      activeSection: destination.anchor,
      destination: destination,
      origin: origin
    })
  }

  render() {
    const { fullpages, activeSection } = this.state;

    if (!fullpages.length) {
      return null;
    }

    const SEL = 'fullpage-section';
    const SECTION_SEL = `.${SEL}`;

    return (
      <Fragment>
        <CustomReactFullpageNav 
          sections={fullpages}
          activeSection={activeSection}
        />
        <ReactFullpage
          licenseKey={'D154C10D-26774ED9-98FB51F3-DDE248C0'}
          anchors={fullpages.map(item => item.anchor)}
          sectionSelector={SECTION_SEL}
          scrollingSpeed = {1000}
          onLeave={this.onLeave.bind(this)}

          render={comp => (
            <ReactFullpage.Wrapper>
              {fullpages.map((item) => {

                const Section = item.section

                return (
                  <div key={item.anchor} className={SEL}>
                    {Section && <Section anchor={item.anchor} activeSection={activeSection} />}
                  </div>
                )
              })}
            </ReactFullpage.Wrapper>
          )}
        />
        <ContactNav className={activeSection === 'contact' ? 'focus' : ''} />
      </Fragment>
    );
  }
}

//Export
export default SectionBase