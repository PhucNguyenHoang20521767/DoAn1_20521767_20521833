//function to check if the text is a number
export function matchIsNumeric(text: string) {
    const isNumber = typeof text === 'number'
    const isString = matchIsString(text)
    return (isNumber || (isString && text !== '')) && !isNaN(Number(text))
  }

//function to check if the text is a string
export function matchIsString(text: any): boolean {
    return typeof text === 'string' || text instanceof String;
}

//random number
export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}