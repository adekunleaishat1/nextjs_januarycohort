import {z} from "zod"

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  age:z.string(),
  password: z.string("passwword must be a string").min(6, "Password must be at least 6 characters"),
});

 export type registerSchematype = z.infer<typeof registerSchema>