import React, { Component, Fragment } from 'react'
//import Tilt from 'react-tilt'
import * as VanillaTilt from 'vanilla-tilt';
import { Media } from 'react-breakpoints'
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
  position: relative;

  ${theme.above.md} {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .mainTitle {
    position: fixed;
    bottom: 25px;
    left: 15px;
    color: ${theme.colors.textInactive};
    ${theme.fontSizes.description}
    font-weight: 200;
    font-family: ${theme.fonts.primary};
    text-transform: uppercase;
    transform-origin: center left;
    transform: rotate(-90deg);

    ${theme.above.md} {
      position: absolute;
      bottom: 45px;
      left: 25px;
      ${theme.fontSizes.regular}
    }

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
  position: fixed;
  display: block;
  width: 10px; 
  height: 10px; 

  ${theme.above.md} {
    position: absolute;
    width: 20px; 
    height: 20px; 
  }

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
    top: 10px;

    ${theme.above.md} {
      top: 15px;
    }

    &::after {
      top: 0px;
      transform-origin: left top;
      transform: translateX(0.5px) rotate(90deg);
    }
  }

  &.bottom {
    bottom: 10px;

    ${theme.above.md} {
      bottom: 15px;
    }

    &::after {
      bottom: 0px;
      transform-origin: left bottom;
      transform: translateX(0.5px) rotate(-90deg);
    }
  }

  &.left {
    left: 10px;

    ${theme.above.md} {
      left: 15px;
    }

    &::before {
      left: 0px
    }
  }

  &.right {
    right: 10px;

    ${theme.above.md} {
      right: 15px;
    }

     &::before {
      right: 0px
    }
  }
`



/*==============================================================================
  # Component
==============================================================================*/

/*const TiltWrapper = ({ children }) => (
  <Media>
    {({ breakpoints, currentBreakpoint }) => 
      breakpoints[currentBreakpoint] < breakpoints.md ? (
        <Fragment>
          {children}
        </Fragment>
      ) : (
        <Tilt className="Tilt" options={{ 
          max : 2,
          perspective: 1000,
          scale: 1.0
        }}>
          {children}
        </Tilt>
      )
    }
  </Media>
)*/

class TemplateWrapper extends Component {

  componentDidMount(){
    VanillaTilt.init(this.rootNode, {
      max: 2,
      speed: 400,
      glare: false,
      perspective: 2000,
      reverse: false
    });
  }

  render () {
    const { children } = this.props
    const title = "Anton Pedersen"
    return (
      <Theme>
        <SiteMetadata />
        <div className="tilt-root" ref={node => (this.rootNode = node)}>
          <Main>
            <h1 className="mainTitle">{title.split('').map((character, i) => <span key={i}>{character}</span>)}</h1>
            {children}
            <FrameMarker className="top left" />
            <FrameMarker className="top right" />
            <FrameMarker className="bottom left" />
            <FrameMarker className="bottom right" />
          </Main>
        </div>
      </Theme>
    )
  }
}

export default TemplateWrapper