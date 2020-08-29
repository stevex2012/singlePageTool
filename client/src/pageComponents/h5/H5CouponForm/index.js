import  componentMount from "../../lib/componentMount";

import EditH5CouponForm from "./EditH5CouponForm";
import H5CouponForm from "./H5CouponForm";
import H5CouponFormStyle from "./H5CouponFormStyle";

const H5CouponFormRender = componentMount({
    Component:H5CouponForm,
    Content:EditH5CouponForm,
    Style:H5CouponFormStyle
})

export default {
    componentMount:H5CouponFormRender,
    name:'H5CouponForm',
    text:'领取code'
}