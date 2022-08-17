import { ApolloError, ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import * as express from 'express'
import * as http from 'http'
import { magentaBright } from 'chalk'
import { schema, UploadJSONModel } from '@jsonserve-apollo/json-upload-schema'
import { connectDB, disconnectDB } from '@jsonserve-apollo/utils'
import rateLimit from 'express-rate-limit'

const port = process.env.APOLLO_UPLOAD_JSON_SERVICE_PORT || 4100
const mongodbURI = process.env.MONGODB_URI
const dbName = process.env.MONGODB_NAME

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

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
			introspection: process.env.NODE_ENV !== 'production',
			context: ({ req, res }) => {
				return { req, res }
			},
		})

		await server.start()

		server.applyMiddleware({ app, path: '/graphql' })

		app.use(limiter)

		app.get('/favicon.ico', (req, res) => res.sendStatus(204))
		app.get('/:hash', async (req, res) => {
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

		await new Promise<void>((resolve) => httpServer.listen({ port }, resolve))

		console.log(
			magentaBright`🚀 UploadJSON service ready at http://localhost:${port}${server.graphqlPath}`
		)
	} catch (err) {
		await disconnectDB()
		throw new ApolloError(err || 'Something went wrong in Apollo')
	}
}

const server = startApolloServer()

export default server
