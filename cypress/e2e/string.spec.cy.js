import { DELAY_IN_MS } from '../../src/constants/delays';

describe('Тестирование страницы с алгоритмом "Строка"', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000/recursion');
  });

  it('Страница с визуализацией алгоритма "Строка" доступна пользователю', function() {
    cy.contains('Строка');
  });

  it('Если в инпуте пусто, то кнопка добавления недоступна', function() {
    cy.get('input').clear();
    cy.get('button').should('be.disabled');
  });

  it('Cтрока разворачивается корректно.', function() {
    cy.get('input').type('qwerty');
    cy.get('button[name="stringReverseButton"]').click();

    cy.get('[class*=circle_content]')
      .should('have.length', 6)

      .each((el, index) => {
        cy.wrap(el).contains('qwerty'[index])
        cy.wrap(el).find('[class*=default]')
      })

    cy.wait(DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 6)

      .each((el, index) => {
        cy.wrap(el).contains('ywertq'[index])

        if( index === 0 || index === 5) {
          cy.wrap(el)
            .should('satisfy', ($item) => {
              const classList = Array.from($item[0].classList);
              return classList.find(x => x.includes('modified'));
            });
        }

        if( index === 1 || index === 4) {
          cy.wrap(el)
            .should('satisfy', ($item) => {
              const classList = Array.from($item[0].classList);
              return classList.find(x => x.includes('changing'));
            });
        }
      })

    cy.wait(DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 6)

      .each((el, index) => {
        cy.wrap(el).contains('yterwq'[index])

        if( index === 1 || index === 4) {
          cy.wrap(el)
            .should('satisfy', ($item) => {
              const classList = Array.from($item[0].classList);
              return classList.find(x => x.includes('modified'));
            });
        }

        if( index === 2 || index === 3) {
          cy.wrap(el)
            .should('satisfy', ($item) => {
              const classList = Array.from($item[0].classList);
              return classList.find(x => x.includes('changing'));
            });
        }
      })

    cy.wait(DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 6)

      .each((el, index) => {
        cy.wrap(el).contains('ytrewq'[index]);

        if( index === 2 || index === 3) {
          cy.wrap(el)
            .should('satisfy', ($item) => {
              const classList = Array.from($item[0].classList);
              return classList.find(x => x.includes('modified'));
            });
        }
      })
  });
}); 

