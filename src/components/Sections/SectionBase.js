import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled'
import ReactFullpage from '@fullpage/react-fullpage'
import SectionIntro from './Intro/SectionIntro'
import { theme } from '../Layout/Theme'

/*==============================================================================
  # Styles
==============================================================================*/

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
      
      ${theme.above.xl} {
        height: 60px !important;
      }

      ${theme.above.xxl} {
        height: 80px !important;
      }

      a {
        background: ${theme.colors.textInactive} !important;
        transition: ${theme.easings.secondary};

        &:hover,
        &.active {
          background-color: ${theme.colors.textActive} !important;
        }
      }
    }
  }
`


/*==============================================================================
  # Component
==============================================================================*/

const SEL = 'fullpage-section';
const SECTION_SEL = `.${SEL}`;

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
                <span className="fp-sr-only">{section.anchor}</span>
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
      fullpages: [
        {
          anchor: 'intro',
          section: <SectionIntro />
        },
        {
          anchor: 'knowledge',
          section: null
        },
        {
          anchor: 'cases',
          section: null
        },
        {
          anchor: 'contact',
          section: null
        }
      ],
    };
  }

  onLeave(origin, destination, direction) {
    this.setState({
      activeSection: destination.anchor
    })
  }

  moveSectionDown() {
    if ( typeof window !== 'undefined' && window.fullpage_api) {
      window.fullpage_api.moveSectionDown();
    }
  }

  render() {
    const { fullpages, activeSection } = this.state;

    if (!fullpages.length) {
      return null;
    }

    return (
      <Fragment>
        <CustomReactFullpageNav 
          sections={fullpages}
          activeSection={activeSection}
        />
        <ReactFullpage
          debug
          licenseKey={'D154C10D-26774ED9-98FB51F3-DDE248C0'}
          anchors={fullpages.map(item => item.anchor)}
          sectionSelector={SECTION_SEL}
          onLeave={this.onLeave.bind(this)}

          render={comp => (
            <ReactFullpage.Wrapper>
              {fullpages.map((item) => (
                <div key={item.anchor} className={SEL}>
                  {item.section}
                </div>
              ))}
            </ReactFullpage.Wrapper>
          )}
        />
      </Fragment>
    );
  }
}

//Export
export default SectionBase