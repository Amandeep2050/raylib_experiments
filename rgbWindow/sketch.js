const r = require("raylib");

let a = 0;

const rect = {
    x: 0,
    y: 0,
    width: 900,
    height: 400,
};

const color1 = {
    r: 255,
    g: 0,
    b: 0,
    a: 255,
};

const color2 = {
    r: 255,
    g: 0,
    b: 255,
    a: 255,
};

const color3 = {
    r: 0,
    g: 255,
    b: 0,
    a: 255,
};

const color4 = {
    r: 0,
    g: 255,
    b: 255,
    a: 255,
}

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(900, 400, "Experiments");
    r.SetTargetFPS(100);
}

function colorUpdate(color1, angle) {
    const redIntensity = (127.5 * Math.sin(angle) + 127.5) | 0;
    const greenIntensity = (127.5 * Math.sin(angle - (2 * Math.PI / 3)) + 127.5) | 0;
    const blueIntensity = (127.5 * Math.sin(angle - (4 * Math.PI / 3)) + 127.5) | 0;
    color1.r = redIntensity;
    color1.g = greenIntensity;
    color1.b = blueIntensity;
}

function convertToRadian(angle) {
    return angle * (Math.PI / 180);
}

function update() {
    a += 1;
    colorUpdate(color1, convertToRadian(a));
    colorUpdate(color2, convertToRadian(a + 100));
    colorUpdate(color3, convertToRadian(a + 200));
    colorUpdate(color4, convertToRadian(a + 300));
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    r.DrawRectangleGradientEx(rect, color1, color2, color3, color4);

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