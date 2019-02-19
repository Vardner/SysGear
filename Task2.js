function PatesMover () {
  this.movePlates = function (quantity) {
    quantity = parseInt(quantity);

    // Проверяем данные
    if (quantity < 3 || quantity > 8 || !Number.isFinite(quantity)) {
      throw new Error('Incorrect input value allowed range 3-8');
    }

    movePlates(quantity, 'slot_a', 'slot_c', 'slot_b');
  };

  // Особенность ханойский башен заключается в том что каждый нечетный ход мы обязанны двигать плиту №1
  function movePlates (quantity, a, b, c) {
    if (quantity <= 0) return;

    movePlates(quantity - 1, a, c, b); // Проваливаемся в рекурсию меняя местами плиты До тех пор пока не доберемся до первой плиты
    console.log(`#${quantity} ${a} -> ${b}`); // Возвращаемся сюда из верхней рекурсии Двигаем диск №quantity
    movePlates(quantity - 1, c, b, a); // Опять проваливаемся в рекурсию меняя местами плиты
  }
}

let obj = new PatesMover();
obj.movePlates(3);