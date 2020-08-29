// 编辑 页面
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { CreatePage } from '../components';
import { getPageDetail, savePageData, saveAndPackagePageData } from '../models/createAction';
import { SubButton, Button } from '../style';
import { Link, withRouter } from "react-router-dom";
import { Loading, Modal, Textarea } from '../components/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Div = styled.div({
  position: 'relative',
  height: '100vh',
  boxSizing: 'border-box',
  paddingTop: '80px'
})
//banner
const BannerWraper = styled.div({
  background: '#fff',
  height: '80px',
  borderBottom: '1px solid #e4e4e4',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '20px',
  padding: '0 20px',
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  boxSizing: 'border-box',
  marginBottom: '20px',
});
const Left = styled.div({
  display: 'flex',

});
const Right = styled.div({
  display: 'flex'

});
const TopTxt = styled.div(({ ac }) => ({
  margin: '0 10px',
  cursor: 'pointer',
  color: '#21AC4E',
  padding: '5px 0',
  position: 'relative',
  '&::after': {
    content: `''`,
    position: 'absolute',
    height: '2px',
    width: '40px',
    background: ac ? '#21AC4E' : '#fff',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto'
  }
}));


const LogoImg = styled.img({
  width: '100px'
})
const UploadHref = styled.a({
  marginLeft: '40px',
  marginTop: '5px'
})

@withRouter
@inject('createStore')
@observer
class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      buildHtml: '',
      show: false
    }
  }
  handleReview = () => {
    console.log('预览');

    const { preview } = this.props.createStore;
    preview()

  }
  showLoading() {
    this.setState({
      loading: true
    })
  }
  hideLoading() {
    this.setState({
      loading: false
    })
  }
  handleRecord = () => {
    this.showLoading()
    const id = this.props.match.params.id;
    const { pcFloorList, h5FloorList } = this.props.createStore;
    const component_json = JSON.stringify({
      pc: pcFloorList,
      h5: h5FloorList
    });
    const sendData = {
      template_id: id,
      component_json
    }
    console.log('sendData', sendData);
    savePageData(sendData)
      .then(data => {
        toast("保存成功", {
          type: 'success'
        });
      })
      .catch(e => {
        toast("保存失败，请稍后重试", {
          type: 'error'
        });
      })
      .finally(() => {
        this.hideLoading();
      })
  }
  getBody(content) {
    var REG_BODY = /<body[^>]*>([\s\S]*)<\/body>/;
    var subStr=/steveroot/ig;
    const _content = content.replace(subStr,`steveroot-${new Date().getTime()}`)
    var result = REG_BODY.exec(_content);
    if (result && result.length === 2)
      return result[1];
    return _content;
  }
  //验证保存和导出
  vertifyBuild = () => {
    toast("确保pc端和h5端页面都有内容！", {
      type: 'info'
    });
  }
  handleExport = () => {
    const { pcFloorList, h5FloorList } = this.props.createStore;
    const id = this.props.match.params.id;
    if (!id) return;
    if (!pcFloorList.length || !h5FloorList.length) return this.vertifyBuild();
    this.showLoading();
    const buildData = {
      template_id: id,
      component_json: JSON.stringify({
        pc: pcFloorList,
        h5: h5FloorList
      })
    };
    return saveAndPackagePageData(buildData)
      .then(data => {
        const { html_content } = data;
        if (!html_content) return;
        this.setState({
          show: true,
          buildHtml: this.getBody(html_content)
        })
        toast("打包成功，复制打包内容到站内方案！", {
          type: 'success'
        });
      })
      .catch((e) => {
        console.log(e);
        toast("打包失败，请稍后重试！", {
          type: 'error'
        });
      })
      .finally(() => {
        this.hideLoading();
      })
  }
  componentWillUnmount() {
    //更新数据 先清空
    const { pcFloorList, h5FloorList, resetFloorData } = this.props.createStore;
    resetFloorData();
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    const { pcFloorList, h5FloorList } = this.props.createStore;
    //获取 方案详情数据
    getPageDetail(id)
      .then((data) => {
        if (!data) return;
        const { component_json = {} } = data;
        const { pc = [], h5 = [] } = component_json;
        //更新数据 先清空
        pcFloorList.push(...pc);
        h5FloorList.push(...h5);
      })
      .catch(e => {
        console.log(e);
        toast("获取 方案详情数据失败，请刷新重试!", {
          type: 'error'
        });
      })
      .finally(() => {
        this.hideLoading();
      })
  }
  render() {
    const { pageFlag, changePcpage, pcFlag, h5Flag } = this.props.createStore;
    const { buildHtml, loading, show } = this.state;
    return (
      <Div>
        {/* 顶部 */}
        <BannerWraper>
          <Left>
            <TopTxt ac={pageFlag === pcFlag} onClick={() => changePcpage(pcFlag)}>PC端</TopTxt>
            <TopTxt ac={pageFlag === h5Flag} onClick={() => changePcpage(h5Flag)}>手机端</TopTxt>
            <UploadHref href="https://service.firmoo.com/mall/upload" target="_blank">
              <SubButton>上传图片</SubButton>
            </UploadHref>
          </Left>
          <Link to='/'>
            <LogoImg src='https://df5apg8r0m634.cloudfront.net/images/67641c35bd8787035646bc565c2d441f.png' />
          </Link>
          <Right>
            <Link to='/preview' target='_blank'>
              <Button onClick={this.handleReview}>预览</Button>
            </Link>
            <Button onClick={this.handleRecord} style={{ margin: '0 20px' }}>保存</Button>
            <Button onClick={this.handleExport}>保存并导出</Button>
          </Right>
        </BannerWraper>
        {/* 内容区 */}
        <CreatePage />
        <Modal
          visible={show}
          onClose={() => this.setState({ show: false })}>
          <Textarea disabled styles={{ width: '50vw', height: '300px', margin: '15px' }}>{buildHtml}</Textarea>
        </Modal>
        {/* loadding */}
        <Modal
          hascloseBtn={false}
          visible={loading}
          onClose={() => this.setState({ loading: false })}>
          <Loading />
        </Modal>
        <ToastContainer />
      </Div>
    )
  }
}

export default Create
