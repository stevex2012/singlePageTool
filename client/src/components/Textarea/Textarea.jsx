import React from 'react';
import styled from 'styled-components';
const Area = styled.textarea(({styles={}})=>{
    return{
        width:'100%',
        height:'50px',
        border:'1px solid #ddd',
        boxSizing:'border-box',
        ...styles
    }
})
function Textarea(props){
    return(
        <Area {...props}/>
    );
}

export default Textarea;