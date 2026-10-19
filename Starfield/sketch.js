const r = require("raylib");
const u = require("./utils");

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const screen = {
        WIDTH: 1200,
        HEIGHT: 800,
        TITLE: "Starfield",
        FPS: 40,
    }

    const starProp = {
        numberOfStars: 5000,
        maxRadius: 4,
    }

    const stars = u.generateStars(starProp, screen);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screen.WIDTH, screen.HEIGHT, screen.TITLE);
    r.SetTargetFPS(screen.FPS);

    return {
        screen,
        stars,
        starProp,
    }
}

function update(world) {
    u.updateStars(world);
}

function drawStars(stars) {
    for (const star of stars) {
        r.DrawCircleV(star.startPos, star.radius, r.WHITE);
    }
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawStars(world.stars);

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