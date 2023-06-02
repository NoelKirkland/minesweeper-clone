import { numMinesDisplay, buttonFace, gameGrid } from '../ui-elements';
import { updateMineCounter } from './updateMineCounter';

export function clearGameBoard() {
  updateMineCounter(0, numMinesDisplay);
  buttonFace.innerText = '🙂';
  gameGrid.style.pointerEvents = 'auto';
  gameGrid.innerHTML = '';
}
