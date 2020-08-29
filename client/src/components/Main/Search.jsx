import React, { Component } from 'react'
import styled from 'styled-components'

const Input = styled.input({
  border:'1px solid #e4e4e4',
  padding:'15px',
  width:'300px',
  background:'#fff',
  borderRadius:'4px',
  paddingRight: '30px'
})  

const Container = styled.div({
    position:'relative'
})

const SerachBtn = styled.div({
  position:'absolute',
  top:0,
  bottom:0,
  right:0,
  padding:'10px',
  margin:'auto',
  paddingTop: '13px',
  cursor: 'pointer'
})

class Search extends Component {

  onSubmit = (e)=>{
    e.preventDefault();
    this.props.onSearch()
    return
  }

  render() {
    const { value,onChange,onSearch } = this.props
    return (
        <Container>
          <form onSubmit={this.onSubmit}>
            <Input placeholder='输入方案名称' value={value} onChange={onChange}/>
              <SerachBtn onClick={onSearch}>
                <svg t="1591261719889" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4010" width="20" height="20"><path d="M465.454545 861.090909c-218.763636 0-395.636364-176.872727-395.636363-395.636364S246.690909 69.818182 465.454545 69.818182s395.636364 176.872727 395.636364 395.636363-176.872727 395.636364-395.636364 395.636364z m0-744.727273C272.290909 116.363636 116.363636 272.290909 116.363636 465.454545s155.927273 349.090909 349.090909 349.09091 349.090909-155.927273 349.09091-349.09091S658.618182 116.363636 465.454545 116.363636zM930.909091 954.181818c-6.981818 0-11.636364-2.327273-16.290909-6.981818l-186.181818-186.181818c-9.309091-9.309091-9.309091-23.272727 0-32.581818s23.272727-9.309091 32.581818 0l186.181818 186.181818c9.309091 9.309091 9.309091 23.272727 0 32.581818-4.654545 4.654545-9.309091 6.981818-16.290909 6.981818z" p-id="4011"></path></svg>
             </SerachBtn>
          </form>
        </Container>
    )
  }
}

export default Search
