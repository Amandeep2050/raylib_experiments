const r = require("raylib");

function setup() {
    const WIDTH = 800;
    const HEIGHT = 800;
    const TITLE = "China";
    const FPS = 10;
    const numberOfCells = 10;
    const gapBetweenCells = 10;
    const cellWidth = (WIDTH + 100) / numberOfCells;
    const pallete = {
        0: r.RED,
        1: r.GREEN,
        2: r.BLUE,
    }

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, TITLE);
    r.SetTargetFPS(FPS);

    return {
        WIDTH,
        HEIGHT,
        FPS,
        numberOfCells,
        gapBetweenCells,
        cellWidth,
        pallete,
    };
}

function chooseColor(world, row, col) {
    return world.pallete[((row + col) + world.cf) % 3];
}

function drawTile(world, row, col) {
    let color = chooseColor(world, row, col);
    const x = Math.floor((row) * world.cellWidth - world.gapBetweenCells / 2);
    const y = Math.floor((col) * world.cellWidth - world.gapBetweenCells / 2);

    const width = world.cellWidth - world.gapBetweenCells;

    r.DrawRectanglePro({ x, y, width: width, height: width }, { x: world.cf, y: world.cf }, world.cf * 15, color);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    for (let row = 0; row < world.numberOfCells; row++) {
        for (let col = 0; col < world.numberOfCells; col++) {
            drawTile(world, row, col);
        }
    }


    r.EndDrawing();
}

function loop(world) {
    world.cf = 0;
    while (!r.WindowShouldClose()) {
        // no update!
        world.cf++;
        draw(world);
    }
}

function main() {
    const world = setup()
    loop(world);
}

main();