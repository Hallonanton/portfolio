import React, { Component } from 'react'
import styled from '@emotion/styled'
import { SectionContainer } from '../../UI/Grid'


/*==============================================================================
  # Styles
==============================================================================*/

const ContactContainer = styled(SectionContainer)`
  height: 100vh;
`


/*==============================================================================
  # Component
==============================================================================*/

class SectionContact extends Component {

  refHandler = ref => {
    if ( !this.ref && ref ) {
      this.ref = ref
      const { anchor, refCallback } = this.props
      refCallback(anchor, ref)
    }
  }

  render() {
    return (
      <ContactContainer ref={(ref) => this.refHandler(ref)} />
    )
  }
}

export default SectionContact
