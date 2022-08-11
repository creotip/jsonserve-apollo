import { jsonUploadSchema } from './json-upload-schema'

describe('jsonUploadSchema', () => {
	it('should work', () => {
		expect(jsonUploadSchema()).toEqual('json-upload-schema')
	})
})
