export function newTileNode(innerText) {
  const node = document.createElement('p');
  node.innerText = innerText;

  switch (innerText) {
    case '🚩':
      node.className = 'game-board__grid-area_tile--is-flagged';
      break;
    case '💣':
      node.className = 'game-board__grid-area_tile--is-mine';
      break;
    default:
      node.className = 'game-board__grid-area_tile--is-mine-adjacent';
  }

  return node;
}
