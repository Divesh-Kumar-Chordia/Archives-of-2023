import React from 'react'
import Header from '../Components/Header'
import IntroPost from '../Components/IntroPost'
import Footer from '../Components/Footer'
import Blogs from '../Components/Blogs'
import Search from '../Components/Search'

function Home() {
    return (
        <div>
        <Header/>
        <Search/>
        <IntroPost/>
        <Blogs/>
        <Footer/>
        </div>
    )
}

export default Home
