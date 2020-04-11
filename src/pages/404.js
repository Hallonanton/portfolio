import React from 'react'
import styled from '@emotion/styled'
import Layout from '../components/Layout/Layout'
import PageMetadata from '../components/Layout/PageMetadata'
import Container from '../components/UI/Grid'
import { Hero } from '../components/UI/Headings'
import VideoSrc from '../assets/video/404.mp4'

/*==============================================================================
  # Styles
==============================================================================*/

const StyledContainer = styled(Container)`
	padding-top: 50px;
	padding-bottom: 50px;
	align-items: center;
	min-height: 100vh;
`

const Content = styled('div')`
	width: 100%;
	max-width: 540px;
`

const Heading = styled(Hero)`
	margin-bottom: 5px;
`

const Video = styled('video')`
	width: 100%;
	margin-top: 30px;
	margin-bottom: 30px;
`

/*==============================================================================
  # Components
==============================================================================*/

const NotFoundPage = () => (
  <Layout>
  	<PageMetadata metaTitle="Något gick fel..." />
    <StyledContainer>
    	<Content>
	    	<Heading size="h1">Något gick fel...</Heading>
    	</Content>
    </StyledContainer>
  </Layout>
)

export default NotFoundPage
