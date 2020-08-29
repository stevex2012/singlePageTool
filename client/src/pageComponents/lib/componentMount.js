
import React from 'react';

export default function componentMount({Component,Content,Style}){
    return {
        renderComponent: (props) => <Component {...props} />,
        contentComponent: (props) => <Content {...props} />,
        styleComponent: (props) => <div>
            <Style {...props} />
        </div>
    }
}