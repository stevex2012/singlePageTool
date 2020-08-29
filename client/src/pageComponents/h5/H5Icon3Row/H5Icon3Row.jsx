// H5 图标行
import React from 'react';
import styled from 'styled-components';

import mockData from "./mockData";

const IconLine = styled.div({
    width:'31%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    marginBottom:'10px'
})
const Img = styled.img((props) => {
    return {
        width:'80px',
        height:'80px',
        ...props.styles
    }
})
const Text = styled.div((props)=>{
    return {
        marginTop:'10px',
        textAlign:'left',
        fontSize:'12px',
        color:'#333',
        lineHeight:1.35,
        ...props.styles
    }
})

const Container = styled.div({
    display:'flex',
    justifyContent:'space-between'
})

function H5Icon3Row({ iconRow = mockData ,styles = {} }) {
    const { color = '#333', fontSize='12px', textAlign = 'left', fontWeight = 400 ,fontStyle,textDecoration } = styles
    return (
        <React.Fragment>
            <Container>
                {
                    iconRow.map((item,index)=>(
                        <IconLine key={index}>
                            <Img src={item.iconSrc}/>
                            <Text styles={{color, fontSize, textAlign, fontWeight,fontStyle,textDecoration}}>{item.text}</Text>
                        </IconLine>
                    ))
                }
            </Container>
        </React.Fragment>
    )
}

export default H5Icon3Row;