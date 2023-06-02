import { padThree } from './formatNums';

export function updateMineCounter(numMinesRemaining, numMinesDisplay) {
  numMinesDisplay.innerText = '💣 :'
    + (numMinesRemaining < 0
      ? '-' + padThree(numMinesRemaining)
      : ' ' + padThree(numMinesRemaining));
}
