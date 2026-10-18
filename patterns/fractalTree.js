const r = require("raylib");

function setup() {
    const WIDTH = 1000;
    const HEIGHT = 1000;
    const TITLE = "Fractal Tree";
    const FPS = 5;
    const growthOfTree = 1;

    const branch = {
        pos: {
            x: WIDTH / 2,
            y: HEIGHT - HEIGHT / 6,
        },
        angle: 3 * (Math.PI / 2),
        length: WIDTH / 4,
        thickness: 20,
    }
    const tree = {
        depth: 20,
        deltaAngle: Math.PI / 4,
    }

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, TITLE);
    r.SetTargetFPS(FPS);

    return {
        WIDTH,
        HEIGHT,
        FPS,
        branch,
        tree,
        growthOfTree,
    };
}


function drawBranch(branch, nextBranch) {
    r.DrawLineEx(branch.pos, nextBranch.pos, nextBranch.thickness, r.BLACK);
}

function updateTree(tree) {
    const depth = tree.depth - 1;
    const deltaAngle = tree.deltaAngle;
    return {
        depth,
        deltaAngle,
    };
}

function updateBranch(branch, angle) {
    const x = branch.pos.x + branch.length * (Math.cos(angle));
    const y = branch.pos.y + branch.length * (Math.sin(angle));
    const length = 2 * (branch.length / 3);
    const thickness = 3 * (branch.thickness / 4);

    return {
        pos: {
            x,
            y,
        },
        angle: angle,
        length,
        thickness,
    };
}

function fractalTree(branch, tree, angle = branch.angle) {
    if (tree.depth <= 0) return;

    const nextBranch = updateBranch(branch, angle);
    drawBranch(branch, nextBranch);

    const updatedTree = updateTree(tree);

    fractalTree(nextBranch, updatedTree, angle + tree.deltaAngle);
    fractalTree(nextBranch, updatedTree, angle - tree.deltaAngle);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);

    fractalTree(world.branch, world.tree);

    // if (world.tree.depth < 20 && world.tree.depth >= 0) world.tree.depth += world.growthOfTree;
    // else {
    //     world.growthOfTree = -world.growthOfTree;
    //     world.tree.depth += world.growthOfTree;
    // }

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
