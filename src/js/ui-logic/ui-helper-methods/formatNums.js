export const [padTwo, padThree] = ((...numDigitsArr) => numDigitsArr.map((numDigits) => {
  let paddedNum = '';
  while (paddedNum.length < numDigits) {
    paddedNum += '0';
  }

  return (num) => {
    const numStr = Math.abs(num) + '';

    return paddedNum.substring(0, paddedNum.length - numStr.length) + numStr;
  };
}))(2, 3);
