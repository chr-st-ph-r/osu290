/** Week 5 HW
 * Christopher Carrassi
 */

/**
 * Table class, keeping everything tidy
 * @constructor
 */
function Table(size = 4) {
  this.SIZE = size;

  // the table itself
  this.grid = [];

  // represents x,y coords of currently selected cell
  this.focus = [0,0];
}

/** pushes a new cell element into the Table
 * @param {Object} cell HTML element to be added
 */
Table.prototype.addCell = function(cell) {
  this.table.push(cell);
}
/**
 * shifts the table's focus
 * @param {Integer} x the desired amount to move horizontally
 * @param {Integer} y the desired amount to move vertically
 */
Table.prototype.move = function (x, y) {
  var focusX = this.focus[0];
  var focusY = this.focus[1];

  focusX += x;
  focusY += y;

  if (focusX < 0 || focusX >= this.SIZE) {
    console.log("New X coord is out of bounds!");
    return;
  }

  if (focusY < 0 || focusY >= this.SIZE) {
    console.log("New Y coord is out of bounds!");
    return;
  }

  // procedure to modify focus state without selecting multiple cells
  this.highlight(false);
  this.focus[0] = focusX;
  this.focus[1] = focusY;
  this.highlight(true);
};

/**
 * Helper function that makes it easier to create, modify and append
 * elements to the DOM.
 * @param {Object} obj, a simple map of options for the elements
 * @return {Element} The newly created element
 */
Table.prototype.make = function(obj) {
  var e = document.createElement(obj.elem);

  if (obj.father) {
    obj.father.appendChild(e);
  }

  if (obj.text) {
    e.innerText = obj.text;
  }

  if (obj.listener) {
    e.addEventListener("click", obj.listener.bind(this));
  }

  return e;
}

/* enables or disables the selected cell's appearance of being selected
 * @param {Boolean} turnOn, the on/off switch
 */
Table.prototype.highlight = function(turnOn) {
  var x = this.focus[0];
  var y = this.focus[1];

  var cell = this.grid[y][x];
  if (turnOn) {
    cell.style.border = "3px solid black";
  } else {
    cell.style.border = "1px solid black";
  }
}

/**
 * Permanently marks the cell yellow
 */
Table.prototype.mark = function() {
  var cell = this.grid[this.focus[1]][this.focus[0]];
  cell.style.background = "yellow";
}

/**
 * Builds the table elements and stores them internally in the Table instance
 * @param {Element} container, the element where the table will be built
 */
Table.prototype.populateGrid = function(container) {
  for (var i = 0; i < this.SIZE; i++) {
    var row = this.make({
      elem: "tr",
      father: container,
    });

    this.grid.push([]);

    for (var j = 0; j < this.SIZE; j++) {
      var cell = this.make({
        elem: "td",
        father: row,
        text: (j+1) + ", " + (i+1),
      });

      cell.style.border = "1px solid black";

      this.grid[i][j] = cell;
    }
  }
}

/**
 * Generates elements needed for the controller
 */
Table.prototype.buildController = function() {
  var container = this.make({
    elem: "div",
    father: document.body,
  });

  var left = this.make({
    elem: "button",
    father: container,
    text: "left",
    listener: function() {
      this.move(-1,0);
    }
  });

  var up = this.make({
    elem: "button",
    father: container,
    text: "up",
    listener: function() {
      this.move(0,-1);
    }
  });

  var down = this.make({
    elem: "button",
    father: container,
    text: "down",
    listener: function() {
      this.move(0,1);
    }
  });

  var right = this.make({
    elem: "button",
    father: container,
    text: "right",
    listener: function() {
      this.move(1,0);
    }
  });

  var highlighter = this.make({
    elem: "button",
    father: container,
    text: "Mark Cell",
    listener: function() {
      this.mark();
    }
  });
}

/**
 * Generates the basic structure of the HTML page and then executes
 * the table and controller build routines
 */
Table.prototype.init = function() {
  var main = this.make({
    elem: "table",
    father: document.body,
  });

  var header_row = this.make({
    elem: "tr",
    father: main,
  })

  for (var i = 0; i < 4; i++) {
    var header_cell = this.make({
      elem: "th",
      father: header_row,
      text: "Header " + (i+1),
    });
  }

  this.populateGrid(main);
  this.buildController();
  this.highlight(true);
}

var t = new Table();
t.init();
