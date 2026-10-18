function createCircle(x, y, radius, velocity, fadeRate) {
    return {
        center: {
            x: x,
            y: y,
        },
        radius: radius,
        radiusVelocity: velocity,
        fadeRate: fadeRate,
        isExpending: true,
    };
}

function getColor(alpha) {
    return {
        r: 255,
        g: 255,
        b: 255,
        a: alpha,
    }
}

function isOutOfBound(circle) {
    return circle.center.y - circle.radius < 0;
}

function expandCircle(circle, color) {
    if (circle.isExpending) {
        circle.radius += circle.radiusVelocity;
        color.a -= circle.fadeRate;
    } else {
        circle.radius = 0;
        color.a = 255;
        circle.isExpending = true;
    }
}

function updateCircle(circle, color) {
    circle.isExpending = !isOutOfBound(circle);

    expandCircle(circle, color)
}

module.exports = {
    createCircle,
    getColor,
    updateCircle,
}