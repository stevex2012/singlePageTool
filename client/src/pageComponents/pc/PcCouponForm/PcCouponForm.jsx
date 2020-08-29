
import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { Modal } from '../PcComponent/index';
const FormWrap = styled.div({
    // padding: '40px 0'
})
const InputEmail = styled.input({
    display: 'block',
    width: '482px',
    border: '2px solid rgba(228, 228, 228, 1)',
    boxSizing: 'border-box',
    // padding: '20px 16px',
    lineHeight: 1,
    color: '#333',
    fontSize: '14px',
    margin: '0 auto 20px',
    fontFamily: 'Roboto-Regular',
    placeContent: {
        color: "#999"
    },
    textAlign: 'center',
    height: '34px'

});
const SubmitBtn = styled.button(({ btnBgColor }) => {
    return {
        border: 'none',
        fontSize: '18px',
        color: '#fff',
        lineHeight: 1,
        padding: '16px 65px',
        margin: '0 auto',
        background: '#26ABFF',
        display: 'block',
        borderRadius: '4px',
        backgroundColor: btnBgColor,

    }
})
// 输入邮箱领取优惠券
// 弹窗领取
/**
 * 
 * @param {*} notNeedEmail 直接领取 
 * @param {*} hoverButtonText 悬浮按钮文本
 * @param {*} couponCode 固定优惠券
 *  
 */
