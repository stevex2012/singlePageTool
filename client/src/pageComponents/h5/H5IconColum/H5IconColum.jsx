// H5 图标列
import React from 'react';
import styled from 'styled-components';
import H5Container from "../H5Container";

import mockData from "./mockData";

const IconLine = styled.div({
    padding:'5px 0',
    display:'flex',
    width:'100%',
    alignItems:'center'
})
const Img = styled.img((props) => {
    return {
        width:'40px',
        height:'40px',
        ...props.styles
    }
})
const Text = styled.div((props)=>{
    return {
        marginLeft:'10px',
        textAlign:'left',
        fontSize:'12px',
        color:'#333',
        lineHeight:1.35,
        ...props.styles
    }
})

const Contarner = styled.div({

})

function H5IconColum({ iconColum = mockData ,styles = {} }) {
    const { color = '#333', fontSize='12px', textAlign = 'left', fontWeight = 400 ,fontStyle,textDecoration } = styles
    return (
        <React.Fragment>
            <Contarner>
                {
                    iconColum.map((item,index)=>(
                        <IconLine key={index}>
                            <Img src={item.iconSrc}/>
                            <Text styles={{color, fontSize, textAlign, fontWeight,fontStyle,textDecoration}}>{item.text}</Text>
                        </IconLine>
                    ))
                }
            </Contarner>
        </React.Fragment>
    )
}

export default H5IconColum;