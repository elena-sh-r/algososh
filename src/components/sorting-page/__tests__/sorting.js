import { sortBubble, sortSelect } from '../utils';

describe('Тестирование алгоритма сортировки выбором', () => {
  it('Пустой массив сортируется корректно', () => {
    expect(sortSelect([], false, 0, 0, 0)).toEqual([]);
  });

  it('Массив из одного элемента сортируется корректно', () => {
    expect(sortSelect([2], false, 0, 0, 0)).toEqual([2]);
  });

  it('Массив из нескольких элементов сортируется корректно', () => {
    expect(sortSelect([2, 6, 1, 3], false, 2, 0, 0)).toEqual([1, 6, 2, 3]);
    expect(sortSelect([1, 6, 2, 3], false, 0, 0, 1)).toEqual([6, 1, 2, 3]);
    expect(sortSelect([6, 1, 2, 3], false, 1, 0, 2)).toEqual([6, 2, 1, 3]);
    expect(sortSelect([6, 2, 1, 3], false, 2, 0, 3)).toEqual([6, 2, 3, 1]);
    expect(sortSelect([6, 2, 3, 1], false, 3, 0, 0)).toEqual([1, 2, 3, 6]);
  });
});

describe('Тестирование алгоритма сортировки пузурьком', () => {
  it('Пустой массив сортируется корректно', () => {
    expect(sortBubble([], 0)).toEqual([]);
  });

  it('Массив из одного элемента сортируется корректно', () => {
    expect(sortBubble([2], false, 0, 0, 0)).toEqual([2]);
  });

  it('Массив из нескольких элементов сортируется корректно', () => {
    expect(sortBubble([2, 6, 1, 3], false, 0)).toEqual([2, 6, 1, 3]);
    expect(sortBubble([2, 6, 1, 3], false, 1)).toEqual([2, 1, 6, 3]);
    expect(sortBubble([2, 1, 6, 3], false, 2)).toEqual([2, 1, 3, 6]);
    expect(sortBubble([2, 1, 3, 6], false, 3)).toEqual([2, 1, 3, 6]);
    expect(sortBubble([2, 1, 3, 6], false, 0)).toEqual([1, 2, 3, 6]);
  });
});
