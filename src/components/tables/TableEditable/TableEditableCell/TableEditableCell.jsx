import React from 'react';
import { Form, Input, InputNumber } from 'antd';
import './TableEditableCell.less';
import ButtonUploadImage from '~/components/buttons/ButtonUploadImage';
function TableEditableCell({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  ...restProps
}) {
  /**Xử lý hiển thị */
  const renderContent = () => {
    if (inputType === 'image' && children) {
      return <div style={{ textAlign: 'center' }}><img src={restProps.record.image} alt={title} style={{ maxHeight: '100px' }} /></div>;
    }
    return children;
  };

  /**Xử lý chỉnh sửa */
  const inputNode = () => {
    if (inputType === 'number') {
      return <InputNumber />;
    }

    if (inputType === 'image') {
      return <ButtonUploadImage initUrl={restProps.record.image} getResUrl={url => restProps.record.image = url} />;
    }

    return <Input />;
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Vui lòng nhập ${title}!`,
            },
          ]}
        >
          {inputNode()}
        </Form.Item>
      ) : (
        renderContent()
      )}
    </td>
  );
}

export default TableEditableCell;