import { gameGrid, buttonFace, numMinesRemaining } from '../uiVariables';
import { updateMineCounter } from '../mineCountAndTimer';

export function clearGameBoard() {
  updateMineCounter(0, numMinesRemaining);
  buttonFace.innerText = '🙂';
  gameGrid.style.pointerEvents = 'auto';
  gameGrid.innerHTML = '';
}
