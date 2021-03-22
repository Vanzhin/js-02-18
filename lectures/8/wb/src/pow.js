export const pow = (x, y) => {
    if (x === null || y === null) {
        return null;
    }

    let result = 1;
    for (let i = 0; i < y; i++) {
        result *= x
    }

    return result ?? '';
};


