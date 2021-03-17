import { useQuery, gql } from "@apollo/client"
import { Card } from "@shopify/polaris"
import store from "store-js"

const GET_PRODUCTS_BY_ID = gql`
  query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        title
        handle
        descriptionHtml
        id
        images(first: 1) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              price
              id
            }
          }
        }
      }
    }
  }
`

const ResourceListWithProducts = () => {
  console.log(store.get("ids"))
  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_ID, {
    variables: { ids: store.get("ids") },
  })
  console.log(data, loading, error)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <Card>
      <p>stuff here</p>
    </Card>
  )
}

export default ResourceListWithProducts
