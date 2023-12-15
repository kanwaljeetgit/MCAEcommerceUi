import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import FirstImage from '../images/headphone.jpg'
import SecondImage from '../images/mobile.jpg'
import ThirdImage from '../images/camera.jpg'
import './CarouselComp.css'

function CarouselComp() {
  return (
    <div>
        <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true}>
            <div >
                <img src='https://m.media-amazon.com/images/I/616SqgdNgLL._SX3000_.jpg' />
            </div>
            <div >
                <img src='https://m.media-amazon.com/images/I/61dCP8bufeL._SX3000_.jpg' />
            </div>
            <div >
                <img style={{height:607}} src='https://m.media-amazon.com/images/G/31/img22/WLA/2023/Dedember23/OPCommunitySale/V2/1400x800._CB570667652_.jpg' />
            </div>
        </Carousel>
    </div>
  )
}

export default CarouselComp