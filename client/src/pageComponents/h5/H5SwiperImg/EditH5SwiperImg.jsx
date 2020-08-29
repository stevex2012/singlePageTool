import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { ContentTitle, Input, RemindText,FlexLine } from '../../../style';
import {  CheckBox } from '../../../components/index';
import mockData from "./mockData";


const GroupBox = styled.div({
    padding: '10px',
    border: '1px solid #333',
    marginBottom: '10px',
    position: 'relative'
})


const AddBtn = styled.div({
    width: '120px',
    background: '#333',
    color: "#fff",
    fontSize: '12px',
    height: '32px',
    lineHeight: '32px',
    textAlign: 'center',
    cursor: 'pointer'
})

const DeleteBtn = styled.div({
    width: '40px',
    height: '40px',
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    color: '#333'
})

@inject('createStore')
@observer
class EditH5SwiperImg extends Component {
    handleInput = (data, index) => {
        //需要更新单个楼层
        const { swiperList = mockData } = this.props;
        let list = [...swiperList]
        list[index] = data
        const { seletedFloorChild, seletedChildId, updateDataProps } = this.props.createStore;
        if (seletedFloorChild && seletedChildId) {//选中楼层子组件，优先更新子组件
            updateDataProps('swiperList', list);
        }
    }

    renderGroup = (data, index) => {
        const { swiperList = mockData } = this.props;
        const isCanDel = swiperList.length > 2;
        return (
            <GroupBox>
                <ContentTitle>图片链接{`${index + 1}`}：</ContentTitle>
                <Input style={{ width: '80%' }} value={data.imgSrc} onChange={(e) => {
                    let reData = { ...data }
                    reData.imgSrc = e.target.value
                    this.handleInput(reData, index)
                }} />
                <RemindText>图片大小最好不超过200KB</RemindText>
                <ContentTitle>跳转链接{index + 1}：</ContentTitle>
                <Input style={{ width: '80%' }} value={data.link} onChange={(e) => {
                    let reData = { ...data }
                    reData.link = e.target.value
                    this.handleInput(reData, index)
                }} />
                {
                    isCanDel && <DeleteBtn onClick={() => { this.deleteData(index) }}>
                        <svg t="1592026407837" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4014" width="20" height="20"><path d="M916.945455 954.181818c-9.309091 0-18.618182-4.654545-25.6-11.636363L81.454545 132.654545c-13.963636-13.963636-13.963636-37.236364 0-51.2 13.963636-13.963636 37.236364-13.963636 51.2 0l812.218182 812.218182c13.963636 13.963636 13.963636 37.236364 0 51.2-9.309091 4.654545-18.618182 9.309091-27.927272 9.309091z" p-id="4015"></path><path d="M107.054545 954.181818c-9.309091 0-18.618182-4.654545-25.6-11.636363-13.963636-13.963636-13.963636-37.236364 0-51.2L891.345455 81.454545c13.963636-13.963636 37.236364-13.963636 51.2 0 13.963636 13.963636 13.963636 37.236364 0 51.2L132.654545 942.545455c-6.981818 6.981818-16.290909 11.636364-25.6 11.636363z" p-id="4016"></path></svg>
                    </DeleteBtn>
                }
            </GroupBox>
        )
    }

    // 删除数据
    deleteData = (index) => {
        const { swiperList = mockData } = this.props;
        let list = [...swiperList]
        list.splice(index, 1)

        const { seletedFloorChild, seletedChildId, updateDataProps } = this.props.createStore;
        if (seletedFloorChild && seletedChildId) {
            updateDataProps('swiperList', list);
        }
    }
    // 增加数据
    addData = () => {
        const { swiperList = mockData } = this.props;
        let list = [...swiperList]
        list.push({
            imgSrc: 'https://df5apg8r0m634.cloudfront.net/images/78c90f804d28f67d63f85de13c3efc63.gif',
            href: '',
        })
        const { seletedFloorChild, seletedChildId, updateDataProps } = this.props.createStore;
        if (seletedFloorChild && seletedChildId) {
            updateDataProps('swiperList', list);
        }
    }

    render() {
        const { swiperList = mockData } = this.props;
        const isCanAdd = swiperList.length < 6;
        return (
            <div>
                {
                    swiperList.map((item, index) => (
                        <React.Fragment key={index}>{this.renderGroup(item, index)}</React.Fragment>
                    ))
                }
                {isCanAdd && <AddBtn onClick={this.addData}>增加</AddBtn>}
            </div>
        )
    }
}

export default EditH5SwiperImg;