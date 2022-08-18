import React from 'react'

const Header = ({ siteTitle }) => (
	<header
		style={{
			background: `#213782`,
			marginBottom: `1.45rem`,
			background: 'linear-gradient(270deg,#363795,#005c97)',
			backgroundColor: '#210024',
			backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='66.7' stroke-opacity='.05'%3E%3Ccircle fill='%23210024' r='1800'/%3E%3Ccircle fill='%2324082b' r='1700'/%3E%3Ccircle fill='%23280d32' r='1600'/%3E%3Ccircle fill='%232d1339' r='1500'/%3E%3Ccircle fill='%23311840' r='1400'/%3E%3Ccircle fill='%23351d47' r='1300'/%3E%3Ccircle fill='%2338234f' r='1200'/%3E%3Ccircle fill='%233c2857' r='1100'/%3E%3Ccircle fill='%233f2e5f' r='1000'/%3E%3Ccircle fill='%23433467' r='900'/%3E%3Ccircle fill='%23463a6f' r='800'/%3E%3Ccircle fill='%23484077' r='700'/%3E%3Ccircle fill='%234b467f' r='600'/%3E%3Ccircle fill='%234d4c88' r='500'/%3E%3Ccircle fill='%234f5290' r='400'/%3E%3Ccircle fill='%23515999' r='300'/%3E%3Ccircle fill='%23535fa1' r='200'/%3E%3Ccircle fill='%235466aa' r='100'/%3E%3C/g%3E%3C/svg%3E")`,
			backgroundAttachment: 'fixed',
			backgroundSize: 'cover',
			backgroundPosition: '50%',
			boxShadow:
				'0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)',
		}}
	>
		<div
			style={{
				margin: `0 auto`,
				maxWidth: 800,
				padding: `1rem`,
			}}
		>
			<h1 style={{ margin: 0, fontSize: '20px', fontSize: '1.2rem' }}>
				<Link
					to='/'
					style={{
						color: `white`,
						textDecoration: `none`,
					}}
				>
					{/* {siteTitle} */}
					{'{ JSONSERVE }'}
				</Link>
			</h1>
		</div>
	</header>
)

export default Header
