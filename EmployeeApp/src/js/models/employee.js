'use strict';

class Employee {
    constructor(id, name, salary) {
        if (this.constructor === Employee) {
            throw new TypeError('Can not construct abstract class.');
        }

        if (this.getSalary === undefined) {
            throw new TypeError('Must override method salary');
        }

        this.id = id;
        this.name = name;
        this.baseSalary = salary;
        this.salary = this.getSalary();
    }
}

export default Employee;