import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { ContentTitle, Input, TextArea, Button, FlexLine } from '../../../style';
import { DeleteIcon, CheckBox,WhiteSpace } from '../../../components/index';
const DEFALUT_TEXT = ''
@inject('createStore')
@observer
class EditPcRule extends Component {
    //增加list
    handeAddList = () => {
        const { updateDataProps } = this.props.createStore;
        const { ruleTexts = [DEFALUT_TEXT,DEFALUT_TEXT] } = this.props;
        const newList = [...ruleTexts];
        newList.push(DEFALUT_TEXT);
        updateDataProps('ruleTexts', newList);
    }
    //删除 list item
    handleDelItem = (idx) => {
        const { updateDataProps } = this.props.createStore;
        const { ruleTexts = [DEFALUT_TEXT] } = this.props;
        const newList = [...ruleTexts];
        newList.splice(idx, 1);
        updateDataProps('ruleTexts', newList);
    };
    handleInput = (val,index) => {
        //需要更新单个楼层
        const {  updateDataProps } = this.props.createStore;
        const { ruleTexts=[DEFALUT_TEXT,DEFALUT_TEXT] } = this.props;
        const newList = [...ruleTexts];
        newList[index] = val;
        updateDataProps('ruleTexts',newList);
        //根性list,里面
    }
    render() {
        const { title, ruleTitle, ruleTexts = [DEFALUT_TEXT,DEFALUT_TEXT] } = this.props;
        const { updateDataProps } = this.props.createStore;
        const isCanDel = ruleTexts.length > 2;
        return (
            <Fragment>
                <ContentTitle style={{ margin: 0 }}>链接按钮文本</ContentTitle>
                <Input
                    value={title}
                    placeholder={'输入链接按钮文本'}
                    onChange={(e) => updateDataProps('title', e.target.value)}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                />
                <ContentTitle style={{ margin: 0 }}>弹窗标题：</ContentTitle>
                <Input
                    value={ruleTitle}
                    placeholder={'输入弹窗标题'}
                    onChange={(e) => updateDataProps('ruleTitle', e.target.value)}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                />
                <ContentTitle style={{ margin: 0 }}>规则条款:</ContentTitle>
                <FlexLine justify="flex-start">
                    <div style={{ 'width': '15px', marginRight: '10px' }} >
                        <CheckBox onChange={(e) => {
                            updateDataProps('hasNoNumList', e.target.checked);
                        }} />
                    </div>
                    <ContentTitle style={{ margin: 0 }}>无序列表</ContentTitle>
                </FlexLine>
                <WhiteSpace />
                {
                    ruleTexts.map((item, idx) => {
                        return (
                            <Fragment>
                                <FlexLine justify='space-between' >
                                    <ContentTitle>文本{idx + 1}</ContentTitle>  {isCanDel && <DeleteIcon onClick={() => this.handleDelItem(idx)} />}
                                </FlexLine>
                                <TextArea
                                    type="text"
                                    placeholder='输入文本'
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

export default EditPcRule;