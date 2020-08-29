import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import PageComponentsMachine from '../../pageComponents/pageComponentsMachine';
import { FlexLine } from '../../style';

import H5BaseBox from "../../pageComponents/h5/H5Container";
import PcBaseBox from "../../pageComponents/pc/PcBaseBox/PcBaseBox";

const Content = styled.div(({ style = {} }) => ({
    flex: 1,
    padding: '20px 10px 0',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...style
}))

const Container = styled.div(({ style = {} }) => ({
    ...style
}))
const Floor = styled.div(({ style = {}, active, hasChildren }) => ({
    minHeight: hasChildren ? 'unset' : '50px',
    border: '1px dashed #ddd',
    position: 'relative',
    borderColor: active ? 'red' : '#ddd',
    width: '100%',
    ...style

}))
//楼层操作
const Operation = styled.div({
    position: 'absolute',
    right: '0',
    top: 0,
    transform: 'translateY(-50%)',
    zIndex: 99,
    visibility: props => props.isShow ? 'visible' : 'hidden'
});
const OperationButton = styled.button({
    border: '1px solid #333',
    background: '#fff',
    cursor: 'pointer',
    margin: '0 3px'
})
//楼层子组件
const FloorChild = styled.div({
    border: '1px dashed #ddd',
    borderColor: props => props.active ? 'orange' : '#ddd'
})

const AddFloor = styled.div({
    width: '100%',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px 0',
    border: '1px dotted #e4e4e4',
    color: '#666',
    cursor: 'pointer'
})

//增加，删除，移动，编辑楼层
@inject('createStore')
@observer
class PageMid extends Component {
    state = {
        hoverId: 0
    }

    //选中，删除，上/下移动，向上增加
    get OperationButtons() {
        const { setSelectedFloorId, delFloor, moveFloor, insertFloor } = this.props.createStore;
        const list = [
            {
                tex: <svg t="1591421688413" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8499" width="16" height="16"><path d="M558.933333 853.333333V128h-42.666666v733.866667l-145.066667-145.066667-29.866667 29.866667 192 192 192-192-29.866666-29.866667-136.533334 136.533333z" fill="#333333" p-id="8500"></path></svg>,
                click: (floor) => {
                    moveFloor('down', floor.id);
                }
            },
            {
                tex: <svg t="1591421723330" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8733" width="16" height="16"><path d="M507.733333 213.333333v725.333334h42.666667V204.8l145.066667 145.066667 29.866666-29.866667L533.333333 128 341.333333 320l29.866667 29.866667L507.733333 213.333333z" fill="#444444" p-id="8734"></path></svg>,
                click: (floor) => {
                    moveFloor('up', floor.id);
                }
            },
            {
                tex: <svg t="1591421753920" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4286" width="16" height="16"><path d="M954.181818 488.727273c0 11.636364-11.636364 23.272727-23.272727 23.272727H535.272727v418.909091c0 11.636364-11.636364 23.272727-23.272727 23.272727s-23.272727-11.636364-23.272727-23.272727V512H93.090909c-11.636364 0-23.272727-11.636364-23.272727-23.272727s11.636364-23.272727 23.272727-23.272728h395.636364V93.090909c0-11.636364 11.636364-23.272727 23.272727-23.272727s23.272727 11.636364 23.272727 23.272727v372.363636h395.636364c11.636364 0 23.272727 11.636364 23.272727 23.272728z" fill="#454545" p-id="4287"></path></svg>,
                click: (floor) => {
                    insertFloor('up', floor.id);
                }
            },
            {
                tex: <svg t="1591421843004" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11451" width="16" height="16"><path d="M216.746667 836.266667V183.04a34.133333 34.133333 0 0 1 56.32-26.026667L794.88 597.333333a34.133333 34.133333 0 0 1-22.186667 60.16h-306.346666l-190.293334 202.24a34.133333 34.133333 0 0 1-59.306666-23.466666z" p-id="11452"></path></svg>,
                click: (floor) => {
                    setSelectedFloorId(floor.id);
                }
            },
            {
                tex: <svg t="1591421859410" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4466" width="16" height="16"><path d="M839.27272695 287H184.72727305c-12.27272695 0-20.45454521-8.18181826-20.4545461-20.45454521s8.18181826-20.45454521 20.4545461-20.4545461h654.5454539c12.27272695 0 20.45454521 8.18181826 20.4545461 20.4545461s-8.18181826 20.45454521-20.4545461 20.45454521zM383.13636348 753.36363652c-12.27272695 0-20.45454521-8.18181826-20.45454522-20.45454521v-286.36363652c0-12.27272695 8.18181826-20.45454521 20.45454522-20.4545461s20.45454521 8.18181826 20.45454521 20.4545461v284.31818174c0 12.27272695-8.18181826 22.5-20.45454521 22.49999999zM512 753.36363652c-12.27272695 0-20.45454521-8.18181826-20.45454521-20.45454521v-286.36363652c0-12.27272695 8.18181826-20.45454521 20.45454521-20.4545461s20.45454521 8.18181826 20.45454521 20.4545461v284.31818174c0 12.27272695-8.18181826 22.5-20.45454521 22.49999999zM640.86363652 753.36363652c-12.27272695 0-20.45454521-8.18181826-20.45454521-20.45454521v-286.36363652c0-12.27272695 8.18181826-20.45454521 20.45454521-20.4545461s20.45454521 8.18181826 20.45454522 20.4545461v284.31818174c0 12.27272695-8.18181826 22.5-20.45454522 22.49999999z" p-id="4467"></path><path d="M716.54545479 943.59090869H307.45454521c-45 0-81.81818174-36.81818174-81.81818173-81.81818174v-613.63636347h572.72727305v613.63636347c0 45-34.77272695 81.81818174-81.81818174 81.81818174z m-450-654.5454539v572.72727216c0 22.5 18.40909131 40.90909131 40.90909042 40.90909131h409.09090958c22.5 0 40.90909131-18.40909131 40.90909042-40.90909131v-572.72727216H266.54545479z" p-id="4468"></path><path d="M329.95454521 280.86363653c-10.22727305 0-18.40909131-6.13636347-20.45454521-16.36363653 0-4.09090869-2.04545479-10.22727305-2.04545479-16.36363652v-81.81818174c0-45 36.81818174-81.81818174 81.81818174-81.81818174h265.90909131c45 0 81.81818174 36.81818174 81.81818174 81.81818174v81.81818174c0 6.13636347 0 10.22727305-2.04545479 16.36363652-2.04545479 10.22727305-12.27272695 18.40909131-24.5454539 16.36363653-10.22727305-2.04545479-18.40909131-12.27272695-16.36363652-24.54545479V166.31818174c0-22.5-18.40909131-40.90909131-40.90909132-40.90909043H389.27272695c-22.5 0-40.90909131 18.40909131-40.90909043 40.90909043v81.81818173c0 4.09090869 0 6.13636347 2.04545479 10.22727305 2.04545479 10.22727305-4.09090869 22.5-14.31818262 24.54545479-2.04545479-2.04545479-4.09090869-2.04545479-6.13636348-2.04545479z" p-id="4469"></path></svg>,
                click: (floor) => {
                    delFloor(floor.id);
                }
            },

        ]
        return list;
    }
    handleSeletedFloorChild = (id, floorId) => {
        if (!id) return;
        const { setSeletedChildId } = this.props.createStore;;
        setSeletedChildId(id, floorId);
    }

