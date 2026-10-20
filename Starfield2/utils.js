const r = require("raylib");

function randomBetween(lower, upper) {
    return Math.floor(lower + Math.random() * (upper - lower));
}

function calcAngle(point1, point2) {
    const slope = (point2.y - point1.y) / (point2.x - point1.x);

    return Math.atan(slope);
}

function calcDistanceBetween(point1, point2) {
    return Math.round(Math.sqrt((point2.y - point1.y) ** 2 + (point2.x - point2.y) ** 2));
}

function getNewPosition(screen, maxRadius) {
    const startPos = { x: randomBetween(0, screen.WIDTH), y: randomBetween(0, screen.HEIGHT) };
    const prevPos = { x: startPos.x, y: startPos.y };

    const angle = calcAngle(startPos, screen.center);

    const radius = 0;

    const distance = calcDistanceBetween(screen.center, startPos);

    return {
        startPos, distance, prevPos, angle, radius
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
    const vf = (stars.radius) * (r.GetMouseX() / 10);

    const velocity = stars.startPos.x < screen.WIDTH / 2 ? -vf : vf;

    stars.prevPos.x = stars.startPos.x;
    stars.prevPos.y = stars.startPos.y;

    stars.startPos.y += velocity * Math.sin(stars.angle);
    stars.startPos.x += velocity * Math.cos(stars.angle);

    stars.radius = stars.radius < 4 && r.GetMouseX() > 20 ? stars.radius + 0.05 : stars.radius;

    stars.distance = calcDistanceBetween(screen.center, stars.startPos);
}

function updateStars(world) {
    const stars = world.stars;
    const screen = world.screen;

    for (let i = 0; i < stars.length; i++) {

        updateStar(stars[i], screen);

        if (isOutOfBound(-100, screen.WIDTH + 100, stars[i].startPos.x) || isOutOfBound(-100, screen.HEIGHT + 100, stars[i].startPos.y)) {
            stars[i] = getNewPosition(screen, world.starProp.maxRadius);
        }
    }
}

module.exports = {
    generateStars,
    updateStars,
};