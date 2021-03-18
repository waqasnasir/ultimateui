import React from "react";
import PropTypes from "prop-types";
import { List } from "antd";

const ExpressionList = ({ data }) => {
    return (
        <List
            pagination={{
                pageSize: 5,
            }}
            bordered
            dataSource={data}
            renderItem={item => <List.Item>{item}</List.Item>}
        />
    )
}

ExpressionList.propTypes = {
    data: PropTypes.array,
};

ExpressionList.defaultProps = {
    data: []
}

export default ExpressionList;