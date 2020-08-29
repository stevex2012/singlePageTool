import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import PageComponentsMachine from '../../pageComponents/pageComponentsMachine';
const Div = styled.div({
    width: '10%',
    minWidth: '200px',
    background: '#f2f2f2',
    paddingTop:'20px',
    overflowY:'scroll'
});

const Wrap = styled.div({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent:'center'
})
const ComponetButton = styled.div({
    width: '80%',
    textAlign: 'center',
    border: '1px solid #333',
    padding: '5px 0',
    margin: '5px',
    boxSizing:'border-box',
    background:' #fff',
    borderRadius: '4px',
    fontSize:'14px'
});
@inject('createStore')
@observer
class PageLeft extends Component {
    get componentsList(){
        const {pageFlag,pcFlag} = this.props.createStore;
        const {PcComponentsList,H5ComponentsList} = PageComponentsMachine;
        return pageFlag === pcFlag ? PcComponentsList : H5ComponentsList;
    }
    render() {
        return (
            <Fragment>
                <Div>
                    <Wrap>
                        {this.componentsList.map((componet,idx) => {
                            const { name,text } = componet;
                            return (
                                <ComponetButton
                                    key={idx}
                                    draggable
                                    onDragStart={(e) => {
                                        e.dataTransfer.setData("dragComponentName", name);
                                    }}
                                >{text}</ComponetButton>
                            )
                        })}
                    </Wrap>
                </Div>
            </Fragment>
        );
    }
}
// 获取模块命

export default PageLeft;