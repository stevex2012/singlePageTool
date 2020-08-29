import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
const Wrap = styled.div(({ styles, show }) => {
    return {
        // padding: '80px 0 70px',
        position: 'relative',
        paddingBottom: show ? '40px' : 0,
        overflow: 'hidden',
        height: show ? 'auto' : '0',
        ...styles
    }
})
const UserShowBox = styled.div({
    width: '100%',
    maxWidth: '1200px'
});
const UserShowItem = styled.div(({ notSwiper }) => {
    if (!notSwiper) return {};
    return {
        display: 'block',
        flex: 1,
        marginRight: '20px',
        // ":last-child": {
        //     marginRight: 0
        // }
    }
});
const FlexBox = styled.a(({ cardBgColor, href }) => {
    return {
        borderRadius: '8px',
        border: '1px solid rgba(109,109,109,1)',
        display: 'flex',
        alignItems: 'center',
        height: '220px',
        boxSizing: 'border-box',
        padding: '19px 28px 29px 11px',
        marginLeft: '1px',
        backgroundColor: cardBgColor,
        cursor: href ? 'pointer' : 'default !important',
        color: '#333',
        ':hover': {
            color: '#333'
        },
        ':focus': {
            color: '#333',
            textDecoration: 'none',
            outline: 'none',
            outlineOffset: '0'
        }
    }
});
const LeftItem = styled.div({
    textAlign: 'center',
    width: '100px',
    flexShrink: 0,
    alignSelf: 'flex-start'
});
const RightItem = styled.div(({ color }) => {
    return {
        height: '100%',
        overflow: 'hidden',
        textAlign: 'left',
        textOverflow: 'ellipsis',
        lineHeight:'1.5',
        marginLeft: '26px',
        // wordBreak: 'break-all',
        textOverflow:'ellipsis',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 7,
        fontFamily: 'Roboto-Regular',
        color
    }
});
const ThumbImg = styled.img({
    width: '100px',
    height: '100px',
    borderRadius: '50%'
});
const Name = styled.div(({ color }) => {
    return {
        color: '#000',
        fontSize: '14px',
        lineHeight: 1,
        paddingTop: '16px',
        overflow: 'hidden',
        fontFamily: 'Roboto-Regular',
        color
    }
});
const PageDiv = styled.div({
    left: '50%',
    paddingTop: '20px',
    transform: 'translate3d(-50%,0,0) !important',
    '>span': {
        width: '10px',
        height: '10px',
        marginRight: '16px',
        ':focus': {
            outline: 'none'
        }
    }
})
const baseItem = {
    imgSrc: 'https://df5apg8r0m634.cloudfront.net/images/5610fe3aa56a462b8e575a9eb2dee686.png',
    name: 'User Name1',
    text: 'It is a long established fact that a reader will be distrvacted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal,It is a long established fact that a reader will be distrvacted by the readable content of a page when looking at its layout.',
    href: ''
}

const testData = [baseItem, baseItem, baseItem, baseItem, baseItem, baseItem]
function inistSwiper(autoplay, pageCls, wrapCls, cb) {
    console.log('pageCls', pageCls);
    const script = document.createElement('script');
    script.src = 'https://df5apg8r0m634.cloudfront.net/react/swiper.js';
    script.onload = function () {
        // var mySwiper = new Swiper('.user-show-swiper', {
        var mySwiper = new Swiper(wrapCls, {
            // Optional parameters
            // direction: 'vertical',
            loop: true,
            autoplay: autoplay ? {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: false,

            } : false,
            slidesPerView: 3,
            spaceBetween: 20,
            // If we need pagination
            pagination: {
                el: pageCls,
                clickable: true
            },

            // Navigation arrows
            // navigation: {
            //     nextEl: '.swiper-button-next',
            //     prevEl: '.swiper-button-prev',
            // },

            // And if we need scrollbar
            // scrollbar: {
            //     el: '.swiper-scrollbar',
            // },
        })
        cb && cb();
    }
    document.body.appendChild(script);
}
let lastLength = 0;
let pageCls = 'user-show-page';
let wrapCls = 'user-show-swiper';
function PcUserShow({ list = testData, styles, autoPlay, cardBgColor = '#fff', color }) {
    const [initFlag, setInitFlag] = useState(0);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (list.length <= 3) {
            return setShow(true);

        };//用户评论只有3个的时候
        if (!initFlag || lastLength != list.length) {
            lastLength = list.length;
            //初始换轮播
            inistSwiper(autoPlay, `.${pageCls}`,`.${wrapCls}`, () => {
                setShow(true)
            });
            setInitFlag(1);
        }
    })

    return (
        <Wrap styles={styles} show={show}>
            <UserShowBox className={`swiper-container ${wrapCls}`}>
                <link rel="stylesheet" href="https://df5apg8r0m634.cloudfront.net/react/swiper.css"></link>
                <div className="swiper-wrapper" >
                    {
                        list.map((item, idx) => {
                            const { imgSrc, name, text, href } = item;
                            return (
                                <UserShowItem key={idx} className="swiper-slide"
                                    notSwiper={list.length <= 3}
                                >
                                    <FlexBox cardBgColor={cardBgColor} href={href ? href : ''} onClick={(e) => { !href && e.preventDefault() }} target='_blank'>
                                        <LeftItem>
                                            <ThumbImg src={imgSrc || baseItem.imgSrc} />
                                            <Name color={color}><b>{name || baseItem.name}</b></Name>
                                        </LeftItem>
                                        <RightItem color={color}>
                                            {text || baseItem.text}
                                        </RightItem>
                                    </FlexBox>
                                </UserShowItem>
                            )
                        })
                    }
                </div>
                {/* <div className="swiper-pagination user-show-page"></div> */}
            </UserShowBox>
            <PageDiv className={`swiper-pagination ${pageCls}`}></PageDiv>
        </Wrap>
    )
}

export default PcUserShow;