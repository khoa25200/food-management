import {
  atom
} from 'recoil';

export const orderState = atom({
  key: 'orderState',
  default: null,
});


export const selectedTableState = atom({
  key: 'selectedTableState',
  default: {},
});

export const orderTableLoading = atom({
  key: 'orderTableLoading',
  default: false,
});