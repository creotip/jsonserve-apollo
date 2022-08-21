import { gql } from '@apollo/client'
import client from '../config/apollo-client'
import Layout from '../components/layout'
import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import { FiArrowRight } from 'react-icons/fi'
import { Explainer } from '../components/explainer'
import { useState } from 'react'
import { JsonUploadForm } from '../components/json-upload-form'

export function Home({ jsonItems }) {
	return (
		<Layout>
			<div className='wrapper'>
				<Box as='h1' textAlign='center' fontSize='4xl' fontWeight='200' mt='2rem'>
					JSON hosting for free
				</Box>
				<Box textAlign='center' my='.5rem'>
					»»——⍟——««
				</Box>
				<Box as='h2' textAlign='center' fontSize='16px' color='gray.500' mb='3rem'>
					Upload your JSON data and get a URL to access it
				</Box>

				<Explainer />
				<JsonUploadForm />
				{/*{jsonItems.map((item) => (*/}
				{/*	<div key={item._id}>*/}
				{/*		<h1>{item.hash}</h1>*/}
				{/*	</div>*/}
				{/*))}*/}
			</div>
		</Layout>
	)
}

export default Home

export async function getStaticProps() {
	const { data } = await client.query({
		query: gql`
			query Query {
				uploadJSONMany {
					jsonData
					hash
					ip
					_id
					updatedAt
					createdAt
				}
			}
		`,
	})

	return {
		props: {
			jsonItems: data?.uploadJSONMany || [],
		},
	}
}
