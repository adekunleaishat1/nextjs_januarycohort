import React from 'react'
import { registerSchema, registerSchematype } from '@/app/lib/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {gql} from "graphql-tag"
import { useMutation } from '@apollo/client/react'

const CREATEUSER = gql` 
mutation createuser($name:String!,$email:String!,$age:Int!, $role:String!,$password:String!){
  createuser(name:$name, email:$email, age:$age, role:$role,password: $password){
    name,
    email,
    role,
    age
  }
}
`

const SignupForm = () => {
  const [createuser , {loading, data}] = useMutation(CREATEUSER)
  
  
    const {register, handleSubmit, formState:{errors}} = useForm<registerSchematype>({
        resolver:zodResolver(registerSchema)
    })
    console.log(errors);
    const Registeruser = async(value:registerSchematype) =>{
      console.log(value);
      
       const userinfo = {
        ...value,
        age: parseInt(value.age),
        role:"user"
       }
       console.log(userinfo);
     try {
      const response = await createuser({ variables: userinfo });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
      // fetch("http://localhost:3000/api/register",{
      //   method:"POST",
      //   body:JSON.stringify(value)
      // }).then((res)=> res.json())
      // .then((data)=>{
      //   console.log(data);
        
      // }).catch((err)=>{
      //   console.log(err);
        
      // })

    } 

  return (
    <div>
        <form onSubmit={handleSubmit(Registeruser)} className='w-[500px] px-[10px] py-4 border border-4' action="">
            <div>
                <label htmlFor="">Name</label>
                <input {...register("name")} className='w-full rounded-2xl bg-white text-black' type="text" />
                <small>{errors.name?.message}</small>
            </div>
             <div>
                <label htmlFor="">Email</label>
                <input {...register("email")} className='w-full rounded-2xl bg-white  text-black' type="text" />
                <small>{errors.email?.message}</small>
            </div>
             <div>
                <label htmlFor="">Age</label>
                <input {...register("age")} className='w-full rounded-2xl bg-white  text-black' type="number" />
                <small>{errors.age?.message}</small>
            </div>
             <div>
                <label htmlFor="">Password</label>
                <input {...register("password")} className='w-full rounded-2xl bg-white  text-black' type="text" />
                <small>{errors.password?.message}</small>
            </div>
            <button>{loading ? "Loading..." : "Register" }</button>
        </form>
    </div>
  )
}

export default SignupForm