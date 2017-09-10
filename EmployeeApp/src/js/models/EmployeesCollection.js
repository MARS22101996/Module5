'use strict';

export default class EmployeesCollection {
    constructor() {
        this._employees = []; 
    }

    get items() { 
        return this._employees; 
    }
    
    add(employee) { 
        this._employees.push(employee); 
    }

    load(employees) { 
        this._employees = employees; 
    }

    clear() { 
        this._employees = []; 
    }

    sort() {
        var employeesList =  this._employees = this._employees.sort((x, y) => 
            (y.salary - x.salary) || 
            (y.name.toLowerCase() < x.name.toLowerCase())
        );

        return employeesList;
    }

    getLastIds(count) {
        let end = this._employees.length;
        let start = end - count;

        return this._employees.slice(start, end).map(x => x.id);
    }

    getFirstNames(count) {
        return this._employees.slice(0, count).map(x => x.name);
    }
}