import React, { Component } from 'react'
import styled from '@emotion/styled'
import Case from './Case'
import { SectionContainer } from '../../UI/Grid'
import { theme } from '../../Layout/Theme'


/*==============================================================================
  # Styles
==============================================================================*/

const CasesList = styled('ul')`
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  ${theme.above.md} {
    height: 100%;
  }
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
    window.removeEventListener('sectionScroll', this.handleSectionScroll);
    clearTimeout(this.revealDelay);
  }

  state = {
    visbile: false,
    revealDelay: 400,
    revealed: []
  }

  refHandler = ref => {
    if ( ref && !this.ref ) {
      this.ref = ref

      const { refCallback, anchor } = this.props

      refCallback(anchor, ref)

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
    const destination = e.anchor

    // Trigger reveal animation on first focus
    if ( destination === anchor ) {
      
      if ( !this.state.visbile ) {
        this.setState({
          visbile: true
        }, () => this.reveal(0))
      }
    }
  }

  reveal = i => {
    let { revealed, revealDelay } = this.state
    if ( !revealed.includes(i) && i < cases.length ) {
      revealed.push(i);
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
      <SectionContainer ref={(ref) => this.refHandler(ref)}>
        <CasesList>
          {cases.map((item, i) => {
             
            const { revealed } = this.state
            const classes = revealed.includes(i) ? ' reveal' : ''

            return (
              <Case 
                key={i}
                className={classes}
                index={i}
                {...item}
              />
            )
          })}
        </CasesList>
      </SectionContainer>
    )
  }
}

export default SectionCases
