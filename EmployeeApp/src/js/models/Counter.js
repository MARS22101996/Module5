'use strict';

class Counter {
    constructor(count) {
        this._count = count || 0;;
    }

    get value() { 
        return this._count; 
    }

    set value(value) { 
        this._count = value; 
    }

    incrementValue() { 
        this._count++; 
    }
    
    decrement() {
        if(this._count > 0) {
            this._count--;
        }
    }
}

export default Counter;