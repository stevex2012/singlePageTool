import componentMount from "../../lib/componentMount";

import H5IconRow from "./H5IconRow";
import EditH5IconRow from "./EditH5IconRow";
import FontStyle from "../../BaseBox/FontStyle";

const H5IconRowRender = componentMount({
    Component:H5IconRow,
    Content:EditH5IconRow,
    Style:FontStyle
})

export default {
    componentMount:H5IconRowRender,
    name:'H5IconRow',
    text:'图标行（2元素）'
}