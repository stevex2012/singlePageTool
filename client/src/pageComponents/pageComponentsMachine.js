// //组件注册机制 componentsMachine
// 1.注册全部组件
// 2.根据组件名，render 组件
// 3，渲染对应的 编辑组件
import React from 'react';
import {
    PcTitle,
    EditPcTitle,
    PcText,
    EditPcText,
    PcListText,
    EditPcListText,
    PcImg,
    EditPcImg,
    PcImgTextColumn,
    EditPcImgTextColumn,
    PcIconColumn,
    EditPcIconColumn,
    PcSwiperImg,
    EditPcSwiperImg,
    EditPcSwiperImgStyles,
    PcImgAndText,
    EditPcImgAndText,
    PcUserShow,
    EditPcUserShow,
    EditPcUserShowStyles,
    PcCouponForm,
    EditPcCouponForm,
    EditPcCouponFormStyles,
    PcRule,
    EditPcRule
} from './pc/index';

import {
    H5Title,
    H5Text,
    H5Img,
    H5IconColum,
    H5IconRow,
    H5SwiperImg,
    H5UserShow,
    H5Rule,
    H5CouponForm,
    H5Icon3Row
} from "./h5/Index";

import EditBaseBox from './BaseBox/EditBaseBox';
import BaseStyle from './BaseBox/BaseStyle';
//pc list
const PcComponentsList = [
    {
        text: '标题',
        name: 'PcTitle'
    },
    {
        text: '文本',
        name: 'PcText'
    },
    {
        text: '文本列',
        name: 'PcListText'
    },
    {
        text: '图片',
        name: 'PcImg'
    },
    {
        text: '图文栏',
        name: 'PcImgTextColumn'
    },
    {
        text: '图标栏',
        name: 'PcIconColumn'
    },
    {
        text: '轮播图',
        name: 'PcSwiperImg'
    },
    {
        text: '左图右文/右图左文',
        name: 'PcImgAndText'
    },
    {
        text: '用户评论',
        name: 'PcUserShow'
    },
    {
        text: '领取code',
        name: 'PcCouponForm'
    },
    {
        text: '规则说明',
        name: 'PcRule'
    }


];
// h5 componets list
const H5ComponentsList = [
    {
        text: H5Title.text,
        name: H5Title.name
    }, {
        text: H5Text.text,
        name: H5Text.name
    }, {
        text: H5Img.text,
        name: H5Img.name
    }, {
        text: H5IconColum.text,
        name: H5IconColum.name
    }, {
        text: H5IconRow.text,
        name: H5IconRow.name
    },{
        text:H5Icon3Row.text,
        name:H5Icon3Row.name
    }, {
        text: H5SwiperImg.text,
        name: H5SwiperImg.name
    }, {
        text: H5UserShow.text,
        name: H5UserShow.name
    }, {
        text: H5Rule.text,
        name: H5Rule.name
    }, {
        text: H5CouponForm.text,
        name: H5CouponForm.name
    }
];
class PageComponentsMachine {
    PcComponentsList = PcComponentsList;
    H5ComponentsList = H5ComponentsList;
    get componentsMap() {//组件map
        return {
            'PcBaseBox': {
                renderComponent: () => '',
                contentComponent: () => '',
                styleComponent: (props) => <EditBaseBox {...props} notShowStyles={['fontSize', 'color', 'textAlign', 'fontWeight', 'fontStyle', 'textDecoration']} />,
            },
            'H5BaseBox': {
                renderComponent: () => '',
                contentComponent: () => '',
                styleComponent: (props) => <BaseStyle {...props} />,
            },
            'PcTitle': {
                renderComponent: (props) => <PcTitle {...props} />,
                contentComponent: (props) => <EditPcTitle {...props} />,
                styleComponent: (props) => <EditBaseBox {...props} notShowStyles={['padding', 'margin', 'backgroundColor']} />
            },
            'PcText': {
                renderComponent: (props) => <PcText {...props} />,
                contentComponent: (props) => <EditPcText {...props} />,
                styleComponent: (props) => <EditBaseBox {...props} notShowStyles={['padding', 'margin', 'backgroundColor']} />
            },
            'PcListText': {
                renderComponent: (props) => <PcListText {...props} />,
                contentComponent: (props) => <EditPcListText {...props} />,
                styleComponent: (props) => <EditBaseBox {...props} notShowStyles={['padding', 'margin', 'backgroundColor']} />
            },
            'PcImg': {
                renderComponent: (props) => <PcImg {...props} />,
                contentComponent: (props) => <EditPcImg {...props} />,
                styleComponent: (props) => '',
            },
            'PcImgTextColumn': {
                renderComponent: (props) => <PcImgTextColumn {...props} />,
                contentComponent: (props) => <EditPcImgTextColumn {...props} />,
                styleComponent: (props) => <EditBaseBox {...props} notShowStyles={['padding', 'margin', 'backgroundColor','fontSize','fontWeight','textDecoration','textAlign']} />
            },
            'PcIconColumn': {
                renderComponent: (props) => <PcIconColumn {...props} />,
                contentComponent: (props) => <EditPcIconColumn {...props} />,
                styleComponent: (props) => <EditBaseBox {...props} notShowStyles={['padding', 'margin', 'backgroundColor']} />
            },
            'PcSwiperImg': {
                renderComponent: (props) => <PcSwiperImg {...props} />,
                contentComponent: (props) => <EditPcSwiperImg {...props} />,
                styleComponent: (props) => <EditPcSwiperImgStyles {...props} />
            },
            'PcImgAndText': {
                renderComponent: (props) => <PcImgAndText {...props} />,
                contentComponent: (props) => <EditPcImgAndText {...props} />,
                styleComponent: (props) => <EditBaseBox {...props} notShowStyles={['padding', 'margin', 'backgroundColor','fontSize','fontWeight','textDecoration','textAlign']} />
            },
            'PcUserShow': {
                renderComponent: (props) => <PcUserShow {...props} />,
                contentComponent: (props) => <EditPcUserShow {...props} />,
                styleComponent: (props) => <EditPcUserShowStyles {...props} />
            },
            'PcCouponForm': {
                renderComponent: (props) => <PcCouponForm {...props} />,
                contentComponent: (props) => <EditPcCouponForm {...props} />,
                styleComponent: (props) => <EditPcCouponFormStyles {...props} />
            },
            'PcRule': {
                renderComponent: (props) => <PcRule {...props} />,
                contentComponent: (props) => <EditPcRule {...props} />,
                styleComponent: (props) => <EditBaseBox {...props} notShowStyles={['padding', 'margin', 'backgroundColor']} />
            },
            'H5Title': H5Title.componentMount,
            'H5Text': H5Text.componentMount,
            'H5Img': H5Img.componentMount,
            'H5IconColum': H5IconColum.componentMount,
            'H5IconRow': H5IconRow.componentMount,
            'H5SwiperImg': H5SwiperImg.componentMount,
            'H5UserShow': H5UserShow.componentMount,
            'H5Rule': H5Rule.componentMount,
            'H5CouponForm': H5CouponForm.componentMount,
            'H5Icon3Row':H5Icon3Row.componentMount
        }
    }

    render(name) {
        return this.componentsMap[name];
    }
}

export default new PageComponentsMachine();
