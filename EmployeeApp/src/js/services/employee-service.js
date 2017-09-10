'use strict';
import Employee from './../models/Employee.js';
import FixedSalaryEmployee from './../models/FixedSalaryEmployee.js';
import PerHourEmployee from './../models/PerHourEmployee.js';
import $ from './../libs/jquery.min.js';

class EmployeeService {
    constructor() {
         this._employees = []; 

        this.setEmployees = function (employees) {
            let isEmployees = privateMethods.isEmployees.call(this, employees);
            if (isEmployees) {
               this._employees = employees;
            }
            else {
                throw new Error('Error: setEmployees. Invalid type passed. Expected:  Employee[]');
            }
        };

        this.items = function () {
            return this._employees; 
        };
    }

    uploadAjax(url) {
      
        var setEmployeesFunc = this.setEmployees.bind(this);

        var promiseFunc = function (resolve, reject) {
            $.ajax({
                url: url,
                success: function (data) {
                    try {

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

         try {
            var parsed = JSON.parse(json);        
        
            if(!Array.isArray(parsed)) {
                parsed = [parsed];     
            }

        } catch(e) {
            return [];
        }
        var employees = privateMethods.convertToTypedEmployees.call(this, parsed);
        
       this.setEmployees(employees);
       
       return employees;
    }

    getSorted() {
        //var employees = this.items();
        var employees = this._employees.sort((x, y) => 
            (y.getSalary()  - x.getSalary()) || 
            (y.name.toLowerCase() < x.name.toLowerCase())
        );

        return employees;
        // return employees.sort(function (a, b) {
        //     if (a.getSalary() > b.getSalary()) {
        //         return -1;
        //     }
        //     else if (a.getSalary() < b.getSalary()) {
        //         return 1;
        //     }
        //     else {
        //         return a.name > b.name;
        //     }
        // });
    }

    getFirstNames(n) {
        var employees = this.items().slice(0, n);
        var names = employees.map(function (employee) {
            return employee.name;
        });

        return names;
    }

    getLastIds(n) {
        var employees = this.items();
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