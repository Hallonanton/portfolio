import React from 'react'
import Tilt from 'react-tilt'
import styled from '@emotion/styled'
import SiteMetadata from './SiteMetadata'
import Theme, { theme } from './Theme'


/*==============================================================================
  # Styles
==============================================================================*/

const Main = styled('main')`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;

  .mainTitle {
    position: absolute;
    bottom: 45px;
    left: 25px;
    text-transform: uppercase;
    transform-origin: center left;
    transform: rotate(-90deg);
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
    top: 50%;
    left: 50%;
    width: 100%;
    height: 1px;
    background-color: ${theme.colors.textActive};
  }

  &::before {
    transform: translate(-50%, -50%);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(90deg);
  }

  &.top {
    top: 15px;
  }

  &.bottom {
    bottom: 15px;
  }

  &.left {
    left: 15px;
  }

  &.right {
    right: 15px;
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
        max : 3,
        perspective: 1000,
        scale: 1.0
      }}>
        <Main>
          {children}
          <h1 className="mainTitle small-heading">{title}</h1>
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