export function extractQueryParams(query: string) {
  return query.slice(1).split('&').reduce((queryParams: any, param) => {
    const [key, value] = param.split('=')

    queryParams[key] = value

    return queryParams
  }, {})
}
