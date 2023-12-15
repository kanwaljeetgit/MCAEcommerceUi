import React from 'react'
import './Home.css'
import Header from '../components/Header'
import Body from '../components/Body'
import CarouselComp from '../components/CarouselComp'

function Home() {
  return (
    <div className='home'>
        {/* Header */}
        <Header/>
        { /* carousel banner */}
        <CarouselComp/>
        {/* Body */}
        <Body/>
    </div>
  )
}

export default Home