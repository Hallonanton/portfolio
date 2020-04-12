import React, { Component, Fragment } from 'react';
import { Media } from 'react-breakpoints'
import ReactFullpage from '@fullpage/react-fullpage'
import CustomFullpageNav from './CustomFullpageNav'
import SectionIntro from './Intro/SectionIntro'
import SectionAbout from './About/SectionAbout'
import SectionCases from './Cases/SectionCases'
import SectionContact from './Contact/SectionContact'
import ContactNav from '../UI/ContactNav'
import { sectionVisibilty } from '../../utility/functions'


/*==============================================================================
  # Component
==============================================================================*/

const FullpageWrapper = ({ refCallback, sections, activeSection, sectionClass, onLeave }) => (
  <Media>
    {({ breakpoints, currentBreakpoint }) => 
      breakpoints[currentBreakpoint] < breakpoints.md ? (
        <Fragment>
          {sections.map((item) => {
            const Section = item.section
            return (
              <div key={item.anchor} className={sectionClass}>
                {Section && 
                  <Section 
                    anchor={item.anchor}
                    activeSection={activeSection} 
                    refCallback={refCallback}
                  />
                }
              </div>
            )
          })}
        </Fragment>
      ) : (
        <ReactFullpage
          licenseKey={'D154C10D-26774ED9-98FB51F3-DDE248C0'}
          anchors={sections.map(item => item.anchor)}
          sectionSelector={`.${sectionClass}`}
          scrollingSpeed = {1000}
          onLeave={onLeave}

          render={comp => (
            <ReactFullpage.Wrapper>
              {sections.map((item) => {
                const Section = item.section
                return (
                  <div key={item.anchor} className={sectionClass}>
                    {Section && 
                      <Section 
                        anchor={item.anchor}
                        activeSection={activeSection} 
                        refCallback={refCallback}
                      />
                    }
                  </div>
                )
              })}
            </ReactFullpage.Wrapper>
          )}
        />
      )
    }
  </Media>
)

class SectionBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: 'intro',
      sections: [
        {
          anchor: 'intro',
          section: SectionIntro,
          ref: null
        },
        /*{
          anchor: 'about',
          section: SectionAbout,
          ref: null
        },*/
        {
          anchor: 'cases',
          section: SectionCases,
          ref: null
        },
        {
          anchor: 'contact',
          section: SectionContact,
          ref: null
        }
      ],
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    window.sectionScroll = new CustomEvent('sectionScroll', { 
      detail:   "Triggers when fullpage.js changes section",
      bubbles:   true
    })
  }

  handleScroll = (e) => {
    let { activeSection, sections } = this.state
    let newActiveSection = {
      anchor: activeSection,
      percentage: 0
    }
    sections = sections.map(section => {
      const sectionData = sectionVisibilty(section.ref);
      section.percentage = sectionData.percentage
      return section
    })

    sections.forEach(section => {
      if ( section.percentage > newActiveSection.percentage ) {
        newActiveSection = section
      }
    })

    if ( newActiveSection.anchor !== activeSection ) {

      if ( window.sectionScroll ) {   
        window.sectionScroll.anchor = newActiveSection.anchor
        window.dispatchEvent( window.sectionScroll )
      }

      this.setState({
        activeSection: newActiveSection.anchor
      })
    }
  }

  onLeave = (origin, destination, direction) => {

    if ( window.sectionScroll ) {   
      window.sectionScroll.origin = origin
      window.sectionScroll.destination = destination
      window.sectionScroll.direction = direction
      window.sectionScroll.anchor = destination.anchor
      window.dispatchEvent( window.sectionScroll )
    }

    this.setState({
      activeSection: destination.anchor
    })
  }

  refCallback = (anchor, ref) => {
    let { sections } = this.state

    sections.map(section => {
      if ( section.anchor === anchor ) {
        section.ref = ref
      }
      return section
    })

    this.setState({
      sections: sections
    })
  }

  render() {
    const { sections, activeSection } = this.state

    if (!sections.length) {
      return null;
    }

    const sectionClass = 'fullpage-section';

    return (
      <Fragment>
        <CustomFullpageNav 
          sections={sections}
          activeSection={activeSection}
        />
        <FullpageWrapper
          sections={sections}
          sectionClass={sectionClass}
          activeSection={activeSection}
          refCallback={this.refCallback}
          onLeave={this.onLeave.bind(this)}
        />
        <ContactNav className={activeSection === 'contact' ? 'focus' : ''} />
      </Fragment>
    );
  }
}

//Export
export default SectionBase