/*
 Виды тестирования:
  - Ручное
  - Статическое - проверяет опечатки
  - unit (модульное) - тестирование отдельных модулей
  - интеграционное - связь модулей
  - End-to-end (e2e, сквозное) - проверка сценариев

  BDD (TDD)
*/

const pow = (x, y) => {
    if (x === null || y === null) {
        return null;
    }

    let result = 1;
    for (let i = 0; i < y; i++) {
        result *= x
    }

    return result;
};

module.exports = { pow };
