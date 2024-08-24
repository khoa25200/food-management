export const getInputType = (dataIndex) => {
  switch (dataIndex) {
    case 'price':
      return 'number';

    case 'image':
      return 'image';

    case 'categoryId':
      return 'mapSource';

    case 'status':
      return 'boolean';
    default:
      return 'text';
  }
};
