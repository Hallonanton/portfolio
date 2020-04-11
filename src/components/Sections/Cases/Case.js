import React, { Component } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
import { theme } from '../../Layout/Theme'
import External from '../../../assets/icons/external-link.svg'

/*==============================================================================
  # Styles
==============================================================================*/

const reveal = keyframes`
  0% {
    width: 100%;
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
    width: 100%;
    transform: scale3d(0,1,1);
    transform-origin: 100% 50%;
  }
`

const Card = styled('li')`
  position: relative;
  width: 100%;
  max-width: calc( 50% - 30px );
  height: 100%;
  max-height: calc( 50% - 30px );
  transition: all 450ms ${theme.easings.primary};

  &::before {
    display: block;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 3;
    background-color: ${theme.colors.textActive};
  }

  a {
    color: ${theme.colors.white};
  }

  .inner {
  	position: relative;
  	width: 100%;
  	height: 100%; 
  	cursor: pointer;
  	background-image: url('https://placekitten.com/600/500');
  	background-position: center center;
  	background-repeat: no-repeat;
  	background-size: cover;
    opacity: 0;
    visibility: hidden;

  	&::after {
  		display: block;
  		position: absolute;
  		content: "";
  		top: 0px;
  		left: 0px;
  		width: 100%;
  		height: 100%;
  		background: ${theme.colors.black};
  		opacity: 0.7;
  		transition: all 250ms ${theme.easings.primary};
  		z-index: 1;
  	}

  	.frame-marker {
  		position: absolute;
  		width: 20px;
  		height: 20px;
  		opacity: 0;
  		transition: all 250ms ${theme.easings.primary};

  		&.top {
  			top: 0px;
  			border-top: 1px solid ${theme.colors.textInactive};
  		}

  		&.bottom {
  			bottom: 0px;
  			border-bottom: 1px solid ${theme.colors.textInactive};
  		}

  		&.left {
  			left: 0px;
  			border-left: 1px solid ${theme.colors.textInactive};
  		}

  		&.right {
  			right: 0px;
  			border-right: 1px solid ${theme.colors.textInactive};
  		}
  	}
  }

  //&.active .inner,
  .inner:hover {
    &::after {
      opacity: 0.4;
    }

    .frame-marker {
      opacity: 1;
      border-color: ${theme.colors.text};

      &.top {
        top: -10px;
      }

      &.bottom {
        bottom: -10px;
      }

      &.left {
        left: -10px;
      }

      &.right {
        right: -10px;
      }
    }

    .external {
      opacity: 1;
      visiblity: hidden;
    }
  }

  header {
  	position: absolute;
  	left: 15px;
  	bottom: 15px;
  	z-index: 2;

  	ul {
  		display: flex;

  		li {
  			${theme.fontSizes.description}
  		}

  		li:not(:last-of-type) {
  			&::after {
  				margin-right: 5px;
  				content: ",";
  			}
  		}	
  	}
  }

  /*&.active {
    .inner {
      cursor: default;
    }

    .external,
    .close {
      opacity: 1;
      visiblity: hidden;
    }
  }*/

  &.reveal {
    .inner {
      opacity: 1;
      visibility: visible;
      transition: opacity 0ms linear 400ms;
    }

    &::before {
      animation: ${reveal} 800ms ${theme.easings.primary};
    }
  }
`

const Close = styled('div')`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  z-index: 2;
  opacity: 0;
  visiblity: hidden;

  &::before,
  &::after {
    display: block;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%; 
    width: 100%;
    height: 1px;
    background: ${theme.colors.white};
  }

  &::before {
    transform: translate(-50%,-50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%,-50%) rotate(-45deg);
  }
`

const Link = styled('span')`
  position: absolute;
  top: 15px;
  right: 15px;
  display: block;
  display: flex;
  align-items: center;
  color: ${theme.colors.white};
  text-decoration: none;
  z-index: 2;
  opacity: 0;
  visiblity: hidden;
  transition: all 250ms ${theme.easings.secondary};

  span {
    position: relative;

    &::before {
      content: '';
      display: block;
      position: absolute;
      bottom: 0px;
      left: 0;
      width: 100%;
      height: 1px;
      pointer-events: none;
      background: currentColor;
      transform: scale3d(0,1,1);
      transform-origin: 100% 50%;
      transition: transition: all 250ms ${theme.easings.secondary};
      will-change: transform;
    }
  }

  svg {
    width: 26px;
    height: 18px;
    margin-left: 10px;

    stroke,
    path {
      fill: currentColor;
    }
  }

  &:hover,
  &:focus {
    ${theme.colors.text}

    span::before {
      transform: scale3d(1,1,1);
      transform-origin: 0% 50%;
    }
  }
`



/*==============================================================================
  # Component
==============================================================================*/

class Case extends Component {

  render() {

    const { title, tags, url, onClick, clearActive, ...rest } = this.props

    return (
      <Card {...rest}>
        <a href={url} target="_blank" rel="noreffer noopener">
          <article className="inner" onClick={e => onClick(e)}>

            <Close className="close" onClick={() => clearActive()} />

            <header>
              <h3>{title}</h3>
              <ul>{tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
            </header>

            {url && <Link href={url} className="external" target="_blank" rel="noreffer noopener"><span>Visa sida</span><External /></Link>}

            <div className="frame-marker top left" />
            <div className="frame-marker top right" />
            <div className="frame-marker bottom left" />
            <div className="frame-marker bottom right" />
          </article>
        </a>
      </Card>
    )
  }
}

export default Case
