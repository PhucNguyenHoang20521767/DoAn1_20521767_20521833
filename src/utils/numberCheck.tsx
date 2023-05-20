
export function matchIsNumeric(text: string) {
    const isNumber = typeof text === 'number'
    const isString = matchIsString(text)
    return (isNumber || (isString && text !== '')) && !isNaN(Number(text))
  }

export function matchIsString(text: any): boolean {
    return typeof text === 'string' || text instanceof String;
}