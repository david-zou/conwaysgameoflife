// Unit Test Functions for Conway's Game of Life

// Tests Grid Creation Function
var testCreateGrid = function() {
    gridWidth = 10;
    gridHeight = 10;
    var grid = createGrid();
    if (grid.length !== gridWidth) {
        document.write("<li>testCreateGrid: Width test FAILED - grid.length: " + grid.length + " " + "gridWidth: " + gridWidth + "<br>");
    }
    else {
        document.write("<li>testCreateGrid: Width test PASSED - grid.length: " + grid.length + " " + "gridWidth: " + gridWidth + "<br>");
    }
    if (grid[0].length !== gridHeight) {
        document.write("<li>testCreateGrid: Height test FAILED - grid.length: " + grid[0].length + " " + "gridHeight: " + gridHeight + "<br>");
    }
    else {
        document.write("<li>testCreateGrid: Height test PASSED - grid.length: " + grid[0].length + " " + "gridHeight: " + gridHeight + "<br>");
    }
    var failCount = 0;
    for (column = 0; column < gridWidth; column++) {
        for (row = 0; row < gridHeight; row++) {
            if (grid[column][row].alive === true) {
                document.write("<li>testCreateGrid: Cell State Test FAILED at column " + column + " row " + row + " - Cell State = " + grid[column][row].alive + "<br>");
                failCount++;
            }
        }
    }
    if (failCount === 0) {
        document.write("<li>testCreateGrid: Cell State Test PASSED - All created cells are initialized unpopulated. (value = " + grid[0][0].alive + ")<br>");
    }
    else {
        document.write("<li>testCreateGrid: Cell State Test Fail Count: " + failCount + "<br>");
    }
}

// Tests Cell Cloning Function (Ignores object function properties)
var testCloneCell = function() {
    var failFlag = false;
    var testCell = new cell();
    testCell.alive = true;
    testCell.coordX = 1;
    testCell.coordY = 2;
    var resultCell = cloneCell(testCell);
    var testProperty = Object.getOwnPropertyNames(testCell);
    var resultProperty = Object.getOwnPropertyNames(resultCell);
    for (index = 0; index < testProperty.length; index++) {
        var propertyName = testProperty[index];
        if ((testCell[propertyName] !== resultCell[propertyName]) && (propertyName !== "makePopulated" && propertyName !== "makeDead")) {
            failFlag = true;
            document.write("<li>testCloneCell: Test FAILED at "
                + "testCell[" + propertyName + "]: " + testCell[propertyName] + ", resultCell[" + propertyName + "]: " + resultCell[propertyName] + "<br>");
        }
    }
    if (failFlag === false) {
        document.write("<li>testCloneCell: Test PASSED - All cell properties match.<br>");
    }
}

// Tests Cell Population Function
var testMakePopulated = function() {
    var testCell = new cell();
    testCell.makePopulated();
    if (testCell.alive === false) {
        document.write("<li>testMakePopulated: Test FAILED, Cell Alive State = " + testCell.alive + "<br>");
    }
    else {
        document.write("<li>testMakePopulated: Test PASSED, Cell Alive State = " + testCell.alive + "<br>");
    }
}

// Tests Make Cell Dead Function
var testMakeDead = function() {
    var testCell = new cell();
    testCell.makeDead();
    if (testCell.alive === true) {
        document.write("<li>testMakeDead: Test FAILED, Cell Alive State = " + testCell.alive + "<br>");
    }
    else {
        document.write("<li>testMakeDead: Test PASSED, Cell Alive State = " + testCell.alive + "<br>");
    }
}

