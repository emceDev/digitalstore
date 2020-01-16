import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Succesfully bought</h1>
    <p>Wait for it :)</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
