import { registerSchema, registerSchematype } from "@/app/lib/schema";
import { z } from "zod";

const alluser:registerSchematype[]  = []

export async function POST(request:Request) {
   try {
     const body =  await request.json()
    console.log(body);
    const result = registerSchema.safeParse(body)
    console.log(result, "validation result");
    if (result.success == false) {
    const pretty =  z.prettifyError(result.error)
    console.log(JSON.stringify(pretty));
    
      return Response.json(pretty)
    }
       alluser.push(body)
       console.log(alluser);
      return Response.json({message:"user registered succesfully"})   

   } catch (error:any) {
    console.log(error, "errormessage");
      return Response.json({message:error?.message})   
   }
    
}