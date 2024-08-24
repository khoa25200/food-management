import React from 'react';
import { Button, Modal } from 'antd';
import FormCreateDish from '~/components/forms/FormCreateDish';

const ModalCreateDish = ({ visible, onClose, categories, createDishApi }) => {
  return (
    <Modal
      title="Tạo món mới"
      open={visible}
      width={800}
      onCancel={onClose}
      footer={[
        <Button key="1" onClick={onClose}>Hủy</Button>,
      ]}
      centered
    >
      <FormCreateDish categories={categories} onCloseModal={onClose} createDishApi={createDishApi}/>
    </Modal>
  );
};

export default ModalCreateDish;
