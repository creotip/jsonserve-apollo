import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import client from '../config/apollo-client'
import { theme } from '../config/theme'

function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Welcome to jsonserve-app!</title>
			</Head>
			<ApolloProvider client={client}>
				<ChakraProvider theme={theme}>
					<Component {...pageProps} />
				</ChakraProvider>
			</ApolloProvider>
		</>
	)
}

export default CustomApp
