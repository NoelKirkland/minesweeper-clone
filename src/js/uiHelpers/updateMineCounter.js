import { padThree } from '../uiVariables';

export function updateMineCounter(remainingMines, numMinesRemainingNode) {
  numMinesRemainingNode.innerText =
    '💣 :' +
    (remainingMines < 0
      ? '-' + padThree(remainingMines)
      : ' ' + padThree(remainingMines));
}
