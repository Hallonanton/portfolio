import React, { Component } from 'react';
import ReactFullpage from '@fullpage/react-fullpage'
import SectionIntro from './Intro/SectionIntro'

/*==============================================================================
  # Component
==============================================================================*/

const SEL = 'fullpage-section';
const SECTION_SEL = `.${SEL}`;

class SectionBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    //console.log('onLeave', { origin, destination, direction });
    // arguments are mapped in order of fullpage.js callback arguments do something
    // with the event
  }

  moveSectionDown() {
    window.fullpage_api.moveSectionDown();
  }

  render() {
    const { fullpages } = this.state;

    if (!fullpages.length) {
      return null;
    }

    return (
      <ReactFullpage
        debug
        licenseKey={'D154C10D-26774ED9-98FB51F3-DDE248C0'}
        navigation
        anchors={fullpages.map(item => item.anchor)}
        sectionSelector={SECTION_SEL}
        onLeave={this.onLeave.bind(this)}

        render={comp => (
          <ReactFullpage.Wrapper>
            {fullpages.map((item) => (
              <div key={item.anchor} className={SEL}>
                <h1>{item.section}</h1>
              </div>
            ))}
          </ReactFullpage.Wrapper>
        )}
      />
    );
  }
}

//Export
export default SectionBase