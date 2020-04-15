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
    transform: scale3d(0,1,1);
    transform-origin: 0% 50%;
  }
  40% {
    transform: scale3d(1,1,1);
    transform-origin: 0% 50%;
  }
  60% {
    transform: scale3d(1,1,1);
    transform-origin: 100% 50%;
  }
  100% {
    transform: scale3d(0,1,1);
    transform-origin: 100% 50%;
  }
`

const Navigation = styled('div')`
  position: fixed;
  bottom: 2.5px;
  right: 35px;
  z-index: 1;
  transform: translate(0, 0);
  transition: all 1000ms ${theme.easings.easeOutQuint};

  ${theme.above.md} {
    position: absolute;
    bottom: 7px;
    right: 50px;
  }

  ${theme.above.xxl} {
    right: 75px;
    bottom: 25px;
  }

  .title {
    display: block;
    position: absolute;
    left: 50%;
    bottom: 100%;
    text-align: center;
    color: rgba(255,255,255,0);
    ${theme.fontSizes.hero}
    font-family: ${theme.fonts.heading};
    font-weight: 900;
    white-space: nowrap;
    transform-origin: top center;
    transition: all 750ms ${theme.easings.easeOutQuint};
    transform: translate(-50%, -5px) scale(0.5);
    z-index: 1;

    &::after {
      display: block;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${theme.colors.textActive};
      transform: translate(-50%, -5px) scale3d(0,1,1);
      transform-origin: 0% 50%;
      z-index: 2;
    }
  }

  .email {
    display: block;
    position: absolute;
    left: 50%;
    top: 100%;
    color: ${theme.colors.textInactive};
    white-space: nowrap;
    opacity: 0;
    transition: all 250ms ${theme.easings.easeOutQuint};
    transform: translate(-50%, 10px);
    z-index: 1;

    a {
      color: ${theme.colors.textInactive};
      text-decoration: none;
      color 250ms ${theme.easings.primary}

      &:hover {
        text-decoration: underline;
        color: ${theme.colors.text};
      }
    }
  }

  &.focus {
    bottom: calc( 33.33% - 39px );
    right: calc( 50% - 142px);
    transition: all 1000ms ${theme.easings.easeOutSine};

    ${theme.above.md} {
      right: calc( 50% - 240px);
      bottom: calc( 50% - 60px);
    }

    .title {
      color: rgba(255,255,255,1);
      transition: color 0ms linear ${rDelay + (rDuration/2)}ms,
                  transform 0ms linear 0ms;
      transform: translate(-50%, -5px) scale(1);
  
      &::after {
        animation: ${reveal} ${rDuration}ms ${theme.easings.primary} ${rDelay}ms;
      }
    }

    .email {
      opacity: 1;
      transition: all 350ms ${theme.easings.easeOutSine} ${rDelay + rDuration}ms;
    }

    a:not(.link-email) {
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

      ${theme.above.xxl} {
        max-width: 100px;
        max-height: 100px;
      }
    }
  }
`

const NavigationList = styled('ul')`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  flex-grow: 1;
  flex-basis: 0;
  align-items: center;

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
    width: 100px;
    height: 100px;
    max-width: 14px;
    max-height: 14px;
    object-fit: contain;
    transition: all 1000ms ${theme.easings.easeOutQuint},
                color 250ms ${theme.easings.primary};

    ${theme.above.md} {
      max-width: 18px;
      max-height: 18px;
    }

    ${theme.above.xxl} {
      max-width: 25px;
      max-height: 25px;
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
    to: 'mailto:hello@antonpedersen.com',
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
    <Navigation {...rest}>
      <h3 class="title">Nyfiken på mer?</h3>
      <NavigationList>
        {socialmediaLinks.map((link, i) => (
          <li key={i}>
            <NavigationItem 
              href={link.to}
              target={link.target ? '_blank' : ''}
              rel={link.target ? "noopener noreferrer" : null}
              title={link.title}
            >
              <Icon>{link.icon}</Icon>
            </NavigationItem>
          </li>
        ))}
      </NavigationList>
      <span class="description email">E-post: <a className="link-email" href="mailto:hello@antonpedersen.com">hello@antonpedersen.com</a></span>
    </Navigation>
  ) : null
}

export default ContactNav


