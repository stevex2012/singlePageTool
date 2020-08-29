import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import mockData from "./mockData";
import H5Container from "../H5Container";

const Container = styled.div({

})

const SwiperBox = styled.div({
    width: '100%'
})
const ImgW = styled.a({
    display: 'block',
    paddingBottom:'30px'
})
const Img = styled.img({
    width: '100%'
})

function H5SwiperImg({ swiperList = mockData,styles={} ,id ,autoPlay = false}) {
    const [initFlag, setInitFlag] = useState(0);
    
    useEffect(() => {
        if (!initFlag) {
            //初始换轮播
            const script = document.createElement('script');
            script.src = 'https://df5apg8r0m634.cloudfront.net/react/swiper.js';
            script.onload = function () {
                var mySwiper = new Swiper(`.swiper-container-${id}`, {
                    loop: true,
                    slidesPerView: 1,
                    autoplay: autoPlay ? {
                        delay:3000,
                        stopOnLastSlide:false,
                        disableOnInteraction:false,
        
                    } : false, 
                    pagination: {
                        el: '.swiper-pagination',
                    }
                })
            }
            document.body.appendChild(script);
            setInitFlag(1);
        }
    }, [autoPlay, id, initFlag])
    return (
        <React.Fragment>
            <Container>
                <SwiperBox className={` swiper-container swiper-container-${id}`}>
                    <link rel="stylesheet" href="https://df5apg8r0m634.cloudfront.net/react/swiper.css"></link>
                    {/* <!-- Additional required wrapper --> */}
                    <div className="swiper-wrapper">
                        {/* <!-- Slides --> */}
                        {swiperList.map((item, idx) => {
                            const { imgSrc, link } = item;
                            return <div className="swiper-slide" key={idx}>
                                <ImgW href={link ? link : '#'} onClick={(e) => { !link && e.preventDefault() }} target='_blank' >
                                    <Img src={imgSrc} />
                                </ImgW>
                            </div>
                        })}
                    </div>
                    <div class="swiper-pagination"></div>
                </SwiperBox>
            </Container>
        </React.Fragment>
    )
}
export default H5SwiperImg;