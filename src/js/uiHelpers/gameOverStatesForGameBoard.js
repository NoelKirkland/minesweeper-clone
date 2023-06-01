import {
  numMinesRemaining,
  buttonFace,
  gameGrid,
  classes
} from '../uiVariables';
import { findTileNode } from './findTileNode';
import { newTileNode } from './newTileNode';
import { updateMineCounter } from './updateMineCounter';

export function gameOverStatesForGameBoard() {
  function createEndGameText(didWin) {
    const h2 = document.createElement('h2');
    const endGameClass = classes.gameGridClass + '_end-game-text';

    if (didWin) {
      h2.classList.add(endGameClass, endGameClass + '--winner-text');
      h2.innerText = 'you win!';
    } else {
      h2.classList.add(endGameClass, endGameClass + '--loser-text');
      h2.innerText = 'you lose!';
    }
    return h2;
  }
  function gameBoardIfWon() {
    const winnerText = createEndGameText(true);
    gameGrid.appendChild(winnerText);
    buttonFace.innerText = '😎';
    updateMineCounter(0, numMinesRemaining);
  }
  function gameBoardIfLost(mineIdArr) {
    const loserText = createEndGameText(false);
    gameGrid.appendChild(loserText);
    buttonFace.innerText = '😵';
    mineIdArr.map((id) => {
      const domNode = findTileNode(id);
      const currentFlag = domNode.firstChild;

      return currentFlag
        ? domNode.replaceChild(newTileNode('💣'), currentFlag)
        : domNode.appendChild(newTileNode('💣'));
    });
  }

  gameGrid.style.pointerEvents = 'none';

  return {
    gameBoardIfWon: gameBoardIfWon,
    gameBoardIfLost: gameBoardIfLost
  };
}
