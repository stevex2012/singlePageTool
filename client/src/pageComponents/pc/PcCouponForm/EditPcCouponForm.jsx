import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { ContentTitle, Input, TextArea, Button, FlexLine } from '../../../style';
import { DeleteIcon, CheckBox } from '../../../components/index';
const DEFALUT_TEXT = '';
@inject('createStore')
@observer
class EditPcCouponForm extends Component {
    constructor(props) {
        super(props);

    }
    handleDelItem = (idx) => {
        const { updateDataProps } = this.props.createStore;
        const { ruleList = [DEFALUT_TEXT] } = this.props;
        const newList = [...ruleList];
        newList.splice(idx, 1);
        updateDataProps('ruleList', newList);
    }
    handeAddList = () => {
        const { updateDataProps } = this.props.createStore;
        const { ruleList = [DEFALUT_TEXT] } = this.props;
        const newList = [...ruleList];
        newList.push(DEFALUT_TEXT);
        updateDataProps('ruleList', newList);
    }
    handleInput = (val, index) => {
        //需要更新单个楼层
        const { updateDataProps } = this.props.createStore;
        const { ruleList = [] } = this.props;
        const newList = [...ruleList];
        newList[index] = val;
        updateDataProps('ruleList', newList);
        //根性list,里面
    }
    render() {
        const {
            placeholder,
            email,
            buttonText,
            hoverButtonText,
            title,
            couponCode,
            codeTitle,
            ruleList = [DEFALUT_TEXT],
            notNeedEmail,
            showExperienceTime,
            hasnoNumList,
            fixedExpTime
        } = this.props;
        const { updateDataProps } = this.props.createStore;
        return (
            <Fragment>
                <FlexLine justify="flex-start">
                    <div style={{ 'width': '15px', marginRight: '10px' }} >
                        <CheckBox
                            checked={notNeedEmail}
                            onChange={(e) => {
                                updateDataProps('notNeedEmail', e.target.checked);
                            }} />
                    </div>
                    <ContentTitle style={{ margin: 0 }}>直接领取code</ContentTitle>
                </FlexLine>
                {!notNeedEmail && <ContentTitle>输入框提示文本：</ContentTitle>}
                {!notNeedEmail && <Input
                    value={placeholder}
                    placeholder={'输入框提示文本'}
                    onChange={(e) => updateDataProps('placeholder', e.target.value)}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                />}
                {!notNeedEmail && <ContentTitle>领取按钮文本:</ContentTitle>}
                {!notNeedEmail && <Input
                    value={buttonText}
                    placeholder={'输入领取按钮文本'}
                    onChange={(e) => updateDataProps('buttonText', e.target.value)}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                />}
                <ContentTitle>悬浮按钮文本:</ContentTitle>
                <Input
                    value={hoverButtonText}
                    placeholder={'输入悬浮按钮文本'}
                    onChange={(e) => updateDataProps('hoverButtonText', e.target.value)}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                />
                {!notNeedEmail && <ContentTitle>输邮箱弹窗标题:</ContentTitle>}
                {!notNeedEmail && <Input
                    value={title}
                    placeholder={'输入输邮箱弹窗标题'}
                    onChange={(e) => updateDataProps('title', e.target.value)}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                />}
                {notNeedEmail && <ContentTitle>弹窗code:</ContentTitle>}
                {notNeedEmail && <Input
                    value={couponCode}
                    placeholder={'输入弹窗code(非固定code不要填写)'}
                    onChange={(e) => updateDataProps('couponCode', e.target.value)}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                />}
                {!notNeedEmail && <FlexLine justify="flex-start">
                    <div style={{ 'width': '15px', marginRight: '10px' }} >
                        <CheckBox
                            checked={showExperienceTime}
                            onChange={(e) => {
                                updateDataProps('showExperienceTime', e.target.checked);
                            }} />
                    </div>
                    <ContentTitle style={{ margin: 0 }}>显示过期时间</ContentTitle>
                </FlexLine>}
                {/* 固定code 手动输入过期时间 */}
                {
                    notNeedEmail && <Fragment>
                        <ContentTitle>过期时间（选填）:</ContentTitle>
                        <Input
                            value={fixedExpTime}
                            placeholder={'输入过期时间'}
                            onChange={(e) => updateDataProps('fixedExpTime', e.target.value)}
                            style={{ width: '100%', boxSizing: 'border-box' }}
                        />
                    </Fragment>
                }
                <ContentTitle>code弹窗标题:</ContentTitle>
                <Input
                    value={codeTitle}
                    placeholder={'输入code弹窗标题'}
                    onChange={(e) => updateDataProps('codeTitle', e.target.value)}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                />
                <ContentTitle>code弹窗规则:</ContentTitle>
                <FlexLine justify="flex-start">
                    <div style={{ 'width': '15px', marginRight: '10px' }} >
                        <CheckBox
                            checked={hasnoNumList}
                            onChange={(e) => {
                                updateDataProps('hasnoNumList', e.target.checked);
                            }} />
                    </div>
                    <ContentTitle style={{ margin: 0 }}>无序列表</ContentTitle>
                </FlexLine>
                {
                    // ruleList
                    ruleList.map((item, idx) => {
                        return (
                            <Fragment>
                                <FlexLine justify='space-between' >
                                    <ContentTitle>规则{idx + 1}</ContentTitle>  <DeleteIcon onClick={() => this.handleDelItem(idx)} />
                                </FlexLine>
                                <TextArea
                                    type="text"
                                    placeholder='input text'
                                    onChange={(e) => this.handleInput(e.target.value, idx)}
                                    value={item}
                                    style={{ width: '80%', height: "100px" }}
                                />
                            </Fragment>
                        )
                    })
                }
                <Button style={{ width: '100px', margin: '0 auto' }} onClick={this.handeAddList}>{'增加列表'}</Button>
            </Fragment>
        )
    }
}

export default EditPcCouponForm;