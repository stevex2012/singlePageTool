import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import { FlexLine, Button } from '../style'
import Search from '../components/Main/Search'
import TemplateList from '../components/Main/TemplateList'
import Pagination from '../components/Main/Pagination'

import { getTemplateList,searchTemplate,deleteTemplate,renameTemplate,createTemplate } from "../models/template";
import Loading from '../components/Loading'
import CreateTemplateModal from '../components/Main/CreateTemplateModal'
import DeleteTemplateModal from '../components/Main/DeleteTemplateModal'


const Header = styled.div({
  padding:'20px 30px',
  borderBottom:'1px solid #e4e4e4'
})

const ListContainer = styled.div({
  padding:'60px 30px'
})
@inject('homeStore')
@observer
class Index extends Component {

  state = {
    search:'',
    list:[],
    page:1,
    per_page:20,
    total:0,
    reNameItem:0,
    onSearch:false,
    modalVisible:false,
    isShowDeleteModal:false,
    deleteItem:{}
  }

  componentWillMount(){
    this.getList()
  }

  getList = ()=>{
    this.setState({
      loading:true
    })
    getTemplateList({
      page:this.state.page,
      per_page:this.state.per_page
    }).then((arg)=>{
      const {list,pagination} = arg
      this.setState({
        list:list,
        total:pagination.total,
        loading:false
      })
    }).catch((e)=>{
      this.setState({
        loading:false
      })
      console.log('获取列表失败',e);
    })
  }

  onChange = (e)=>{
    const {value} = e.target
    this.setState({
      search:value
    },()=>{
      if(!value && this.state.onSearch){
        this.onSearch()
      }
    })
    
  }


  onSearch = ()=>{
    this.setState({
      loading:true,
      page:1,
      onSearch:this.state.search ? true : false
    })
    searchTemplate({
      page:1,
      per_page:this.state.per_page,
      search:this.state.search
    }).then((arg)=>{
      const {list,pagination} = arg
      this.setState({
        list:list,
        total:pagination.total,
        loading:false
      })
    }).catch((e)=>{
      this.setState({
        loading:false
      })
      console.log('获取列表失败',e);
    })
  }

  pageChange = (page)=>{
    this.setState({
      page
    },()=>{
      this.getList()
    })
  }

  deleteItem = (item)=>{
    this.setState({
      deleteItem:item
    })
    this.toggerDeleteModal()
  }

  onDelete = ()=>{
    deleteTemplate({id:this.state.deleteItem.id}).then(()=>{
      this.toggerDeleteModal()
      this.getList()
    }).catch((e)=>{
      console.log('删除失败',e);
    })
  }

  toggerModal = ()=>{
    this.setState(preState =>({
      modalVisible:!preState.modalVisible
    }))
  }

  toggerDeleteModal = ()=>{
    this.setState(preState =>({
      isShowDeleteModal:!preState.isShowDeleteModal
    }))
  }

  creatModalSubmi = ({name,id})=>{
    this.toggerModal()
    if(id){
      //重命名
      renameTemplate({name,id}).then(()=>{
        this.getList()
      })
    }else{
      //创建方案
      createTemplate({name}).then((arg)=>{
        this.setState({
          page:1
        },()=>{
          if(arg.id){
            window.location.href = `/create/${arg.id}`
            return
          }
          this.getList()
        })
      })
    }
  }
  //打开重命名弹窗
  onRename = (reNameItem)=>{
    this.setState({
      reNameItem:reNameItem
    },()=>{
      this.toggerModal()
    })
  }

  render() {
    const { list, page, per_page,total } = this.state
    return (
      <div>
        <Header>
          <FlexLine justify='space-between'>
            <Button onClick={()=>{
              this.setState({
                reNameItem:{}
              },()=>{
                this.toggerModal()
              })
            }}>+ 新建方案</Button>
            <Search value={this.state.search} onChange={this.onChange} onSearch={this.onSearch}/>
          </FlexLine>
          
        </Header>
        <ListContainer>
          {
            this.state.loading ? <Loading/> :  
              <TemplateList 
                list={list} 
                onDelete={this.deleteItem}
                onRename={this.onRename}
              ></TemplateList>
          }
         {total > per_page && 
          <Pagination 
            page={page}  
            total={total} 
            per_page={per_page}
            onChange={this.pageChange}
          />}
        </ListContainer>
        {this.state.modalVisible && 
          <CreateTemplateModal 
            reNameItem={this.state.reNameItem}
            onSubmi={this.creatModalSubmi}
            visible={this.state.modalVisible} 
            onClose={this.toggerModal}/>}
        {this.state.isShowDeleteModal && 
          <DeleteTemplateModal 
            name={this.state.deleteItem.name}
            onSubmi={this.onDelete}
            visible={this.state.isShowDeleteModal} 
            onClose={this.toggerDeleteModal}/>}
      </div>
    )
  }
}

export default Index
