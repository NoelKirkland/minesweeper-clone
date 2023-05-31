import '../scss/app.scss';
import * as classes from './classes';
import MineField from './minefield';
import { mineCountAndTimerFunctions } from './mineCountAndTimer';
import { leftClick, rightClick, doubleClick } from './tileClickListeners/tileClickListeners';

// all code is enclosed in an IIFE so as to not pollute the global state
(() => {
  //   UI function-state variables:

  const minesweeper = document.querySelector('.' + classes.baseClass);
  const gameBoard = minesweeper.querySelector('.' + classes.gameBoardClass);
  const instructionsTooltipIcon = gameBoard.querySelector(
    classes.instructionsTooltipIcon
  );
  const topFourButtonsArr = [
    ...gameBoard.querySelectorAll(classes.headerClass + '_button'),
  ];
  const numMinesRemaining = gameBoard.querySelector(
    classes.headerCountBox + '--mines-remaining'
  );
  const buttonFace = gameBoard.querySelector(
    classes.headerClass + '--reset-face'
  );
  const timerDisplay = gameBoard.querySelector(
    classes.headerCountBox + '--time-elapsed'
  );
  const gameGrid = gameBoard.querySelector('.' + classes.gameGridClass);
  const instructionsDetailsPanel = minesweeper.querySelector(
    classes.instructionsDetailsPanelClass
  );
  const difficultyInfoObj = {
    easy: {
      numCols: 8,
      numRows: 8,
      numMines: 10,
    },
    medium: {
      numCols: 16,
      numRows: 16,
      numMines: 40,
    },
    hard: {
      numCols: 30,
      numRows: 16,
      numMines: 99,
    },
    current: {
      numCols: 8,
      numRows: 8,
      numMines: 10,
    },
  };

  function newTileNode(innerText) {
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

  // some game board set up:
  function instructionsTooltipIconListeners() {
    const instructionsTooltip = gameBoard.querySelector(
      classes.instructionsClass + '--tooltip'
    );
    const instructionsTooltipText = gameBoard.querySelector(
      classes.instructionsClass + '--tooltip-text'
    );

    function mouseOver() {
      if (window.getComputedStyle(instructionsDetailsPanel).display == 'none') {
        instructionsTooltipText.innerText = 'click to view instructions';
      } else {
        instructionsTooltipText.innerText = 'click to hide instructions';
      }
      instructionsTooltip.classList.add(
        classes.baseClass + '--element-is-visible'
      );
    }
    function mouseOut() {
      instructionsTooltip.classList.remove(
        classes.baseClass + '--element-is-visible'
      );
    }
    function click() {
      instructionsTooltip.classList.remove(
        classes.baseClass + '--element-is-visible'
      );

      if (window.getComputedStyle(instructionsDetailsPanel).display == 'none') {
        instructionsDetailsPanel.classList.add(
          classes.baseClass + '--element-is-visible'
        );
      } else {
        instructionsDetailsPanel.classList.remove(
          classes.baseClass + '--element-is-visible'
        );
      }
    }

    return {
      onmouseover: mouseOver,
      onmouseout: mouseOut,
      onclick: click,
    };
  }

  (function setInstructionsTooltipIconListeners() {
    Object.entries(instructionsTooltipIconListeners()).map(
      ([listener, callBack]) => (instructionsTooltipIcon[listener] = callBack)
    );
  })();

  function setInstructionsDetailsSection(section) {
    const sectionHeader = section.querySelector(
        classes.instructionsDetailsPanelClass + '__section_section-header'
      ),
      sectionText = section.querySelector(
        classes.instructionsDetailsPanelClass + '__section_section-text'
      );

    section.onmouseover = () => {
      sectionHeader.style.textDecoration = 'underline';
      sectionText.classList.add(classes.baseClass + '--element-is-visible');
    };

    section.onmouseout = () => {
      sectionHeader.style.textDecoration = 'none';
      sectionText.classList.remove(classes.baseClass + '--element-is-visible');
    };
  }

  (function setAllInstructionsDetailsSections() {
    const allInstructionsSections = [
      ...instructionsDetailsPanel.querySelectorAll(
        classes.instructionsDetailsPanelClass + '__section'
      ),
    ];

    allInstructionsSections.map(setInstructionsDetailsSection);
  })();

  function selectDifficulty(event) {
    const selectedDifficulty = event.target.dataset.difficulty,
      selectedDifficultyInfo = difficultyInfoObj[selectedDifficulty];

    instructionsDetailsPanel.classList.remove(
      classes.baseClass + '--element-is-visible'
    );
    difficultyInfoObj.current = selectedDifficultyInfo;
    newGame(difficultyInfoObj.current);
  }

  topFourButtonsArr.map((button) => (button.onclick = selectDifficulty));

  [
    ['onmousedown', '😮'],
    ['onmouseup', '🙂'],
  ].map(
    ([event, face]) => (gameGrid[event] = () => (buttonFace.innerText = face))
  );

  //   UI Helper Methods:
  // all countdown display functions:
  const { updateMineCounter, startTimer, pauseTimer, resetTimer } = mineCountAndTimerFunctions(timerDisplay, numMinesRemaining, classes.headerClass);

  function findTileNode(id) {
    const domNode = gameGrid.querySelector(
      '.' + classes.tileClass + '--xy-coordinates-' + id
    );

    return domNode;
  }

  function gameOverStatesForGameBoard() {
    function createEndGameText(didWin) {
      const h2 = document.createElement('h2'),
        endGameClass = classes.gameGridClass + '_end-game-text';

      if (didWin) {
        h2.classList.add(endGameClass, endGameClass + '--winner-text');
        h2.innerText = 'you win!';
      } else {
        h2.classList.add(endGameClass, endGameClass + '--loser-text');
        h2.innerText = 'you lose!';
      }
      return h2;
    }
    function gameBoardIfWon() {
      const winnerText = createEndGameText(true);
      gameGrid.appendChild(winnerText);
      buttonFace.innerText = '😎';
      updateMineCounter(0);
    }
    function gameBoardIfLost(mineIdArr) {
      const loserText = createEndGameText(false);
      gameGrid.appendChild(loserText);
      buttonFace.innerText = '😵';
      mineIdArr.map((id) => {
        const domNode = findTileNode(id);
        const currentFlag = domNode.firstChild;
        if (currentFlag) {
          domNode.replaceChild(newTileNode('💣'), currentFlag);
        } else {
          domNode.appendChild(newTileNode('💣'));
        }
      });
    }

    pauseTimer();
    gameGrid.style.pointerEvents = 'none';

    return {
      gameBoardIfWon: gameBoardIfWon,
      gameBoardIfLost: gameBoardIfLost,
    };
  }

  function revealTileAndOrAdjTiles(thisTile, numAdjFlaggedTiles = 9) {
    const that = this;

    function revealTileNode(tile) {
      if (!tile.isMine) {
        const domNode = findTileNode(tile.id);

        if (tile.numAdjMines) {
          domNode.dataset.numAdjMines = tile.numAdjMines;
          domNode.appendChild(newTileNode(tile.numAdjMines));
        }
        domNode.classList.add(classes.tileClass + '--revealed');
      }
    }
    function revealAllAdjacentTiles(tile) {
      const allAdjTileIds = that.findAllAdjTileIds(tile.id);

      allAdjTileIds.map((id) => {
        const thisTile = that.allTiles[id];

        if (thisTile.isConcealed && !thisTile.isFlagged) {
          that.revealTile(thisTile);
          revealTileNode(thisTile);
          if (thisTile.numAdjMines === 0) {
            revealAllAdjacentTiles(thisTile);
          }
        }
      });
    }
    function checkGameResults() {
      if (that.mineTripped || !!!that.numConcealedNonMineTiles) {
        const { gameBoardIfWon, gameBoardIfLost } =
          gameOverStatesForGameBoard();
        if (that.mineTripped) {
          gameBoardIfLost(that.mineIdArr);
        } else {
          gameBoardIfWon();
        }
      }
    }

    if (numAdjFlaggedTiles < 9) {
      if (thisTile.numAdjMines === numAdjFlaggedTiles)
        revealAllAdjacentTiles(thisTile);
    } else {
      that.revealTile(thisTile);
      revealTileNode(thisTile);
      if (thisTile.numAdjMines === 0) revealAllAdjacentTiles(thisTile);
    }
    checkGameResults();
  }

  function clearGameBoard() {
    updateMineCounter(0);
    buttonFace.innerText = '🙂';
    resetTimer();
    gameGrid.style.pointerEvents = 'auto';
    gameGrid.innerHTML = '';
  }

  // the three mouse event listeners used on each and every tile; left-click, right-click, and double-click:
  /* function allTileEventListeners(mineField) {
    let clickTimer;

    function leftClick(event) {
      if (event.detail === 1) {
        clickTimer = setTimeout(() => {
          const thisTile = mineField.allTiles[event.target.dataset.colAndRow];

          if (!thisTile.isFlagged) {
            if (mineField.allTilesConcealed) {
              mineField.layMines(thisTile.id);
              startTimer();
            }
            if (thisTile.isConcealed) {
              revealTileAndOrAdjTiles.call(mineField, thisTile);
            }
          }
        }, 175);
      }
    }
    function rightClick(event) {
      event.preventDefault();
      const thisTile = mineField.allTiles[event.target.dataset.colAndRow];

      if (thisTile.isConcealed) {
        mineField.toggleTileFlag(thisTile);
        if (thisTile.isFlagged) {
          event.target.appendChild(newTileNode('🚩'));
        } else {
          const currFlag = event.target.firstChild;
          event.target.removeChild(currFlag);
        }
        updateMineCounter(mineField.numUnflaggedMines);
      }
    }
    function doubleClick(event) {
      event.preventDefault();
      clearTimeout(clickTimer);
      const thisTile = mineField.allTiles[event.target.dataset.colAndRow];

      if (!thisTile.isConcealed && thisTile.numAdjMines) {
        const countAdjFlaggedTile = (adjTilesFlagged, id) => {
          const thisAdjTile = mineField.allTiles[id];

          if (thisAdjTile.isFlagged) adjTilesFlagged++;

          return adjTilesFlagged;
        };
        const numAdjFlaggedTiles = mineField
          .findAllAdjTileIds(thisTile.id)
          .reduce(countAdjFlaggedTile, 0);

        revealTileAndOrAdjTiles.call(mineField, thisTile, numAdjFlaggedTiles);
      }
    }

    return {
      onclick: leftClick,
      oncontextmenu: rightClick,
      ondblclick: doubleClick,
    };
  } */

  function createTileNode(id) {
    const div = document.createElement('div');

    div.classList.add(
      classes.tileClass,
      classes.tileClass + '--xy-coordinates-' + id
    );
    div.dataset.colAndRow = id;

    return div;
  }

  // where it all comes together...
  function newGame({ numCols, numRows, numMines }) {
    // generate a new MineField class:
    const newMineField = new MineField(numCols, numRows, numMines);
    newMineField.layTiles();

    // clear existing game board state:
    clearGameBoard();

    // set up new game board:
    updateMineCounter(newMineField.numUnflaggedMines);
    gameGrid.style.gridTemplateColumns = `repeat(${numCols}, 28px)`;

    // generate all the game tiles:
    newMineField.iterateOverAllTiles(({ curCol, curRow }) => {
      const thisTile = newMineField.allTiles[`${curCol}x${curRow}`],
        thisTileNode = createTileNode(thisTile.id);

      // attach necessary event listeners to each tile:
      let clickTimer;
      thisTileNode.onclick = leftClick(newMineField, clickTimer, startTimer, revealTileAndOrAdjTiles);
      thisTileNode.oncontextmenu = rightClick(newMineField, updateMineCounter, newTileNode);
      thisTileNode.ondblclick = doubleClick(newMineField, clickTimer, revealTileAndOrAdjTiles);

      /* Object.entries(allTileEventListeners(newMineField)).map(
        ([listener, callBack]) => {
          thisTileNode[listener] = callBack;
        }
      ); */

      gameGrid.appendChild(thisTileNode);
    });

    // and lastly, ease into view. Nice.
    gameBoard.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }

  // generates a new game on load:
  newGame(difficultyInfoObj.current);
})();
