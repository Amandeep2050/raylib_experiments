const r = require("raylib");
const u = require("./utils");

function running() {
    return !r.WindowShouldClose();
}

function copyArray(arr) {
    const copyArr = [];

    for (let i = 0; i < arr.length; i++) {
        const star = {
            startPos: {
                x: arr[i].startPos.x,
                y: arr[i].startPos.y,
            },
            prevPos: {
                x: arr[i].prevPos.x,
                y: arr[i].prevPos.y,
            },
            angle: arr[i].angle,
            radius: arr[i].radius,
            distance: arr[i].distance,
        }
        copyArr.push(star);
    }

    return copyArr;
}

function setup() {
    const screen = {
        WIDTH: 1500,
        HEIGHT: 900,
        TITLE: "Starfield",
        FPS: 40,
    }

    screen.center = {
        x: screen.WIDTH / 2,
        y: screen.HEIGHT / 2,
    }

    const starProp = {
        numberOfStars: 1000,
        maxRadius: 6,
    }

    const stars = u.generateStars(starProp, screen);;
    const copyStars = copyArray(stars);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screen.WIDTH, screen.HEIGHT, screen.TITLE);
    r.SetTargetFPS(screen.FPS);

    return {
        screen,
        stars,
        copyStars,
        starProp,
    }
}

function update(world) {
    u.updateStars(world);
}

function drawStars(stars) {
    for (const star of stars) {
        r.DrawCircleV(star.startPos, star.radius, r.WHITE);
        r.DrawLineEx(star.startPos, star.prevPos, 2, r.WHITE);
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