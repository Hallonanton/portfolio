import React from 'react';
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/core'
import { theme } from '../Layout/Theme'

/*==============================================================================
  # Styles
==============================================================================*/

const nMainDelay = 1500
const nDelay = 250
const nDuration = 300

const navWait = keyframes`
  0%, 100% {
    opacity: 0;
    transform-origin: top center;
    transform: scaleY(0)
  }
`

const navReveal = keyframes`
  0% {
    opacity: 0;
    transform-origin: top center;
    transform: scaleY(0)
  }
  100% {
    opacity: 1;
    transform-origin: top center;
    transform: scaleY(1)
  }
`

const CustomNav = styled('div')`
  display: none;
  position: absolute !important;
  top: 50% !important;
  right: 25px !important;
  transform: translate( -50%, -50% ) translateZ(0px) !important;
  z-index: 9999 !important;

  ${theme.above.md} {
    display: block;
  }

  ul {

    li {
      width: 1px !important;
      height: 50px !important;
      margin: 0px 0px 12px 0px!important;

      &:last-of-type {
        margin-bottom: 0px !important;
      }

      a {
        background: ${theme.colors.textInactive} !important;
        transition: ${theme.easings.secondary};

        &.active {
          background-color: ${theme.colors.text} !important;
        }

        &:hover {
          background-color: ${theme.colors.textActive} !important;
        }
      }

      //Loop out delay for reveal animation
      ${[...Array(4)].map((item, i) => css`
        &:nth-of-type(${i+1}){
          animation: ${navWait} ${i * nDelay + nMainDelay}ms linear 0ms,
                     ${navReveal} ${nDuration}ms ${theme.easings.primary} ${i * nDelay + nMainDelay}ms;
        }
      `)}
    }
  }
`

/*==============================================================================
  # Component
==============================================================================*/

const CustomFullpageNav = ({ sections, activeSection }) => {

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
                <span className="fp-sr-only" />
              </a>
            </li>
          )
        })}
      </ul>
    </CustomNav>
  ) : null
}

export default CustomFullpageNav