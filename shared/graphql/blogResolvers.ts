import blogmodel from "../database/model/blog.model";
import cloudinary from "../lib/cloudinary";

type blog = {
    title:string
    content:string
    excerp:string
    author:string
    category:string
    image:string
}
export const blogresolvers = {
  Query: {
   allblog:async()=>{
      const allblog = await blogmodel.find()
      return allblog
   }
  },
  Mutation:{
     addblog: async(_, param:blog)=>{
        try {
          const {title, content,excerp,author, category, image} = param
           if (!title || !content || !excerp || !category || !image || !author) {
             throw new Error("All fields are mandatoy")
           }
          const uploaded =  await cloudinary.uploader.upload(image) 
          if (uploaded) {
           const newBlog =  await blogmodel.create({
             ...param,
             image:uploaded.secure_url       
             })
             return newBlog
          }
        } catch (error) {
          if (error instanceof Error) {
             throw new Error(error?.message)
          }
        }
     }

  }
};