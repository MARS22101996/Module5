'use strict';
import Employee from './Employee.js';

class FixedSalaryEmployee extends Employee {
    constructor(id, name, salary) {
        super(id, name, salary);
    }

    getSalary() {
        return this.baseSalary;
    }
}

export default FixedSalaryEmployee;