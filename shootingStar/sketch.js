const r = require("raylib");
const color = require("./colors");
const obj = require("./objects");

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(900, 400, "Experiments");
    r.SetTargetFPS(50);
}

function update() {
    if (obj.line.x >= r.GetScreenWidth()) {
        obj.reset();
    }

    color.changeToNextColor(obj, color);

    obj.updateStarPosition();
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    obj.drawSetup();

    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};