// H5 图片
import React from 'react';
import styled from 'styled-components';
import H5Container from "../H5Container";

const Img = styled.img((props) => {
    return {
        ...props.styles
    }
})

function H5Img({ 
    src = 'https://df5apg8r0m634.cloudfront.net/images/0d5faf98e226c01377ab4a8cc529a504.png',
    link = '',
    proportion = 100,
    styles = {} }) {
    return (
        <React.Fragment>
            {
                link ? 
                <a href={link}><Img src={src} styles={{width:`${proportion}%`}}/></a> 
                    : 
                <Img src={src} styles={{width:`${proportion}%`}}/>
            }
        </React.Fragment>
    )
}

export default H5Img;