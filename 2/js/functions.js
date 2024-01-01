const isLessOrEqual = (str, maxLength) => {
  return str.length <= maxLength;
}

const isPalindrome = (str) => {
  str = str.toLowerCase().replaceAll(' ', '');
  return str === str.split('').reverse().join('');
}

const extructNumber = (str) => {
  if (typeof str === 'number') {
    str = String(str);
  }

  const digits = str.match(/\d/g);

  if (!digits) {
    return NaN;
  }

  return parseInt(digits.join(''), 10);
}

const myPadStart = (str, minLength, pad) => {
  let result = str;
  while (result.length < minLength) {
    const newResultLength = result.length + pad.length;
    const actualPad = newResultLength <= minLength ? pad : pad.slice(0, minLength - newResultLength);
    result = actualPad + result;
  }
  return result;
}
