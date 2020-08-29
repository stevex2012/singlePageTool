import componentMount from "../../lib/componentMount";

import EditH5Title from "./EditH5Title";
import H5Title from "./H5Title";
import FontStyle from "../../BaseBox/FontStyle";

const H5TitleRender = componentMount({
    Component:H5Title,
    Content:EditH5Title,
    Style:FontStyle
})

export default {
    componentMount:H5TitleRender,
    name:'H5Title',
    text:'标题'
}