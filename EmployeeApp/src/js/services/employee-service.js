'use strict';
import Employee from './../models/employee.js';
import FixedSalaryEmployee from './../models/fixed-salary-employee.js';
import PerHourEmployee from './../models/per-hour-employee.js';
import $ from './../libs/jquery.min.js';

class EmployeeService {
    constructor() {
        let _employees = [];

        this.setEmployees = function (employees) {
            let isEmployees = privateMethods.isEmployees.call(this, employees);
            if (isEmployees) {
                _employees = employees;
            }
            else {
                throw new Error('Error: setEmployees. Invalid type passed. Expected:  Employee[]');
            }
        };

        this.getEmployees = function () {
            return _employees;
        };
    }

    uploadAjax(url) {
        var validateFunc = privateMethods.validateEmployeesArray.bind(this);
        var setEmployeesFunc = this.setEmployees.bind(this);

        var promiseFunc = function (resolve, reject) {
            $.ajax({
                url: url,
                success: function (data) {
                    try {
                        validateFunc(data);
                        var employees = privateMethods.convertToTypedEmployees(data);
                        setEmployeesFunc(employees);

                        setTimeout(resolve, 2000); // simulate slow response
                    } catch (error) {
                        reject(error);
                    }
                },
                error: function (error) {
                    reject(error);
                }
            });
        };

        return new Promise(promiseFunc);
    }

    uploadJson(json) {
        var array = JSON.parse(json);
        privateMethods.validateEmployeesArray.call(this, array);
        var employees = privateMethods.convertToTypedEmployees.call(this, array);

        this.setEmployees(employees);
    }

    getSorted() {
        var employees = this.getEmployees();

        return employees.sort(function (a, b) {
            if (a.getSalary() > b.getSalary()) {
                return -1;
            }
            else if (a.getSalary() < b.getSalary()) {
                return 1;
            }
            else {
                return a.name > b.name;
            }
        });
    }

    getFirstNames(n) {
        var employees = this.getEmployees().slice(0, n);
        var names = employees.map(function (employee) {
            return employee.name;
        });

        return names;
    }

    getLastIds(n) {
        var employees = this.getEmployees();
        var slice;
        if(n > employees.length){
            slice = employees;
        }
        else{
            slice = employees.slice(employees.length - n, employees.length);
        }
        
        var ids = slice.map(function (employee) {
            return employee.id;
        });

        return ids;
    }
}

const privateMethods = {
    isEmployees(employees) {
        var isEmployees = true;

        if (Array.isArray(employees)) {
            employees.forEach(function (item, index, array) {
                if (!(item instanceof Employee)) {
                    isEmployees = false;
                }
            });
        }
        else {
            isEmployees = false;
        }

        return isEmployees;
    },
    validateEmployeesArray(array) {

        if (!Array.isArray(array)) {
            throw new Error('Json should be an array of employees.');
        }

        array.forEach(function (item, index, array) {
            if (item.id == undefined || item.type == undefined || item.name == undefined || item.salary == undefined) {
                throw new Error(`Invalid Json format. 
                    Json should be an array of employees. 
                    Each employee must have defined "id", "type", "name" and "salary" properties`);
            }
        });
    },
    convertToTypedEmployees(array){
        var employees = [];
        array.forEach(function (item, index, array) {
            var employee;
            switch (item.type) {
                case 'FixedSalaryEmployee':
                    employee = new FixedSalaryEmployee(item.id, item.name, item.salary);
                    break;
                case 'PerHourEmployee':
                    employee = new PerHourEmployee(item.id, item.name, item.salary);
                    break;
                default:
                    throw new Error('Invalid employee type passed.');
            }

            employees.push(employee);
        });

        return employees;
    }
};

export default EmployeeService;