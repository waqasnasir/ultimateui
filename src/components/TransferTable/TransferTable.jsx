import { Transfer, Table } from 'antd';
import PropTypes from "prop-types";
import difference from 'lodash/difference';

// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;

      const rowSelection = {
        getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter(item => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          pagination={{ pageSize: 5 }}
          style={{ pointerEvents: listDisabled ? 'none' : null }}
        />
      );
    }}
  </Transfer>
);

TableTransfer.propTypes = {
  rowKey: PropTypes.string,
  titles: PropTypes.array,
  dataSource: PropTypes.array,
  targetKeys: PropTypes.array,
  showSearch: false,
  filterOption: PropTypes.func,
  onChange: PropTypes.func,
  leftColumns: PropTypes.array,
  rightColumns: PropTypes.array,
};

TableTransfer.defaultProps = {
  rowKey: 'key',
  titles: ["Left Col", "Right Col"],
  dataSource: [],
  targetKeys: [],
  showSearch: false,
  filterOption: () => { },
  onChange: () => { },
  leftColumns: [],
  rightColumns: []
}

export default TableTransfer;