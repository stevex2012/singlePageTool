import  componentMount from "../../lib/componentMount";

import EditH5Rule from "./EditH5Rule.jsx";
import H5Rule from "./H5Rule";
import FontStyle from "../../BaseBox/FontStyle";

const H5RuleRender = componentMount({
    Component:H5Rule,
    Content:EditH5Rule,
    Style:FontStyle
})

export default {
    componentMount:H5RuleRender,
    name:'H5Rule',
    text:'规则说明'
}