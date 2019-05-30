const AUTHENTICATION_ERROR = 'AUTENTICATED'
const DENIED_ACCESS_ERROR = 'DENIED_ACCESS_ERROR'
const INVALID_ARGS_ERROR = 'INVALID_ARGS'
const VALIDATION_ERROR = 'VALIDATION_ERROR'
const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'

const formatError = (error) => {
  let { extensions, message } = error
  let { errors, typeError, status } = extensions.exception

  // console.log('Error handling',  errors)

  return {
    message,
    code: extensions.code,
    typeError,
    errors,
    status
  }
}

module.exports = {
  AUTHENTICATION_ERROR,
  DENIED_ACCESS_ERROR,
  INVALID_ARGS_ERROR,
  VALIDATION_ERROR,
  INTERNAL_SERVER_ERROR,
  formatError
}
