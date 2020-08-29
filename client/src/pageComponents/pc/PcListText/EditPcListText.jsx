import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { ContentTitle, FlexLine, Input, TextArea, Button } from '../../../style';
import { WhiteSpace, CheckBox, DeleteIcon } from '../../../components/index';
const DEFALUT_TEXT = '';
@inject('createStore')
@observer
class EditPcListText extends Component {

    handleInput = (val, index) => {
        //需要更新单个楼层
        const { updateDataProps } = this.props.createStore;
        const { list = [] } = this.props;
        const newList = [...list];
        newList[index] = val;
        updateDataProps('list', newList);
        //根性list,里面
    }
    //增加list
    handeAddList = () => {
        const { updateDataProps } = this.props.createStore;
        const { list = [DEFALUT_TEXT] } = this.props;
        const newList = [...list];
        newList.push(DEFALUT_TEXT);
        updateDataProps('list', newList);
    }
    //删除 list item
    handleDelItem = (idx) => {
        const { updateDataProps } = this.props.createStore;
        const { list = [DEFALUT_TEXT] } = this.props;
        const newList = [...list];
        newList.splice(idx, 1);
        updateDataProps('list', newList);
    };
    proportionChange = (e) => {
        const { updateDataProps } = this.props.createStore;
        updateDataProps('boxWidth', e.target.value);
    }
    render() {
        const { boxWidth = '100', list = [DEFALUT_TEXT],hasOrder } = this.props;
        const { updateDataProps } = this.props.createStore;
        const showDelBtn = list.length > 1;
        return (
            <div>
                <FlexLine justify="flex-start">
                    <div style={{ 'width': '15px', marginRight: '10px' }} >
                        <CheckBox 
                        checked={!!hasOrder}
                        onChange={(e) => {
                            updateDataProps('hasOrder', e.target.checked);
                        }} />
                    </div>
                    <ContentTitle style={{ margin: 0 }}>无序列表</ContentTitle>
                </FlexLine>
                <WhiteSpace />
                {
                    list.map((item, idx) => {
                        return (
                            <Fragment>
                                <FlexLine justify='space-between' >
                                    <ContentTitle>文本{idx + 1}</ContentTitle>  {showDelBtn && <DeleteIcon onClick={() => this.handleDelItem(idx)} />}
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
                <WhiteSpace />
                <FlexLine justify='space-between'>
                    <ContentTitle>内容占比:</ContentTitle>
                    <FlexLine justify='flex-start' style={{ width: 'auto' }}>
                        <Input
                            value={`${boxWidth}`}
                            type='number'
                            style={{ marginRight: '5px', width: '50px' }}
                            onChange={this.proportionChange} /> %
                    </FlexLine>
                </FlexLine>
            </div>
        )
    }
}

export default EditPcListText;