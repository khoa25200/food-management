import React, { useCallback, useEffect, useState } from 'react';
import './TableEditable.less';
import { Button, Form, Popconfirm, Space } from 'antd';
import { useMounted } from '~/utils/useMounted';
import TableEditableCell from './TableEditableCell';
import { Table } from '../table/Table';

const getInputType = (dataIndex) => {
  if (dataIndex === 'price') {
    return 'number'; // Xử lý trường hợp số
  }
  if (dataIndex === 'image') {
    return 'image'; // Xử lý trường hợp hình ảnh
  }
  return 'text'; // Các trường hợp còn lại
};

function TableEditable({
  initialPagination = { current: 0, pageSize: 10 },
  getEditableTableData,
  columnsPre,
  callUpdateApi,
  callDeleteApi,
}) {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState({
    data: [],
    pagination: initialPagination,
    loading: false,
  });
  const [editingKey, setEditingKey] = useState(null);
  const { isMounted } = useMounted();

  const fetch = useCallback(
    async (pagination) => {
      setTableData((prev) => ({ ...prev, loading: true }));

      const result = await getEditableTableData(pagination);
      if (isMounted.current) {
        setTableData({
          data: result.data,
          pagination: {
            ...pagination,
            total: result.pagination.total, // Ensure total is correctly set
          },
          loading: false,
        });
      }
    },
    [getEditableTableData, isMounted]
  );

  useEffect(() => {
    fetch(initialPagination);
  }, [fetch, initialPagination]);

  const handleTableChange = (pagination) => {
    fetch(pagination);
    cancel();
  };

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    console.log({record})
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey(null);
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...tableData.data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        newData.splice(index, 1, { ...newData[index], ...row });
        setTableData((prev) => ({ ...prev, data: newData }));
        setEditingKey(null);
        callUpdateApi(row);
      }
    } catch (errInfo) {
      console.error('Validate Failed:', errInfo);
    }
  };

  const handleDeleteRow = (key) => {
    setTableData((prev) => ({
      ...prev,
      data: prev.data.filter((item) => item.key !== key)
    }));
    callDeleteApi(key);
  };

  const columns = [
    ...columnsPre,
    {
      title: 'Hành động',
      dataIndex: 'actions',
      width: '15%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button type="primary" onClick={() => save(record.key)}>
              Lưu
            </Button>
            <Popconfirm title="Xác nhận hủy" onConfirm={cancel} className='popup-confirm' prefixCls='popup-confirm'>
              <Button type="primary" danger>Hủy</Button>
            </Popconfirm>
          </Space>
        ) : (
          <Space>
            <Button type="primary" disabled={!!editingKey} onClick={() => edit(record)}>
              Chỉnh sửa
            </Button>
            <Button type="default" danger onClick={() => handleDeleteRow(record.key)}>
              Xóa
            </Button>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) return col;

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: getInputType(col.dataIndex),
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false} className="edit-table">
      <Table
        components={{ body: { cell: TableEditableCell } }}
        bordered
        dataSource={tableData.data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          ...tableData.pagination,
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            handleTableChange({ current: page, pageSize });
          },
        }}
        loading={tableData.loading}
        scroll={{ x: 800 }}
      />
    </Form>
  );
}

export default TableEditable;
