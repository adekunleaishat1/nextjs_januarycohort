"use client"

import React, {useState} from 'react'
import { ChangeEvent } from 'react'
import SignupForm from '.'

const SignupPage = () => {
    type userdetail = {
       username:string,
       email:string,
       password:string,
       profilepicture?:string
    }
    const [username, setusername] = useState<string>()
    const [email, setemail] = useState<string>()
    const [password, setpassword] = useState<string>()
    const [alluser, setalluser] = useState<Array<userdetail>>([])
    const [count, setcount] = useState<Array<number>>([])
  
    const update = () =>{
        
       setusername("4")
       setemail("false")
       const user = {
        username:"shola",
        email:"shola@gmail.com",
        password:"sholade"
       }
       setalluser([...alluser, user])
    }
    const Parameter = (el:number): boolean =>{
       if (el == 5) {
          return true
       }
       return false
    }
     console.log(Parameter(5));
    const handleinputchange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  =>{
      console.log(e.target.value);
    }
  return (
    <div>
       {username}
       <button onClick={update}>update</button>
       <input onChange={handleinputchange} type="text" />
       <textarea onChange={handleinputchange}></textarea>
       {/* <button onClick={()=>Parameter(5)}>parameter</button> */}
       <SignupForm/>
    </div>
  )
}

export default SignupPage