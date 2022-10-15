export default function calculateSlowdown(timeSlowdownLevel) {
    if (Math.random() < 0.1) {
        return 1;
    }
    const getRandomNumInclusive = (min, max) =>
          Math.random() * (max - min + 1) + min;
    const timeSpeedDict = {
        [-1]: 1,
        0: 1 / getRandomNumInclusive(1, 3),
        1: 1 / getRandomNumInclusive(2.3, 5),
        2: 1 / getRandomNumInclusive(2, 5),
        3: 1 / getRandomNumInclusive(5, 8),
        // 5: 1/5,
    };

    const speedFactor = timeSpeedDict[timeSlowdownLevel];

    if (typeof speedFactor === undefined)
        throw new Error("time speed level undefined");

    return speedFactor;
}
