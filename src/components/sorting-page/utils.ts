export const sortBubble = (
  arr: number[],
  isDesc: boolean,
  internalStep: number
) : number[] => {
  let array = [...arr];

  if ((isDesc && arr[internalStep+1] > arr[internalStep]) || (!isDesc && arr[internalStep+1] < arr[internalStep])) {
    const value = arr[internalStep];
    array[internalStep] = array[internalStep+1];
    array[internalStep+1] = value;

    return array;
  }

  return arr;
};

export const sortSelect = (
  arr: number[],
  isDesc: boolean,
  minNumIdx: number,
  maxNumIdx: number,
  step: number
) : number[] => {
  if (!arr || arr.length === 0) return [];
  if (step > arr.length - 1 ) return arr;

  let array = [...arr];

  const value = array[step];

  if (isDesc) {
    array[step] = array[maxNumIdx];
    array[maxNumIdx] = value;
  } else {
    array[step] = array[minNumIdx];
    array[minNumIdx] = value;
  }

  return array;
};