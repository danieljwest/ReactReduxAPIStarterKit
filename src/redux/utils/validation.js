const isEmpty = (value) => value === undefined || value === null || value === ''
const join = (rules) => (value, data) => rules.map((rule) => rule(value, data)).filter((error) => !!error)[0]

export function required (value) {
  if (isEmpty(value)) {
    return 'Required'
  }
}

export function oneNumber (field) {
  return (value, data) => {
    if (data) {
      if (data[field]) {
        let matches = data[field].match(/\d+/g)
        if (matches == null) {
          return 'Password must have at least one number'
        }
      } else {
        return 'Invalid data'
      }
    }
  }
}

export function oneSpecial (field) {
  return (value, data) => {
    if (data) {
      if (data[field]) {
        let matches = data[field].match(/[^A-Za-z0-9]+/g)

        if (matches == null) {
          return 'Password must have at least one special character'
        }
      } else {
        return 'Invalid data'
      }
    }
  }
}

export function minLength (min) {
  return (value) => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`
    }
  }
}

export function minLengthField (min, field) {
  return (value, data) => {
    if (!data[field]) return 'Invalid data'
    if (data && data[field] && !isEmpty(data[field]) && data[field].length < min) {
      return `Must be at least ${min} characters`
    }
  }
}

export function maxLength (max) {
  return (value) => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`
    }
  }
}

export function integer (value) {
  if (!value) return
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer'
  }
}

export function number (value) {
  if (!value) return
  let num = Number.parseFloat(value)
  if (isNaN(num)) {
    return 'Must be a numeric'
  }
}

export function oneOf (enumeration) {
  return (value) => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`
    }
  }
}

export function match (field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Does not match'
      }
    }
  }
}

export function notMatch (field) {
  return (value, data) => {
    if (data) {
      if (value === data[field]) {
        return 'Must not be the same'
      }
    }
  }
}

export function email (data) {
  if (data) {
    let matches = data.match(/^.+@.+\..+$/)
    if (matches == null) {
      return 'Is Invalid'
    }
  }
}

export function createValidator (rules) {
  return (data = {}) => {
    const errors = {}
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])) // concat enables both functions and arrays of functions
      const error = rule(data[key], data)
      if (error) {
        errors[key] = error
      }
    })
    return errors
  }
}
