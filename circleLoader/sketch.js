const r = require("raylib");
const obj = require("./objects");
const b = require("./background");

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(900, 400, "Experiments");
    r.SetTargetFPS(30);

    const world = {};

    world.circle1 = obj.createCircle(450, 200, 0, 4, 5);
    world.circle2 = obj.createCircle(450, 200, 100, 4, 5);
    world.colorC1 = obj.getColor(255);
    world.colorC2 = obj.getColor(130);
    world.cP = { colorPhase: 0 };

    return world;
}

function update(world) {
    b.updateBackground(world.cP, b);
    obj.updateCircle(world.circle1, world.colorC1);
    obj.updateCircle(world.circle2, world.colorC2);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    r.DrawRectangleGradientEx(b.rect, b.color1, b.color2, b.color3, b.color4);

    r.DrawCircleV(world.circle1.center, world.circle1.radius, world.colorC1);
    r.DrawCircleV(world.circle2.center, world.circle2.radius, world.colorC2);

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