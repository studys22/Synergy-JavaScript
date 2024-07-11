export class Oven {
    #maxT;
    #setT(maxT) {
        if (maxT > 15) {
            this.#maxT = 15;
            console.log(`Температура ${maxT} слишком большая, установлено 15`);
        } else {
            this.#maxT = maxT;
        }
    }

    constructor(maxT) {
        this.#setT(maxT);
    }

    get maxT() {
        return this.#maxT;
    }

    set maxT(maxT) {
        this.#setT(maxT);
    }

}
