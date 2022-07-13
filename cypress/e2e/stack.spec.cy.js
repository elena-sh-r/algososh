import { EXTRA_SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('Тестирование пстраницы с алгоритмом "Стек"', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000/stack');
  });

  it('Страница с визуализацией алгоритма "Стек" доступна пользователю', function() {
    cy.contains('Стек');
  });

  it('Если в инпуте пусто, то кнопка добавления недоступна', function() {
    cy.get('input').clear();
    cy.get('button').should('be.disabled');
  });

  it('Элемент добавляется корректно', function() {
    cy.get('input').type('1');
    cy.get('button[name="addButton"]').click();

    cy.get('[class*=circle_content]')
      .each((el) => {
        cy.wrap(el)
          .should('satisfy', ($item) => {
            const classList = Array.from($item[0].classList);
            return classList.find(x => x.includes('changing'));
          });
    })

    cy.wait(EXTRA_SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 1)
      .each((el) => {
        cy.wrap(el).contains('1');
        cy.wrap(el).find('[class*=default]');
      })
  });

  it('Элемент удаляется корректно', function() {
    cy.get('input').type('1');
    cy.get('button[name="addButton"]').click();

    cy.wait(EXTRA_SHORT_DELAY_IN_MS);

    cy.get('button[name="deleteButton"]').click();

    cy.get('[class*=circle_content]')
      .should('have.length', 1)
      .each((el) => {
        cy.wrap(el)
          .should('satisfy', ($item) => {
            const classList = Array.from($item[0].classList);
            return classList.find(x => x.includes('changing'));
          });
      })

    cy.wait(EXTRA_SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 0)
  });

  it('Кнопка "Очистить" удаляет все элементы успешно', function() {
    cy.get('input').type('1');
    cy.get('button[name="addButton"]').click();

    cy.get('input').type('2');
    cy.get('button[name="addButton"]').click();

    cy.get('input').type('3');
    cy.get('button[name="addButton"]').click();

    cy.get('input').type('4');
    cy.get('button[name="addButton"]').click();

    cy.wait(EXTRA_SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 4);

    cy.get('button[name="clearButton"]').click();

    cy.get('[class*=circle_content]')
      .should('have.length', 0)
  });
});