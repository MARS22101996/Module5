'use strict';
import Employee from './employee.js';

class FixedSalaryEmployee extends Employee {
    constructor(id, name, salary) {
        super(id, name, salary);
    }

    getSalary() {
        return this.baseSalary;
    }
}

export default FixedSalaryEmployee;