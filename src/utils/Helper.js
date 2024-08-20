import map from 'lodash.map';

export const buildParams = data => {
  const params = new URLSearchParams()
  map(data, (value, key) => {
    if (Array.isArray(data[key])) {
      map(value, item => params.append(key, item))
    } else {
      params.append(key, value)
    }
  })

  return params
}

export const convertVNDCurrency = number => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}