import { useState } from 'react'
import {
	Box,
	Button,
	Textarea,
	Center,
	useColorModeValue,
	useToast,
	AlertIcon,
	AlertTitle,
	Alert,
	Fade,
	Link,
	Icon,
	AlertDescription,
} from '@chakra-ui/react'
import { gql, useMutation } from '@apollo/client'
import { isValidJSON } from '@jsonserve-apollo/utils'
import { FiExternalLink } from 'react-icons/fi'

const CREATE_JSON = gql`
	mutation CreateJSON($jsonData: String!) {
		uploadJSONCreateOne(jsonData: $jsonData) {
			jsonData
			hash
			ip
			_id
			updatedAt
			createdAt
		}
	}
`

const baseURL = process.env.NX_BASE_URL

export const JsonUploadForm = () => {
	const [createJSON, { loading }] = useMutation(CREATE_JSON, {
		onCompleted: (data) => {
			setJsonData('')
			const hash = data?.uploadJSONCreateOne?.hash
			setJsonUrl([...jsonUrl, `${baseURL}/${hash}`])
			toast({
				title: 'JSON uploaded',
				status: 'success',
				duration: 7000,
				isClosable: true,
				position: 'top',
			})
		},
	})
	const bgColor = useColorModeValue('white', '#141e29')
	const [jsonData, setJsonData] = useState('')
	const [statusIsValidJSON, setStatusIsValidJSON] = useState(true)
	const [jsonUrl, setJsonUrl] = useState([])
	const toast = useToast()

	const handleTextArea = (e) => {
		setJsonData(e.target.value)
		setStatusIsValidJSON(true)
	}

	const save = async () => {
		if (!isValidJSON(jsonData)) {
			setStatusIsValidJSON(false)
			return undefined
		}
		await createJSON({ variables: { jsonData } })
	}

	return (
		<Box mb='1.45rem'>
			<Textarea
				rows={8}
				onChange={(e) => handleTextArea(e)}
				value={jsonData}
				bgColor={bgColor}
				mb={4}
			/>

			<Fade in={!statusIsValidJSON} unmountOnExit>
				<Alert status='error' mb={4}>
					<AlertIcon />
					<AlertTitle>JSON is not valid!</AlertTitle>
				</Alert>
			</Fade>

			{!!jsonUrl.length &&
				jsonUrl.map((url, index) => (
					<Fade key={index} in={url} unmountOnExit>
						<Alert status='info' mb={4}>
							<AlertIcon />
							<AlertTitle>Access your JSON data:</AlertTitle>
							<AlertDescription>
								<Link href={url} isExternal>
									{url} <Icon mx='2px' as={FiExternalLink} />
								</Link>
							</AlertDescription>
						</Alert>
					</Fade>
				))}

			<Center>
				<Button colorScheme='gray' size='lg' onClick={save} isLoading={loading} minW='200px'>
					Save
				</Button>
			</Center>
		</Box>
	)
}
