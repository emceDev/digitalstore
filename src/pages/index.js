import React from "react"
import Product from "../pages/Products"
import Layout from "../components/layout"
import 'bootstrap/dist/css/bootstrap.css';
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <Product/>
 
  </Layout>
)

export default IndexPage
