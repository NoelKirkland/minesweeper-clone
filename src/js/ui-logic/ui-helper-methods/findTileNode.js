import { gameGrid, classNames } from '../ui-elements';

export function findTileNode(id) {
  const domNode = gameGrid.querySelector(
    '.' + classNames.tileClass + '--xy-coordinates-' + id
  );

  return domNode;
}
