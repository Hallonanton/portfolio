import React from 'react'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/core'
import { theme } from '../Layout/Theme'
import Mail from '../../assets/icons/social/envelope.svg'
import LinkedIn from '../../assets/icons/social/linkedin.svg'
import Codepen from '../../assets/icons/social/codepen.svg'
import Github from '../../assets/icons/social/github.svg'

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

const NavigationList = styled('ul')`
  position: absolute;
  bottom: 7px;
  right: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  flex-grow: 1;
  flex-basis: 0;
  align-items: center;
  transition: all 1000ms ${theme.easings.easeOutQuint};

  &::before {
    display: block;
    content: "Nyfiken på mer?";
    position: absolute;
    left: 50%;
    bottom: 100%;
    color: ${theme.colors.textInactive};
    opacity: 0;
    font-style: italic;
    white-space: nowrap;
    transform-origin: top center;
    transition: all 750ms ${theme.easings.easeOutQuint};
    transform: translate(-50%, -5px) scale(0.5);
  }

  &.focus {
    bottom: 50%;
    right: 50%;
    transform: translate(50%, 50%);
    transition: all 1000ms ${theme.easings.easeOutSine};

    &::before {
      opacity: 1;
      transition: all 700ms ${theme.easings.easeOutSine} 250ms;
      transform: translate(-50%, -5px) scale(1);
    }

    a {
      margin: 20px;
      transition: margin 1000ms ${theme.easings.easeOutSine};
    }

    svg {  
      max-width: 70px;
      max-height: 70px;
      transition: all 1000ms ${theme.easings.easeOutQuint},
                color 250ms ${theme.easings.secondary};
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
  padding: 5px;
  margin: 5px;
  color: ${theme.colors.textInactive};
  text-decoration: none;
  ${theme.fontSizes.regular}
  transition: margin 1000ms ${theme.easings.easeOutQuint};

  &:hover {
    color: ${theme.colors.textActive};
  }
`

const Icon = styled('span')`
  svg {
    display: block;
    width: 70px;
    height: 70px;
    max-width: 18px;
    max-height: 18px;
    object-fit: contain;
    transition: all 1000ms ${theme.easings.easeOutQuint},
                color 250ms ${theme.easings.secondary};

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


