// Dummy user data
// export let users = [
//   {
//     id: "1",
//     name: "John Doe",
//     email: "john.doe@example.com",
//     age: 28,
//     role: "admin",
//     createdAt: "2025-01-15T10:30:00Z",
//   },
//   {
//     id: "2",
//     name: "Jane Smith",
//     email: "jane.smith@example.com",
//     age: 34,
//     role: "user",
//     createdAt: "2025-02-20T14:45:00Z",
//   },
//   {
//     id: "3",
//     name: "Bob Johnson",
//     email: "bob.johnson@example.com",
//     age: 45,
//     role: "moderator",
//     createdAt: "2025-03-10T09:15:00Z",
//   },
//   {
//     id: "4",
//     name: "Alice Williams",
//     email: "alice.williams@example.com",
//     age: 29,
//     role: "user",
//     createdAt: "2025-04-05T16:00:00Z",
//   },
//   {
//     id: "5",
//     name: "Charlie Brown",
//     email: "charlie.brown@example.com",
//     age: 31,
//     role: "user",
//     createdAt: "2025-05-18T11:20:00Z",
//   },
// ];
import blogmodel from "../database/model/blog.model";
import { usermodel } from "../database/model/user.model";
import cloudinary from "../lib/cloudinary";
type user = {
  name :string,
  email:string,
  age:number,
  role:string,
  password:string
}
type blog = {
    title:string
    content:string
    excerp:string
    author:string
    category:string
    image:string
}
export const typeDefs = `
  type user {
    id:ID!
    name:String
    email:String
    age:Int
    role: String
    createdAt:String
  }
    type blog{
     id:ID!
    title:String
    content:String
    excerp:String
    author:String
    category:String
    image:String
    createdAt:String
    }
  type inputuser {
    name:String
    email:String
    age:Int
    role:String
  }

  type Query {
   users:[user]
   oneuser(id:ID):user
  }

  type Mutation {
    createuser( name:String!, email:String!, age:Int!, role:String!, password:String!):user
    loginuser(email:String! , password:String!):user
    addblog(title:String!, content:String!, excerp:String!, category:String!,image:String!, author:String!):blog
   }

`

export const resolvers = {
  Query: {
    users: async() => {
      const alluser = await usermodel.find()
       return alluser
    },
    oneuser: async(_:any,{id}:{id:string})=>{
      console.log(id);
     const oneuser = await usermodel.findById(id)
     return oneuser
    }

  },
  Mutation:{
     createuser: async(_:any, userdetail:user) =>{
       try {
           console.log(userdetail);
        const newuser = await usermodel.create(userdetail)
           if (newuser) {
            return newuser
           }
       } catch (error) {
         if (error instanceof Error) {
              throw new Error(error?.message)
           }
       }
     },
     loginuser: async(_:any, {email , password}:{email:string, password:string}) =>{
         try {
         const existuser =  await usermodel.findOne({email})
         if(existuser && existuser.password == password){
           return existuser
          }
          throw new Error("invalid credentials")
         } catch (error) {
          if (error instanceof Error) {
             throw new Error(error?.message)
          }
          
         }
     },
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