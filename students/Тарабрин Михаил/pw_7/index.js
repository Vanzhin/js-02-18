const calculator = (args) => {
    regexp = /[+\-\/*]/g
    if (!regexp.test(args) || args.match(regexp).length > 1) {
        return false
    }
    try {
        operator = args.match(regexp)[0]
    } catch {
        return false
    }
    arg1 = args.split(operator)[0]
    arg2 = args.split(operator)[1]
    if (arg2 == '0' && operator == '/') {
        return false
    };
    if (!Number.isInteger(parseInt(arg1))) {
        return false 
    };
    if (!Number.isInteger(parseInt(arg2))) {
        return false 
    };
    expression = arg1+operator+arg2
    result = eval(expression)
    return result
}

module.exports = {
    calculator:calculator
}
