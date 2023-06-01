import { numMinesRemaining, buttonFace, gameGrid } from '../uiVariables';
import { updateMineCounter } from './updateMineCounter';

export function clearGameBoard() {
  updateMineCounter(0, numMinesRemaining);
  buttonFace.innerText = '🙂';
  gameGrid.style.pointerEvents = 'auto';
  gameGrid.innerHTML = '';
}
