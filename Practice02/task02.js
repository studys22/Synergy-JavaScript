import { Oven } from './oven.js'

class SuperOven extends Oven {
    _curTemp;
    on() {
        console.log('Начало работы печи');
        function onIter(ob) {
            if (ob._curTemp >= ob.maxT) {
                console.log('Печь полностью нагрета');
                ob.off();
                return;
            }
            ob._curTemp++;
            //console.log(ob._curTemp);
            setTimeout(onIter, 500, ob);
        };
        this._curTemp = 0;
        setTimeout(onIter, 500, this);
    }
    off() {
        console.log('Печь выключена');
        function offIter(ob) {
            if (ob._curTemp <= 0) {
                console.log('Печь остыла');
                return;
            }
            ob._curTemp--;
            //console.log(ob._curTemp);

            setTimeout(offIter, 500, ob);
        };
        setTimeout(offIter, 500, this);
    }
}

let superoven = new SuperOven(10);
console.log(superoven.maxT);
superoven.on()