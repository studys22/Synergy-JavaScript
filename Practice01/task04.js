let calculator = {
    sum(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            return 'Параметры функции должны быть числами';
        }
        return a + b;
    },
    sub(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            return 'Параметры функции должны быть числами';
        }
        return a - b;
    },
    mult(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            return 'Параметры функции должны быть числами';
        }
        return a * b;
    },
    div(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            return 'Параметры функции должны быть числами';
        }
        if (b === 0) {
            return 'На ноль делить нельзя!';
        }
        return a / b;
    }
}

console.log(calculator.sum(1, 2));
console.log(calculator.sum(1, '4'));
console.log(calculator.sum(10, -12));

console.log(calculator.sub(1, 2));
console.log(calculator.sub(10, -12));

console.log(calculator.mult(1, true));
console.log(calculator.mult(10, -12));

console.log(calculator.div([1], 2));
console.log(calculator.div(1, 2));
console.log(calculator.div(10, 0));
