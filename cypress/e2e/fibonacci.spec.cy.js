import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('Тестирование страницы с алгоритмом "Фибоначчи"', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000/fibonacci');
  });

  it('Страница с визуализацией алгоритма "Фибоначчи" доступна пользователю', function() {
    cy.contains('Последовательность Фибоначчи');
  });

  it('Если в инпуте пусто, то кнопка добавления недоступна', function() {
    cy.get('input').clear();
    cy.get('button').should('be.disabled');
  });

  it('Числа генерируются корректно.', function() {
    cy.get('input').type('5');
    cy.get('button[name="fibonacciButton"]').click();

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 1)

      .each((el, index) => {
        if( index === 0) {
          cy.wrap(el).contains('1')
        }
      })

    cy.wait(SHORT_DELAY_IN_MS);

      cy.get('[class*=circle_content]')
        .should('have.length', 2)
  
        .each((el, index) => {
      if( index === 0) {
        cy.wrap(el).contains('1')
      }
      if( index === 1) {
        cy.wrap(el).contains('1')
      }
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 3)

      .each((el, index) => {
      if( index === 0) {
        cy.wrap(el).contains('1')
      }
      if( index === 1) {
        cy.wrap(el).contains('1')
      }
      if( index === 2) {
        cy.wrap(el).contains('2')
      }
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 4)

      .each((el, index) => {
      if( index === 0) {
        cy.wrap(el).contains('1')
      }
      if( index === 1) {
        cy.wrap(el).contains('1')
      }
      if( index === 2) {
        cy.wrap(el).contains('2')
      }
      if( index === 3) {
        cy.wrap(el).contains('3')
      }
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 5)
  
      .each((el, index) => {
      if( index === 0) {
        cy.wrap(el).contains('1')
      }
      if( index === 1) {
        cy.wrap(el).contains('1')
      }
      if( index === 2) {
        cy.wrap(el).contains('2')
      }
      if( index === 3) {
        cy.wrap(el).contains('3')
      }
      if( index === 4) {
        cy.wrap(el).contains('5')
      }
    })
  });
});