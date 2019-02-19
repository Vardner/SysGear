function TemperatureTransformer () {

  this.getTransformedTemperature = function (val) {
    let number = parseInt(val);
    let type = val.toUpperCase().slice(-1);

    if (!~'CKF'.indexOf(type) || !isFinite(number)) {
      throw new Error('The data was entered wrong');
    }

    console.log(transformTemperature(number, type));
  };

  function transformTemperature (number, type) {
    let result = {};
    switch (type) {
      case 'C':
        result.K = getKelFromCel(number);
        result.F = getFahrFromCel(number);
        break;

      case 'K':
        result.C = getCelFromKel(number);
        result.F = getFahrFromCel(result.C);
        break;

      case 'F':
        result.K = getKelFromCel(number);
        result.C = getCelFromKel(result.K);
        break;
    }

    return JSON.stringify(result);
  }

  function getKelFromCel (val) {
    return Math.round(val + 273.15);
  }

  function getFahrFromCel (val) {
    return Math.round(9 / 5 * val + 32);
  }

  function getCelFromKel (val) {
    return Math.round(val - 273.15);
  }
}

let temperatures = new TemperatureTransformer();

// temperatures.getTransformedTemperature('50C');
// temperatures.getTransformedTemperature('50K');
// temperatures.getTransformedTemperature('50F');
// temperatures.getTransformedTemperature('50G');
// temperatures.getTransformedTemperature('ABC');