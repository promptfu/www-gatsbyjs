import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import JumbotronHeader from "../components/jumbotron"
import { Container, Row, Col } from "react-bootstrap"
import PostCardDeck from "../components/post-card-deck"


class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    console.log("IndexPage")
    console.log(this.props)
    console.log(this.state)

    this.state = {
    }

    // bind function(s) in constructor instead of render
  }

  render() {

    const siteDescription = this.props.data.site.siteMetadata.description
    const siteTitle = this.props.data.site.siteMetadata.title

    const blogPostsFeatured = this.props.data.blogPostsFeatured.edges
    const wikiPostsFeatured = this.props.data.wikiPostsFeatured.edges

    return (
      <Layout>
        <JumbotronHeader
          siteDescription={siteDescription}
          siteTitle={siteTitle}
        />
        <Container>
          <Row>
            <Col>
            <h2>RECENT POSTS</h2>
            </Col>
          </Row>
          {/* Display featured blog posts as cards that can take the full width of the container */}
          <PostCardDeck items={blogPostsFeatured} cardClass={"my-4 shadow"} cardButtonClass={"mt-auto btn-xs-block btn-sm-block btn-md-block"} horizontal />
          <Row className="my-3">
            <Col className="text-center">
              <Link to={`/blog`}>more blog posts</Link>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
            <h2>RECENT WIKIS</h2>
            </Col>
          </Row>
          <PostCardDeck items={wikiPostsFeatured} cardClass={"my-4 shadow"} cardButtonClass={"mt-auto btn-xs-block btn-sm-block btn-md-block"} horizontal />
          <Row className="my-3">
            <Col className="text-center">
              <Link to={`/wiki`}>more wiki posts</Link>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            description
            title
          }
        }

        blogPostsFeatured: allMarkdownRemark(
          sort: {order: DESC, fields: [frontmatter___created]},
          filter: {
            fileAbsolutePath: {glob: "**/content/blog/**/*.md"}
            frontmatter: {show: {eq: true}}
          },
          limit: 5
          ) {
          edges {
            node {
              id
              excerpt(pruneLength: 125, format: HTML)
              timeToRead
              fields {
                slug
              }
              frontmatter {
                categories
                created(formatString: "YYYY-MM-DD")
                feature
                image
                show
                tags
                title
                updated
              }
              parent {
                ... on File {
                  sourceInstanceName
                }
              }
            }
          }
        }

        wikiPostsFeatured: allMarkdownRemark(
          sort: {order: DESC, fields: [frontmatter___created]},
          filter: {
            fileAbsolutePath: {glob: "**/content/wiki/**/*.md"},
            frontmatter: {show: {eq: true}}
          },
          limit: 5
          ) {
          edges {
            node {
              id
              excerpt(pruneLength: 125, format: HTML)
              timeToRead
              fields {
                slug
              }
              frontmatter {
                categories
                created(formatString: "YYYY-MM-DD")
                feature
                image
                show
                tags
                title
                updated
              }
              parent {
                ... on File {
                  sourceInstanceName
                }
              }
            }
          }
        }
      }
    `}
    render={ data => <IndexPage data={data} {...props} /> }
  />
)

