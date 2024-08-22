import React, { useCallback, useEffect, useState } from 'react';
import './TableEditable.less';
import { Button, Popconfirm, Space, Modal, Form } from 'antd';
import { useMounted } from '~/utils/useMounted';
import TableEditableCell from './TableEditableCell';
import { Table } from '../table/Table';
import { PlusCircleFilled } from '@ant-design/icons';

const getInputType = (dataIndex) => {
  if (dataIndex === 'price') {
    return 'number'; // Handle number fields
  }
  if (dataIndex === 'image') {
    return 'image'; // Handle image fields
  }
  return 'text'; // Default case
};

function TableEditable({
  initialPagination = { current: 0, pageSize: 10 },
  getEditableTableData,
  columnsPre,
  callUpdateApi,
  callDeleteApi,
  callCreateApi,
  createForm // Form passed as a prop from outside
}) {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState({
    data: [],
    pagination: initialPagination,
    loading: false,
  });
  const [editingKey, setEditingKey] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
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
        callUpdateApi(key, row);
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

  const handleCreate = async () => {
    try {
      const newEntry = await createForm.validateFields();
      const result = await callCreateApi(newEntry);
      setTableData((prev) => ({
        ...prev,
        data: [...prev.data, result.data],
      }));
      setShowCreateModal(false);
    } catch (errInfo) {
      console.error('Validate Failed:', errInfo);
    }
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
    <>
      <Button type="primary" icon={<PlusCircleFilled />} prefixCls='create-button' onClick={() => setShowCreateModal(true)}>
        Thêm mới
      </Button>
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
      <Modal
        title="Thêm mới mục"
        open={showCreateModal}
        onOk={handleCreate}
        onCancel={() => setShowCreateModal(false)}
      >
        {createForm}
      </Modal>
    </>
  );
}

export default TableEditable;
