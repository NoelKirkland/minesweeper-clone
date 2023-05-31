import { tileClass } from '../classNames';
import { gameGrid } from '../uiVariables';

export function findTileNode(id) {
  const domNode = gameGrid.querySelector(
    '.' + tileClass + '--xy-coordinates-' + id
  );

  return domNode;
}
