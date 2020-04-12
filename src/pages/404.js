import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import Layout from '../components/Layout/Layout'
import PageMetadata from '../components/Layout/PageMetadata'
import { SectionContainer } from '../components/UI/Grid'

/*==============================================================================
  # Styles
==============================================================================*/

const StyledContainer = styled(SectionContainer)`
	align-items: center;
  justify-content: center;
	min-height: 100vh;
`

const Content = styled('div')`
	width: 100%;
  text-align: center;
	max-width: 540px;

  a {
    display: inline-block;
    margin-top: 30px;
    color: ${({theme}) => theme.colors.white};
  }
`

/*==============================================================================
  # Components
==============================================================================*/

const NotFoundPage = () => (
  <Layout>
  	<PageMetadata metaTitle="Något gick fel..." />
    <StyledContainer>
    	<Content>
        <h1 className="mega">404</h1>
        <h2 className="heading">Sidan du söker gick inte att hitta...</h2>
        <Link to="/">Till startsidan</Link>
    	</Content>
    </StyledContainer>
  </Layout>
)

export default NotFoundPage
