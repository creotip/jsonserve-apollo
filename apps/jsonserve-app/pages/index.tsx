import Layout from '../components/layout'
import { Box } from '@chakra-ui/react'
import { Explainer } from '../components/explainer'
import { JsonUploadForm } from '../components/json-upload-form'

export function Home() {
	return (
		<Layout>
			<div className='wrapper'>
				<Box as='h1' textAlign='center' fontSize={['2xl', '2xl', '6xl']} fontWeight='200' mt='2rem'>
					JSON hosting for free
				</Box>
				<Box textAlign='center' my='.5rem'>
					»»——⍟——««
				</Box>
				<Box as='h2' textAlign='center' fontSize={['14px', '16px']} color='gray.500' mb='3rem'>
					Upload your JSON data and get a URL to access it
				</Box>
				<Explainer />
				<JsonUploadForm />
			</div>
		</Layout>
	)
}

export default Home
