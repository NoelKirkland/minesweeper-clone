import { gameGrid, classes } from '../uiVariables';

export function findTileNode(id) {
  const domNode = gameGrid.querySelector(
    '.' + classes.tileClass + '--xy-coordinates-' + id
  );

  return domNode;
}
