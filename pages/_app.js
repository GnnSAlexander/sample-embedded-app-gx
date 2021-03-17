import React from "react"
import App from "next/app"
import Head from "next/head"
import { AppProvider } from "@shopify/polaris"
import { Provider, Context } from "@shopify/app-bridge-react"
import { authenticatedFetch } from "@shopify/app-bridge-utils"
import "@shopify/polaris/dist/styles.css"
import translations from "@shopify/polaris/locales/en.json"
import ClientRouter from "../components/ClientRouter"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client"

class MyProvider extends React.Component {
  static contextType = Context

  render() {
    const app = this.context
    console.log()

    const link = new HttpLink({
      fetch: authenticatedFetch(app),
      fetchOptions: {
        credentials: "include",
      },
    })
    const client = new ApolloClient({
      link: link,
      cache: new InMemoryCache(),
    })

    return (
      <ApolloProvider client={client}>{this.props.children}</ApolloProvider>
    )
  }
}

class MyApp extends App {
  render() {
    const { Component, pageProps, shopOrigin } = this.props
    console.log(process.env, process.env.API_KEY)
    const config = {
      apiKey: "d478640e734138f8c80b80e691caba6b",
      shopOrigin,
      forceRedirect: true,
    }
    return (
      <React.Fragment>
        <Head>
          <title>Sample App</title>
          <meta charSet="utf-8" />
        </Head>
        <Provider config={config}>
          <ClientRouter />
          <AppProvider i18n={translations}>
            <MyProvider>
              <Component {...pageProps} />
            </MyProvider>
          </AppProvider>
        </Provider>
      </React.Fragment>
    )
  }
}
MyApp.getInitialProps = async ({ ctx }) => {
  return {
    shopOrigin: ctx.query.shop,
  }
}

export default MyApp
