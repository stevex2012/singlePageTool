import  componentMount from "../../lib/componentMount";

import EditH5Text from "./EditH5Text";
import H5Text from "./H5Text";
import FontStyle from "../../BaseBox/FontStyle";

const H5TextRender = componentMount({
    Component:H5Text,
    Content:EditH5Text,
    Style:FontStyle
})

export default {
    componentMount:H5TextRender,
    name:'H5Text',
    text:'文本'
}