    floorHover = (id) => {
        this.setState({
            hoverId: id
        })
    }

    floorHoverLeave = () => {
        this.setState({
            hoverId: 0
        })
    }

    render() {
        const { floorList, addFloor, addFloorChild, baseFloorItem, slectedFloorId, seletedChildId, baseChildItem, pageFlag, h5Flag } = this.props.createStore;
        const BaseBox = pageFlag === h5Flag ? H5BaseBox : PcBaseBox
        return (
            <Fragment>
                <Content>
                    <Container
                        style={pageFlag === h5Flag ?
                            { width: '375px', border: '1px solid #e4e4e4' } :
                            { width: '100%' }}
                    >
                        {floorList.map((floor, idx) => {
                            const { name, id, props, children } = floor;
                            const floorId = id;
                            const {styles} = floor
                            //pc title 下间距默认为0
                            if(
                                children && 
                                children[0] && 
                                children[0].name == 'PcTitle' &&
                                !props.styles.paddingBottom ){
                                props.styles.paddingBottom = '0px';
                            } 
                            return (
                                <Floor
                                    {...props}
                                    active={id === slectedFloorId}
                                    key={idx}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                    }}
                                    onMouseEnter={() => {
                                        this.floorHover(floorId)
                                    }}
                                    onMouseLeave={this.floorHoverLeave}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        //如果楼层不为空，这返回
                                        //如果楼层 的child
                                        if (children.filter(item => item.name).length) return;
                                        var dragComponentName = e.dataTransfer.getData("dragComponentName");
                                        //pc title paddingBottom, 默认0
                                        const baseFloorObj = baseChildItem;
                                        addFloorChild(id, {
                                            ...baseChildItem,
                                            name: dragComponentName,
                                        })

                                    }}
                                    hasChildren={children.length > 0}
                                >
                                    <Operation isShow={this.state.hoverId === floorId}>
                                        {this.OperationButtons.map((item, idx) => {
                                            const { tex, click } = item;
                                            return (
                                                <OperationButton
                                                    key={idx}
                                                    onClick={() => click(floor)}>{tex}</OperationButton>
                                            )
                                        })}
                                        {/* 显示拖动组件 */}
                                    </Operation>
                                    <BaseBox styles={props.styles}>{
                                        children.map((item, idx) => {
                                            const { name, props = {}, id } = item;
                                             if (!name) return '';
                                            return (
                                                <FloorChild
                                                    className='FloorChild'
                                                    active={id === seletedChildId}
                                                    key={idx}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        e.preventDefault();
                                                        this.handleSeletedFloorChild(id, floorId)
                                                    }
                                                    }>
                                                    {name && PageComponentsMachine.render(name).renderComponent(props || {}) || ''}
                                                </FloorChild>
                                            )
                                        })
                                    }</BaseBox>
                                </Floor>
                            )
                        })}
                        <FlexLine>
                            <AddFloor onClick={() => addFloor(baseFloorItem)}>
                                <svg t="1591420480421" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4014" width="20" height="20"><path d="M954.181818 488.727273c0 11.636364-11.636364 23.272727-23.272727 23.272727H535.272727v418.909091c0 11.636364-11.636364 23.272727-23.272727 23.272727s-23.272727-11.636364-23.272727-23.272727V512H93.090909c-11.636364 0-23.272727-11.636364-23.272727-23.272727s11.636364-23.272727 23.272727-23.272728h395.636364V93.090909c0-11.636364 11.636364-23.272727 23.272727-23.272727s23.272727 11.636364 23.272727 23.272727v372.363636h395.636364c11.636364 0 23.272727 11.636364 23.272727 23.272728z" fill="#666666" p-id="4015"></path></svg>
                                <span style={{ marginLeft: '10px' }}>Add Floor</span>
                            </AddFloor>
                        </FlexLine>
                    </Container>
                </Content>
            </Fragment>
        );
    }
}

export default PageMid;