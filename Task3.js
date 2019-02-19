/*
Начертив на листе условие задачи, составив примерный алгоритм решения и продумав варианты,
когда нужно делать выстрел во всех возможных исходах, был составлен следующий алгоритм.
Почему именно такой наглядно приведено в файл Task3 description
*/
function Duel () {
  this.getOptimalStep = function (firstPlayerStartChance = 0.1, secondPlayerStartChance = 0.2, firstStep = 'player1') {
    let firstPlayerChanceIncr;
    let secondPlayerChanceIncr;
    let player1Chances;
    let player2Chances;

    // Корректируем значения перед стартом
    firstPlayerStartChance = parseFloat(firstPlayerStartChance);
    secondPlayerStartChance = parseFloat(secondPlayerStartChance);
    firstStep = firstStep.toLowerCase();

    // Перед стартом функции идет начальная проверка на диапазон вводимых значений
    if (!(firstPlayerStartChance >= 0.1 && firstPlayerStartChance <= 0.3 && Number.isFinite(firstPlayerStartChance)
        && secondPlayerStartChance >= 0.1 && secondPlayerStartChance <= 0.3 && Number.isFinite(secondPlayerStartChance))) {
      throw new Error ('Percent was entered wrong, allowed range is 0.1 - 0.3');
    }

    // И на корректность ввода ключевого слова
    if (firstStep !== 'player1' && firstStep !== 'player2') {
      throw new Error ('Person type entered wrong choose one of this: player1 / player2');
    }

    // Записываем корректные значения в объект
    this.firstStep = firstStep;
    this.firstPlayerStartChance = firstPlayerStartChance;
    this.secondPlayerStartChance = secondPlayerStartChance;

    // Приводим входные значение до тысячных
    firstPlayerStartChance = getNormalValue(firstPlayerStartChance);
    secondPlayerStartChance = getNormalValue(secondPlayerStartChance);

    // Вычисляем на сколько процентов инкрементируется шанс попадания при каждом шаге
    firstPlayerChanceIncr = getNormalValue((1 - firstPlayerStartChance) / 10);
    secondPlayerChanceIncr = getNormalValue((1 - secondPlayerStartChance) / 10);

    // Создаем массивы шансов попаданий игроков
    player1Chances = getArrayOfChances(firstPlayerStartChance, firstPlayerChanceIncr);
    player2Chances = getArrayOfChances(secondPlayerStartChance, secondPlayerChanceIncr);

    console.log('Array of player1 chances', player1Chances);
    console.log('Array of player2 chances', player2Chances);

    return getStep(firstStep, player1Chances, player2Chances);
  };

  // Функция создает массив шансов игроков на каждом ходу и записывает их в объект
  function getArrayOfChances (playerChance, playerInc) {
    // Создаем массив с начальным значением (0 шагом) готовый заданный процент и возвращаем массив шансов на каждом шагу
    let player = [playerChance];
    for (let i = 1; i <= 10; i++) {
      player[i] = getNormalValue(player[i - 1] + playerInc);
    }
    return player;
  }

  // Функция которая выводит просчитанный шаг исходя из вариантов кто ходит первым
  // и проваливается в функцию которая подсчитывает варианты исхода на каждом шаге выбирая оптимальный шаг
  function getStep (firstStep, player1Chances, player2Chances) {
    let optimalStep = calcDeathChance(firstStep, player1Chances, player2Chances);

    console.log(`The most optimal step for shooting is ${optimalStep}`);
    return optimalStep;
  }

  // Функция считает шанс умереть по логике из вордовского документа основываясь на том, кто ходит первым
  // Оптимальный шаг выдается для игрока 1
  function calcDeathChance (firstStep, player1Chances, player2Chances) {
    let i;
    let missChance;
    let deathChance;
    // Возвращаем шаг когда у врага шансов больше нас убить чем наших шансов на собственную смерть
    if (firstStep === 'player1') {
      for (i = 1; i <= player1Chances.length; i++) {
        missChance = 1 - player1Chances[i];
        deathChance = player2Chances[i];
        if (missChance <= deathChance) {
          return i;
        }
      }
    } else { // Стреляем на ход раньше перед тем как у противника будет шанс больше убить нас чем наш шанс сейчас
      for (i = 1; i < player1Chances.length; i++) {
        missChance = 1 - player1Chances[i];
        deathChance = player2Chances[i + 1];
        if (missChance <= deathChance) {
          return i;
        }
      }
    }
  }
}

// Функция корректирует значение и возвращает его корректное представление
// в случае проблемы с двоичным кодом JS. Она не находится внутри объекта так как к нему она не относится
function getNormalValue (val) {
  return Math.round(val * 1000) / 1000;
}

let duel = new Duel;
// duel.getOptimalStep(0.2, 0.3, 'player2');
// duel.getOptimalStep(0.1, 0.3, 'player2');
// duel.getOptimalStep(0.3, 0.2, 'player2');
duel.getOptimalStep(0.22425, 0.3, 'player1');