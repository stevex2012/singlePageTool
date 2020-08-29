//全局通用样式
import styled from 'styled-components'

const FlexLine = styled.div(({align = 'center',justify='center',column = false,style = {}}) =>({
    display:'flex',
    width:'100%',
    alignItems:align,
    justifyContent:justify,
    flexDirection:column ? 'column' : 'row',
    ...style
  }))


  const Button = styled.div(({style = {},disable}) =>({
    padding:'5px 20px',
    backgroundColor:disable ? '#DFDFDF' : '#21AC4E',
    color:'#fff',
    fontSize:'16px',
    borderRadius:'4px',
    textAlign:'center',
    cursor: 'pointer',
    border:disable ? '1px solid #DFDFDF' :'1px solid #21AC4E',
    '&:hover': {
        backgroundColor:disable ? '#DFDFDF' : '#fff',
        color:disable ? '#fff' : '#21AC4E',
        border:disable ? '1px solid #DFDFDF' :'1px solid #21AC4E',
    },
    ...style
  }))

  const SubButton = styled.div(({style = {},disable}) =>({
    padding:'5px 20px',
    backgroundColor:disable ? '#DFDFDF' :'#fff',
    color:disable ? '#fff' :'#21AC4E',
    fontSize:'16px',
    border:disable ? '1px solid #DFDFDF' :'1px solid #21AC4E',
    borderRadius:'4px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor:disable ? '#DFDFDF' :'#21AC4E',
        color:disable ? '#fff' :'#fff',
        border:disable ? '1px solid #DFDFDF' :'1px solid #21AC4E',
    },
    ...style
  }))

  const Input = styled.input(({style={}})=>({
    border:'1px solid #e4e4e4',
    padding:'10px',
    background:'#fff',
    borderRadius: '4px',
    ...style
  }))

  const TextArea = styled.textarea(({style={}})=>({
    border:'1px solid #e4e4e4',
    padding:'10px',
    background:'#fff',
    minHeight:'100px',
    borderRadius: '4px',
    ...style
  }))

  const ContentTitle = styled.p(({style={}})=>({
    fontSize:'14px',
    color:'#333',
    marign:0,
    marginBottom:'10px',
    ...style
  }))

  const RemindText = styled.p(({style={}})=>({
    fontSize:'12px',
    marign:0,
    marginTop:'5px',
    color:'red',
    ...style
  }))

  export {
    FlexLine,
    Button,
    SubButton,
    Input,
    TextArea,
    ContentTitle,
    RemindText
  }

  