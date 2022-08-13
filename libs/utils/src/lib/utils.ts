import {blueBright, green, redBright} from "chalk";
import * as mongoose from "mongoose";

export const connectDB = async (mongodbURI: string, dbName: string) => {
  if (!mongodbURI || !dbName) {
    return Promise.reject('MongoDB URI or DB Name is not defined')
  }
  try {
    await mongoose.connect(mongodbURI, { autoIndex: false, dbName }, (error) => {
      if (error) {
        console.log(redBright(error))
      }
    })
    console.log(blueBright('🐣 mongodb database started'))
    console.log(green(`🙉 dbURL `, mongodbURI))
    console.log(green(`🙉 dbName `, dbName))
    return mongoose.connection
  } catch (error) {
    console.log('Something went wrong while connecting to mongodb', error)
    return error
  }
}
