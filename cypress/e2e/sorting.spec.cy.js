describe('Тестирование страницы с алгоритмом "Сортировка массива"', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000/sorting');
  });

  it('Страница с визуализацией алгоритма "Сортировка массива" доступна пользователю', function() {
    cy.contains('Сортировка массива');
  });
}); 