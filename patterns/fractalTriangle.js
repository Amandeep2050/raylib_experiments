const r = require("raylib");

function setup() {
    const WIDTH = 1000;
    const HEIGHT = 800;
    const TITLE = "Fractal Tree";
    const FPS = 5;

    const baseTriangle = {
        point1: {
            x: WIDTH / 2,
            y: 100,
        },
        point2: {
            x: 100,
            y: HEIGHT - 100,
        },
        point3: {
            x: WIDTH - 100,
            y: HEIGHT - 100,
        },
    }
    const depth = 10;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, TITLE);
    r.SetTargetFPS(FPS);

    return {
        WIDTH,
        HEIGHT,
        FPS,
        baseTriangle,
        depth,
    };
}

function getPoint(point1, point2) {
    const x = Math.abs(point1.x - ((point1.x - point2.x) / 2));
    const y = Math.abs(point1.y - ((point1.y - point2.y) / 2));

    return { x, y };
}

function drawInnerTriangles(tri1, tri2, tri3) {
    r.DrawTriangleLines(tri1.point1, tri1.point2, tri1.point3, r.BLACK);
    r.DrawTriangleLines(tri2.point1, tri2.point2, tri2.point3, r.BLACK);
    r.DrawTriangleLines(tri3.point1, tri3.point2, tri3.point3, r.BLACK);
}

function getTriangles(baseTriangle) {
    const tri1 = {
        point1: baseTriangle.point1,
        point2: getPoint(baseTriangle.point1, baseTriangle.point2),
        point3: getPoint(baseTriangle.point1, baseTriangle.point3),
    }

    const tri2 = {
        point1: tri1.point2,
        point2: baseTriangle.point2,
        point3: {
            x: baseTriangle.point1.x,
            y: baseTriangle.point2.y,
        }
    }

    const tri3 = {
        point1: tri1.point3,
        point2: baseTriangle.point3,
        point3: tri2.point3,
    }

    return { tri1, tri2, tri3 };
}

function drawPattern(baseTriangle, depth = 10) {

    if (depth <= 0) return;

    const innerTriangles = getTriangles(baseTriangle);

    drawInnerTriangles(innerTriangles.tri1, innerTriangles.tri2, innerTriangles.tri3);

    depth--;

    drawPattern(innerTriangles.tri1, depth);
    drawPattern(innerTriangles.tri2, depth);
    drawPattern(innerTriangles.tri3, depth);
}

function drawBaseTriangle(baseTriangle) {
    r.DrawTriangleLines(baseTriangle.point1, baseTriangle.point2, baseTriangle.point3, r.BLACK);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);

    drawBaseTriangle(world.baseTriangle);
    drawPattern(world.baseTriangle, world.depth);

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
