import React from 'react'
import { registerSchema, registerSchematype } from '@/lib/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'


const SignupForm = () => {
    const {register, handleSubmit, formState:{errors}} = useForm<registerSchematype>({
        resolver:zodResolver(registerSchema)
    })
    console.log(errors);
    const Registeruser =(value:registerSchematype) =>{
      console.log(value);
      fetch("http://localhost:3000/api/register",{
        method:"POST",
        body:JSON.stringify(value)
      }).then((res)=> res.json())
      .then((data)=>{
        console.log(data);
        
      }).catch((err)=>{
        console.log(err);
        
      })

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
                <label htmlFor="">Password</label>
                <input {...register("password")} className='w-full rounded-2xl bg-white  text-black' type="text" />
                <small>{errors.password?.message}</small>
            </div>
            <button>Register</button>
        </form>
    </div>
  )
}

export default SignupForm