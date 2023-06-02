import {
  instructionsDetailsPanel,
  difficultyInfoObj,
  classNames
} from '../ui-elements';

export function selectDifficulty(newGame) {
  return (event) => {
    const selectedDifficulty = event.target.dataset.difficulty;
    const selectedDifficultyInfo = difficultyInfoObj[selectedDifficulty];

    instructionsDetailsPanel.classList.remove(
      classNames.baseClass + '--element-is-visible'
    );
    difficultyInfoObj.current = selectedDifficultyInfo;
    newGame(difficultyInfoObj.current);
  };
}
