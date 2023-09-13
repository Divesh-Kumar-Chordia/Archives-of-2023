import NextAuth from 'next-auth';

import GoogleProvider from 'next-auth/providers/google';
import { signIn } from 'next-auth/react';

console.log(process.env.GOOGLE_ID,
    process.env.GOOGLE_CLIENT_SECRET);


const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    async session({session}){

    },
    async signIn({profile}){

    }
})

export {handler as GET , handler as POST };


