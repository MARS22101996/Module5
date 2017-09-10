'use strict';
import Employee from './Employee.js';

class PerHourEmployee extends Employee {
    constructor(id, name, salary) {
        super(id, name, salary);
    }

    getSalary() {
        return 20.8 * 8 * this.baseSalary;
    }
}

export default PerHourEmployee;