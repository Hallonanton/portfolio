import React from 'react'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/core'
import { theme } from '../Layout/Theme'


/*==============================================================================
  # Styles
==============================================================================*/

const pBaseDelay = 1000
const pDelay = 350
const tDuration = 350
const tDelay = 180

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

const TextRevealWrapper = styled('div')`
  max-width: 400px;

	.title {
    display: inline-block;
    margin-bottom: 5px;

    span {
		  position: relative;
      display: inline-block;
      color: transparent;
      margin-right: 10px;
      margin-bottom: 5px;

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
    }

    &.mega {
    	padding-bottom: 15px;
    	margin-bottom: 15px;

	    span {
	      margin-left: -10px;
	    }
    }
  }

  .text {
    margin-bottom: 20px;

    p {
      display: block;
      margin-bottom: 3px;
      transform: translateY(5px);
      opacity: 0;
      visibility: hidden;
    }
  }

  .tag-wrapper {
    margin-top: 15px;

    .tag-title {
      ${theme.fontSizes.regular}
      text-transform: none;
      margin-bottom: 5px;
      transform: translateY(5px);
      opacity: 0;
      visibility: hidden;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;

      .divider {
        margin-top: 15px;
        width: 100%;
      }

      .tag {
        padding: 5px 10px;
        margin: 2px;
        border-radius: 2px;
        background: ${theme.colors.text};
        color: ${theme.colors.black};
        transform: translateY(5px);
        opacity: 0;
        visibility: hidden;
        
        &.secondary {
          padding: 2px 5px;
        }
      }
    }
  }

  &.reveal {
  	.title {

  		span {
	  		color: ${theme.colors.white};
	      visibility: visible;
	      
        &:nth-of-type(1) {
          transition: color 0ms linear ${500+(0*100)}ms;
    
          &::before {
            animation: ${reveal} 1000ms ${theme.easings.primary} ${0*100}ms;
          }
        }

        &:nth-of-type(2) {
          transition: color 0ms linear ${500+(1*100)}ms;
    
          &::before {
            animation: ${reveal} 1000ms ${theme.easings.primary} ${1*100}ms;
          }
        }
  		}
  	}

  	.text {
  		p {
  			opacity: 1;
  			visibility: visible;
  			transform: translateY(0px);
  			transition: all 500ms ${theme.easings.secondary};

        &:nth-of-type(1){
          transition-delay: ${0*pDelay+pBaseDelay}ms;
        }

        &:nth-of-type(2){
          transition-delay: ${1*pDelay+pBaseDelay}ms;
        }

        &:nth-of-type(3){
          transition-delay: ${2*pDelay+pBaseDelay}ms;
        }

        &:nth-of-type(4){
          transition-delay: ${3*pDelay+pBaseDelay}ms;
        }
  		}
  	}

    .tag-wrapper {
      .tag-title {
        opacity: 1;
        visibility: visible;
        transform: translateY(0px);
        transition: all 500ms ${theme.easings.secondary} ${2*pDelay+pBaseDelay}ms;
      }

      .tag {
        opacity: 1;
        transform: translateY(0px);
        visibility: visible;

        &.secondary {
          opacity: 0.8;
        }

        //Loop out delay for reveal animation
        ${[...Array(40)].map((item, i) => css`
          &:nth-child(${i+1}){
            transition: all ${tDuration}ms ${theme.easings.secondary} ${(tDelay*i)+3*pDelay+pBaseDelay}ms;
          }
        `)}
      }
    }
  }
`


/*==============================================================================
  # Component
==============================================================================*/

const TextReveal = ({ title, size = 'mega', paragraphs, tagTitle, tags, secondaryTags, reveal, className, ...rest }) => {
	className += reveal ? ' reveal' : ''
	return (
		<TextRevealWrapper className={className} {...rest}>
			{title && <h2 className={`title ${size}`} dangerouslySetInnerHTML={{__html: title }}/>}
      {paragraphs && <div className="text regular">
      	{paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      </div>}
      {tags && <div className="tag-wrapper">
        {tagTitle && <h3 className="tag-title">{tagTitle}</h3>}
        <ul className="tags">
          {tags.map((tag, i) => <li key={i} className="tag">{tag}</li>)}
          {secondaryTags && <li className="divider" />}
          {secondaryTags.map((tag, i) => <li key={i} className="tag secondary">{tag}</li>)}
        </ul>
      </div>}
		</TextRevealWrapper>
	)
}

export default TextReveal;