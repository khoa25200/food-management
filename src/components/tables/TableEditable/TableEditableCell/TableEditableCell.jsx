import React from 'react';
import { Checkbox, Form, Input, InputNumber, Select, Tag } from 'antd';
import './TableEditableCell.less';
import ButtonUploadImage from '~/components/buttons/ButtonUploadImage';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
function TableEditableCell({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  updateImage,
  uploading,
  ...restProps
}) {
  /**Xử lý hiển thị */
  const renderContent = () => {
    if (inputType === 'image' && children) {
      return <div style={{ textAlign: 'center' }}><img src={restProps.record.image} alt={title} style={{ maxHeight: '100px' }} /></div>;
    }
    if (inputType === 'mapSource' && children) {
      const cateName = restProps.source?.find(s => s.id == restProps.record.categoryId)?.name;
      return <Tag color="magenta">{cateName}</Tag>;
    }
    if (inputType === 'boolean' && children) {
      return restProps.record.status ? <Tag icon={<CheckCircleFilled />} color="Green" /> : <Tag icon={<CloseCircleFilled />} color="#cd201f" />;
    }
    return children;
  };
  /**Xử lý chỉnh sửa */
  const inputNode = () => {
    if (inputType === 'number') {
      return <InputNumber />;
    }

    if (inputType === 'image') {
      return <ButtonUploadImage initUrl={restProps.record.image} getResUrl={updateImage} uploading={uploading}/>;
    }

    if (inputType === 'mapSource' && children) {
      return <Select
        showSearch
        placeholder="Nhập"
        optionFilterProp="label"
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={restProps.source?.map(s => ({ value: s.id, label: s.name }))}
      />;
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