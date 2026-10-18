const PURPLE = {
    r: 112,
    g: 31,
    b: 126,
    a: 255,
}

const ORANGE = {
    r: 255,
    g: 161,
    b: 0,
    a: 255,
}

background = {
    color1: { r: 0, g: 0, b: 0, a: 255 },
    color2: {
        r: 112,
        g: 31,
        b: 126,
        a: 255,
    },
}

function purpleToOrange(ORANGE, background) {
    if (background.color2.r < ORANGE.r) {
        background.color2.r += 1;
    }
    if (background.color2.g < ORANGE.g) {
        background.color2.g += 1;
    }
    if (background.color2.b > ORANGE.b) {
        background.color2.b -= 1;
    }
}

function orangeToPurple(PURPLE, background) {
    if (background.color2.r > PURPLE.r) {
        background.color2.r -= 1;
    }
    if (background.color2.g > PURPLE.g) {
        background.color2.g -= 1;
    }
    if (background.color2.b < PURPLE.b) {
        background.color2.b += 1;
    }
}

function changeToNextColor(obj) {
    if (obj.star.position.x >= 900 && obj.star.colorInner === ORANGE) {
        purpleToOrange(ORANGE, background);
    }
    if (obj.star.position.x >= 900 && obj.star.colorInner === PURPLE) {
        orangeToPurple(PURPLE, background);
    }
}

module.exports = {
    PURPLE,
    ORANGE,
    background,
    changeToNextColor,
}