const r = require("raylib");
const color = require("./colors");

colorOuter = color.ORANGE;
colorOuter.a = 150;

star = {
    position: {
        x: 0, y: 0,
    },
    radius: 10,
    colorInner: color.ORANGE,
    colorOuter,
};


line = {
    x: -400, y: -80,
};

mountain = {
    position: {
        x: 900, y: 400,
    },
    radius: 300,
    startAngle: 270,
    endAngle: 180,
    segment: 2,
}

function resetPosition() {
    star.position.x = 0;
    star.position.y = 0;
    line.x = -400;
    line.y = -80;
}

function resetColors() {
    if (star.colorInner === color.ORANGE) {
        star.colorInner = color.PURPLE;
        star.colorOuter = color.PURPLE;
    } else if (star.colorInner === color.PURPLE) {
        star.colorInner = color.ORANGE;
        star.colorOuter = color.ORANGE;
    }
    star.colorOuter.a = 150;
}

function reset() {
    resetPosition();
    resetColors();
}

function updateStarPosition() {
    star.position.x += 5;
    star.position.y += 1;
    line.x += 5;
    line.y += 1;
}

function drawSetup() {
    // Background
    r.DrawRectangleGradientV(0, 0, 900, 400, color.background.color1, color.background.color2);

    // star
    r.DrawCircleV(star.position, 10, star.colorInner);

    // star fire
    r.DrawCircleSector(star.position, 20, -13, 170, 100, star.colorOuter);
    r.DrawCircleSector(line, 408, 76, 81.5, 2, star.colorOuter);

    // mountain
    r.DrawCircleSector(mountain.position, mountain.radius, mountain.startAngle, mountain.endAngle, mountain.segment, r.BLACK);
}

module.exports = {
    star,
    line,
    mountain,
    reset,
    updateStarPosition,
    drawSetup,
}