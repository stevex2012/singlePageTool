import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PageComponentsMachine from '../pageComponents/pageComponentsMachine';
import H5BaseBox from "../pageComponents/h5/H5BaseBox/H5BaseBox";
import PcBaseBox from "../pageComponents/pc/PcBaseBox/PcBaseBox";

@inject('viewStore')
@observer
class Preview extends Component{

    state ={
        isH5:false
    }
    componentWillMount(){
        const width = document.body.clientWidth
        this.setState({
            isH5:width < 500
        })
        
    }

    componentDidMount (){
        let html_json = localStorage.getItem('html_json')
        const { setHtmlJson } = this.props.viewStore
        if(html_json){
            setHtmlJson(JSON.parse(html_json))
        }
    }
    render() {
        const {html_json } = this.props.viewStore
        console.log('html_json',JSON.parse(JSON.stringify(html_json)));
        const {pc = [],h5 = []} = html_json
        return (
            <div>
                {
                this.state.isH5 ? 
                <React.Fragment>
                    {
                        h5.map((arg,key)=>{
                            return (
                                <H5BaseBox key={key} styles={arg.props.styles}>
                                    {
                                        arg.children.map((item, idx) => {
                                            const { name, props = {}, id } = item;
                                            if (!name) return '';
                                            return (
                                                <div key={idx}>
                                                    {name && PageComponentsMachine.render(name).renderComponent(props || {}) || ''}
                                                </div>
                                            )
                                        })
                                    }
                                </H5BaseBox>
                            )
                        })
                    }
                </React.Fragment>
                :
                <React.Fragment>
                    {
                        pc.map((arg,key)=>(
                            <PcBaseBox key={key} styles={arg.props.styles}>
                                {
                                    arg.children.map((item, idx) => {
                                        const { name, props = {}, id } = item;
                                        if (!name) return '';
                                        return (
                                            <div key={idx}>
                                                {name && PageComponentsMachine.render(name).renderComponent(props || {}) || ''}
                                            </div>
                                        )
                                    })
                                }
                            </PcBaseBox>
                        ))
                    }
                </React.Fragment>
                }
            </div>
        );
    }
}

export default Preview;