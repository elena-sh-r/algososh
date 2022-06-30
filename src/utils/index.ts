const getRandomInt = (min: number, max: number) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export const getRandomArr = () => {
  const arrLength = getRandomInt(4,6);
  const arr = [];
  for (let i=0; i<arrLength; i++) {
    arr.push(getRandomInt(0,100));
  }

  return arr;
}
