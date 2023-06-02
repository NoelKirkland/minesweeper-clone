import {
  gameBoard,
  instructionsDetailsPanel,
  classNames
} from '../ui-elements';

export function instructionsTooltipIconListeners() {
  const instructionsTooltip = gameBoard.querySelector(
    classNames.instructionsClass + '--tooltip'
  );
  const instructionsTooltipText = gameBoard.querySelector(
    classNames.instructionsClass + '--tooltip-text'
  );

  function mouseOver() {
    if (window.getComputedStyle(instructionsDetailsPanel).display === 'none') {
      instructionsTooltipText.innerText = 'click to view instructions';
    } else {
      instructionsTooltipText.innerText = 'click to hide instructions';
    }
    instructionsTooltip.classList.add(
      classNames.baseClass + '--element-is-visible'
    );
  }
  function mouseOut() {
    instructionsTooltip.classList.remove(
      classNames.baseClass + '--element-is-visible'
    );
  }
  function click() {
    instructionsTooltip.classList.remove(
      classNames.baseClass + '--element-is-visible'
    );

    if (window.getComputedStyle(instructionsDetailsPanel).display === 'none') {
      instructionsDetailsPanel.classList.add(
        classNames.baseClass + '--element-is-visible'
      );
    } else {
      instructionsDetailsPanel.classList.remove(
        classNames.baseClass + '--element-is-visible'
      );
    }
  }

  return {
    onmouseover: mouseOver,
    onmouseout: mouseOut,
    onclick: click
  };
}
