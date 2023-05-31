import { instructionsClass, baseClass } from '../classNames';
import { gameBoard, instructionsDetailsPanel } from '../uiVariables';

export function instructionsTooltipIconListeners() {
  const instructionsTooltip = gameBoard.querySelector(
    instructionsClass + '--tooltip'
  );
  const instructionsTooltipText = gameBoard.querySelector(
    instructionsClass + '--tooltip-text'
  );

  function mouseOver() {
    if (window.getComputedStyle(instructionsDetailsPanel).display === 'none') {
      instructionsTooltipText.innerText = 'click to view instructions';
    } else {
      instructionsTooltipText.innerText = 'click to hide instructions';
    }
    instructionsTooltip.classList.add(baseClass + '--element-is-visible');
  }
  function mouseOut() {
    instructionsTooltip.classList.remove(baseClass + '--element-is-visible');
  }
  function click() {
    instructionsTooltip.classList.remove(baseClass + '--element-is-visible');

    if (window.getComputedStyle(instructionsDetailsPanel).display === 'none') {
      instructionsDetailsPanel.classList.add(
        baseClass + '--element-is-visible'
      );
    } else {
      instructionsDetailsPanel.classList.remove(
        baseClass + '--element-is-visible'
      );
    }
  }

  return {
    onmouseover: mouseOver,
    onmouseout: mouseOut,
    onclick: click
  };
}
