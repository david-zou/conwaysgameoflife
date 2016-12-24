// Game Mechanics file for Conway's Game of Life

// Global Variables
var time = 0;
var speed = 0;
var gridHeight = 20; // placeholder value
var gridWidth = 20; // placeholder value
var mainGrid = []; 

// Grid cell object prototype
function cell() {
    this.alive = false;
    this.coordX = 0;
    this.coordY = 0;
    this.makePopulated = function() { this.alive = true; };
    this.makeDead = function() { this.alive = false; };
}

// Creates the main grid
var createGrid = function() {
    for (column = 0; column < gridWidth; column++) {
        mainGrid[column] = [];
        for (row = 0; row < gridHeight; row++) {
            mainGrid[column][row] = new cell();
            mainGrid[column][row].coordX = column;
            mainGrid[column][row].coordY = row;
        }
    }
    return mainGrid;
}

var drawCell = function(id, cell) {
    if (cell.alive === true) {
        document.getElementById(id).innerHTML = "";
    }
    else {
        document.getElementById(id).innerHTML = ""; 
    }
}

// Clones a cell object
var cloneCell = function(originalCell) {
    var copyCell = new cell();
    copyCell.alive = originalCell.alive;
    copyCell.coordX = originalCell.coordX;
    copyCell.coordY = originalCell.coordY;
    return copyCell;
}

//  Changes all cell's state on the grid
var changeCells = function(grid) {
    var snapshot = [];
    for (column = 0; column < gridWidth; column++) {
        snapshot[column] = [];
        for (row = 0; row < gridHeight; row++) {
            snapshot[column][row] = cloneCell(grid[column][row]);
        }
    }
    var sumAlive;
    for (column = 0; column < gridWidth; column++) {
        for (row = 0; row < gridHeight; row++) {
            sumAlive = 0; // Reset Sum
            sumAlive = checkAliveLeftHoriz(snapshot, column, row) + checkAliveRightHoriz(snapshot, column, row) 
                     + checkAliveAbove(snapshot, column, row) + checkAliveBelow(snapshot, column, row) 
                     + checkAliveUpperLeft(snapshot, column, row) + checkAliveUpperRight(snapshot, column, row) 
                     + checkAliveLowerLeft(snapshot, column, row) + checkAliveLowerRight(snapshot, column, row);
            if (sumAlive === 2 || sumAlive === 3) {
                // Empty Cell Becomes Populated
                if (sumAlive === 3 && snapshot[column][row].alive === false) {
                    grid[column][row].makePopulated();
                }
            }
            // Cell Death by Overpopulation or Solitude
            else if (sumAlive >= 4 || sumAlive <=1) {
                grid[column][row].makeDead();
            }
        }
    }
    mainGrid = grid;
    return mainGrid; // Return entire grid
}

// Checks the designated cell for dead or alive state
var checkCell = function(grid, column, row) {
    if (grid[column][row].alive === true) {
        return 1;
    }
    return 0;
}

// Changes target cell for dead or alive check to the left and runs cell check
var checkAliveLeftHoriz = function(grid, column, row) {
    column--;
    if (column < 0) {
        return 0;
    }
    return checkCell(grid, column, row);
}

// Changes target cell for dead or alive check to the right and runs cell check
var checkAliveRightHoriz = function(grid, column, row) {
    column++;
    if (column >= gridWidth) {
        return 0;
    }
    return checkCell(grid, column, row);
}

// Changes target cell for dead or alive check to above and runs cell check
var checkAliveAbove = function(grid, column, row) {
    row--;
    if (row < 0) {
        return 0;
    }
    return checkCell(grid, column, row);
}

// Changes target cell for dead or alive check to below and runs cell check
var checkAliveBelow = function(grid, column, row) {
    row++;
    if (row >= gridHeight) {
        return 0;
    }
    return checkCell(grid, column, row);
}

// Changes target cell for dead or alive check to the upper left and runs cell check
var checkAliveUpperLeft = function(grid, column, row) {
    column--;
    row--;
    if (row < 0 || column < 0) {
        return 0;
    }
    return checkCell(grid, column, row);
}

// Changes target cell for dead or alive check to the upper right and runs cell check
var checkAliveUpperRight = function(grid, column, row) {
    column++;
    row--;
    if (row < 0 || column >= gridWidth) {
        return 0;
    }
    return checkCell(grid, column, row);
}

// Changes target cell for dead or alive check to the lower left and runs cell check
var checkAliveLowerLeft = function(grid, column, row) {
    column--;
    row++;
    if (row >= gridHeight || column < 0) {
        return 0;
    }
    return checkCell(grid, column, row);
}

// Changes target cell for dead or alive check to the lower right and runs cell check
var checkAliveLowerRight = function(grid, column, row) {
    column++;
    row++;
    if (row >= gridWidth || column >= gridWidth) {
        return 0;
    }
    return checkCell(grid, column, row);
}