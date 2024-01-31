import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import './CarouselComp.css'

function CarouselComp() {
    const images = require.context('../images', true);
    const imageList = images.keys().map(image => images(image));

    return (
        <div>
            <Carousel transitionTime={500} interval={2000} showThumbs={false} infiniteLoop={true} autoPlay={true}>
                {imageList.map((image, index) => (
                    <div >
                        <img style={{ height: 607 }}  key={index} src={image} alt={`image-${index}`} />
                    </div>
                ))}
                <div >
                    <img src='https://m.media-amazon.com/images/I/616SqgdNgLL._SX3000_.jpg' />
                </div>
                <div >
                    <img src='https://m.media-amazon.com/images/I/61dCP8bufeL._SX3000_.jpg' />
                </div>
                <div >
                    <img style={{ height: 607 }} src='https://m.media-amazon.com/images/G/31/img22/WLA/2023/Dedember23/OPCommunitySale/V2/1400x800._CB570667652_.jpg' />
                </div>
            </Carousel>
        </div>
    )
}

export default CarouselComp