// Tests Designated Cell's State Function
var testCheckCell = function() {
    gridWidth = 3;
    gridHeight = 3;
    var testColumn = 1;
    var testRow = 1;
    var grid = createGrid();
    grid[testColumn][testRow].alive = true;
    var aliveSum = checkCell(grid,testColumn,testRow);
    if (aliveSum === 1) {
        document.write("<li>testCheckCell: Test PASSED#1 - cell was set to alive, checkCell() yielded " + aliveSum + "<br>");
    }
    else {
        document.write("<li>testCheckCell: Test FAILED#1 - cell was set to alive, checkCell() yielded " + aliveSum + "<br>");
    }
    grid[testColumn][testRow].alive = false;
    aliveSum = checkCell(grid,testColumn,testRow);
    if (aliveSum === 0) {
        document.write("<li>testCheckCell: Test PASSED#2 - cell was set to dead, checkCell() yielded " + aliveSum + "<br>");
    }
    else {
        document.write("<li>testCheckCell: Test FAILED#2 - cell was set to dead, checkCell() yielded " + aliveSum + "<br>");
    }
}

// Tests Check Cell's State Left of Current Cell Function
var testCheckAliveLeftHoriz = function() {
    gridWidth = 3;
    gridHeight = 3;
    var testColumn1 = 1;
    var testRow1 = 1;
    var testColumn2 = 0;
    var testRow2 = 1;
    var grid = createGrid();
    grid[testColumn1][testRow1].alive = true;
    grid[testColumn2][testRow2].alive = true;
    var aliveSum = checkAliveLeftHoriz(grid,testColumn1, testRow1);
    if (aliveSum === 1) {
        document.write("<li>testCheckAliveLeftHoriz: Test#1 PASSED - cell left of designated cell was set to alive, checkAliveLeftHoriz() yielded " + aliveSum + "<br>");
    }
    else {
        document.write("<li>testCheckAliveLeftHoriz: Test#1 FAILED - cell left of designated cell was set to alive, checkAliveLeftHoriz() yielded " + aliveSum + "<br>");
    }
    grid[testColumn2][testRow2].alive = false;
    aliveSum = checkAliveLeftHoriz(grid,testColumn1, testRow1);
    if (aliveSum === 0) {
        document.write("<li>testCheckAliveLeftHoriz: Test#2 PASSED - cell left of designated cell was set to dead, checkAliveLeftHoriz() yielded " + aliveSum + "<br>");
    }
    else {
        document.write("<li>testCheckAliveLeftHoriz: Test#2 FAILED - cell left of designated cell was set to dead, checkAliveLeftHoriz() yielded " + aliveSum + "<br>");
    }
}

// Tests Check Cell's State Right of Current Cell Function
var testCheckAliveRightHoriz = function() {
    gridWidth = 3;
    gridHeight = 3;
    var testColumn1 = 1;
    var testRow1 = 1;
    var testColumn2 = 2;
    var testRow2 = 1;
    var grid = createGrid();
    grid[testColumn1][testRow1].alive = true;
    grid[testColumn2][testRow2].alive = true;
    var aliveSum = checkAliveRightHoriz(grid,testColumn1, testRow1);
    if (aliveSum === 1) {
        document.write("<li>testCheckAliveRightHoriz: Test#1 PASSED - cell right of designated cell was set to alive, checkAliveRightHoriz() yielded " + aliveSum + "<br>");
    }
    else {
        document.write("<li>testCheckAliveRightHoriz: Test#1 FAILED - cell right of designated cell was set to alive, checkAliveRightHoriz() yielded " + aliveSum + "<br>");
    }
    grid[testColumn2][testRow2].alive = false;
    aliveSum = checkAliveRightHoriz(grid,testColumn1, testRow1);
    if (aliveSum === 0) {
        document.write("<li>testCheckAliveRightHoriz: Test#2 PASSED - cell right of designated cell was set to dead, checkAliveRightHoriz() yielded " + aliveSum + "<br>");
    }
    else {
        document.write("<li>testCheckAliveRightHoriz: Test#2 FAILED - cell right of designated cell was set to dead, checkAliveRightHoriz() yielded " + aliveSum + "<br>");
    }
}

