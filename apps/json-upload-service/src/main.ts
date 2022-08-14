import { ApolloError, ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import * as express from 'express'
import * as http from 'http'
import { magentaBright } from 'chalk'
import { schema, UploadJSONModel } from '@jsonserve-apollo/json-upload-schema'
import { connectDB, disconnectDB } from '@jsonserve-apollo/utils'

const port = process.env.APOLLO_SUBGRAPH_PRODUCTS_PORT || 4100
const mongodbURI = process.env.MONGODB_URI
const dbName = process.env.MONGODB_NAME

async function startApolloServer() {
	try {
		await connectDB(mongodbURI, dbName)

		const app = express()

		const httpServer = http.createServer(app)
		const server = new ApolloServer({
			schema,
			csrfPrevention: true,
			cache: 'bounded',
			plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
		})

		await server.start()

		server.applyMiddleware({ app, path: '/graphql' })

		await new Promise<void>((resolve) => httpServer.listen({ port }, resolve))

		console.log(
			magentaBright`🚀 UploadJSON subgraph ready at http://localhost:${port}${server.graphqlPath}`
		)

		app.use(express.json())
		app.get('/favicon.ico', (req, res) => res.sendStatus(204))
		app.get('/:hash', async (req, res) => {
			console.log('req', req.params)

			const item = await UploadJSONModel.findOne({
				hash: req.params.hash,
			}).lean()

			if (item?.jsonData) {
				return res.status(200).json(item.jsonData)
			}

			return res.status(404).json({
				error: 'Not found',
			})
		})
	} catch (err) {
		await disconnectDB()
		throw new ApolloError(err || 'Something went wrong in Apollo')
	}
}

const server = startApolloServer()

export default server
