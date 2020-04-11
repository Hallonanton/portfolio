import React from 'react'
import Tilt from 'react-tilt'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/core'
import SiteMetadata from './SiteMetadata'
import Theme, { theme } from './Theme'


/*==============================================================================
  # Styles
==============================================================================*/

const fmDelay = 1000
const fmDuration = 1000
const cMainDelay = fmDelay + fmDuration
const cDelay = 150
const cDuration = 250


const characterWait = keyframes`
  0%, 100% {
    opacity: 0;
    transform: translateX(8px)
  }
`

const characterReveal = keyframes`
  0% {
    opacity: 0;
    transform: translateX(8px)
  }
  100% {
    opacity: 1;
    transform: translateX(0px)
  }
`

const Main = styled('main')`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;

  .mainTitle {
    position: absolute;
    bottom: 45px;
    left: 25px;
    color: ${theme.colors.textInactive};
    font-weight: 200;
    font-family: ${theme.fonts.primary};
    text-transform: uppercase;
    transform-origin: center left;
    transform: rotate(-90deg);

    span {
      display: inline-block;
      min-width: 4px;
      margin-left: 1px;
    
      //Loop out delay for reveal animation
      ${[...Array(40)].map((item, i) => css`
        &:nth-of-type(${i+1}){
          animation: ${characterWait} ${i * cDelay + cMainDelay}ms linear 0ms,
                     ${characterReveal} ${cDuration}ms ${theme.easings.primary} ${i * cDelay + cMainDelay}ms;
        }
      `)}
    }
  }
`

const maxWidthWait = keyframes`
  0%, 100% {
    max-width: 0%;
  }
`

const maxWidthReveal = keyframes`
  0% {
    max-width: 0%;
  }
  100% {
    max-width: 100%;
  }
`

const FrameMarker = styled('span')`
  position: absolute;
  display: block;
  width: 20px; 
  height: 20px; 

  &::before,
  &:after {
    display: block;
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: ${theme.colors.textInactive};
    animation: ${maxWidthWait} ${fmDelay}ms linear 0ms,
               ${maxWidthReveal} ${fmDuration}ms ${theme.easings.primary} ${fmDelay}ms;
  }

  &::before {
    top: 50%;
  }

  &::after {
    left: 50%;
  }

  &.top {
    top: 15px;

    &::after {
      top: 0px;
      transform-origin: left top;
      transform: translateX(0.5px) rotate(90deg);
    }
  }

  &.bottom {
    bottom: 15px;

    &::after {
      bottom: 0px;
      transform-origin: left bottom;
      transform: translateX(0.5px) rotate(-90deg);
    }
  }

  &.left {
    left: 15px;

    &::before {
      left: 0px
    }
  }

  &.right {
    right: 15px;

     &::before {
      right: 0px
    }
  }
`



/*==============================================================================
  # Component
==============================================================================*/

const TemplateWrapper = ({children}) => {

  const title = "Anton Pedersen"

  return (
    <Theme>
      <SiteMetadata />
      <Tilt className="Tilt" options={{ 
        max : 2,
        perspective: 1000,
        scale: 1.0
      }}>
        <Main>
          <h1 className="mainTitle regular">{title.split('').map((character, i) => <span key={i}>{character}</span>)}</h1>
          {children}
          <FrameMarker className="top left" />
          <FrameMarker className="top right" />
          <FrameMarker className="bottom left" />
          <FrameMarker className="bottom right" />
        </Main>
      </Tilt>
    </Theme>
  )
}


export default TemplateWrapper