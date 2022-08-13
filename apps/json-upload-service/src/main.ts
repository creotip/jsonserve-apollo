import { ApolloError, ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import * as express from 'express'
import * as http from 'http'
import { magentaBright } from 'chalk'
import { jsonUploadSchema } from '@jsonserve-apollo/json-upload-schema'
import { connectDB } from '@jsonserve-apollo/utils'

const mongodbURI = process.env.MONGODB_URI
const dbName = process.env.MONGODB_NAME

async function startApolloServer() {
	try {
		await connectDB(mongodbURI, dbName)

		const app = express()
		const httpServer = http.createServer(app)
		const server = new ApolloServer({
			schema: jsonUploadSchema,
			csrfPrevention: true,
			cache: 'bounded',
			plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
		})

		await server.start()

		server.applyMiddleware({ app, path: '/' })

		await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))

		console.log(magentaBright`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
	} catch (err) {
		throw new ApolloError(err || 'Something went wrong in Apollo')
	}
}

const server = startApolloServer()

export default server
