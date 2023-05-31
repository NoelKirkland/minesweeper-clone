import {
  gameBoard,
  instructionsDetailsPanel,
  classes
} from '../uiVariables/uiVariables';

export function instructionsTooltipIconListeners() {
  const instructionsTooltip = gameBoard.querySelector(
    classes.instructionsClass + '--tooltip'
  );
  const instructionsTooltipText = gameBoard.querySelector(
    classes.instructionsClass + '--tooltip-text'
  );

  function mouseOver() {
    if (window.getComputedStyle(instructionsDetailsPanel).display === 'none') {
      instructionsTooltipText.innerText = 'click to view instructions';
    } else {
      instructionsTooltipText.innerText = 'click to hide instructions';
    }
    instructionsTooltip.classList.add(
      classes.baseClass + '--element-is-visible'
    );
  }
  function mouseOut() {
    instructionsTooltip.classList.remove(
      classes.baseClass + '--element-is-visible'
    );
  }
  function click() {
    instructionsTooltip.classList.remove(
      classes.baseClass + '--element-is-visible'
    );

    if (window.getComputedStyle(instructionsDetailsPanel).display === 'none') {
      instructionsDetailsPanel.classList.add(
        classes.baseClass + '--element-is-visible'
      );
    } else {
      instructionsDetailsPanel.classList.remove(
        classes.baseClass + '--element-is-visible'
      );
    }
  }

  return {
    onmouseover: mouseOver,
    onmouseout: mouseOut,
    onclick: click
  };
}
