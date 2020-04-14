import React from 'react'
import { zipObject } from 'lodash'
import 'reset-css'
import PropTypes from 'prop-types'
import ReactBreakpoints from 'react-breakpoints'
import { ThemeProvider } from 'emotion-theming'
import { Global, css } from '@emotion/core'
import { createBreakpointHelpers } from '../../utility/breakpoints'


/*==============================================================================
   # Breakpoints
 ==============================================================================*/

const labels = ['xs', 'sm', 'md', 'lg', 'xl']
const breakpoints = ['540px', '768px', '992px', '1200px', '1400px']
const breakpointHelpers = createBreakpointHelpers(labels, breakpoints)
const reactBreakpoints = zipObject(labels, breakpoints.map(breakpoint => parseInt(breakpoint)))


/*==============================================================================
  # Colors
==============================================================================*/

let colors = {
  black:    '#090707', 
  white:    '#ffffff',
  grey:     '#787878',
  green:    '#2ecc71'
}

colors.text = colors.white
colors.textInactive = colors.grey
colors.textActive = colors.green
colors.bg = colors.black


/*==============================================================================
  # Easings
==============================================================================*/

//More @ https://easings.net/

let easings = {
  easeInSine:     'cubic-bezier(0.47, 0, 0.745, 0.715)',
  easeOutSine:    'cubic-bezier(0.39, 0.575, 0.565, 1)',
  easeInOutSine:  'cubic-bezier(0.445, 0.05, 0.55, 0.95)',

  easeInQuad:     'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  easeOutQuad:    'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeInOutQuad:  'cubic-bezier(0.455, 0.03, 0.515, 0.955)',

  easeInCubic:    'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  easeOutCubic:   'cubic-bezier(0.215, 0.61, 0.355, 1)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',

  easeInQuart:    'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
  easeOutQuart:   'cubic-bezier(0.165, 0.84, 0.44, 1)',
  easeInOutQuart: 'cubic-bezier(0.77, 0, 0.175, 1)',

  easeInQuint:    'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
  easeOutQuint:   'cubic-bezier(0.23, 1, 0.32, 1)',
  easeInOutQuint: 'cubic-bezier(0.86, 0, 0.07, 1)',

  easeInExpo:     'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
  easeOutExpo:    'cubic-bezier(0.19, 1, 0.22, 1)',
  easeInOutExpo:  'cubic-bezier(1, 0, 0, 1)',

  easeInCirc:     'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
  easeOutCirc:    'cubic-bezier(0.075, 0.82, 0.165, 1)',
  easeInOutCirc:  'cubic-bezier(0.785, 0.135, 0.15, 0.86)',

  easeInBack:     'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  easeOutBack:    'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  easeInOutBack:  'cubic-bezier(.8,-0.25,.2,1.25)'
}

easings.primary = easings.easeInOutQuint
easings.secondary = easings.easeInOutSine


/*==============================================================================
  # Styles
==============================================================================*/

const linkEase = `
  position: relative;
  color: ${colors.text};
  text-decoration: none;
  transition: all 450ms ${easings.secondary};

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
    transition: background 450ms ${easings.secondary},
                all 450ms ${easings.primary};
    will-change: transform;
  }

  &:focus,
  &:hover {
    color: ${colors.primary};

    &::before {
      transform: scale3d(1,1,1);
      transform-origin: 0% 50%;
    }
  }
`

const styles = {
  boxshadow: '0px 1px 8px 0px rgba(0, 0, 0, 0.086), 0px 8px 24px 0px rgba(0, 0, 0, 0.1)',
  linkEase: linkEase
}


/*==============================================================================
  # Spacing Margins
==============================================================================*/

//Add margin to theme
//Used to space components
const mqSizes = (sizes = ['25px']) => {
  /* sizes array of font-sizes that matches number of breakpoints small to large */

  //Set fallback value
  let match = null;

  if (typeof window !== 'undefined') {
    //Loop trough breakpoints and match with size
    match = Object.values(breakpointHelpers.below)
      .map((maxWidth, i) => {
        const mediaquery = maxWidth.replace('@media ', '');

        if (window.matchMedia(mediaquery).matches) {
          return sizes[i];
        } else {
          return false;
        }
      })
      .filter(Boolean);

    //Save best match
    match = match[0];
  }

  match = match ? match : sizes.reverse()[0];
  return match;
};

