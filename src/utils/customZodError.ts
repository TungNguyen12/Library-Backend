import { ZodIssueCode, type ZodErrorMap } from 'zod'

const customErrorMap: ZodErrorMap = (issue, ctx) => {
  const parsedField = issue.path[0].toString()
  const formattedField = parsedField
    .charAt(0)
    .toUpperCase()
    .concat(parsedField.slice(1))
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      return {
        message: `${formattedField} is a ${issue.received}, expecting ${issue.expected}`,
      }
    case ZodIssueCode.invalid_date:
      return {
        message: `Invalid date`,
      }
    case ZodIssueCode.invalid_string:
      return {
        message: `Invalid ${issue.validation}`,
      }
    case ZodIssueCode.too_small: {
      if (issue.minimum > 1)
        return {
          message: `${formattedField} length below ${issue.minimum}`,
        }
      return {
        message: `${formattedField} can not be empty`,
      }
    }
    case ZodIssueCode.too_big: {
      return {
        message: `${formattedField} length exceed ${issue.maximum}`,
      }
    }
    case ZodIssueCode.custom: {
      const params =
        issue.params !== undefined ? issue.params : { customMessage: '' }
      return {
        message: `${params.customMessage}`,
      }
    }
  }

  return { message: ctx.defaultError }
}

const errorMap = { errorMap: customErrorMap }

export default errorMap
