let arr1 = [10, 6, 7, 8, 7, 9, 5, 3, 3, 3];
let arr2 = [1, 5, 6, 1, 6, 1, 5, 4, 3, 10];

// Я не смог придумать как реализовать построение схемы оплаты генетическим алгоритмом на моменте скрещивания двух генов
// поэтому я реализовал с помощью обычной сортировки и выборки
function PayScheme () {
  this.getPayScheme = function (taxScheme) {
    let i;
    let sumOfTaxScheme = 0;
    // Проверяем входные данные
    for (i = 0; i < taxScheme.length; i++) {
      if (taxScheme[i] > 10 || taxScheme[i] < 1 || !Number.isInteger(taxScheme[i])) {
        throw new Error('The data in the array was entered incorrectly');
      }
      sumOfTaxScheme += taxScheme[i];
    }

    if (sumOfTaxScheme < 55) {
      throw new Error('The total amount of coins must exceed 55 coins');
    }

    this.taxScheme = taxScheme;
    this.payScheme = createPayScheme(taxScheme);
    this.burnedCoins = getBurned(this.payScheme, taxScheme);
    this.companyDebt = getDebt(this.payScheme, taxScheme);
    console.log(this);
    console.log('-------------------------');
  }.bind(this);

  // Создать схему оплаты
  function createPayScheme (taxScheme) {
    // Инициализация массивов
    let payScheme = []; // Массив который будет содержать схему оплаты
    let sortedTaxScheme = getUniqueArray(taxScheme.slice()).sort((a, b) => b - a); // Массив который содержит уникальные
                                                                                   // значения монет в порядке убывания
    let taxSchemeCoinPosition; // Переменная массива которая будет содержать позиции на которых находится определенная монета

    // Инициализация обычных переменных
    let taxVal; // Переменная которая содержит размер монеты при определенном шаге (используется для читабельности кода)
    let coinLess; // Переменная которая будет содержать значение меньшее чем taxVal
    let coinGreat; // Переменная которая будет содержать значение большее чем taxVal

    // Переменные для сравнения потери при использовании монеты большей/меньшей величины от требуемого значения taxVal
    let debtCoins;
    let burnedCoins;

    // Переменные циклов
    let i;
    let j;

    // Цикл который берет монету из массива уникальных монет
    for (i = 0; i < sortedTaxScheme.length; i++) {
      taxSchemeCoinPosition = [];
      taxVal = +sortedTaxScheme[i]; // Преобразовываем уникальную монету к числу

      // Цикл который ищет на каких позициях находится монета в заданной схеме оплаты
      for (j = 0; j < taxScheme.length; j++) {
        if (taxScheme[j] === taxVal) {
          taxSchemeCoinPosition.push(j);
        }
      }

      // Цикл который расставляет монеты на позициях которые хранятся в taxSchemeCoinPosition
      for (j = 0; j < taxSchemeCoinPosition.length; j++) {
        // Если мы использовали монету равную taxVal ищем ей подходящую замену, если нет то используем ее
        if (payScheme.includes(taxVal)) {
          coinLess = taxVal;
          coinGreat = taxVal;

          // Ищем самую близкую убывающую монету к taxVal не меньшей 1
          do {
            coinLess = coinLess <= 1 ? coinLess : coinLess - 1;
          } while (payScheme.includes(coinLess) && !(taxVal <= 1)); // Выходим из цикла если нашли монету или
                                                                    // если не нашли и дошли до минимума

          // Ищем самую близкую возрастающую монету к taxVal не большей 10
          do {
            coinGreat = coinGreat >= 10 ? coinGreat : coinGreat + 1;
          } while (payScheme.includes(coinGreat) && !(coinGreat >= 10)); // Выходим из цикла если нашли монету или
          // если не нашли и дошли до максимума


          // Если в схеме оплаты ранее не использовались отобранные монеты, то выбираем ту которая даст наименьшие потери
          if (!payScheme.includes(coinLess) && !payScheme.includes(coinGreat)) {
            debtCoins = taxScheme[i] - coinLess;
            burnedCoins = -1 * (taxScheme[i] - coinGreat);
            taxVal = debtCoins >= burnedCoins ? coinGreat : coinLess;
          } else { //Выбираем ту монету которую не использовали
            taxVal = payScheme.includes(coinGreat) ? coinLess : coinGreat;
          }
        }
        // Сетим монету на нужную позицию из массива позиций
        payScheme[taxSchemeCoinPosition[j]] = taxVal;
      }
    }
    console.log('Заданая схема оплаты:', taxScheme);
    console.log('Оптимальная схема оплаты согласно заданной схеме:', payScheme);
    return payScheme;
  }

  // Получить массив который содержит только уникальные значения
  function getUniqueArray (arr) {
    let obj = {};
    let i;
    let str;

    for (i = 0; i < arr.length; i++) {
      str = arr[i];
      obj[str] = true;
    }

    return Object.keys(obj);
  }

  // Получить размер долга после оплаты
  function getDebt (payScheme, taxScheme) {
    let debt = 0;
    let i;

    for (i = 0; i < taxScheme.length; i++) {
      debt -= payScheme[i] < taxScheme[i] ? payScheme[i] - taxScheme[i] : 0;
    }

    console.log(`Размер долга компании при оплате согласно схеме ${debt}`);
    return debt;
  }

  // Получить значение монет сгоревших после оплаты
  function getBurned (payScheme, taxScheme) {
    let burned = 0;
    let i;

    for (i = 0; i < taxScheme.length; i++) {
      burned += payScheme[i] >= taxScheme[i] ? payScheme[i] - taxScheme[i] : 0;
    }
    console.log(`Значение монет которые сгорят при оплате согласно схеме ${burned}`);
    return burned;
  }
}

// let trip1 = new PayScheme();
// trip1.getPayScheme(arr1);
// trip1.getPayScheme(arr2);

