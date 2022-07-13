import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { ElementStates } from '../../../../types/element-states';
import { Circle } from '../circle';

describe('Тестирование компонента Circle', () => {
  it('Элемент без буквы отрисовывается корректно', () => {
    const circle = renderer
      .create(<Circle />)
      .toJSON();
      expect(circle).toMatchSnapshot();
  }); 

  it('Элемент с буквами отрисовывается корректно', () => {
    const circle = renderer
      .create(<Circle letter="АБВ" />)
      .toJSON();
      expect(circle).toMatchSnapshot();
  });
  
  it('Элемент с head отрисовывается корректно', () => {
    const circle = renderer
      .create(<Circle head="АБВ" />)
      .toJSON();
      expect(circle).toMatchSnapshot();
  });

  it('Элемент с react-элементом в head отрисовывается корректно', () => {
    const circle = renderer
      .create(<Circle head={<div>React-элемент</div>}/>)
      .toJSON();
      expect(circle).toMatchSnapshot();
  });

  it('Элемент с tail отрисовывается корректно', () => {
    const circle = renderer
      .create(<Circle tail="АБВ" />)
      .toJSON();
      expect(circle).toMatchSnapshot();
  });

  it('Элемент с react-элементом в tail отрисовывается корректно', () => {
    const circle = renderer
      .create(<Circle tail={<div>React-элемент</div>}/>)
      .toJSON();
      expect(circle).toMatchSnapshot();
  });

  it('Элемент с index отрисовывается корректно', () => {
    const circle = renderer
      .create(<Circle index={123} />)
      .toJSON();
      expect(circle).toMatchSnapshot();
  });

  it('Элемент с пропом isSmall ===  true отрисовывается корректно', () => {
    const circle = renderer
      .create(<Circle isSmall={true} />)
      .toJSON();
      expect(circle).toMatchSnapshot();
  });

  it('Элемент в состоянии default отрисовывается корректно', () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
      expect(circle).toMatchSnapshot();
  });

  it('Элемент в состоянии changing отрисовывается корректно', () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
      expect(circle).toMatchSnapshot();
  });

  it('Элемент в состоянии modified отрисовывается корректно', () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
      expect(circle).toMatchSnapshot();
  });
});