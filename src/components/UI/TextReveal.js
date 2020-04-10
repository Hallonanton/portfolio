import React from 'react'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/core'
import { theme } from '../Layout/Theme'


/*==============================================================================
  # Styles
==============================================================================*/

const pBaseDelay = 1500
const pDelay = 350

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
	.title {
		position: relative;
    display: inline-block;
    margin-bottom: 10px;

    span {
	    opacity: 0;
	    visibility: hidden;
    }

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
    
    &.mega {
    	padding-bottom: 15px;
    	margin-bottom: 15px;

	    span {
	      margin-left: -10px;
	    }
    }
  }

  .text {
    p {
      display: block;
      margin-bottom: 3px;
      transform: translateY(5px);
      opacity: 0;
      visibility: hidden;
    }
  }

  &.reveal {
  	.title {

  		span {
	  		opacity: 1;
	      visibility: visible;
	      transition: opacity 0ms linear 500ms;
  		}

  		&::before {
	      animation: ${reveal} 1000ms ${theme.easings.primary};
	    }
  	}

  	.text {
  		p {
  			opacity: 1;
  			visibility: visible;
  			transform: translateY(0px);
  			transition: all 500ms ${theme.easings.secondary};

  			//Loop out delay for reveal animation
	      ${[...Array(10)].map((item, i) => css`
	        &:nth-of-type(${i+1}){
	          transition-delay: ${i*pDelay+pBaseDelay}ms;
	        }
	      `)}
  		}
  	}
  }
`


/*==============================================================================
  # Component
==============================================================================*/

const TextReveal = ({ title, size = 'mega', paragraphs, reveal, className, ...rest }) => {
	className += reveal ? ' reveal' : ''
	return (
		<TextRevealWrapper className={className} {...rest}>
			{title && <h2 className={`title ${size}`}><span>{title}</span></h2>}
      {paragraphs && <div className="text regular">
      	{paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      </div>}
		</TextRevealWrapper>
	)
}

export default TextReveal;