import { leftClick } from './leftClick';
import { rightClick } from './rightClick';
import { doubleClick } from './doubleClick';

export function tileClickListeners() {
  return {
    onclick: leftClick,
    oncontextmenu: rightClick,
    ondblclick: doubleClick
  };
}
