import React, { Component } from 'react'
import styled from '@emotion/styled'
import Case from './Case'
import { getNodeIndex } from '../../../utility/functions'


/*==============================================================================
  # Styles
==============================================================================*/

const CasesWrapper = styled('div')`
  width: 100vw;
  height: 100vh;
  padding: 90px;
`

const CasesList = styled('ul')`
  position: relative;
  width: 100%;
  height: 100%;
`

const StyledCase = styled(Case)`
  position: absolute;
  z-index: 1;

  &:nth-of-type(1) {
    top: 0;
    left: 0;
  }

  &:nth-of-type(2) {
    top: 0;
    left: calc(50% + 30px);
  }

  &:nth-of-type(3) {
    top: calc(50% + 30px);
    left: 0;
  }

  &:nth-of-type(4) {
    top: calc(50% + 30px);
    left: calc(50% + 30px);
  }

  /*&.active {
    z-index: 2;
    top: 0;
    left: 0;
    max-width: 100%;
    max-height: 100%;
  }*/
`


/*==============================================================================
  # Component
==============================================================================*/

const cases = [
	{
		'title': 'Oas',
		'tags': ['React', 'Wordpress', 'GatsbyJS' ,'Three.js'],
    'url': 'https://www.oas.nu/'
	},
	{
		'title': 'Svenska Hem',
		'tags': ['React', 'E-handel'],
    'url': 'https://www.svenskahem.se/'
	},
	{
		'title': 'Nybergsbil',
		'tags': ['Wordpress', 'PHP'],
    'url': 'https://nybergsbil.se/'
	},
	{
		'title': 'Västerhuset',
		'tags': ['Vue', 'NuxtJS', 'Wordpress'],
    'url': 'http://vasterhuset.se/'
	}
]

class SectionCases extends Component {

  componentDidMount() {
    window.addEventListener('sectionScroll', this.handleSectionScroll);
  }

  componentWillUnmount() {
    this.ref.removeEventListener('click', this.handleClick);
    window.removeEventListener('sectionScroll', this.handleSectionScroll);
    clearTimeout(this.revealDelay);
  }

  state = {
    activeCase: null,
    visbile: false,
    revealDelay: 400,
    revealed: []
  }

  refHandler = ref => {
    if ( !this.ref ) {
      this.ref = ref
      this.ref.addEventListener('click', this.handleClick);
      
      const { anchor } = this.props
      const hash = window.location.hash?.replace('#','')

      // Check if first section, start animation if it is
      if ( !this.state.visbile && hash === anchor ) {
        this.setState({
          visbile: true
        }, () => this.reveal(0))
      }
    }
  }

  handleSectionScroll = e => {

    const { anchor } = this.props
    const destination = e.destination.anchor

    // Trigger reveal animation on first focus
    if ( destination === anchor ) {
      
      if ( !this.state.visbile ) {
        this.setState({
          visbile: true
        }, () => this.reveal(0))
      }

    // Close active cases 
    } else {
      this.clearActive();
    }
  }

  handleClick = e => {
    const li = e.target.closest('li');
    if ( li ) {
      if ( !e.target.classList.contains('close') ) {
        const index = getNodeIndex(li);

        this.setState({
          activeCase: index
        })
      }
    } else {
      this.clearActive()
    }
  }

  clearActive = () => {
    this.setState({
      activeCase: null
    })
  }

  reveal = i => {
    let { revealed, revealDelay } = this.state
    if ( !revealed.includes(i) && i < cases.length ) {
      revealed.push(i);
      console.log( i )
      this.setState({
        revealed: revealed
      }, () => {
        this.revealDelay = setTimeout(() => {
          i += 1
          this.reveal(i)
        }, revealDelay)
      })
    }
  }

  render() {
    return (
      <CasesWrapper ref={(ref) => this.refHandler(ref)}>
        <CasesList>
          {cases.map((item, i) => {
             
            const { activeCase, revealed } = this.state
            let classes = activeCase === i ? 'active' : ''
            classes += revealed.includes(i) ? ' reveal' : ''

            return (
              <StyledCase 
                key={i}
                className={classes}
                onClick={e => this.handleClick(e)}
                clearActive={() => this.clearActive()}
                index={i}
                {...item}
              />
            )
          })}
        </CasesList>
      </CasesWrapper>
    )
  }
}

export default SectionCases
