import React from 'react'
import styled from '@emotion/styled'
import { theme } from '../../Layout/Theme'

/*==============================================================================
  # Styles
==============================================================================*/

const CasesWrapper = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 60px;
`

const Case = styled('div')`
  width: 50%;
  height: 50%;
  padding: 30px;

  .inner {
  	position: relative;
  	width: 100%;
  	height: 100%; 
  	cursor: pointer;
  	background-image: url('https://placekitten.com/600/500');
  	background-position: center center;
  	background-repeat: no-repeat;
  	background-size: cover;

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

  	&:hover {
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
`

/*==============================================================================
  # Component
==============================================================================*/

const cases = [
	{
		'title': 'Oas',
		'tags': ['React', 'Wordpress', 'Gatsby.js' ,'Three.js']
	},
	{
		'title': 'Svenska Hem',
		'tags': ['React', 'E-handel']
	},
	{
		'title': 'Nybergsbil',
		'tags': ['Wordpress', 'PHP']
	},
	{
		'title': 'Västerhuset',
		'tags': ['Vue', 'Wordpress']
	}
]


const SectionCases = ({  }) => {

  return (
    <CasesWrapper>
    	{cases.map((item, i) => {

    		return (
		      <Case key={i}>
		      	<article className="inner">
		      		<header>
			      		<h3>{item.title}</h3>
			      		<ul>{item.tags.map(item => <li key={item}>{item}</li>)}</ul>
		      		</header>
		      		<div className="frame-marker top left" />
		          <div className="frame-marker top right" />
		          <div className="frame-marker bottom left" />
		          <div className="frame-marker bottom right" />
		      	</article>
		      </Case>
    		)
    	})}
    </CasesWrapper>
  )
}

export default SectionCases
