import { Box, Container, Flex, useColorModeValue } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { Header, Footer } from './'

type Props = {
	preview?: boolean
	children: ReactNode
}
// #192531
// background-color: #dae3eb;
// background-image: linear-gradient(160deg, #dae3eb 0%, #ecf1f5 50%, #ffffff 100%);
const Layout = ({ children }: Props) => {
	const bgColor = useColorModeValue('#dae3eb', '#192531')
	return (
		<>
			<Flex minHeight='100vh' alignItems='center' flexDir='column' bgColor={bgColor}>
				<Header />
				<Container as='main' maxW='4xl' display='flex' flexDirection='column' flex='1'>
					{children}
				</Container>
				<Footer />
			</Flex>
		</>
	)
}

export default Layout
