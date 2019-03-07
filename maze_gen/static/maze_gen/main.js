
var cols, rows;
var w = 20;
var grid = [];

var current;
var stack = [];
let slider;

function setup(){
    let canvas = createCanvas(400, 400);
    // canvas.position(200, 200);
    cols = floor(width/w);
    rows = floor(height/w);

    for(var j = 0; j < rows; j++){
        for(var i = 0; i < cols; i++){
            var cell = new Cell(i, j);
            grid.push(cell);
        }
    }

    current = grid[0];

    slider = createSlider(1, 60, 15);
    slider.style('width', '150px');
    slider.style('display', 'block');
    slider.position(680, 600);
    // fill(100);
    // slider2 =
    // slider.changed(resetCanvas);
}

// function resetCanvas(){
//     grid = [];
//     stack = [];
// }

function draw(){
    background(51);
    frameRate(slider.value());

    for(var i = 0; i < grid.length; i++){
        grid[i].show();
    }

    if (current){
        current.visited = true;
        current.highlight();
        var next = current.checkNeighbors(); // returns a random neighbor if available
    }

    if (next){
        next.visited = true;

        if(next.numNeighbors() > 1){
            stack.push(next);
        }
        removeWalls(current, next);
        current = next;

    } else if (stack){
        current = stack.pop();
    }

}

function removeWalls(a, b){
    // console.log("remove");
    var x = a.i - b.i;
    if (x === 1){
        a.walls[3] = false;
        b.walls[1] = false;
    }
    else if(x === -1){
        a.walls[1] = false;
        b.walls[3] = false;
    }

    var y = a.j - b.j;
    if (y === 1){
        a.walls[0] = false;
        b.walls[2] = false;
    }
    else if (y === -1){
        a.walls[2] = false;
        b.walls[0] = false;
    }

}

function index(i, j){
    if (i < 0 || j < 0 || i > cols-1 || j > rows-1){
        return -1;
    }
    return i + j * cols;
}

function Cell(i, j){
    this.i = i;
    this.j = j;
    // top, right, bottom, left
    this.walls = [true, true, true, true];
    this.visited = false;

    this.numNeighbors = function(){
        var neighbors = [];
        var m = this.i;
        var n = this.j;

        var top = grid[index(m, n-1)];
        var right = grid[index(m+1, n)];
        var bottom = grid[index(m, n+1)];
        var left = grid[index(m-1, n)];

        if(top && !top.visited){
            neighbors.push(top);
        }
        if(right && !right.visited){
            neighbors.push(right);
        }
        if(bottom && !bottom.visited){
            neighbors.push(bottom);
        }
        if(left && !left.visited){
            neighbors.push(left);
        }
        return neighbors.length;
    }

    this.checkNeighbors = function(){
        var neighbors = [];
        var m = this.i;
        var n = this.j;

        var top = grid[index(m, n-1)];
        var right = grid[index(m+1, n)];
        var bottom = grid[index(m, n+1)];
        var left = grid[index(m-1, n)];

        if(top && !top.visited){
            neighbors.push(top);
        }
        if(right && !right.visited){
            neighbors.push(right);
        }
        if(bottom && !bottom.visited){
            neighbors.push(bottom);
        }
        if(left && !left.visited){
            neighbors.push(left);
        }

        if (neighbors.length > 0){
            var i = floor(random(0, neighbors.length));
            return neighbors[i];
        }
        else{
            return undefined;
        }
    }

    this.highlight = function(){
        var x = this.i * w;
        var y = this.j * w;
        noStroke();
        fill(0, 0, 255, 100);
        rect(x, y, w, w);
    }

    this.show = function(){
        var x = this.i * w;
        var y = this.j * w;

        stroke(255);
        if (this.walls[0]){
            line(x, y, x+w, y);
        }
        if (this.walls[1]){
            line(x+w, y, x+w, y+w);
        }
        if (this.walls[2]){
            line(x+w, y+w, x, y+w);
        }
        if (this.walls[3]){
            line(x, y+w, x, y);
        }

        if (this.visited){
            noStroke();
            fill(255, 0, 255, 100);
            rect(x, y, w, w);
        }
        // noFill();
        // rect(x, y, w, w);
    }
}
