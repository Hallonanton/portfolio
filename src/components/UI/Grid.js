import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { theme } from '../Layout/Theme'

/*==============================================================================
  # Styles
==============================================================================*/

const BaseContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  position: relative;
  flex: 1 1 auto;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
  
  /* props.fullWidth can be used to remove max-width */
  max-width: ${({ fullWidth }) => fullWidth ? 'none' : '1200px' };
  /* props.marginTop can be used to set predefined margins from Theme.js */
  margin-top: ${({ marginTop }) =>
    typeof theme.margin[marginTop] !== 'undefined'
      ? theme.margin[marginTop]
      : '0px'};
`;


const BaseSectionContainer = styled(BaseContainer)`
  height: 100%;
  padding: 45px;

  ${theme.above.md} {
    padding: 90px; 
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  ${theme.above.xxl} {
    padding: 150px; 
  }
`

const BaseRow = styled('div')`
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;
`


const BaseCol = styled('div')`
  position: relative;
  width: 100%;
  max-width: 100%;
  flex-grow: 1;
  flex-basis: 0;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
  /* Base column width */
  ${({ col }) => col ? css`
    flex: 0 0 ${100/(12/col)}%;
    max-width: ${100/(12/col)}%;
  `: null};
  /* Responsive column width */
  /* Ex: md="6" for half width above.md */
  ${({ ...props }) => theme.breakpointMap ? 
    theme.breakpointMap.map(breakpoint => {
      let { label } = breakpoint
      return props[label] ? css`
        ${theme.above[label]} {
          flex: 0 0 ${100/(12/props[label])}%;
          max-width: ${100/(12/props[label])}%;
        }
      ` : null
    }) : null
  }}
`


/*==============================================================================
  # Components
==============================================================================*/

/*
 * Container
 */

const Container = React.forwardRef((props, ref) => {
  const { children, ...rest } = props
  return <BaseContainer ref={ref} {...rest}>{children}</BaseContainer>;
})
export default Container


export const SectionContainer = React.forwardRef((props, ref) => {
  const { children, ...rest } = props
  return <BaseSectionContainer ref={ref} {...rest}>{children}</BaseSectionContainer>;
})

/*
 * Row
 */

export const Row = React.forwardRef((props, ref) => {
  const { children, ...rest } = props
  return <BaseRow ref={ref} {...rest}>{children}</BaseRow>;
})


/*
 * Col
 */

export const Col = React.forwardRef((props, ref) => {
  const { children, ...rest } = props
  return <BaseCol ref={ref} {...rest}>{children}</BaseCol>;
})