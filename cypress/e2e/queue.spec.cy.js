import { EXTRA_SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('Тестирование страницы с алгоритмом "Очередь"', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000/queue');
  });

  it('Страница с визуализацией алгоритма "Очередь" доступна пользователю', function() {
    cy.contains('Очередь');
  });

  it('Если в инпуте пусто, то кнопка добавления недоступна', function() {
    cy.get('input').clear();
    cy.get('button').should('be.disabled');
  });

  it('Элемент добавляется корректно', function() {
    cy.get('input').type('q');
    cy.get('button[name="addButton"]').click();

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains('q');
          cy.wrap(el).contains('head');
          cy.wrap(el).contains('tail');
          cy.wrap(el)
            .should('satisfy', ($item) => {
              const classList = Array.from($item[0].classList);
              return classList.find(x => x.includes('changing'));
            });
        } else {
          cy.wrap(el).find('[class*=default]')
        }
    })

    cy.wait(EXTRA_SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .each((el) => {
        cy.wrap(el).find('[class*=default]')
      })

    cy.get('input').type('w');
    cy.get('button[name="addButton"]').click();

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains('q');
          cy.wrap(el).contains('head');
          cy.wrap(el).should('not.contain', 'tail')
        } else if (index === 1) {
          cy.wrap(el).contains('w');
          cy.wrap(el).should('not.contain', 'head')
          cy.wrap(el).contains('tail');
          cy.wrap(el)
            .should('satisfy', ($item) => {
              const classList = Array.from($item[0].classList);
              return classList.find(x => x.includes('changing'));
            });
        } else {
          cy.wrap(el).find('[class*=default]')
        }
    })

    cy.wait(EXTRA_SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .each((el) => {
        cy.wrap(el).find('[class*=default]')
      })
  });

  it('Элемент удаляется корректно', function() {
    cy.get('input').type('q');
    cy.get('button[name="addButton"]').click();

    cy.get('input').type('w');
    cy.get('button[name="addButton"]').click();

    cy.wait(EXTRA_SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains('q');
          cy.wrap(el).contains('head');
          cy.wrap(el).should('not.contain', 'tail')
        }
        if (index === 1) {
          cy.wrap(el).contains('w');
          cy.wrap(el).should('not.contain', 'head')
          cy.wrap(el).contains('tail');
        }

        cy.wrap(el).find('[class*=default]')
    })

    cy.get('button[name="deleteButton"]').click();

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el)
            .should('satisfy', ($item) => {
              const classList = Array.from($item[0].classList);
              return classList.find(x => x.includes('changing'));
            });
        } else {
          cy.wrap(el).find('[class*=default]')
        }
    })

    cy.wait(EXTRA_SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
    .each((el, index) => {
      if (index === 0) {
        cy.wrap(el).should('not.contain', 'q')
        cy.wrap(el).should('not.contain', 'head')
      }
      if (index === 1) {
        cy.wrap(el).contains('w');
        cy.wrap(el).contains('head');
        cy.wrap(el).contains('tail');
      }

      cy.wrap(el).find('[class*=default]')
    })
  });

  it('Кнопка "Очистить" удаляет все элементы успешно', function() {
    cy.get('input').type('q');
    cy.get('button[name="addButton"]').click();

    cy.get('input').type('w');
    cy.get('button[name="addButton"]').click();

    cy.wait(EXTRA_SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains('q');
          cy.wrap(el).contains('head');
          cy.wrap(el).should('not.contain', 'tail')
        }
        if (index === 1) {
          cy.wrap(el).contains('w');
          cy.wrap(el).should('not.contain', 'head')
          cy.wrap(el).contains('tail');
        }

        cy.wrap(el).find('[class*=default]')
    })

    cy.get('button[name="clearButton"]').click();

    cy.get('[class*=circle_content]')
      .each((el) => {
        cy.wrap(el).should('not.contain', 'q')
        cy.wrap(el).should('not.contain', 'w')
        cy.wrap(el).should('not.contain', 'head')
        cy.wrap(el).should('not.contain', 'tail')
    })
  });
}); 