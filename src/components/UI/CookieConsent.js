import React, { Component } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
import { theme } from '../Layout/Theme'
import { setCookie, getCookie } from '../../utility/functions'

/*==============================================================================
  # Styles
==============================================================================*/

const cDelay = 1500
const cDuration = 300

const consentWait = keyframes`
  0%, 100% {
    opacity: 0;
  }
`

const consentReveal = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const ConsentWrapper = styled('div')`
  position: fixed;
  bottom: 5px;
  left: 30px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 4px;
  color: ${theme.colors.text};
  background: #222222;
  ${theme.fontSizes.description}
  box-shadow: 0px 0px 5px 0px rgba(34,34,34,0.75);
  transition: all 250ms ease;

  animation: ${consentWait} ${cDelay}ms linear 0ms,
             ${consentReveal} ${cDuration}ms ${theme.easings.primary} ${cDelay}ms;

  ${theme.above.md} {
    bottom: 8px;
    left: 45px;
  }

  ${theme.above.xxl} {
    bottom: 20px;
    left: 80px;
  }

  &.hide {
    opacity: 0;
    transform: translateX(15px);
    visibility: hidden;
  }

  button {
    margin-left: 15px;
    border-radius: 4px;
    padding: 5px 10px;
    color: ${theme.colors.text};
    background-color: #111111;
    cursor: pointer;
    ${theme.fontSizes.description}
    transition: all 250ms ease;
    border: none;
    box-shadow: none;
    outline: none;

    &:hover {
      background-color: #010101;
    }
  }
`


/*==============================================================================
  # Component
==============================================================================*/

class CookieConsent extends Component {

  state = {
    visible: true
  }

  handleClick = () => {
    setCookie('cookieApproved', true, 365)
    this.setState({
      visible: false
    })
  }

  render () {

    const { visible } = this.state
    const approved = getCookie('cookieApproved')

    return !approved ? (
      <ConsentWrapper className={!visible ? 'hide' : ''}>
        <p>Denna sidan använder sig av cookies.</p>
        <button onClick={this.handleClick}>Okej 👍</button>
      </ConsentWrapper>
    ) : null
  }
}

export default CookieConsent


