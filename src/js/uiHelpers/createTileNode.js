import { tileClass } from '../classNames';

export function createTileNode(id) {
  const div = document.createElement('div');

  div.classList.add(tileClass, tileClass + '--xy-coordinates-' + id);
  div.dataset.colAndRow = id;

  return div;
}
