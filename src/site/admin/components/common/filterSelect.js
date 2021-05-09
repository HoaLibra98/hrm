import { Select } from "antd";
import React from "react";
const { Option } = Select;
function index({
  listData,
  checkValidate,
  valueError,
  searchEmployee,
  noFillAll,
  ...rest
}) {
  return (
    <>
      <Select
        {...rest}
        allowClear
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children
            .toLowerCase()
            .unsignText()
            .indexOf(input.toLowerCase().unsignText()) >= 0
        }
      >
        {/* {noFillAll ? null : <Option value={null}>Tất cả</Option>} */}
        {searchEmployee
          ? (listData || []).map((item, index) => {
              return (
                <Option key={index} value={item.id}>
                  {item.ten + " / " + item.isofhEmail}
                </Option>
              );
            })
          : (listData || []).map((item, index) => {
              return (
                <Option key={index} value={item.id}>
                  {item.ten}
                </Option>
              );
            })}
      </Select>
      {checkValidate ? <div className="validate">{valueError}</div> : null}
    </>
  );
}
export default index;
