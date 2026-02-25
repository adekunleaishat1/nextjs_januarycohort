"use client";

import { ApolloProvider as Provider } from "@apollo/client/react";
import { CreateApolloclient } from "../ApolloClient";
import { ReactNode } from "react";


export default function ApolloProvider({ children }: { children: ReactNode }) {
    const client = CreateApolloclient();
    return <Provider client={client}> {children} </Provider>;
  }
