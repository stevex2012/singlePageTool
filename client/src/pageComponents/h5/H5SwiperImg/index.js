import  componentMount from "../../lib/componentMount";

import EditH5SwiperImg from "./EditH5SwiperImg";
import H5SwiperImg from "./H5SwiperImg";
import H5SwiperImgStyle from "./H5SwiperImgStyle";

const H5SwiperImgRender = componentMount({
    Component:H5SwiperImg,
    Content:EditH5SwiperImg,
    Style:H5SwiperImgStyle
})

export default {
    componentMount:H5SwiperImgRender,
    name:'H5SwiperImg',
    text:'轮播图'
}