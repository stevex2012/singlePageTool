import componentMount from "../../lib/componentMount";

import EditH5Img from "./EditH5Img";
import H5Img from "./H5Img";
import H5ImgStyle from "./H5ImgStyle";

const H5ImgRender = componentMount({
    Component:H5Img,
    Content:EditH5Img,
    Style:H5ImgStyle
})

export default {
    componentMount:H5ImgRender,
    name:'H5Img',
    text:'图片'
}