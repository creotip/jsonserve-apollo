import mongoose from 'mongoose'
import { composeMongoose } from 'graphql-compose-mongoose'
import { schemaComposer } from 'graphql-compose'

export interface UploadJSON {
	jsonData: string | any
	hash: string
	ip: string
}

export interface UploadJSONDocument extends UploadJSON, mongoose.Document {}

export const UploadJSONSchema = new mongoose.Schema(
	{
		jsonData: {
			type: String,
			required: true,
		},
		hash: String,
		ip: String,
	},
	{
		timestamps: true,
	}
)

export const UploadJSONModel = mongoose.model<UploadJSONDocument>('UploadJSON', UploadJSONSchema)

const customizationOptions = {}

export const UploadJSONTC = composeMongoose(UploadJSONModel, customizationOptions)

schemaComposer.Query.addFields({
	uploadJSONOne: UploadJSONTC.mongooseResolvers.findOne(),
	uploadJSONMany: UploadJSONTC.mongooseResolvers.findMany(),
	uploadJSONCount: UploadJSONTC.mongooseResolvers.count(),
})

schemaComposer.Mutation.addFields({
	uploadJSONCreateOne: UploadJSONTC.mongooseResolvers.createOne(),
	uploadJSONUpdateOne: UploadJSONTC.mongooseResolvers.updateOne(),
	uploadJSONUpdateMany: UploadJSONTC.mongooseResolvers.updateMany(),
	uploadJSONRemoveOne: UploadJSONTC.mongooseResolvers.removeOne(),
})

export const schema = schemaComposer.buildSchema()
