import {
  instructionsDetailsPanel,
  difficultyInfoObj,
  classes
} from '../uiVariables';

export function selectDifficulty(newGame) {
  return (event) => {
    const selectedDifficulty = event.target.dataset.difficulty;
    const selectedDifficultyInfo = difficultyInfoObj[selectedDifficulty];

    instructionsDetailsPanel.classList.remove(
      classes.baseClass + '--element-is-visible'
    );
    difficultyInfoObj.current = selectedDifficultyInfo;
    newGame(difficultyInfoObj.current);
  };
}
