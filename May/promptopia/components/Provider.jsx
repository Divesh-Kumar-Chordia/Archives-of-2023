"use client";

import { SessionProvider } from 'next-auth/react'

const Provider = ({children,session}) => {
    return (
    //  Higher ordered provider so we use Session Provider
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
    )
}

export default Provider
