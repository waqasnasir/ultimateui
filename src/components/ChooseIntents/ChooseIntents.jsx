import React, { useState } from "react";
import { Modal } from "antd";
import TableTransfer from "../TransferTable/TransferTable";
import { intentsData } from "../../constants";
import ExpressionList from "../ExpressionsList/ExpressionsList";

const leftTableColumns = [
  {
    dataIndex: "name",
    title: "Intent Name",
  },
  {
    dataIndex: "description",
    title: "Description",
  },
  {
    dataIndex: ["trainingData", "expressions", "0", "text"],
    title: "Sample Expression",
  },
  {
    dataIndex: ["reply", "text"],
    title: "Response Message",
  },
  {
    dataIndex: ["trainingData", "expressionCount"],
    title: "Expression Count",
  },
];

const ChooseIntents = () => {
  const [targetKeys, setTargetKeys] = useState([]); // row ids to be moved to right column
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [expressionList, setExpresionList] = useState([]); // expressions list to be shown in modal

  const onChange = nextTargetKeys => {
    setTargetKeys(nextTargetKeys);
  };

  const action = {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <a onClick={() => onShowAllExpr(record)}>View All Expressions</a>
    ),
  };

  // fetch expressions list for an intent and show them in modal
  const onShowAllExpr = (record) => {
    const { trainingData = {} } = record;
    const { expressions = [] } = trainingData;
    const exprList = expressions.map(exp => exp.text); 
    setExpresionList(exprList);
    setIsModalVisible(true);
  }

  // function to support search functionality in table
  const filterOption = (inputValue, option) => {
    const value = inputValue.toLowerCase();
    const { name = '', description = '' } = option;
    const nameMatched = name.toLowerCase().indexOf(value) > -1;
    const descriptionMatched = description.toLowerCase().indexOf(value) > -1;
    return nameMatched || descriptionMatched; // search in both name and description
  };

  const columnsWithActions = [...leftTableColumns, action];

  return (
    <>
      <h1>Choose Intents For Your Bot</h1>
      <TableTransfer
        rowKey={record => record.id}
        titles={["Available Intents", "Your Intents"]}
        dataSource={intentsData}
        targetKeys={targetKeys}
        showSearch={true}
        filterOption={filterOption}
        onChange={onChange}
        leftColumns={columnsWithActions}
        rightColumns={columnsWithActions}
      />
      <Modal title="Expressions List" visible={isModalVisible} onOk={() => setIsModalVisible(false)} onCancel={() => setIsModalVisible(false)}>
        <ExpressionList data={expressionList} />
      </Modal>
    </>
  );
}
export default ChooseIntents;
