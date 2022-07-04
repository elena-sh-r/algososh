import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from './button';

const buttonText = 'Какой-то текст кнопки';

describe('Тестирование компонента Button', () => {
  it('Кнопка с текстом отрисовывается корректно', () => {
    const button = renderer
      .create(<Button text={buttonText} />)
      .toJSON();
      expect(button).toMatchSnapshot();
  }); 
  
  it('Кнопка без текста отрисовывается корректно', () => {
    const button = renderer
      .create(<Button />)
      .toJSON();
      expect(button).toMatchSnapshot();
  }); 
  
  it('Заблокированная кнопка отрисовывается корректно', () => {
    const button = renderer
      .create(<Button disabled={true} />)
      .toJSON();
      expect(button).toMatchSnapshot();
  }); 
  
  it('Кнопка с индикацией загрузки отрисовывается корректно', () => {
    const button = renderer
      .create(<Button isLoader={true} />)
      .toJSON();
      expect(button).toMatchSnapshot();
  }); 
});

describe('Тестирование вызова колбека при клике на кнопку', () => {
  it('Корректность вызова колбека при клике на кнопку', () => {
    const fn = jest.fn();
    render(<Button text={buttonText} onClick={fn} />)
    const button = screen.getByText(buttonText);
    fireEvent.click(button);
        
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
