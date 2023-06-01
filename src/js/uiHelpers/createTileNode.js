import { classes } from '../uiVariables';

export function createTileNode(id) {
  const div = document.createElement('div');

  div.classList.add(
    classes.tileClass,
    classes.tileClass + '--xy-coordinates-' + id
  );
  div.dataset.colAndRow = id;

  return div;
}
