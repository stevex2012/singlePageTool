import React from 'react';
import styled from 'styled-components';
const Div = styled.input(({styles={}})=>{
    return{
        height:'30px',
        width:'100%',
        boxSizing:'border-box',
        padding:'5px',
        border:'1px solid #ddd',
        outline:'none',
        margin:0,
        ...styles
    }
})
function Input(props){
    return(
            <Div {...props}/>
    )
}

export default Input;