// Tests Check Cell's State Above of Current Cell Function
var testCheckAliveAbove = function() {
    gridWidth = 3;
    gridHeight = 3;
    var testColumn1 = 1;
    var testRow1 = 1;
    var testColumn2 = 1;
    var testRow2 = 0;
    var grid = createGrid();
    grid[testColumn1][testRow1].alive = true;
    grid[testColumn2][testRow2].alive = true;
    var aliveSum = checkAliveAbove(grid,testColumn1, testRow1);
    if (aliveSum === 1) {
        document.write("<li>testCheckAliveAbove: Test#1 PASSED - cell above of designated cell was set to alive, checkAliveAbove() yielded " + aliveSum + "<br>");
    }
    else {
        document.write("<li>testCheckAliveAbove: Test#1 FAILED - cell above of designated cell was set to alive, checkAliveAbove() yielded " + aliveSum + "<br>");
    }
    grid[testColumn2][testRow2].alive = false;
    aliveSum = checkAliveAbove(grid,testColumn1, testRow1);
    if (aliveSum === 0) {
        document.write("<li>testCheckAliveAbove: Test#2 PASSED - cell above of designated cell was set to dead, checkAliveAbove() yielded " + aliveSum + "<br>");
    }
    else {
        document.write("<li>testCheckAliveAbove: Test#2 FAILED - cell above of designated cell was set to dead, checkAliveAbove() yielded " + aliveSum + "<br>");
    }
}

// Tests Check Cell's State Below of Current Cell Function
var testCheckAliveBelow = function() {
    gridWidth = 3;
    gridHeight = 3;
    var testColumn1 = 1;
    var testRow1 = 1;
    var testColumn2 = 1;
    var testRow2 = 2;
    var grid = createGrid();
    grid[testColumn1][testRow1].alive = true;
    grid[testColumn2][testRow2].alive = true;
    var aliveSum = checkAliveBelow(grid,testColumn1, testRow1);
    if (aliveSum === 1) {
        document.write("<li>testCheckAliveBelow: Test#1 PASSED - cell below of designated cell was set to alive, checkAliveBelow() yielded " + aliveSum + "<br>");
    }
    else {
        document.write("<li>testCheckAliveBelow: Test#1 FAILED - cell below of designated cell was set to alive, checkAliveBelow() yielded " + aliveSum + "<br>");
    }
    grid[testColumn2][testRow2].alive = false;
    aliveSum = checkAliveBelow(grid,testColumn1, testRow1);
    if (aliveSum === 0) {
        document.write("<li>testCheckAliveBelow: Test#2 PASSED - cell below of designated cell was set to dead, checkAliveBelow() yielded " + aliveSum + "<br>");
    }
    else {
        document.write("<li>testCheckAliveBelow: Test#2 FAILED - cell below of designated cell was set to dead, checkAliveBelow() yielded " + aliveSum + "<br>");
    }
}

// Tests Check Cell's State Upper Left of Current Cell Function
var testCheckAliveUpperLeft = function() {
    gridWidth = 3;
    gridHeight = 3;
    var testColumn1 = 1;
    var testRow1 = 1;
    var testColumn2 = 0;
    var testRow2 = 0;
    var grid = createGrid();
    grid[testColumn1][testRow1].alive = true;
    grid[testColumn2][testRow2].alive = true;
    var aliveSum = checkAliveUpperLeft(grid,testColumn1, testRow1);
    if (aliveSum === 1) {
        document.write("<li>testCheckAliveUpperLeft: Test#1 PASSED - cell upper left of designated cell was set to alive, checkAliveUpperLeft() yielded " + aliveSum + "<br>");
    }
    else {
        document.write("<li>testCheckAliveUpperLeft: Test#1 FAILED - cell upper left of designated cell was set to alive, checkAliveUpperLeft() yielded " + aliveSum + "<br>");
    }
    grid[testColumn2][testRow2].alive = false;
    aliveSum = checkAliveUpperLeft(grid,testColumn1, testRow1);
    if (aliveSum === 0) {
        document.write("<li>testCheckAliveUpperLeft: Test#2 PASSED - cell upper left of designated cell was set to dead, checkAliveUpperLeft() yielded " + aliveSum + "<br>");
    }
    else {
        document.write("<li>testCheckAliveUpperLeft: Test#2 FAILED - cell upper left of designated cell was set to dead, checkAliveUpperLeft() yielded " + aliveSum + "<br>");
    }
}

