function randomBetween(lower, upper) {
    return Math.floor(lower + Math.random() * (upper - lower));
}

function calcIntercepts(screen, startPos) {
    return {
        yInter: randomBetween(0, screen.HEIGHT) - startPos.y,
        xInter: randomBetween(0, screen.WIDTH) - startPos.x,
    };
}

function getNewPosition(screen, maxRadius) {
    const startPos = { x: randomBetween(0, screen.WIDTH), y: randomBetween(0, screen.HEIGHT) };

    const intercepts = calcIntercepts(screen, startPos);

    const radius = randomBetween(0, maxRadius);

    return {
        startPos, yInter: intercepts.yInter, xInter: intercepts.xInter, radius
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

function updateStar(stars) {
    stars.startPos.x += 0.001 * (stars.xInter) * 5;
    stars.startPos.y += 0.001 * (stars.yInter) * 5;
}

function updateStars(world) {
    const stars = world.stars;
    const screen = world.screen;

    for (let i = 0; i < stars.length; i++) {
        updateStar(stars[i]);

        if (isOutOfBound(0, screen.WIDTH, stars[i].startPos.x) || isOutOfBound(0, screen.HEIGHT, stars[i].startPos.y)) {
            stars[i] = getNewPosition(world.screen, world.starProp.maxRadius);
        }
    }
}

module.exports = {
    generateStars,
    updateStars,
};