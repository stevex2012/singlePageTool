
import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { Modal } from '../H5Component';
import H5Container from "../H5Container";
const FormWrap = styled.div({
    padding:'20px 0'
})
const InputEmail = styled.input({
    display: 'block',
    width: '240px',
    border: '1px solid #E4E4E4',
    boxSizing: 'border-box',
    padding: '6px 10px',
    color: '#333',
    fontSize: '12px',
    margin: '0 auto 16px',
    placeContent: {
        color: "#999"
    },

});
const SubmitBtn = styled.button(({style = {}})=>(
    {
    border: 'none',
    fontSize: '12px',
    color: '#fff',  
    lineHeight: '24px',
    minWidth: '100px',
    width:'auto',
    textAlign:'center',
    margin: '0 auto',
    background: '#26ABFF',
    display: 'block',
    borderRadius: '2px',
    ...style
    }
))

const MegModal = styled.div({
    padding: '40px',
    paddingBottom:0,
    textAlign: 'center',
    lineHeight: '30px'
})

const Div = styled.div({
    textAlign: 'center',
    padding:'20px 0'
});
const CodeBox = styled.div({
    width: '160px',
    height: '44px',
    lineHeight: '44px',
    textAlign: 'center',
    margin: '0 auto 13px',
    fontFamily:'Roboto-Medium',
    fontSize: '18px',
    background: 'rgba(255,255,255,1)',
    border: '2px solid rgba(228, 228, 228, 1)'

});
const TimeBox = styled.div({
    textAlign: 'center',
    lineHeight: 1,
    color: '#333',
    fontSize: '12px',
    marginBottom:'15px'
});
const CopyBtn = styled.div({
    lineHeight: 1,
    color: '#26ABFF',
    fontSize: '12px',
    cursor: 'pointer'
});
const RuleTitle = styled.div({
    color: '#333',
    fontSize: '14px',
    marginTop:'30px',
    marginBottom:'15px',
    lineHeight: '1'
});
const RuleUl = styled.ul({
    paddingLeft:'20px'
});
const RuleItem = styled.li(({ hasnoNumList }) => {
    return {
        fontSize: '12px',
        textAlign:'left',
        listStyle: hasnoNumList ? '' : 'decimal',
        lineHeight:'1.5'
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
function H5CouponForm({
    notNeedEmail,
    buttonText = 'Get Code',
    hoverButtonText = 'Get Code',
    couponCode,
    showExperienceTime,
    codeTitle,
    hasnoNumList,
    ruleList = [],
    placeholder = 'Input your email get code',
    title,
    editeExpTime,
    styles ={}
}) {
    const [email, setEmail] = useState('');
    const [show, setShow] = useState(false);
    const [modalForm, setModalForm] = useState(false);
    //code
    const [showCouponCode, setShowCouponCode] = useState('');
    //过期时间
    const [expTime, setExpTime] = useState('');
    const { coupon_btn_color = '#26ABFF' } = styles

    //接口错误提示弹窗
    const [msg, setMsg] = useState('');
    return (
        <React.Fragment>
            <FormWrap>
                {!notNeedEmail && <form onSubmit={(e)=>{
                    e.preventDefault()
                    if (notNeedEmail) {
                        setShow(true);
                    } else {
                        handleSubmit(email, (data) => {
                            const { coupon_code = '', expire_date = '', special_code, special_expire_date, status, msg } = data;
                            //提示msg
                            if ((status == 1 || status == 0) && coupon_code && expire_date) {
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
                    <SubmitBtn type='submit' style={{background:coupon_btn_color}}>{buttonText}</SubmitBtn>    
                </form>}

                {/* 悬浮按钮 */}
                <ScrollBtn
                    style={{background:coupon_btn_color}}
                    hoverButtonText={hoverButtonText}
                    onClick={() => {
                        notNeedEmail ? setShow(true) : setModalForm(true);
                    }}
                />
                {/* 显示code弹窗 */}
                <Modal show={show} onclose={() => setShow(false)}>
                    <CodeGetedContent
                        hasnoNumList={hasnoNumList}
                        // showExperienceTime={editeExpTime ? false : showExperienceTime}
                        showExperienceTime={showExperienceTime}
                        code={notNeedEmail ? couponCode : showCouponCode}
                        time={expTime}
                        fixedExpTime={editeExpTime}
                        ruleTitle={codeTitle}
                        ruleList={ruleList}
                        onCopy={() => setShow(false)}
                    />
                </Modal>
                {/* 弹窗领取 */}
                <Modal show={modalForm} onclose={() => setModalForm(false)}>
                    <ModalForm
                        style={{background:coupon_btn_color}}
                        placeholder={placeholder}
                        buttonText={buttonText}
                        title={title}
                        cb={(data) => {
                            setModalForm(false)
                            const { coupon_code = '', expire_date = '', special_code, special_expire_date, status, msg } = data;
                            //提示msg
                            if ((status == 1 || status == 0) && coupon_code && expire_date) {
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
                            //更新显示code setShowCouponCode();
                        }} />
                </Modal>
                {/* 提示msg */}
                <Modal show={msg} onclose={() => setMsg(false)}>
                    <MegModal>
                        <div  dangerouslySetInnerHTML={{ __html: msg }}></div>
                    </MegModal>
                    <RuleTitle><b>{codeTitle}</b></RuleTitle>
                        <RuleUl>
                            {
                                ruleList.map(item => {
                                    return <RuleItem hasnoNumList={hasnoNumList}>{item}</RuleItem>
                                })
                            }
                    </RuleUl>
                </Modal>
            </FormWrap>
            <div id="h5_hover_button_line" />
        </React.Fragment>
    )
}

const ModalContaier = styled.div({
    padding:'20px 0'
})

const ModalTitle = styled.div({
    textAlign:'center',
    fontSize:'18px',
    fontFamily:'Roboto-Medium',
    color:'#333',
    marginBottom:'20px'
})

//弹窗领取
function ModalForm({ title, cb,style,placeholder,buttonText }) {
    const [email, setEmail] = useState('');
    return (
        <ModalContaier >
            {title && <ModalTitle>{title}</ModalTitle>}
            <form onSubmit={(e)=>{
                e.preventDefault()
                handleSubmit(email, cb);
            }}>
             <InputEmail
                 onChange={(e) => setEmail(e.target.value)}
                 value={email}
                 type='email'
                 placeholder={placeholder} />
             <SubmitBtn type='submit' style={style}>{buttonText}</SubmitBtn>
            </form>
        </ModalContaier>
    )
}
function handleSubmit(email, cb) {
    console.log('do submit');
    //是否需要增加邮箱验证
    if (!email) return false;
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
    xhr.setRequestHeader("accept-language", null); 
    xhr.send(`email_address=${email}&scheme_id=${scheme_id}&group_scheme_id=${group_scheme_id}`);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status === 200) {
            console.log('loaed');
            console.log(xhr.responseText);
            const data = JSON.parse(xhr.responseText);
            cb && cb(data);
        };

    }
}
const FixedBtn = styled.div(({style = {}})=>(
    {
        position: 'fixed',
        width:'100%',
        left: 0,
        bottom: '0',
        background: '#000',
        color: '#fff',
        height:'48px',
        lineHeight:'48px',
        textAlign:'center',
        opacity: 0,
        zIndex: -1,
        ...style
    }
))
//悬浮按钮
function ScrollBtn({ onClick, hoverButtonText,style }) {
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
            const flagDiv = document.querySelector('#h5_hover_button_line');
            const flagDivTop = flagDiv && getElementTopLeft(flagDiv).top || 0;
            windowScrollTop > flagDivTop ? setShowAnimate(true) : setShowAnimate(false);
            //获取
        });
    }, [init])
    //滑动显示
    return (
        <Fragment>
        <style>{`
            .h5_get_code.h5_up_show {
                opacity: 1;
                z-index: 99;
            }
        
            .h5_get_code.h5_up_hide {
                opacity: 0;
                z-index: -1;
            }
        `}</style>
            <FixedBtn
                style={style}
                onClick={() => onClick && onClick()}
                className={`h5_get_code ${showAnimate ? 'h5_up_show' : 'h5_up_hide'}`}
            >{hoverButtonText}</FixedBtn>
        </Fragment>
    )
}

//领取成功的弹窗
function CodeGetedContent({ code, time, ruleTitle, ruleList, onCopy, showExperienceTime, hasnoNumList,fixedExpTime }) {
    return (
        <Div>
            <CodeBox><b>{code}</b></CodeBox>
            {/* 有效时间按 */}
            {showExperienceTime && <TimeBox>Expiry Date: {time}</TimeBox>}
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
            <RuleTitle><b>{ruleTitle}</b></RuleTitle>
            <RuleUl>
                {
                    ruleList.map(item => {
                        return <RuleItem hasnoNumList={hasnoNumList}>{item}</RuleItem>
                    })
                }
            </RuleUl>
        </Div>
    )
}
export default H5CouponForm;