export const reverseString = (
  str: string
) : string[][] => {
  if (!str) return [];

  if (str.length === 1) return [[str[0]]];

  const strArrays = [];
  let strArray = str.split('');

  for (let i = 0; i < strArray.length - i; i++) {
    const array = [...strArray];
    const char = array[i];
    array[i] = strArray[strArray.length - i - 1];
    array[strArray.length - i - 1] = char;
    strArray = [...array];
    strArrays.push(strArray);
  }

  return strArrays;
};