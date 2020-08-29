import  componentMount from "../../lib/componentMount";

import EditH5UserShow from "./EditH5UserShow";
import H5UserShow from "./H5UserShow";
import H5UserShowStyle from "./H5UserShowStyle";

const H5UserShowRender = componentMount({
    Component:H5UserShow,
    Content:EditH5UserShow,
    Style:H5UserShowStyle
})

export default {
    componentMount:H5UserShowRender,
    name:'H5UserShow',
    text:'用户评论'
}