function PcCouponForm({
    notNeedEmail = false,
    buttonText = 'Get Code',
    hoverButtonText,
    couponCode,
    showExperienceTime,
    codeTitle,
    hasnoNumList,
    ruleList = [],
    placeholder = 'Enter your email address to get code',
    title,
    fixedExpTime, //固定code 手动输入过期时间
    btnBgColor = '#26ABFF' //按钮颜色
}) {
    const [email, setEmail] = useState('');
    const [show, setShow] = useState(false);
    const [modalForm, setModalForm] = useState(false);
    //code
    const [showCouponCode, setShowCouponCode] = useState('');
    //过期时间
    const [expTime, setExpTime] = useState('');
    //接口错误提示弹窗
    const [msg, setMsg] = useState('');
    return (
        <Fragment>
            <FormWrap>
                {!notNeedEmail && <form onSubmit={(e) => {
                    e.preventDefault()
                    if (notNeedEmail) {
                        setShow(true);
                    } else {
                        handleSubmit(email, e.target.querySelector('button'), (data) => {
                            const { coupon_code = '', expire_date = '', special_code, special_expire_date, status, msg } = data;
                            //提示msg
                            if (coupon_code && expire_date) {
                                //更新显示code 
                                setShowCouponCode(coupon_code);
                                setExpTime(expire_date);
                                setShow(true);
                                setEmail('');
                            } else if (status == 0 && special_code && special_expire_date) {
                                setShowCouponCode(special_code);
                                setExpTime(special_expire_date);
                                setShow(true);
                                setEmail('');
                            } else {
                                //提示msg
                                msg && setMsg(msg);
                            }
                        });
                    }
                }}>
                    <InputEmail
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type='email'
                        placeholder={placeholder} />
                    <SubmitBtn btnBgColor={btnBgColor} type='submit'>{buttonText}</SubmitBtn>
                </form>}
                {/* 悬浮按钮 */}
                <ScrollBtn
                    btnBgColor={btnBgColor}
                    hoverButtonText={hoverButtonText}
                    onClick={() => {
                        (notNeedEmail && couponCode) ? setShow(true) : setModalForm(true);
                    }}
                />

                {/* 显示code弹窗 */}
                <Modal show={show} onclose={() => setShow(false)}>
                    <CodeGetedContent
                        hasnoNumList={hasnoNumList}
                        showExperienceTime={showExperienceTime}
                        code={notNeedEmail ? couponCode : showCouponCode}
                        time={expTime}
                        fixedExpTime={fixedExpTime}
                        ruleTitle={codeTitle}
                        ruleList={ruleList}
                        onCopy={() => setShow(false)}
                    />
                </Modal>
                {/* 弹窗领取 */}
                <Modal show={modalForm} onclose={() => setModalForm(false)}>
                    <ModalForm
                        btnBgColor={btnBgColor}
                        buttonText={buttonText}
                        title={title}
                        placeholder={placeholder}
                        cb={(data) => {
                            const { coupon_code = '', expire_date = '' } = data;
                            if (!coupon_code) return;
                            setModalForm(false)
                            //更新显示code 
                            setShowCouponCode(coupon_code);
                            setExpTime(expire_date);
                            setShow(true);
                            //更新显示code setShowCouponCode();
                        }} />
                </Modal>
                {/* 提示msg */}
                <Modal show={msg} onclose={() => setMsg(false)}>
                    <div dangerouslySetInnerHTML={{ __html: msg }}></div>
                </Modal>
            </FormWrap>
            <div id="pc_hover_button_line" style={{ height: notNeedEmail ? '20px' : '0px' }} />
        </Fragment>
    )
}
//弹窗领取
function ModalForm({ title, cb, btnBgColor, placeholder, buttonText }) {
    const [email, setEmail] = useState('');
    return (
        <div>
            {title && <div style={{ fontSize: '24px', textAlign: 'center', padding: '10px 0',fontFamily:'Roboto-Medium' }}>{title}</div>}
            <form 
            style={{paddingBottom:'20px'}}
            onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(email, e.target.querySelector('button'), cb);
            }}>

                <InputEmail
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type='email'
                    placeholder={placeholder} />
                <SubmitBtn btnBgColor={btnBgColor} type='submit'>{buttonText}</SubmitBtn>
            </form>
        </div>
    )
}
function handleSubmit(email, elBtn, cb) {
    //是否需要增加邮箱验证
    // var emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,6})$/;
    if (!email) return false;
    const oldBtnText = elBtn.innerText;
    const oldBg = getComputedStyle(elBtn)['background-color'];
    function disabledButton(el) {
        el.setAttribute('disabled', 'true');
        el.style.background = '#ccc';
        el.innerText = 'loading...';
    }
    function activeButton(el) {
        el.removeAttribute('disabled');
        el.style.background = oldBg;
        el.innerText = oldBtnText;
    }
    //改变 button loading状态
    let scheme_id = '766';
    let group_scheme_id = '330';
    const dataDiv = document.querySelector('.UP_config_html');
    if (dataDiv) {
        scheme_id = dataDiv.getAttribute('data-scheme_id');
        group_scheme_id = dataDiv.getAttribute('data-group_scheme_id');
    } else {
        scheme_id = '766';
        group_scheme_id = '330';
    }

    const postUrl = '/remoteapi/common/get/coupon';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', postUrl);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  //否则数据无法被正常接收

    xhr.send(`email_address=${email}&scheme_id=${scheme_id}&group_scheme_id=${group_scheme_id}`);
    disabledButton(elBtn);
    xhr.onreadystatechange = function () {

        if (xhr.readyState == 4) {
            activeButton(elBtn);
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                cb && cb(data);
            }
            //清空邮箱
        };

    }
}
const FixedBtn = styled.div({
    position: 'fixed',
    right: 0,
    top: '50%',
    transform: 'rotateZ(0)',
    transition: 'all 0.5s',
    background: '#000',
    color: '#fff',
    padding: '10px',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transformOrigin: 'top right',
    animationFillMode: 'forwards',
    opacity: 0,
    zIndex: -1,
    maxWidth: '198px',
    wordBreak: 'break-all',
    whiteSpace: 'break-spaces',
    textAlign: 'center',
    boxSizing: 'border-box'
})
//悬浮按钮
function ScrollBtn({ onClick, hoverButtonText, btnBgColor }) {
    const [init, setInit] = useState(false);
    const [showAnimate, setShowAnimate] = useState(false);
    function getElementTopLeft(obj) {
        var top = 0;
        while (obj) {
            top += obj.offsetTop;
            obj = obj.offsetParent;
        }
        return { top };
    }
    useEffect(() => {
        if (init) return;
        setInit(true);
        window.addEventListener('scroll', () => {
            const windowScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const flagDiv = document.querySelector('#pc_hover_button_line');
            const flagDivTop = flagDiv && getElementTopLeft(flagDiv).top || 0;
            windowScrollTop > flagDivTop ? setShowAnimate(true) : setShowAnimate(false);
            //获取
        });
    })
    //滑动显示
    return (
        <Fragment>
            <style>{`
        @keyframes rotate {
            from {
                transform: rotate(-90deg);
                display: block;
            }

            to {
                transform: rotate(0deg);
            }
        }

        @keyframes rotateBack {
            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(-90deg);
                display: none;
            }
        }
        .pc_get_code.pc_up_show {
            animation: rotate 0.5s;
            opacity: 1;
            z-index: 99;
        }

        .pc_get_code.pc_up_hide {
            animation: rotateBack 0.5s;
            opacity: 0;
            z-index: -1;
        }
        `}</style>
            <FixedBtn
                style={{ backgroundColor: btnBgColor }}
                onClick={() => onClick && onClick()}
                className={`pc_get_code ${showAnimate ? 'pc_up_show' : 'pc_up_hide'}`}
            >{hoverButtonText}</FixedBtn>
        </Fragment>
    )
}
const Div = styled.div({
    textAlign: 'center',
});
const CodeBox = styled.div({
    width: '284px',
    height: '60px',
    lineHeight: '60px',
    textAlign: 'center',
    margin: '30px auto 0',
    fontSize: '28px',
    background: 'rgba(255,255,255,1)',
    border: '2px solid rgba(228, 228, 228, 1)',
    color: '#979494',

});
const TimeBox = styled.div({
    textAlign: 'center',
    lineHeight: 1,
    color: '#333',
    fontSize: '14px',
    padding: '16px 0 10px',
});
const CopyBtn = styled.div({
    lineHeight: 1,
    color: '#26ABFF',
    fontSize: '18px',
    cursor: 'pointer',
    fontFamily: 'Roboto-Medium',
});
const RuleTitle = styled.div({
    color: '#333',
    fontSize: '24px',
    padding: '5px 0',
    lineHeight: '1.5'
});
const RuleUl = styled.ul({
    textAlign: 'left',
    margin: 0,
    padding:0
});
const RuleItem = styled.li(() => {
    return {
        fontSize: '14px',
        lineHeight: '20px',
        listStyle: 'none',
        wordBreak: 'break-word'
    }
})

