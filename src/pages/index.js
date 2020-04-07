import React from 'react'
//import { graphql } from 'gatsby'
import Layout from '../components/Layout/Layout'
import PageMetadata from '../components/Layout/PageMetadata'
import SectionBase from '../components/Sections/SectionBase'


const HomePage = ({ data }) => {

  const title = "Anton Pedersen"

  const metaData = {
    title: title
  }

  return (
    <Layout>
      <PageMetadata {...metaData} />
      <SectionBase />
    </Layout>
  )
}

export default HomePage

/*export const pageQuery = graphql`
  query HomeTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      ...PageSectionsFragment
    }
  }
`*/