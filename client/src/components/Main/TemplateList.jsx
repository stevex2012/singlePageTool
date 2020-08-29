import React,{ Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.table({
    width:'100%'
})

const TableRH = styled.tbody({
    background:'#f2f2f2'
})
const TableR = styled.tr({

})

const TableD = styled.td({
    padding:'10px'
})
const TableH = styled.td({
    padding:'10px'
})

const ModeBtn = styled.span({
    color:'#21AC4E',
    fontSize:'16px',
    padding:'0 10px',
    cursor:'pointer'
})

class TemplateList extends Component{
    render() {
        const {list,onDelete,onRename} = this.props
        if(list.length < 1){
            return ''
        }
        return (
            <React.Fragment>
                <Container border='1'>
                    <TableRH>
                        <TableH>方案名称</TableH>
                        <TableH>最近一次修改时间</TableH>
                        <TableH>操作</TableH>
                    </TableRH>
                    {
                        list.map((item,index)=>(
                         <TableR key={index}>
                            <TableD>{item.name}</TableD>
                            <TableD>{item.update_time}</TableD>
                            <TableD>
                                <Link to={`/create/${item.id}`}><ModeBtn>编辑</ModeBtn></Link>
                                <ModeBtn onClick={()=>{onRename(item)}}>重命名</ModeBtn>
                                <ModeBtn onClick={()=>{onDelete(item)}}>删除</ModeBtn>
                            </TableD>
                        </TableR>
                        ))
                    }
                </Container>
            </React.Fragment>
        );
    }
}

export default TemplateList