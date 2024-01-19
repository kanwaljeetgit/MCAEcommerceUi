import React, { useEffect } from 'react'
import './Home.css'
import Header from '../components/Header'
import Body from '../components/Body'
import CarouselComp from '../components/CarouselComp'
import { useState } from 'react'

function Home() {

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className='home'>
        {/* Header */}
        <Header onSearch={handleSearch} searchEnable={true} />
        { /* carousel banner */}
        {searchQuery.length==0?<CarouselComp/>:''}
        {/* Body */}
        <Body searchQuery={searchQuery}/>
    </div>
  )
}

export default Home