import mongoose from 'mongoose'
import { composeMongoose } from 'graphql-compose-mongoose'
import { schemaComposer } from 'graphql-compose'
import * as shortid from 'shortid'

export interface UploadJSON {
	jsonData: string
	hash?: string
	ip?: string
}

export interface UploadJSONDocument extends UploadJSON, mongoose.Document {}

export const UploadJSONSchema = new mongoose.Schema(
	{
		jsonData: {
			type: String,
			required: true,
		},
		hash: {
			type: String,
		},
		ip: String,
	},
	{
		timestamps: true,
	}
)

export const UploadJSONModel = mongoose.model<UploadJSONDocument>('UploadJSON', UploadJSONSchema)

const customizationOptions = {}

export const UploadJSONTC = composeMongoose(UploadJSONModel, customizationOptions)

const createUploadJSONResolver = schemaComposer.createResolver({
	name: 'createUploadJSON',
	args: {
		jsonData: 'String!',
	},
	type: UploadJSONTC,
	resolve: async ({ source, args, context, info }) => {
		const { jsonData } = args
		const id = shortid.generate()

		const newRecord = await UploadJSONModel.create({ jsonData, hash: id, ip: context.ip })
		return newRecord as UploadJSON
	},
})

schemaComposer.Query.addFields({
	uploadJSONOne: UploadJSONTC.mongooseResolvers.findOne(),
	uploadJSONMany: UploadJSONTC.mongooseResolvers.findMany(),
	uploadJSONCount: UploadJSONTC.mongooseResolvers.count(),
})

schemaComposer.Mutation.addFields({
	uploadJSONCreateOne: createUploadJSONResolver,
	uploadJSONUpdateOne: UploadJSONTC.mongooseResolvers.updateOne(),
	uploadJSONUpdateMany: UploadJSONTC.mongooseResolvers.updateMany(),
	uploadJSONRemoveOne: UploadJSONTC.mongooseResolvers.removeOne(),
})

export const schema = schemaComposer.buildSchema()
