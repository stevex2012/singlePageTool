import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { Modal } from '../H5Component';

import H5Container from "../H5Container";
const Title = styled.div(({styles = {}}) => {
    return {
        fontSize: '18px',
        cursor: 'pointer',
        width: 'fit-content',
        textDecoration: 'underline',
        ...styles
    }
});
const RuleTitle = styled.div((props) => {
    return {
        textAlign: 'center',
        fontSize: '18px',
        lineHeight: 1,
        padding: '10px 0 10px'
    }
});
const RuleUl = styled.ul(({hasNoNumList}) => {
    return {
        margin: 0,
        padding: 0,
        paddingLeft: '20px',
        marginTop:'10px',
        listStyle:hasNoNumList ? '': 'decimal'
    }
})
const RuleLi = styled.li((props) => {
    return {
        color:'#333',
        fontSize:'14px',
        lineHeight:'20px',
        textAlign:'left'
    }
})
function H5Rule({ ruleText = '规则说明', ruleTitle = 'xxxxxx',hasNoNumList = false, ruleList = [1, 2] ,styles={}}) {
    const [show, setShow] = useState(false);
    const { color = '#333', fontSize='16px', textAlign = 'left', fontWeight = 400 ,fontStyle,textDecoration } = styles
    return (
        <React.Fragment>
            <Title styles={{color, fontSize, textAlign, fontWeight,fontStyle,textDecoration}} onClick={() => setShow(true)}>{ruleText}</Title>
            <Modal
                show={show}
                onclose={() => setShow(false)}
            >
                <RuleTitle>
                    <b>{ruleTitle}</b>
                    <RuleUl hasNoNumList={hasNoNumList}>
                        {ruleList.map((item, idx) => {
                            return <RuleLi key={idx}>{item}</RuleLi>
                        })}
                    </RuleUl>
                </RuleTitle>
            </Modal>
        </React.Fragment>

    )
}

export default H5Rule;