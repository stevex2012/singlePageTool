import React,{ Component } from "react";
import styled ,{keyframes}from "styled-components";
import { FlexLine } from "../../style";


const rotate360 = keyframes`
    0% {
        transform: rotate(0);
    }
    80% {
        transform: rotate(250deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const LoadingIcon = styled.div`
    width: 60px;
    height: 60px;
    animation: ${rotate360} 1s infinite linear
`;


class Loading extends Component{
    render() {
        return (
             <React.Fragment>
                 <FlexLine>
                    <LoadingIcon>
                       <svg t="1591339287643" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7557" width="60" height="60"><path d="M512 0a512 512 0 0 1 512 512h-64a448 448 0 0 0-448-448V0z" p-id="7558" fill="#21AC4E"></path></svg>
                    </LoadingIcon>
                 </FlexLine>
             </React.Fragment>
        );
    }
}

export default Loading