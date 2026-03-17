

export const blogtypeDefs = `
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
    
    type Query{
     allblog:[blog]
    }
 
  type Mutation {
      addblog(title:String!, content:String!, excerp:String!, category:String!,image:String!, author:String!):blog
      deleteblog(id:ID!):blog
   }

`
