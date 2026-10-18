const r = require("raylib");

let circleX = 0;
let circleY;

const circle1_radius = 2;
const circle2_radius = 10;

let scaledSinValue = 0;

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

function convertToRadian(angle) {
    return angle * (Math.PI / 180);
}

function update() {
    if (circleX < 900) {
        circleX += 1;
        const radians = convertToRadian(circleX);
        scaledSinValue = (Math.sin(radians) * 100) | 0;
        circleY = 200 - scaledSinValue;
        colorUpdate(color1, color2, radians);
    }
}

function draw() {
    r.BeginDrawing();


    r.DrawLineEx(line.start, line.end, 5, r.WHITE);
    r.DrawCircle(circleX, circleY, circle1_radius, color1);
    r.DrawCircle(circleX, circleY, circle2_radius, color2);

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