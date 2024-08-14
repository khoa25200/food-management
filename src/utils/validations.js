/* eslint-disable no-restricted-globals */
/* eslint-disable no-useless-escape */
import isEmpty from 'lodash/isEmpty'

const DEFAULT_MAX_NUMBER_INPUT = 99999999

export const validateRequired = value => {
  let error = true
  if (isEmpty(value) && isEmpty(value && value.toString())) {
    error = false
  }
  return error
}
export const validateAddressRequired = value => {
  let error = true
  if (document.querySelector('#country-sg')) return true
  if (
    isEmpty(value) &&
    isEmpty(value && value.toString()) &&
    document.querySelector('#country-sg')
  ) {
    error = false
  }
  return error
}

export const validateRequiredCheckbox = value => {
  if (!value) return false
  return true
}

const emailFormat =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const format = /[!#$%^&*()+\=\[\]{};':"\\|,<>\/?]+/
const formatSymbols = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
// eslint-disable-next-line
const notUnicodeFormat = /[^\u0000-\u00ff]/
const onlyContainCharacterRegex = /^[a-zA-Z@$!%*#?&\040]+$/
const containAtLeastNumberRegex = /(?=.*\d)/

const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/

const passwordSpecialFormat =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?~#&]{6,}$/

export const validFileExtensions = ['.jpg', '.jpeg', '.gif', '.png']

export const validateEmail = email => {
  const lowerCase = String(email).toLowerCase()
  if (!emailFormat.test(lowerCase) || notUnicodeFormat.test(lowerCase)) {
    return false
  }
  return true
}

export const validatePassword = password => {
  if (!passwordFormat.test(password) && !passwordSpecialFormat.test(password))
    return false
  return true
}

export const validateNotSymbols = text => {
  const lowerCase = String(text).toLowerCase()
  if (!formatSymbols.test(lowerCase) || notUnicodeFormat.test(lowerCase)) {
    return true
  }
  return false
}

export const validateMobile = mobile => {
  const lowerCase = String(mobile).toLowerCase()
  if (isNaN(mobile)) {
    if (!Number(lowerCase.substring(2)) || lowerCase[1] === '+') {
      return false
    }
  }
  return true
}

export const validateCardNumber = cardNumber => {
  const validationCardTypes = JSON.parse(localStorage.getItem('cardValidation'))
  const cardNumberFormat = cardNumber.replaceAll(' ', '')
  let flag = false
  if (validationCardTypes.length > 0) {
    validationCardTypes.forEach(item => {
      const regex = new RegExp(item.regex)
      if (cardNumberFormat.match(regex)) {
        flag = true
      }
    })
  }
  if (flag) return true
  return false
}

export const validateMonth = month => {
  if (Number(month) < 1 || Number(month) > 12) {
    return false
  }
  const year = document.querySelector('[data-encrypt="year"]').value
  if (!year) return true
  const currentMonth = new Date().getMonth + 1
  const currentYear = new Date().getFullYear()

  if (
    Number(year) < currentYear ||
    (Number(year) === currentYear && Number(month) < currentMonth)
  )
    return false
  return true
}

export const validateYear = year => {
  const currentMonth = new Date().getMonth + 1
  const currentYear = new Date().getFullYear()
  const month = document.querySelector('[data-encrypt="month"]').value
  if (Number(year) < currentYear || Number(year) > currentYear + 10) {
    return false
  }
  if (!month) return true
  if (
    Number(year) < currentYear ||
    (Number(year) === currentYear && Number(month) < currentMonth)
  )
    return false
  return true
}

export const validateEmailOrPhone = data => {
  const lowerCase = String(data).toLowerCase()
  if (isNaN(+lowerCase)) {
    if (
      format.test(lowerCase) ||
      !emailFormat.test(lowerCase) ||
      notUnicodeFormat.test(lowerCase)
    ) {
      return false
    }
  }
  if (lowerCase.length < 8) {
    return false
  }
  if (validateMobile(lowerCase) && lowerCase.length > 15) {
    return false
  }
  return true
}

export const validateRetype = (pathValue, values) => {
  let error = true
  if (values.confirmPassword && values.confirmPassword !== values.password) {
    error = false
  }
  return error
}

export const validateMinLength = minLength => value => {
  return String(value).length >= minLength
}

export const validatePostalCodeMinLength = minLength => value => {
  if (document.querySelector('#country-sg')) {
    return String(value).length === 6
  }
  return String(value).length >= minLength
}

export const validateMaxLength = maxLength => value =>
  String(value).length <= maxLength

export const validateAddressMaxLength = maxLength => value => {
  if (document.querySelector('#country-sg')) return true
  return String(value).length <= maxLength
}

export const validateContainLeastCharacter = value => {
  const character = value.replace(/[0-9]/g, '')
  return onlyContainCharacterRegex.test(character)
}

export const validateContainLeastNumber = value =>
  containAtLeastNumberRegex.test(value)

export const validateNumberLarger0 = value => {
  if (value) {
    const regexp = /^\d+$/
    let valid = true
    if (!regexp.test(value)) {
      valid = false
    }
    if (Number(value) <= 0) {
      valid = false
    }
    return valid
  }

  return true
}

export const validateNumberLargerMaxNumber = value => {
  if (value) {
    const regexp = /^\d+$/
    let valid = true
    if (!regexp.test(value)) {
      valid = false
    }
    if (Number(value) > DEFAULT_MAX_NUMBER_INPUT) {
      valid = false
    }
    return valid
  }

  return true
}
export const validateContainAtLeastOneCapitalCharacter = value => {
  if (value) {
    const regex = /(?=.*[A-Z])/
    return regex.test(value)
  }
  return true
}

export const validateURLWebsite = value => {
  // eslint-disable-next-line
  const regexp =
    /^(http|https|ftp):\/\/[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i
  if (!value) return false
  if (regexp.test(value)) {
    return true
  }
  return false
}

export const validStringWithoutBlank = value => {
  if (value.indexOf(' ') > 1) {
    return false
  }
  return true
}

export const validStringWithoutUppercase = value => {
  const regexp = /[A-Z]+/g
  if (!value) return false
  if (regexp.test(value)) {
    return false
  }
  return true
}

export const validateKeyProject = value => {
  const regexp = /^[A-Z][A-Z0-9]+/g
  if (!value) return false
  if (regexp.test(value)) {
    return true
  }
  return false
}
export const validateImageType = fileName => {
  const regexp = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i
  if (regexp.test(fileName)) {
    return true
  }
  return false
}

export const validateVideoType = fileName => {
  const regexp = /\.(m4v|avi|mpg|mp4)$/i
  if (regexp.test(fileName)) {
    return true
  }
  return false
}

export const validStringWithoutSpecialCharacter = value => {
  const regexp =
    /`|~|!|#|\$|%|\^|&|\*|\(|\)|\+|=|\[|\{|\]|\}|\||\\|'|<|,|>|\?|\/|"|;|:/g
  if (!value) return false
  if (regexp.test(value)) {
    return false
  }
  return true
}

// export const validatePassword = value => {
//   const regexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{6,}$/i
//   if (!value) return false
//   if (regexp.test(value)) {
//     return true
//   }
//   return false
// }
