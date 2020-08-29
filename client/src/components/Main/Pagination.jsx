import React,{ Component } from "react";

import RcPagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { FlexLine } from "../../style";


class Pagination extends Component{
    render() {
        const {onChange,page,total,per_page} = this.props
        return (
             <FlexLine style={{marginTop:'60px'}}>
                 <RcPagination className={'my-pagination'} onChange={onChange} pageSize ={per_page} current={page} total={total}/>
             </FlexLine>
        );
    }
}

export default Pagination