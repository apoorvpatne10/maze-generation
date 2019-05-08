# maze-generation

Maze generation using depth first search.

Algorithm:

The depth-first search algorithm of maze generation is frequently implemented using backtracking:

1. Make the initial cell the current cell and mark it as visited
2. While there are unvisited cells
    1. If the current cell has any neighbours which have not been visited
        1. Choose randomly one of the unvisited neighbours
        2. Push the current cell to the stack
        3. Remove the wall between the current cell and the chosen cell
        4. Make the chosen cell the current cell and mark it as visited
    2. Else if stack is not empty
        1. Pop a cell from the stack
        2. Make it the current cell

![maze](https://i.imgur.com/uFbP5Sw.gif)

# Getting started

## Clone the repository

```git clone https://github.com/apoorvpatne10/maze-generation```

## Run it on localhost

Create a virtual environment and install the dependencies.

```pip install -r requirements.txt```

Execute the following command in terminal and goto http://localhost:8000

```python manage.py runserver```
