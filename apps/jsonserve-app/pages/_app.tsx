import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
// import './styles.css'
import { ApolloProvider } from '@apollo/client'
import client from '../config/apollo-client'

function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Welcome to jsonserve-app!</title>
			</Head>
			<ApolloProvider client={client}>
				<ChakraProvider>
					<Component {...pageProps} />
				</ChakraProvider>
			</ApolloProvider>
		</>
	)
}

export default CustomApp