// Tests Check Cell's State Upper Right of Current Cell Function
var testCheckAliveUpperRight = function() {
    gridWidth = 3;
    gridHeight = 3;
    var testColumn1 = 1;
    var testRow1 = 1;
    var testColumn2 = 2;
    var testRow2 = 0;
    var grid = createGrid();
    grid[testColumn1][testRow1].alive = true;
    grid[testColumn2][testRow2].alive = true;
    var aliveSum = checkAliveUpperRight(grid,testColumn1, testRow1);
    if (aliveSum === 1) {
        document.write("<li>testCheckAliveUpperRight: Test#1 PASSED - cell upper right of designated cell was set to alive, checkAliveUpperRight() yielded " + aliveSum + "<br>");
    }
    else {
        document.write("<li>testCheckAliveUpperRight: Test#1 FAILED - cell upper right of designated cell was set to alive, checkAliveUpperRight() yielded " + aliveSum + "<br>");
    }
    grid[testColumn2][testRow2].alive = false;
    aliveSum = checkAliveUpperRight(grid,testColumn1, testRow1);
    if (aliveSum === 0) {
        document.write("<li>testCheckAliveUpperRight: Test#2 PASSED - cell upper right of designated cell was set to dead, checkAliveUpperRight() yielded " + aliveSum + "<br>");
    }
    else {
        document.write("<li>testCheckAliveUpperRight: Test#2 FAILED - cell upper right of designated cell was set to dead, checkAliveUpperRight() yielded " + aliveSum + "<br>");
    }
}

// Tests Check Cell's State Lower Left of Current Cell Function
var testCheckAliveLowerLeft = function() {
    gridWidth = 3;
    gridHeight = 3;
    var testColumn1 = 1;
    var testRow1 = 1;
    var testColumn2 = 0;
    var testRow2 = 2;
    var grid = createGrid();
    grid[testColumn1][testRow1].alive = true;
    grid[testColumn2][testRow2].alive = true;
    var aliveSum = checkAliveLowerLeft(grid,testColumn1, testRow1);
    if (aliveSum === 1) {
        document.write("<li>testCheckAliveLowerLeft: Test#1 PASSED - cell lower left of designated cell was set to alive, checkAliveLowerLeft() yielded " + aliveSum + "<br>");
    }
    else {
        document.write("<li>testCheckAliveLowerLeft: Test#1 FAILED - cell lower left of designated cell was set to alive, checkAliveLowerLeft() yielded " + aliveSum + "<br>");
    }
    grid[testColumn2][testRow2].alive = false;
    aliveSum = checkAliveLowerLeft(grid,testColumn1, testRow1);
    if (aliveSum === 0) {
        document.write("<li>testCheckAliveLowerLeft: Test#2 PASSED - cell lower left of designated cell was set to dead, checkAliveLowerLeft() yielded " + aliveSum + "<br>");
    }
    else {
        document.write("<li>testCheckAliveLowerLeft: Test#2 FAILED - cell lower left of designated cell was set to dead, checkAliveLowerLeft() yielded " + aliveSum + "<br>");
    }
}

// Tests Check Cell's State Lower Right of Current Cell Function
var testCheckAliveLowerRight = function() {
    gridWidth = 3;
    gridHeight = 3;
    var testColumn1 = 1;
    var testRow1 = 1;
    var testColumn2 = 2;
    var testRow2 = 2;
    var grid = createGrid();
    grid[testColumn1][testRow1].alive = true;
    grid[testColumn2][testRow2].alive = true;
    var aliveSum = checkAliveLowerRight(grid,testColumn1, testRow1);
    if (aliveSum === 1) {
        document.write("<li>testCheckAliveLowerRight: Test#1 PASSED - cell lower right of designated cell was set to alive, checkAliveLowerRight() yielded " + aliveSum + "<br>");
    }
    else {
        document.write("<li>testCheckAliveLowerRight: Test#1 FAILED - cell lower right of designated cell was set to alive, checkAliveLowerRight() yielded " + aliveSum + "<br>");
    }
    grid[testColumn2][testRow2].alive = false;
    aliveSum = checkAliveLowerRight(grid,testColumn1, testRow1);
    if (aliveSum === 0) {
        document.write("<li>testCheckAliveLowerRight: Test#2 PASSED - cell lower right of designated cell was set to dead, checkAliveLowerRight() yielded " + aliveSum + "<br>");
    }
    else {
        document.write("<li>testCheckAliveLowerRight: Test#2 FAILED - cell lower right of designated cell was set to dead, checkAliveLowerRight() yielded " + aliveSum + "<br>");
    }
}

