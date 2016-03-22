import {createValidator, required} from 'redux/utils/validation'

const loginValidation = createValidator({
  username: required,
  password: required
})

export default loginValidation
