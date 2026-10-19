const r = require("raylib");

function randomBetween(lower, upper) {
    return Math.floor(lower + Math.random() * (upper - lower));
}

function calcAngle(screen, startPos) {
    const slope = (screen.center.y - startPos.y) / (screen.center.x - startPos.x);

    return Math.atan(slope);
}

function getNewPosition(screen, maxRadius) {
    const avgX = (randomBetween(0, screen.WIDTH) + randomBetween(0, screen.WIDTH) + randomBetween(0, screen.WIDTH)) / 3;

    const avgY = (randomBetween(0, screen.HEIGHT) + randomBetween(0, screen.HEIGHT) + randomBetween(0, screen.HEIGHT)) / 3;

    const startPos = { x: avgX, y: avgY };

    const angle = calcAngle(screen, startPos);

    const radius = randomBetween(1, maxRadius);

    return {
        startPos, angle, radius
    };
}

function generateStars(starProp, screen) {
    const stars = [];

    for (let i = 0; i <= starProp.numberOfStars; i++) {
        const star = getNewPosition(screen, starProp.maxRadius);
        stars.push(star);
    }

    return stars;
}

function isOutOfBound(start, end, point) {
    return point < start || point > end;
}

function updateStar(stars, screen) {
    if (stars.startPos.x < screen.WIDTH / 2) {
        stars.startPos.y -= r.GetMouseX() / 20 * Math.sin(stars.angle);
        stars.startPos.x -= r.GetMouseX() / 20 * Math.cos(stars.angle);
    } else {
        stars.startPos.y += r.GetMouseX() / 20 * Math.sin(stars.angle);
        stars.startPos.x += r.GetMouseX() / 20 * Math.cos(stars.angle);
    }
}

function copyStar(star) {
    return {
        startPos: {
            x: star.startPos.x,
            y: star.startPos.y,
        },
        angle: star.angle,
        radius: star.radius,
    };
}

function updateStars(world) {
    const stars = world.stars;
    const screen = world.screen;

    for (let i = 0; i < stars.length; i++) {
        // if (stars[i].startPos.x < screen.WIDTH) stars[i].angle = -stars[i].angle;

        updateStar(stars[i], screen);

        if (isOutOfBound(0, screen.WIDTH, stars[i].startPos.x) || isOutOfBound(0, screen.HEIGHT, stars[i].startPos.y)) {
            stars[i] = copyStar(world.copyStars[i]);
        }
    }
}

module.exports = {
    generateStars,
    updateStars,
};