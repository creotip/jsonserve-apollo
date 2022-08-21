import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import { FiArrowRight } from 'react-icons/fi'

export const Explainer = () => {
	return (
		<SimpleGrid columns={3}>
			<Box>
				<Box p={3} mb={2}>
					<Flex justifyContent='center' alignItems='center'>
						<Box fontSize={14} fontWeight='700'>
							Paste your JSON
						</Box>
						<FiArrowRight />
					</Flex>
				</Box>
			</Box>
			<Box>
				<Box p={3} mb={2}>
					<Flex justifyContent='center' alignItems='center'>
						<Box fontSize={14} fontWeight='700'>
							Click save
						</Box>{' '}
						<FiArrowRight />
					</Flex>
				</Box>
			</Box>
			<Box>
				<Box p={3} mb={2}>
					<Flex justifyContent='center' alignItems='center'>
						<Box fontSize={14} fontWeight='700'>
							Get your JSON url
						</Box>
						<FiArrowRight />
					</Flex>
				</Box>
			</Box>
		</SimpleGrid>
	)
}
