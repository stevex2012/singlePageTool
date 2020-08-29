import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import PageComponentsMachine from '../../pageComponents/pageComponentsMachine';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
const Div = styled.div({
    width: '20%',
    minWidth: '200px',
    paddingRight: '10px',
    background: '#f2f2f2',
    overflow: 'hidden',
    overflowY: 'scroll'
});
const TabTxt = styled.span({
    cursor: 'pointer',
    paddingRight:'10px',
    background: '#f2f2f2',
    overflowY:'scroll'
})
@inject('createStore')
@observer
class PageRight extends Component {
    render() {
        const { seletedData } = this.props.createStore;
        const { name, props } = seletedData;
        //如果楼层 children 有选中，那么就显示children 编辑内容

        const componentsObj = PageComponentsMachine.render(name) || {};
        const { contentComponent, styleComponent, } = componentsObj;
        return (
            <Fragment>
                <Div>
                    <Tabs>
                        <TabList className='firmoo-tab-list'>
                            <Tab className='firmoo-tab' selectedClassName='firmoo-tab-select' style={{ corsur: 'pointer' }}>
                                <TabTxt>内容</TabTxt>
                            </Tab>
                            <Tab className='firmoo-tab' selectedClassName='firmoo-tab-select'>
                                <TabTxt>样式</TabTxt>
                            </Tab>
                        </TabList>
                        <TabPanel>
                            <div style={{ paddingLeft: '10px',paddingBottom:'40px' }}>
                                {contentComponent && contentComponent(props)}
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div style={{ paddingLeft: '10px' }}>
                                {styleComponent && styleComponent(props)}
                            </div>
                        </TabPanel>
                    </Tabs>
                </Div>
            </Fragment>
        );
    }
}


export default PageRight;