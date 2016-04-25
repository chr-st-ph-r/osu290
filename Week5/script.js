function Table(size = 4) {
  this.SIZE = size;
  this.grid = [];
  this.focus = [0,0];
}

Table.prototype.addCell = function(cell) {
  this.table.push(cell);
}

Table.prototype.moveX = function(x) {

  this.focus[0] = focusX;
}

Table.prototype.moveY = function(y) {

  this.focus[1] = focusY;
}

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


  this.highlight(false);
  this.focus[0] = focusX;
  this.focus[1] = focusY;
  this.highlight(true);
};

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

Table.prototype.mark = function() {
  var cell = this.grid[this.focus[1]][this.focus[0]];
  cell.style.background = "yellow";
}

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
        text: (i+1) + ", " + (j+1),
      });

      cell.style.border = "1px solid black";

      this.grid[i][j] = cell;
    }
  }
}

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
