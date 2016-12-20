// Game Mechanics file for Conway's Game of Life

var time = 0;
var speed = 0;
var gridHeight = 10; // placeholder value
var gridWidth = 10; // placeholder value
var mainGrid = [];

var cell = {
    alive: false,
    positionX: 0;
    positionY: 0;
    makePopulated: function() { this.cell.alive = true; },
    keepAlive: function() { this.cell.alive = true; }, // Not sure if this is really necessary.
    makeDead: function() { this.cell.alive = false; }
};

var createGrid = function() {
    for (column = 0; column < gridWidth; column++) {
        grid[column] = [];
        for (row = 0; row < gridHeight; row++) {
            grid[column][row] = new cell();
            grid[column][row].positionX = column;
            grid[column][row].positionY = row;
        }
    }
}

//  This funciton changes the designated cell's state on the grid.  This will be used to run in parallel with all the squares on the grid.
var changeCells = function() {
    var snapshot = mainGrid; // Creates snapshot of grid for reference before changes are made
    var sumAlive;
    for (column = 0; column < gridWidth; column++) {
        for (row = 0; row < gridHeight; row++) {
            sumAlive = 0;
            sumAlive = checkAliveLeftHoriz(snapshot, column, row) + checkAliveRightHoriz(snapshot, column, row) 
                     + checkAliveAbove(snapshot, column, row) + checkAliveBelow(snapshot, column, row) 
                     + checkAliveUpperLeft(snapshot, column, row) + checkAliveUpperRight(snapshot, column, row) 
                     + checkAliveLowerLeft(snapshot, column, row) + checkAliveLowerRight(snapshot, column, row);
            if (sumAlive === 2 || sumAlive === 3) {
            // Empty Cell Becomes Populated
                if (sumAlive === 3 && snapshot[column][row].alive === false) {
                    grid[column][row].makePopulated();
                }
                // Keep Populated Cell Alive
                grid[column][row].keepAlive();
            }
            // Cell Death by Overpopulation or Solitude
            else if ((sumAlive >= 4 || sumAlive <=1) && snapshot[column][row].alive === true) {
                grid[column][row].makeDead();
            }
        }
    }
    return grid; // Return entire grid
}

var checkCell = function(grid, column, row) {
    if (grid[column][row].alive === true) {
        return 1;
    }
    return 0;
}

var checkAliveLeftHoriz = function(grid, column, row) {
    column--;
    if (column < 0) {
        return 0;
    }
    return checkCell(grid, column, row);
}

var checkAliveRightHoriz = function(grid, column, row) {
    column++;
    if (column >= gridWidth) {
        return 0;
    }
    return checkCell(grid, column, row);
}

var checkAliveAbove = function(grid, column, row) {
    row--;
    if (row < 0) {
        return 0;
    }
    return checkCell(grid, column, row);
}

var checkAliveBelow = function(grid, column, row) {
    row++;
    if (row >= gridHeight) {
        return 0;
    }
    return checkCell(grid, column, row);
}

var checkAliveUpperLeft = function(grid, column, row) {
    column--;
    row--;
    if (row < 0 || column < 0) {
        return 0;
    }
    return checkCell(grid, column, row);
}

var checkAliveUpperRight = function(grid, column, row) {
    column++;
    row--;
    if (row < 0 || column >= gridWidth) {
        return 0;
    }
    return checkCell(grid, column, row);
}

var checkAliveLowerLeft = function(grid, column, row) {
    column--;
    row++;
    if (row >= gridHeight || column < 0) {
        return 0;
    }
    return checkCell(grid, column, row);
}

var checkAliveLowerRight = function(grid, column, row) {
    column++;
    row++;
    if (row >= gridWidth || column >= gridWidth) {
        return 0;
    }
    return checkCell(grid, column, row);
}