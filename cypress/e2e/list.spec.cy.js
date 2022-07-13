import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('Тестирование страницы с алгоритмом "Связный список"', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000/list');
  });

  it('Страница с визуализацией алгоритма "Связный список" доступна пользователю', function() {
    cy.contains('Связный список');
  });

  it('Если в инпуте пусто, то кнопка добавления в head недоступна', function() {
    cy.get('input[placeholder="Введите значение"]').clear();
    cy.get('button[name="addToHeadButton"]').should('be.disabled');
  });

  it('Если в инпуте пусто, то кнопка добавления в tail недоступна', function() {
    cy.get('input[placeholder="Введите значение"]').clear();
    cy.get('button[name="addToTailButton"]').should('be.disabled');
  });

  it('Если в инпуте пусто, то кнопка добавления по индексу недоступна', function() {
    cy.get('input[placeholder="Введите индекс"]').clear();
    cy.get('button[name="addByIndexButton"]').should('be.disabled');
  });

  it('Если в инпуте пусто, то кнопка удаления по индексу недоступна', function() {
    cy.get('input[placeholder="Введите индекс"]').clear();
    cy.get('button[name="removedByIndexButton"]').should('be.disabled');
  });

  it('Дефолтный список отрисовывается корректно', function() {
    cy.get('[class*=circle_content]')
      .should('have.length.gte', 4)
      .should('have.length.lte', 6)
      .each((el, index, array) => {
        if (index === 0) {
          cy.wrap(el).contains('head');
        }
        if (index === array.length - 1) {
          cy.wrap(el).contains('tail');
        }
    })
  });

  it('Элемент добавляется в head корректно', function() {
    cy.get('input[name="valueInput"]').type('q');
    cy.get('button[name="addToHeadButton"]').click();

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains('q');
          cy.wrap(el).should('not.contain', 'head');
        }
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains('q');
          cy.wrap(el).contains('head');
          cy.wrap(el)
            .should('satisfy', ($item) => {
              const classList = Array.from($item[0].classList);
              return classList.find(x => x.includes('modified'));
            });
        }
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .each((el) => {
        cy.wrap(el).find('[class*=default]')
    })
  });

  it('Элемент добавляется в tail корректно', function() {
    cy.get('input[name="valueInput"]').type('q');
    cy.get('button[name="addToTailButton"]').click();

    cy.get('[class*=circle_content]')
      .each((el, index, array) => {
        if (index === array.length - 1) {
          cy.wrap(el).contains('q');
          cy.wrap(el).should('not.contain', 'tail');
        }
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .each((el, index, array) => {
        if (index === array.length - 1) {
          cy.wrap(el).contains('q');
          cy.wrap(el).contains('tail');
          cy.wrap(el)
            .should('satisfy', ($item) => {
              const classList = Array.from($item[0].classList);
              return classList.find(x => x.includes('modified'));
            });
        }
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .each((el) => {
        cy.wrap(el).find('[class*=default]')
    })
  });

  it('Элемент добавляется по индексу (2) корректно', function() {
    cy.get('input[name="valueInput"]').type('q');
    cy.get('input[name="indexInput"]').type('2');
    cy.get('button[name="addByIndexButton"]').click();

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains('q');
          cy.wrap(el).should('not.contain', 'head');
        }
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains('head');
          cy.wrap(el).should('not.contain', 'q');
          cy.wrap(el)
            .should('satisfy', ($item) => {
              const classList = Array.from($item[0].classList);
              return classList.find(x => x.includes('changing'));
            });
        }
        if (index === 1) {
          cy.wrap(el).contains('q');
        }
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains('head');
          cy.wrap(el).should('not.contain', 'q');
          cy.wrap(el)
            .should('satisfy', ($item) => {
              const classList = Array.from($item[0].classList);
              return classList.find(x => x.includes('changing'));
            });
        }
        if (index === 1) {
          cy.wrap(el).should('not.contain', 'q');
          cy.wrap(el)
            .should('satisfy', ($item) => {
              const classList = Array.from($item[0].classList);
              return classList.find(x => x.includes('changing'));
            });
        }
        if (index === 2) {
          cy.wrap(el).contains('q');
        }
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains('head');
          cy.wrap(el).should('not.contain', 'q');
          cy.wrap(el).find('[class*=default]');
        }
        if (index === 1) {
          cy.wrap(el).should('not.contain', 'q');
          cy.wrap(el).find('[class*=default]');
        }
        if (index === 2) {
          cy.wrap(el).contains('q');
          cy.wrap(el)
            .should('satisfy', ($item) => {
              const classList = Array.from($item[0].classList);
              return classList.find(x => x.includes('modified'));
            });
        }
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .each((el) => {
        cy.wrap(el).find('[class*=default]');
    })
  });

  it('Элемент удаляется из head корректно', function() {
    cy.get('input[name="valueInput"]').type('q');
    cy.get('button[name="addToHeadButton"]').click();

    cy.get('button[name="deleteFromHeadButton"]').click();

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains('q');
        }
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).should('not.contain', 'q');
        }
    })
  });

  it('Элемент удаляется из tail корректно', function() {
    cy.get('input[name="valueInput"]').type('q');
    cy.get('button[name="addToTailButton"]').click();

    cy.get('button[name="deleteFromTailButton"]').click();

    cy.get('[class*=circle_content]')
      .each((el, index, array) => {
        if (index === array.length - 1) {
          cy.wrap(el).contains('q');
        }
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .each((el, index, array) => {
        if (index === array.length - 1) {
          cy.wrap(el).should('not.contain', 'q');
        }
    })
  });

  it('Элемент удаляется по индексу (2) корректно', function() {
    cy.get('input[name="valueInput"]').type('q');
    cy.get('input[name="indexInput"]').type('2');
    cy.get('button[name="addByIndexButton"]').click();

    cy.wait(SHORT_DELAY_IN_MS * 4);

    cy.get('input[name="valueInput"]').type('w');
    cy.get('input[name="indexInput"]').type('3');
    cy.get('button[name="addByIndexButton"]').click();


    cy.wait(SHORT_DELAY_IN_MS * 4);

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 2) {
          cy.wrap(el).contains('q');
        }
    })

    cy.get('input[name="indexInput"]').type('2');
    cy.get('button[name="removedByIndexButton"]').click();

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el)
            .should('satisfy', ($item) => {
              const classList = Array.from($item[0].classList);
              return classList.find(x => x.includes('changing'));
            });
        }
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0 || index === 1) {
          cy.wrap(el)
            .should('satisfy', ($item) => {
              const classList = Array.from($item[0].classList);
              return classList.find(x => x.includes('changing'));
            });
        }
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0 || index === 1 || index === 2) {
          cy.wrap(el)
            .should('satisfy', ($item) => {
              const classList = Array.from($item[0].classList);
              return classList.find(x => x.includes('changing'));
            });
        }
    })

    cy.wait(SHORT_DELAY_IN_MS * 2);

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 2) {
          cy.wrap(el).should('not.contain', 'q');
          cy.wrap(el).contains('w');
        }
        cy.wrap(el).find('[class*=default]');
    })
  });
});