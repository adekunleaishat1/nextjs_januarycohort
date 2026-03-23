import { usermodel } from "../database/model/user.model";
import jsonwebtoken from "jsonwebtoken"
import { GraphQLError } from "graphql";

type user = {
  name :string,
  email:string,
  role:string,
  password:string
}

export const userresolvers = {
  Query: {
    users: async() => {
      const alluser = await usermodel.find()
       return alluser
    },
    oneuser: async(_:unknown,{id}:{id:string})=>{
      console.log(id);
     const oneuser = await usermodel.findById(id)
     return oneuser
    }

  },
  Mutation:{
     createuser: async(_:unknown, userdetail:user) =>{
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
     loginuser: async(_:unknown, {email , password}:{email:string, password:string}) =>{
         try {
         const existuser =  await usermodel.findOne({email})
         if (!existuser) {
          throw new GraphQLError("Invalid credentials")
         }
        const token =  await jsonwebtoken.sign(
            {email:existuser.email,
            id:existuser._id
          }, "secretkey", { expiresIn: '24h' })

         if(existuser && existuser.password == password){
           return {user:existuser, token}
          }
          throw new GraphQLError("invalid credentials")
         } catch (error) {
          if (error instanceof Error) {
             throw new GraphQLError(error?.message)
          }
          
         }
     }
  }
};