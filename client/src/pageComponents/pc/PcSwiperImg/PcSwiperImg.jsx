import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
const Wrap = styled.div(({ show }) => {
    return {
        position: 'relative',
        overflow: 'hidden',
        paddingBottom: show ? '40px' : 0,
        overflow: 'hidden',
        height: show ? 'auto' : '0',
        // paddingTop: '79px',
        // paddingBottom: '40px'
    }
})
const SwiperBox = styled.div({
    width: '100%',
    maxWidth: '1200px',
});
const SwiperItemBox = styled.div({
    display: 'flex',
});
const SwiperItem = styled.div({
    flex: 1,
    flexShrink: 0,
    marginRight: '20px',
    ':last-child': {
        marginRight: 0
    }
})
const ImgW = styled.a(({ href }) => {
    return {
        display: 'block',
        cursor: href ? 'pointer' : 'default'
    }
})
const Img = styled.img({
    width: '100%'
})
const Arrow = styled.div((props) => {
    return {
        background: 'rgba(0,0,0,0.3) !important',
        width: '20px !important',
        height: '100px !important',
        left: `${props.left ? `${props.left} !important` : 'auto'}`,
        right: `${props.right ? `${props.right} !important` : 'auto'}`,
        marginTop: '-50px !important',
        ":after": {
            color: '#fff',
            fontSize: '23px !important'
        }
    }
});
const defaultItem = {
    imgSrc: 'https://df5apg8r0m634.cloudfront.net/images/0d5faf98e226c01377ab4a8cc529a504.png',
    href: '',
};
const PageDiv = styled.div({
    left: '50%',
    paddingTop: '20px',
    transform: 'translate3d(-50%,0,0) !important',
    '>span': {
        width: '16px',
        height: '3px',
        marginRight: '16px',
        borderRadius:'2px',
        ':focus': {
            outline: 'none'
        }
    },
    ' .swiper-pagination-bullet-active':{
        width:'24px'
    }
})
function inistSwiper(autoplay, cb) {
    const script = document.createElement('script');
    script.src = 'https://df5apg8r0m634.cloudfront.net/react/swiper.js';
    script.onload = function () {
        var mySwiper = new Swiper('.pc-img-swiper-box', {
            // Optional parameters
            // direction: 'vertical',
            autoplay: autoplay ? {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: false,

            } : false,
            loop: true,
            // slidesPerView: 3,
            // spaceBetween: 20,
            // If we need pagination
            pagination: {
                el: '.pc-swiper-page',
            },

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // And if we need scrollbar
            // scrollbar: {
            //     el: '.swiper-scrollbar',
            // },
        })
        cb && cb();
    }
    document.body.appendChild(script);
}
//
let lastLength = 0;
function PcSwiperImg({ list = [[defaultItem, defaultItem, defaultItem], [defaultItem, defaultItem, defaultItem]], autoPlay }) {
    const [initFlag, setInitFlag] = useState(0);
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (!initFlag || lastLength != list.length) {
            lastLength = list.length;
            inistSwiper(autoPlay, () => {
                setShow(true)
            });
            setInitFlag(1);
        }
    })
    return (
        <Wrap show={show}>
            <SwiperBox className="swiper-container pc-img-swiper-box">
                <link rel="stylesheet" href="https://df5apg8r0m634.cloudfront.net/react/swiper.css"></link>
                {/* <!-- Additional required wrapper --> */}
                <div className="swiper-wrapper">
                    {/* <!-- Slides --> */}
                    {list.map((itemList, idx) => {
                        return <SwiperItemBox className="swiper-slide" key={idx} >
                            {
                                itemList.map((item, index) => {
                                    const { imgSrc, href } = item;
                                    return (
                                        <SwiperItem key={index}>
                                            <ImgW href={href ? href : ''} onClick={(e) => { !href && e.preventDefault() }} target='_blank' >
                                                <Img src={imgSrc || defaultItem.imgSrc} />
                                            </ImgW>
                                        </SwiperItem>
                                    )
                                })
                            }
                        </SwiperItemBox>
                    })}
                </div>
                {/* <!-- If we need pagination --> */}
                <div className="swiper-pagination"></div>
                {/* <!-- If we need navigation buttons --> */}
                <Arrow className="swiper-button-prev" left={'0px'} />
                <Arrow className="swiper-button-next" right={'0px'} />
                {/* <div className="swiper-button-prev"></div> */}
                {/* <div className="swiper-button-next"></div> */}
                {/* <!-- If we need scrollbar --> */}
                {/* <div className="swiper-scrollbar"></div> */}
            </SwiperBox>
            <PageDiv className="swiper-pagination pc-swiper-page"></PageDiv>
        </Wrap>
    )
}
export default PcSwiperImg;