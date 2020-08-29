import componentMount from "../../lib/componentMount";

import H5Icon3Row from "./H5Icon3Row";
import EditH5Icon3Row from "./EditH5Icon3Row";
import FontStyle from "../../BaseBox/FontStyle";

const H5Icon3RowRender = componentMount({
    Component:H5Icon3Row,
    Content:EditH5Icon3Row,
    Style:FontStyle
})

export default {
    componentMount:H5Icon3RowRender,
    name:'H5Icon3Row',
    text:'图标行（3元素）'
}