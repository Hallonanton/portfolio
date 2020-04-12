import React from 'react'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/core'
import { theme } from '../Layout/Theme'
import Mail from '../../assets/icons/envelope.svg'
import LinkedIn from '../../assets/icons/linkedin.svg'
import Codepen from '../../assets/icons/codepen.svg'
import Github from '../../assets/icons/github.svg'

/*==============================================================================
  # Styles
==============================================================================*/

const nMainDelay = 1500
const nDelay = 250
const nDuration = 300

const navWait = keyframes`
  0%, 100% {
    opacity: 0;
    transform: translateX(-10px)
  }
`

const navReveal = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-10px)
  }
  100% {
    opacity: 1;
    transform: translateX(0px)
  }
`
const rDelay = 800
const rDuration = 1000

const reveal = keyframes`
  0% {
    transform: translate(-50%, -5px) scale3d(0,1,1);
    transform-origin: 0% 50%;
  }
  40% {
    transform: translate(-50%, -5px) scale3d(1,1,1);
    transform-origin: 0% 50%;
  }
  60% {
    transform: translate(-50%, -5px) scale3d(1,1,1);
    transform-origin: 100% 50%;
  }
  100% {
    transform: translate(-50%, -5px) scale3d(0,1,1);
    transform-origin: 100% 50%;
  }
`

const NavigationList = styled('ul')`
  position: fixed;
  bottom: 0px;
  right: 25px;
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  flex-grow: 1;
  flex-basis: 0;
  align-items: center;
  transition: all 1000ms ${theme.easings.easeOutQuint};

  ${theme.above.md} {
    position: absolute;
    bottom: 7px;
    right: 50px;
  }

  &::before,
  &::after {
    display: block;
    content: "";
    position: absolute;
    left: 50%;
    bottom: 100%;
    width: 223px;
    height: 40px;
  }

  &::before {
    display: block;
    content: "Nyfiken på mer?";
    color: ${theme.colors.text};
    ${theme.fontSizes.hero}
    font-family: ${theme.fonts.heading};
    font-weight: 900;
    white-space: nowrap;
    opacity: 0;
    transform-origin: top center;
    transition: all 750ms ${theme.easings.easeOutQuint};
    transform: translate(-50%, -5px) scale(0.5);
    z-index: 1;
  }

  &::after {
    background-color: ${theme.colors.textActive};
    transform: translate(-50%, -5px) scale3d(0,1,1);
    transform-origin: 0% 50%;
    z-index: 2;
  }

  &.focus {
    max-width: calc( 100% - 60px );
    bottom: 50%;
    right: 50%;
    transform: translate(50%, 50%);
    transition: all 1000ms ${theme.easings.easeOutSine};

    &::before {
      opacity: 1;
      transition: all 0ms linear ${rDelay + (rDuration/2)}ms;
      transform: translate(-50%, -5px) scale(1);
    }

    &::after {
      animation: ${reveal} ${rDuration}ms ${theme.easings.primary} ${rDelay}ms;
    }

    a {
      margin: 8px;
      color: ${theme.colors.text};
      transition: margin 1000ms ${theme.easings.easeOutSine};

      ${theme.above.md} {
        margin: 20px;
      }

      &:hover {
        color: ${theme.colors.textActive};
      }
    }

    svg {  
      max-width: 45px;
      max-height: 45px;
      transition: all 1000ms ${theme.easings.easeOutQuint},
                color 250ms ${theme.easings.primary};

      ${theme.above.md} {
        max-width: 70px;
        max-height: 70px;
      }
    }
  }

  li {
    //Loop out delay for reveal animation
    ${[...Array(4)].map((item, i) => css`
      &:nth-of-type(${i+1}){
        animation: ${navWait} ${(4-i) * nDelay + nMainDelay}ms linear 0ms,
                   ${navReveal} ${nDuration}ms ${theme.easings.primary} ${(4-i) * nDelay + nMainDelay}ms;
      }
    `)}
  }
`

const NavigationItem = styled('a')`
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 5px;
  margin: 0px 5px;
  color: ${theme.colors.textInactive};
  text-decoration: none;
  ${theme.fontSizes.regular}
  transition: margin 1000ms ${theme.easings.easeOutQuint};

  ${theme.above.md} {
    padding: 5px;
    margin: 5px;
  }

  &:hover {
    color: ${theme.colors.textActive};
  }
`

const Icon = styled('span')`
  svg {
    display: block;
    width: 70px;
    height: 70px;
    max-width: 14px;
    max-height: 14px;
    object-fit: contain;
    transition: all 1000ms ${theme.easings.easeOutQuint},
                color 250ms ${theme.easings.primary};

    ${theme.above.md} {
      max-width: 18px;
      max-height: 18px;
    }

    path,
    circle,
    rect {
      fill: currentColor !important;
      stroke: currentColor !important;
    }
  }
`


/*==============================================================================
  # Component
==============================================================================*/

const socialmediaLinks = [
  {
    title: 'Mejl',
    to: 'mailto:antonpedersen9@gmail.com',
    icon: <Mail />
  },
  {
    title: 'LinkedIn',
    to: 'https://www.linkedin.com/in/antonpedersen/',
    icon: <LinkedIn />,
    target: true
  },
  {
    title: 'Codepen',
    to: 'https://codepen.io/hallonanton/',
    icon: <Codepen />,
    target: true
  },
  {
    title: 'Github',
    to: 'https://github.com/hallonanton/',
    icon: <Github />,
    target: true
  }
]

const ContactNav = ({ ...rest }) => {
  return socialmediaLinks && (socialmediaLinks.length > 0) ? (
    <NavigationList {...rest}>
      {socialmediaLinks.map((link, i) => (
        <li key={i}>
          <NavigationItem 
            href={link.to}
            target={link.target ? '_blank' : ''}
            title={link.title}
          >
            <Icon>{link.icon}</Icon>
          </NavigationItem>
        </li>
      ))}
    </NavigationList>
  ) : null
}

export default ContactNav