//  Tests the cell change function to make sure the cell growth/death conditions are working properly.
//  A scenario of a 3x3 grid is used, starting with the top row populated and the center cell on the 
//  second row the only one populated, with the rest of the grid non-populated.  The function iterates
//  three times to represent three consecutive steps and verifies that each step yields the correct cell 
//  growth/death behavior.
var testChangeCells = function() {
    gridWidth = 3;
    gridHeight = 3;
    var testColumn1 = 1;
    var testRow1 = 1;
    var testColumn2 = 0;
    var testRow2 = 0;
    var testColumn3 = 1;
    var testRow3 = 0;
    var testColumn4 = 2;
    var testRow4 = 0;
    var initGrid = createGrid();
    initGrid[testColumn1][testRow1].alive = true;
    initGrid[testColumn2][testRow2].alive = true;
    initGrid[testColumn3][testRow3].alive = true;
    initGrid[testColumn4][testRow4].alive = true;
    document.write("<li>testChangeCells: Step#0 START<br>" 
                    + "[0][0] = " + initGrid[0][0].alive + "<br>"
                    + "[0][1] = " + initGrid[0][1].alive + "<br>"
                    + "[0][2] = " + initGrid[0][2].alive + "<br>"
                    + "[1][0] = " + initGrid[1][0].alive + "<br>"
                    + "[1][1] = " + initGrid[1][1].alive + "<br>"
                    + "[1][2] = " + initGrid[1][2].alive + "<br>"
                    + "[2][0] = " + initGrid[2][0].alive + "<br>"
                    + "[2][1] = " + initGrid[2][1].alive + "<br>"
                    + "[2][2] = " + initGrid[2][2].alive + "<br>");
    // Test #1 - First Step
    var resultGrid = changeCells(initGrid);
    if ((resultGrid[0][0].alive && resultGrid[0][1].alive && resultGrid[1][0].alive && resultGrid[1][1].alive && resultGrid[2][0].alive && resultGrid[2][1].alive === true)
        && resultGrid[0][2].alive === false && resultGrid[1][2].alive === false && resultGrid[2][2].alive === false) {
        document.write("<li>testChangeCells: Step#1 PASSED<br>"
                        + "[0][0] = " + resultGrid[0][0].alive + "<br>"
                        + "[0][1] = " + resultGrid[0][1].alive + "<br>"
                        + "[0][2] = " + resultGrid[0][2].alive + "<br>"
                        + "[1][0] = " + resultGrid[1][0].alive + "<br>"
                        + "[1][1] = " + resultGrid[1][1].alive + "<br>"
                        + "[1][2] = " + resultGrid[1][2].alive + "<br>"
                        + "[2][0] = " + resultGrid[2][0].alive + "<br>"
                        + "[2][1] = " + resultGrid[2][1].alive + "<br>"
                        + "[2][2] = " + resultGrid[2][2].alive + "<br>");
    }
    else {
        document.write("<li>testChangeCells: Step#1 FAILED:<br>" 
                        + "[0][0] = " + resultGrid[0][0].alive + "<br>"
                        + "[0][1] = " + resultGrid[0][1].alive + "<br>"
                        + "[0][2] = " + resultGrid[0][2].alive + "<br>"
                        + "[1][0] = " + resultGrid[1][0].alive + "<br>"
                        + "[1][1] = " + resultGrid[1][1].alive + "<br>"
                        + "[1][2] = " + resultGrid[1][2].alive + "<br>"
                        + "[2][0] = " + resultGrid[2][0].alive + "<br>"
                        + "[2][1] = " + resultGrid[2][1].alive + "<br>"
                        + "[2][2] = " + resultGrid[2][2].alive + "<br>");
    }
    // Test #2 - Second Step
    resultGrid = changeCells(initGrid);
    if ((resultGrid[0][0].alive && resultGrid[0][1].alive && resultGrid[2][0].alive && resultGrid[2][1].alive && resultGrid[1][2].alive === true)
        && resultGrid[0][2].alive === false && resultGrid[1][0].alive === false && resultGrid[1][1].alive === false && resultGrid[2][2].alive === false) {
        document.write("<li>testChangeCells: Step#2 PASSED<br>"
                        + "[0][0] = " + resultGrid[0][0].alive + "<br>"
                        + "[0][1] = " + resultGrid[0][1].alive + "<br>"
                        + "[0][2] = " + resultGrid[0][2].alive + "<br>"
                        + "[1][0] = " + resultGrid[1][0].alive + "<br>"
                        + "[1][1] = " + resultGrid[1][1].alive + "<br>"
                        + "[1][2] = " + resultGrid[1][2].alive + "<br>"
                        + "[2][0] = " + resultGrid[2][0].alive + "<br>"
                        + "[2][1] = " + resultGrid[2][1].alive + "<br>"
                        + "[2][2] = " + resultGrid[2][2].alive + "<br>");
    }
    else {
        document.write("<li>testChangeCells: Step#2 FAILED:<br>" 
                        + "[0][0] = " + resultGrid[0][0].alive + "<br>"
                        + "[0][1] = " + resultGrid[0][1].alive + "<br>"
                        + "[0][2] = " + resultGrid[0][2].alive + "<br>"
                        + "[1][0] = " + resultGrid[1][0].alive + "<br>"
                        + "[1][1] = " + resultGrid[1][1].alive + "<br>"
                        + "[1][2] = " + resultGrid[1][2].alive + "<br>"
                        + "[2][0] = " + resultGrid[2][0].alive + "<br>"
                        + "[2][1] = " + resultGrid[2][1].alive + "<br>"
                        + "[2][2] = " + resultGrid[2][2].alive + "<br>");
    }
    resultGrid = changeCells(initGrid);
    if ((resultGrid[0][1].alive && resultGrid[1][2].alive && resultGrid[2][1].alive === true)
        && resultGrid[0][0].alive === false && resultGrid[0][2].alive === false && resultGrid[1][0].alive === false && resultGrid[1][1].alive === false && resultGrid[2][0].alive === false && resultGrid[2][2].alive === false) {
        document.write("<li>testChangeCells: Step#3 PASSED<br>"
                        + "[0][0] = " + resultGrid[0][0].alive + "<br>"
                        + "[0][1] = " + resultGrid[0][1].alive + "<br>"
                        + "[0][2] = " + resultGrid[0][2].alive + "<br>"
                        + "[1][0] = " + resultGrid[1][0].alive + "<br>"
                        + "[1][1] = " + resultGrid[1][1].alive + "<br>"
                        + "[1][2] = " + resultGrid[1][2].alive + "<br>"
                        + "[2][0] = " + resultGrid[2][0].alive + "<br>"
                        + "[2][1] = " + resultGrid[2][1].alive + "<br>"
                        + "[2][2] = " + resultGrid[2][2].alive + "<br>");
    }
    else {
        document.write("<li>testChangeCells: Step#3 FAILED:<br>" 
                        + "[0][0] = " + resultGrid[0][0].alive + "<br>"
                        + "[0][1] = " + resultGrid[0][1].alive + "<br>"
                        + "[0][2] = " + resultGrid[0][2].alive + "<br>"
                        + "[1][0] = " + resultGrid[1][0].alive + "<br>"
                        + "[1][1] = " + resultGrid[1][1].alive + "<br>"
                        + "[1][2] = " + resultGrid[1][2].alive + "<br>"
                        + "[2][0] = " + resultGrid[2][0].alive + "<br>"
                        + "[2][1] = " + resultGrid[2][1].alive + "<br>"
                        + "[2][2] = " + resultGrid[2][2].alive + "<br>");
    }    
}