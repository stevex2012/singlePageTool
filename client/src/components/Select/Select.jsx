import React,{useState,useEffect} from 'react';
import RCSelecte from 'react-select';
//下拉框组件
/**
 * 
 * @param {*} param0  options = [{value:'xxx',label:'xxx}]
 */
function Select({options=[],onChange=()=>{},defaultValue,placeholder }) {
    const [value,setValue] = useState(defaultValue);
    useEffect(()=>{
        setValue('');
    });
    return (
        <RCSelecte
            value={value || defaultValue}
            placeholder={placeholder}
            onChange={(selectedOption )=>{
                setValue(selectedOption);
                onChange && onChange(selectedOption)
            }}
            options={options}
        />
    );
}

export default Select;