const DotDiv = styled.div({
    display: 'inline-block',
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    backgroundColor: '#000',
    marginRight: '5px',
    marginBottom: '2px'
})
const NumDiv = styled.div({
    display: 'inline-block',
    marginRight: '5px'
})
const BigBox = styled.div({
    width: '74%',
    borderTop:'1px solid #ccc',
    margin: '0 auto',
    marginTop: '20px',
    paddingBottom:'20px'
})
//领取成功的弹窗
function CodeGetedContent({ code, time, ruleTitle, ruleList, onCopy, showExperienceTime, hasnoNumList, fixedExpTime }) {
    return (
        <Div>
            <CodeBox><b>{code}</b></CodeBox>
            {/* 有效时间按 */}
            {showExperienceTime && time && <TimeBox>Expiry Date: {time}</TimeBox>}
            {(fixedExpTime && !time && !showExperienceTime) && <TimeBox>Expiry Date: {fixedExpTime}</TimeBox>}
            <CopyBtn
                onClick={() => {
                    try {
                        window.Copy(`<div>${code}</div>`)
                    } catch (e) {
                        console.log(e);
                    };
                    onCopy && onCopy();
                }}
            >Copy code and choose glasses</CopyBtn>
            <BigBox>
                <RuleTitle><b>{ruleTitle}</b></RuleTitle>
                <RuleUl>
                    {
                        ruleList.map((item, idx) => {
                            return <RuleItem >{hasnoNumList ? <DotDiv /> : <NumDiv>{idx + 1}.</NumDiv>}{item}</RuleItem>
                        })
                    }
                </RuleUl>
            </BigBox>
        </Div>
    )
}
export default PcCouponForm;