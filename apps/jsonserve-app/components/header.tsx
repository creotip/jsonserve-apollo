import React from 'react'
import {
	Box,
	Center,
	Container,
	Flex,
	HStack,
	IconButton,
	useColorMode,
	useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import { FaSun, FaMoon } from 'react-icons/fa'

interface HeaderProps {
	siteTitle?: string
}

export const Header = ({ siteTitle }: HeaderProps) => {
	const { toggleColorMode: toggleMode } = useColorMode()
	const text = useColorModeValue('dark', 'light')
	const SwitchIcon = useColorModeValue(FaMoon, FaSun)

	return (
		<Flex as='header' w='full' minH='4rem' alignItems='center'>
			<Container maxW='4xl'>
				<Flex justifyContent='space-between' alignItems='center'>
					<Box fontWeight='700'>
						<Link href='/'>{'{ JSONSERVE }'}</Link>
					</Box>

					<HStack spacing='5'>
						<IconButton
							size='md'
							fontSize='lg'
							aria-label={`Switch to ${text} mode`}
							variant='ghost'
							color='current'
							ml={{ base: '0', md: '3' }}
							onClick={toggleMode}
							icon={<SwitchIcon />}
						/>
					</HStack>
				</Flex>
			</Container>
		</Flex>
	)
}
