'use strict';

class Employee {
    constructor(id, name, salary) {
        if (this.constructor === Employee) {
            throw new TypeError('Abstract class "Employee" cannot be instantiated directly.');
        }

        if (this.getSalary === undefined) {
            throw new TypeError('"getSalary" should be implemented');
        }

        this.id = id;
        this.name = name;
        this.baseSalary = salary;
        this.salary = this.getSalary();
    }
}

export default Employee;