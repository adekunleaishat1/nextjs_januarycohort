import { usermodel } from "../database/model/user.model";

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
     }
  }
};