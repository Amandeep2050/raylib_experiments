const r = require("raylib");

let a = 0;
let b = 0;

const line = {
    start: {
        x: 0,
        y: 200,
    },
    end: {
        x: 900,
        y: 200,
    },
}

const color1 = {
    r: 255, g: 0, b: 0, a: 255,
};

const color2 = {
    r: 255, g: 0, b: 0, a: 20
};

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(900, 400, "Experiments");
    r.SetTargetFPS(50);
}

function colorUpdate(color1, color2, angle) {
    const redIntensity = (127.5 * Math.sin(angle) + 127.5) | 0;
    const greenIntensity = (127.5 * Math.sin(angle - (2 * Math.PI / 3)) + 127.5) | 0;
    const blueIntensity = (127.5 * Math.sin(angle - (4 * Math.PI / 3)) + 127.5) | 0;
    color1.r = redIntensity;
    color2.r = redIntensity;
    color1.g = greenIntensity;
    color2.g = greenIntensity;
    color1.b = blueIntensity;
    color2.b = blueIntensity;
}

function update() {
    if (a < 900) {
        a += 1;
        const radians = convertToRadian(a);
        b = (Math.sin(radians) * 100) | 0;
        colorUpdate(color1, color2, radians);
    }
}


function convertToRadian(angle) {
    return angle * (Math.PI / 180);
}

function draw() {
    r.BeginDrawing();

    r.DrawLineEx(line.start, line.end, 5, r.WHITE);
    r.DrawCircle(a, (-b) + 200, 2, color1);
    r.DrawCircle(a, (-b) + 200, 10, color2);

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