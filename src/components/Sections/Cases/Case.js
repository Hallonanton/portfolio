import React, { Component } from 'react'
import Img from 'gatsby-image'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
import { theme } from '../../Layout/Theme'
import ExternalIcon from '../../../assets/icons/external-link.svg'

/*==============================================================================
  # Styles
==============================================================================*/

const reveal = keyframes`
  0% {
    visibility: visible;
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
    visibility: visible;
    transform: scale3d(0,1,1);
    transform-origin: 100% 50%;
  }
`

const Card = styled('li')`
  position: relative;
  width: 100%;
  height: 0%;
  padding-bottom: 50%;
  margin-bottom: 30px;
  transition: all 450ms ${theme.easings.primary};

  ${theme.above.sm} {
    width: calc( 50% - 15px );
    padding-bottom: 25%;

    &:nth-of-type(even) {
      margin-left: 30px;
    }
  }

  ${theme.above.md} {
    width: 50%;
    height: 50%;
    padding: 30px;
    margin: 0px !important;
  }

  &::before {
    display: block;
    content: "";
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 3;
    visibility: hidden;
    background-color: ${theme.colors.textActive};

    ${theme.above.md} {
      top: 30px;
      bottom: 30px;
      left: 30px;
      right: 30px;
    }
  }

  a {
    color: ${theme.colors.white};
  }

  .inner {
    position: absolute;
  	width: 100%;
  	height: 100%; 
  	cursor: pointer;
    opacity: 0;
    visibility: hidden;

    ${theme.above.md} {
      position: relative;
    }

  	&::after {
  		display: block;
  		position: absolute;
  		content: "";
  		top: 0px;
  		left: 0px;
  		width: 100%;
  		height: 100%;
  		background: ${theme.colors.black};
  		opacity: 0.6;
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

  .inner:hover {
    &::after {
      opacity: 0.1;
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

  .img-container {
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
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

const ExternalIndicator = styled('span')`
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

    const { title, tags, url, image, ...rest } = this.props

    const sources = [
      image.mobile,
      {
        ...image.tabelt,
        media: `(min-width: 540px)`,
      },
      {
        ...image.desktop,
        media: `(min-width: 768px)`,
      }
    ]

    return (
      <Card {...rest}>
        <a href={url}  target="_blank" rel="noopener noreferrer">
          <article className="inner">

            {image && 
              <div className="img-container">
                <Img fluid={sources} alt={title} />
              </div>
            }

            <header>
              <h3>{title}</h3>
              <ul>{tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
            </header>

            <ExternalIndicator className="external">
              <span>Visa sida</span><ExternalIcon />
            </ExternalIndicator>

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
