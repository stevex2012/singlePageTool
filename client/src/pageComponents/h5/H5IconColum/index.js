import componentMount from "../../lib/componentMount";

import H5IconColum from "./H5IconColum";
import EditH5IconColum from "./EditH5IconColum";
import FontStyle from "../../BaseBox/FontStyle";

const H5IconColumRender = componentMount({
    Component:H5IconColum,
    Content:EditH5IconColum,
    Style:FontStyle
})

export default {
    componentMount:H5IconColumRender,
    name:'H5IconColum',
    text:'图标列'
}