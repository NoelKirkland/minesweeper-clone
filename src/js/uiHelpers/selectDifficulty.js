import { baseClass } from '../classNames';
import { difficultyInfoObj, instructionsDetailsPanel } from '../uiVariables';

export function selectDifficulty(newGame) {
  return (event) => {
    const selectedDifficulty = event.target.dataset.difficulty;
    const selectedDifficultyInfo = difficultyInfoObj[selectedDifficulty];

    instructionsDetailsPanel.classList.remove(
      baseClass + '--element-is-visible'
    );
    difficultyInfoObj.current = selectedDifficultyInfo;
    newGame(difficultyInfoObj.current);
  };
}