const margin = {
  xs: () => mqSizes(['10px', '15px', '15px', '25px', '25px']),
  sm: () => mqSizes(['15px', '15px', '30px', '30px', '50px']),
  md: () => mqSizes(['50px', '50px', '100px', '100px', '100px']),
  lg: () => mqSizes(['100px', '100px', '150px', '150px', '150px']),
  xl: () => mqSizes(['100px', '100px', '150px', '200px', '200px'])
};

/*==============================================================================
  # Fonts
==============================================================================*/

const fonts = {
  primary: '"Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  header: '"Helvetica Neue",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
}

/*==============================================================================
  # Font sizes
==============================================================================*/

const mega = `
  font-size: 9rem;
  line-height: 1.2;
  letter-spacing: 1px;

  ${breakpointHelpers.above.md} {  
    font-size: 13rem;
    line-height: 1.2;
    letter-spacing: 1px;
  }
`

const hero = `
  font-size: 3.2rem;
  line-height: 1.25;
  letter-spacing: 0.5px;
`

const heading = `
  font-size: 2.6rem;
  line-height: 1.38;
  letter-spacing: 0.5px;
`

const subHeading = `
  font-size: 1.8rem;
  line-height: 1.39;
  letter-spacing: 1px;
`

const regular = `
  font-size: 1.5rem;
  line-height: 1.4;
  letter-spacing: 0.5px;
`

const description = `
  font-size: 1.2rem;
  line-height: 1.3;
  letter-spacing: 0.5px;
`

const fontSizes = {
  description: description,
  regular: regular,
  subHeading: subHeading,
  heading: heading,
  hero: hero,
  mega: mega
}


/*==============================================================================
  # Global styles
==============================================================================*/

const globalStyles = css`
  @import url('/static/fonts/HelveticaNeue/stylesheet.css');

  ::-moz-selection {
    background: ${colors.text}; 
    color: ${colors.white};  
  }
  ::selection  {
    background: ${colors.text}; 
    color: ${colors.white};
  }
  html, 
  body,
  #___gatsby,
  #gatsby-focus-wrapper {
    ${breakpointHelpers.above.md} {
      height: 100%;
      overflow: hidden;
    }
  }
  html {
    box-sizing: border-box;
    //This reset makes it easier to use rem
    // With this reset 1rem ~ 10px, 1.2rem ~12px and so on
    font-size: 62.5%;
    background: ${colors.bg};
  }
  body {
    color: ${colors.text};
    font-family: ${fonts.primary};
    ${fontSizes.regular}
    overflow-x: hidden;
    box-sizing: border-box;
    visibility: visible;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  img {
    max-width: 100%;
  }

  //Fonts
  .mega {
    font-family: ${fonts.header};
    font-weight: 900;
    ${mega}
  }
  h1,
  .hero {
    font-family: ${fonts.header};
    font-weight: 900;
    ${hero}
  }
  h2,
  .heading {
    font-family: ${fonts.header};
    font-weight: 900;
    ${heading}
  }
  h3,
  .sub-heading {
    font-family: ${fonts.header};
    font-weight: 900;
    ${subHeading}
  }
  h4, h5, h6,
  .small-heading {
    font-family: ${fonts.header};
    font-weight: 900;
    ${regular}
  }
  *, 
  .regular {
    ${regular}
  }
  .description {
    ${description}
  }

  //Tilit
  .tl-wrapper {
    overflow: hidden;
  }
`;


/*==============================================================================
  # Export
==============================================================================*/

export const theme = {
  ...breakpointHelpers,
  colors,
  easings,
  styles,
  margin,
  fonts,
  fontSizes
}

const Theme = ({ children }) => {

  return (
    <ReactBreakpoints
      guessedBreakpoint={reactBreakpoints.sm}
      breakpoints={reactBreakpoints}
    >
      <Global styles={globalStyles} />
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ReactBreakpoints>
  )
}

Theme.propTypes = {
  children: PropTypes.node
}

export default Theme