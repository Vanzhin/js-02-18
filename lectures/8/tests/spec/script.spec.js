const { pow } = require('../script');

describe('Функция pow', () => {
    it('при аргументах (2, 2) должна возвращать 4', () => {
        const res = pow(2, 2);
        expect(res).toBe(4);
    });

    it('при аргументах (4, 2) должна возвращать 16', () => {
        const res = pow(4, 2);
        expect(res).toBe(16);
    });

    it('при аргументах (3, 3) должна возвращать 27', () => {
        const res = pow(3, 3);
        expect(res).toBe(27);
    });

    it('при аргументах (null, 3) должна возвращать null', () => {
        const res = pow(null, 3);
        expect(res).toBeNull();
    });

    it('при аргументах (3, null) должна возвращать null', () => {
        const res = pow(3, null);
        expect(res).toBeNull();
        expect(res).not.toBe(1);
    });
});
