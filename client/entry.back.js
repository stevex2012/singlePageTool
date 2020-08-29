import React from 'react';
import ReactDOM from 'react-dom';

// import pageComponentsMachine from '../src/pageComponents/pageComponentsMachine';
import PcTitle from './src/pageComponents/pc/PcTitle/PcTitle.jsx';
// import BaseBox from '../src/pageComponents/BaseBox/BaseBox';
const testData = {
    h5: [],
    pc: [
        {
            id: 1591336551822,
            name: "BaseBox",
            props: {
                styles: {}
            },
            children: [
                {
                    id: 1591336557656,
                    name: "PcTitle",
                    props: {
                        title: "title -1",
                        styles: {
                            color: '#d32727'
                        }
                    }
                }
            ]
        },
        {
            id: 1591336567489,
            name: "BaseBox",
            props: {
                styles: {}
            },
            children: [
                {
                    id: 1591336568865,
                    name: "PcTitle",
                    props: {
                        title: "title -2",
                        styles: {
                            color: '#1c9224'
                        }
                    }
                }
            ]
        }
    ]
}
function getPcContent(data) {
    return (
        <div>{ //renderComponent contentComponent styleComponent
            data.map((floor, idx) => {
                const {children,props,name} = floor;
                return <div {...props}>
                    {
                        children.map(child=>{
                            const {props,name} = child;
                            // const {renderComponent} = pageComponentsMachine(name);
                            return <PcTitle {...props}/>
                        })
                    }
                </div>
            })
        }</div>
    )
}
function getH5Content(data) {
    const { pc, h5 } = data;
    return '';
}
// const sheet = new ServerStyleSheet();
// sheet.collectStyles(<App />);

const App = function () {
    //根据 数据动态生成
    return (
        <div>
            {/* {getPcContent(testData.pc)} */}
            <PcTitle />
        </div>
    )
}
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('steveroot')
);