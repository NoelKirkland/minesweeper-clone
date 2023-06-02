import { classNames } from '../ui-elements';

export function createTileNode(id) {
  const div = document.createElement('div');

  div.classList.add(
    classNames.tileClass,
    classNames.tileClass + '--xy-coordinates-' + id
  );
  div.dataset.colAndRow = id;

  return div;
}
