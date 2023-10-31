interface ParsingType {
  field: string
  error: string
}

const customZodErrorParser = (error: Record<string, any>): ParsingType[] => {
  const errorMap: ParsingType[] = []
  Object.keys(error).forEach((key) => {
    errorMap.push({
      field: key,
      error: error[key].join(' and '),
    })
  })

  return errorMap
}

export default customZodErrorParser
