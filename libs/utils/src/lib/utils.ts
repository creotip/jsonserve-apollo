import chalk from 'chalk'
import * as mongoose from 'mongoose'

export const connectDB = async (mongodbURI: string, dbName: string) => {
	if (!mongodbURI || !dbName) {
		return Promise.reject('MongoDB URI or DB Name is not defined')
	}
	try {
		await mongoose.connect(mongodbURI, { autoIndex: false, dbName }, (error) => {
			if (error) {
				console.log(chalk.redBright(error))
			}
		})
		console.log(chalk.blueBright('🐣 mongodb database started'))
		console.log(chalk.green(`🙉 dbURL `, mongodbURI))
		console.log(chalk.green(`🙉 dbName `, dbName))
		return mongoose.connection
	} catch (error) {
		console.log('Something went wrong while connecting to mongodb', error)
		return error
	}
}

export const disconnectDB = async () => {
	try {
		await mongoose.disconnect()
		console.log(chalk.blueBright('🐣 mongodb database disconnected'))
	} catch (error) {
		console.log('Something went wrong while disconnecting from mongodb', error)
		return error
	}
}

export const isValidJSON = (json: any) => {
	try {
		JSON.parse(json)
		return true
	} catch (error) {
		return false
	}
}
