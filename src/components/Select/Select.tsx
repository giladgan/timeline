import React from 'react';
import { Select } from 'antd';
const { Option } = Select;
export interface selectProps {
    // children: JSX.Element | JSX.Element[];
    // // important?: boolean;
    // items?: never[
    //     { 
    //     text: string;
    //     value: string
    //      }
    //     ]
}
function GuiSelect({ items,defaultValue,size='large',onChange:onParentC }: any) {
    function onChange(value:any) {
        onParentC(value)
    }

    function onBlur() {
        console.log('blur');
    }

    function onFocus() {
        console.log('focus');
    }

    function onSearch(val: any) {
        console.log('search:', val);
    }

    return (
        <div>{defaultValue}
        <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            value={defaultValue}
            size={size}
        >
            {items.map(({ value, text }:any, index:any) => (<Option value={value} key={`opt${index}`}>{text}</Option>
            ))}
        </Select></div>
    );
}

export default GuiSelect;
