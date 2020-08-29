import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import mockData from "./mockData";

const Container = styled.div({
    paddingLeft:'10px',
    overflow:'hidden'
})

const SwiperBox = styled.div({
    width:'300px',
    marginLeft:'none',
    marginRight:'none',
    overflow:'visible'
})
const SwiperWrapPadding = styled.div({
    maxWidth:'300px',
    paddingRight:'10px',
    boxSizing: 'border-box'
})

const SwiperWrap = styled.div(({style})=>{
    return {
        padding:'15px',
        paddingLeft:'5px',
        border:'1px solid #262626',
        display:'flex',
        height:'180px',
        alignItems:'flex-Start',
        borderRadius:'4px',
        boxSizing: 'border-box',
        ...style
    }
})

const Img = styled.img({
    width: '68px',
    height:'68px',
    borderRadius:'50%',
    marginBottom:'10px'
})

const Text = styled.div(({style})=>{
    return {
        fontSize:'12px',
        color:'#333',
        textAlign:'left',
        lineHeight:'1.35',
        textOverflow:'ellipsis',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 9,
        overflow: 'hidden',
        ...style
    }
})

const User = styled.div({
    textAlign:'center',
    marginRight:'10px',
    flexShrink: 0
})

const UserName = styled.p(({style})=>{
    return {
        textAlign:'center',
        fontSize:'14px',
        fontFamily:'Roboto-Medium',
        margin:0,
        maxWidth: '90px',
        ...style
    }
})

const Link = styled.a({
    '&:visited':{
        textDecoration: 'none',
        color:'#333',
        background:'#fff'
    },
    '&:hover':{
        textDecoration: 'none',
        color:'#333',
        background:'#fff'
    },
    '&:focus':{
        textDecoration: 'none',
        color:'#333',
        background:'#fff'
    }
})

function H5UserShow({ userList = mockData,styles={},id,autoPlay = false ,cardBgColor = '#fff', color }) {
    const [initFlag, setInitFlag] = useState(0);
    useEffect(() => {
        if (!initFlag) {
            //初始换轮播
            const script = document.createElement('script');
            script.src = 'https://df5apg8r0m634.cloudfront.net/react/swiper.js';
            script.onload = function () {
                var mySwiper = new Swiper(`.swiper-container-user-${id}`, {
                    loop: autoPlay,
                    slidesPerView: 1,
                    autoplay: autoPlay ? {
                        delay:3000,
                        stopOnLastSlide:false,
                        disableOnInteraction:false,
        
                    } : false
                })
            }
            document.body.appendChild(script);
            setInitFlag(1);
        }
    }, [autoPlay, id, initFlag])
    
    return (
       <React.Fragment>
            <Container>
                <SwiperBox className={`swiper-container-user swiper-container-user-${id}`} style={{marginLeft:'unset',overflow:'visible'}}>
                    <link rel="stylesheet" href="https://df5apg8r0m634.cloudfront.net/react/swiper.css"></link>
                    {/* <!-- Additional required wrapper --> */}
                    <div className="swiper-wrapper" >
                        {/* <!-- Slides --> */}
                        {userList.map((item, idx) => {
                            const { imgSrc, text,name,link } = item;
                            return <SwiperWrapPadding className="swiper-slide" key={idx}>
                                <Link href={link || ''}>
                                    <SwiperWrap style={{backgroundColor:cardBgColor || '#fff'}}>
                                        <User>
                                            <Img src={imgSrc}/>
                                            <UserName style={{color:color || '#333'}}>{name}</UserName>
                                        </User>
                                        <Text style={{color:color|| '#333'}}>{text}</Text>
                                    </SwiperWrap>
                                </Link>
                            </SwiperWrapPadding>
                        })}
                    </div>
                    <div class="swiper-pagination"></div>
                </SwiperBox>
            </Container>
       </React.Fragment>
    )
}
export default H5UserShow;