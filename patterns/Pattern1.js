const r = require("raylib");

function setup() {
    const WIDTH = 800;
    const HEIGHT = 800;
    const TITLE = "China";
    const FPS = 10;
    const numberOfCells = 30;
    const cellWidth = WIDTH / numberOfCells;
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
        cellWidth,
        pallete,
    };
}

function chooseColor(world, row, col) {
    return world.pallete[((row + col) + world.cf) % 3];
}

function drawTile(world, row, col) {
    let color = chooseColor(world, row, col);
    const x = (row * 2) * world.cellWidth;
    const y = (col * 2) * world.cellWidth;
    r.DrawCircleSectorLines({ x, y }, 10, 0, 120, 2, color);
    r.DrawCircleSectorLines({ x, y }, 10, 120, 240, 2, color);
    // r.DrawCircleSectorLines({ x, y }, 10, 240, 360, 2, color);
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