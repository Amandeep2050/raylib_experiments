const r = require("raylib");

function setup() {
    const WIDTH = 800;
    const HEIGHT = 800;
    const TITLE = "Circle";
    const FPS = 5;
    const numberOfCells = 50;
    const cellWidth = WIDTH / numberOfCells;
    const pallete = {
        0: r.WHITE,
        1: r.RED,
    }

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, TITLE);
    r.SetTargetFPS(FPS);

    return {
        WIDTH,
        HEIGHT,
        FPS,
        numberOfCells,
        cellWidth,
        pallete,
    };
}

function chooseColor(world, row, col) {
    const displacementX = world.numberOfCells / 2;
    let displacementY = (world.numberOfCells / 2 + world.cf) % world.numberOfCells;

    const radius = 10;

    return ((row - displacementX) ** 2 + (col - displacementY) ** 2) < radius ** 2 ? world.pallete[(row + col) % 2] : r.WHITE;
}

function createCell(world, row, col) {
    const x = row * world.cellWidth;
    const y = col * world.cellWidth;
    return {
        x,
        y,
        width: world.cellWidth,
        height: world.cellWidth,
    };
}

function drawCell(world, cellToDraw, row, col) {
    r.DrawRectangleRec(cellToDraw, chooseColor(world, row, col));
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    for (let row = 0; row < world.numberOfCells; row++) {
        for (let col = 0; col < world.numberOfCells; col++) {
            const cellToDraw = createCell(world, row, col);

            drawCell(world, cellToDraw, row, col);
        }
    }

    r.EndDrawing();
}

function loop(world) {
    world.cf = 0
    while (!r.WindowShouldClose()) {
        world.cf++;
        // no update!
        draw(world);
    }
}

function main() {
    const world = setup()
    loop(world);
}

main();