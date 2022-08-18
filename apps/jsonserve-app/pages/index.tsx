import { gql } from '@apollo/client'
import client from '../config/apollo-client'
import styled from '@emotion/styled'

const StyledPage = styled.div`
	.page {
	}
`

export function Index({ jsonItems }) {
	return (
		<StyledPage>
			<div className='wrapper'>
				<div>csd</div>
				{jsonItems.map((item) => (
					<div key={item._id}>
						<h1>{item.hash}</h1>
					</div>
				))}
			</div>
		</StyledPage>
	)
}

export default Index

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
