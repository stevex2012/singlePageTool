import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { Modal } from '../PcComponent/index';
const Title = styled.div(({styles}) => {
    return {
        fontSize: '16px',
        cursor: 'pointer',
        textDecoration: 'underline',
        ...styles
    }
});
const RuleTitle = styled.div((props) => {
    return {
        textAlign: 'center',
        fontSize: '24px',
        lineHeight: 1,
        padding: '50px 0 32px'
    }
});
const RuleUl = styled.ul((props) => {
    return {
        margin: '20px 0'
    }
})
const RuleLi = styled.li(({hasNoNumList}) => {
    return {
        color:'#333',
        fontSize:'16px',
        lineHeight:'1.3',
        textAlign:'left',
        listStyle:hasNoNumList ? '': 'decimal'
    }
})
function PcRule({ title = '规则说明', ruleTitle = '', ruleTexts = [], hasNoNumList,styles={} }) {
    const [show, setShow] = useState(false);
    return (
        <Fragment>
            <Title styles={styles}><span onClick={() => setShow(true)}>{title}</span></Title>
            <Modal
                show={show}
                onclose={() => setShow(false)}
            >
                <RuleTitle>
                    <b>{ruleTitle}</b>
                    <RuleUl>
                        {ruleTexts.map((item, idx) => {
                            return <RuleLi key={idx} hasNoNumList={hasNoNumList}>{item}</RuleLi>
                        })}
                    </RuleUl>
                </RuleTitle>
            </Modal>
        </Fragment>

    )
}
function RuleList() {
    return (
        <div>234</div>
    )
}
export default PcRule;