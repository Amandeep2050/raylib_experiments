const rect = {
    x: 0,
    y: 0,
    width: 900,
    height: 400,
};

const color1 = {
    r: 255, g: 0, b: 0, a: 255,
};

const color2 = {
    r: 255, g: 0, b: 255, a: 255,
};

const color3 = {
    r: 0, g: 255, b: 0, a: 255,
};

const color4 = {
    r: 0, g: 255, b: 255, a: 255,
}

function convertToRadian(angle) {
    return angle * (Math.PI / 180);
}

function colorUpdate(color, angle) {
    const redIntensity = (127.5 * Math.sin(angle) + 127.5) | 0;
    const greenIntensity = (127.5 * Math.sin(angle - (2 * Math.PI / 3)) + 127.5) | 0;
    const blueIntensity = (127.5 * Math.sin(angle - (4 * Math.PI / 3)) + 127.5) | 0;
    color.r = redIntensity;
    color.g = greenIntensity;
    color.b = blueIntensity;
}

function updateBackground(cP, b) {
    cP.colorPhase += 5;
    colorUpdate(b.color1, convertToRadian(cP.colorPhase));
    colorUpdate(b.color2, convertToRadian(cP.colorPhase + 100));
    colorUpdate(b.color3, convertToRadian(cP.colorPhase + 200));
    colorUpdate(b.color4, convertToRadian(cP.colorPhase + 300));
}


module.exports = {
    rect,
    color1,
    color2,
    color3,
    color4,
    updateBackground,
}