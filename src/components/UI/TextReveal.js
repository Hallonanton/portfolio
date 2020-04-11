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
    }
    .tags {
      display: flex;
      flex-wrap: wrap;

      li {
        padding: 5px 10px;
        margin: 2px;
        border-radius: 2px;
        background: ${theme.colors.text};
        color: ${theme.colors.black};
      }
    }

    &.secondary {
      li {
        padding: 2px 5px;
        opacity: 0.8;
      }
    }
  }

  &.reveal {
  	.title {

  		span {
	  		color: ${theme.colors.white};
	      visibility: visible;
	      
        //Loop out delay for reveal animation
        ${Array(3).fill().map((item, i) => css`
          &:nth-of-type(${i+1}){
            transition: color 0ms linear ${500+i*100}ms;
      
            &::before {
              animation: ${reveal} 1000ms ${theme.easings.primary} ${i*100}ms;
            }
          }
        `)}
  		}
  	}

  	.text {
  		p {
  			opacity: 1;
  			visibility: visible;
  			transform: translateY(0px);
  			transition: all 500ms ${theme.easings.secondary};

  			//Loop out delay for reveal animation
	      ${Array(5).fill().map((item, i) => css`
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
          {tags.map((tag, i) => <li key={i}>{tag}</li>)}
        </ul>
      </div>}
      {secondaryTags && <div className="tag-wrapper secondary">
        <ul className="tags">
          {secondaryTags.map((tag, i) => <li key={i}>{tag}</li>)}
        </ul>
      </div>}
		</TextRevealWrapper>
	)
}

export default TextReveal;