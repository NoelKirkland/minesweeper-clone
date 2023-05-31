const [padTwo, padThree] = ((...numDigitsArr) => numDigitsArr.map((numDigits) => {
  let paddedNum = '';
  while (paddedNum.length < numDigits) {
    paddedNum += '0';
  }

  return (num) => {
    const numStr = Math.abs(num) + '';

    return (
      paddedNum.substring(0, paddedNum.length - numStr.length) + numStr
    );
  };
})
)(2, 3);

export const allTimerFunctions = (timerDisplayNode, headerClass) => {
  let timerInterval = null;
  let [milliseconds, seconds, minutes] = [0, 0, 0];
  let suckClass = '';

  function updateTimer(mins, secs, millSecs) {
    timerDisplayNode.innerText = `${padTwo(mins)}:${padTwo(secs)}:${padThree(
      millSecs
    )}`;
  }

  function startTimer() {
    if (timerInterval !== null) {
      clearInterval(timerInterval);
    }
    timerInterval = setInterval(() => {
      if (minutes > 59) {
        pauseTimer();
        suckClass = (headerClass + '--you-suck').slice(1);
        timerDisplayNode.classList.add(suckClass);
        timerDisplayNode.innerText = 'you suck!';
      } else {
        milliseconds += 10;
        if (milliseconds === 1000) {
          milliseconds = 0;
          seconds++;
          if (seconds === 60) {
            seconds = 0;
            minutes++;
          }
        }

        updateTimer(minutes, seconds, milliseconds);
      }
    }, 10);
  }
  function pauseTimer() {
    clearInterval(timerInterval);
  }
  function resetTimer() {
    clearInterval(timerInterval);
    [milliseconds, seconds, minutes] = [0, 0, 0];
    updateTimer(minutes, seconds, milliseconds);
    if (suckClass) timerDisplayNode.classList.remove(suckClass);
  }

  return {
    startTimer: startTimer,
    pauseTimer: pauseTimer,
    resetTimer: resetTimer
  };
};

export function updateMineCounter(remainingMines, numMinesRemainingNode) {
  numMinesRemainingNode.innerText = '💣 :' + (remainingMines < 0
    ? '-' + padThree(remainingMines)
    : ' ' + padThree(remainingMines));
}
