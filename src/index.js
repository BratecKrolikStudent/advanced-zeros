function makeBertrana(props) {
  let n = 1;
  let [ number, a, p] = props;

  return function getBertrana(result = 0) {
    let d = Math.pow(a, n++);
    return d <= number ? getBertrana(result += (number / d) | 0) : (result / p) | 0;
  }
}

function getMultipliers (num) {
  let result = [];
  let curNum = num;
  let i = 2;

  while (curNum !== 1) {
    if (curNum % i !== 0) {
      i++;
    } else {
      curNum /= i;
      result.push(i);
    }
  }

  return result;
}

function getMax (numbers) {
  let res = Number.MIN_SAFE_INTEGER;

  for (let num of numbers) {
    if (num > res) res = num;
  }

  return res;
}

function getMin (numbers) {
  let res = Number.MAX_SAFE_INTEGER;

  for (let num of numbers) {
    if (num < res) res = num;
  }

  return res;
}

function countElemInArr (elem, arr) {
  let count = 0;

  for (let num of arr) {
    if (elem === num) count++;
  }

  return count;
}

module.exports = function getZerosCount(number, base) {
  let multipliers = getMultipliers(base).reverse();

  let maxElem = getMax(multipliers);
  let minElem = getMin(multipliers);
  let countMaxElems = countElemInArr(maxElem, multipliers);
  let countMinElems = countElemInArr(minElem, multipliers);

  let maxZerosCount = makeBertrana([number, ...[maxElem, countMaxElems]])();
  let minZerosCount = makeBertrana([number, ...[minElem, countMinElems]])();

  return maxZerosCount < minZerosCount ? maxZerosCount : minZerosCount;
}