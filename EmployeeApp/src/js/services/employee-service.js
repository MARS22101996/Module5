'use strict';
import Employee from './../models/Employee.js';
import FixedSalaryEmployee from './../models/FixedSalaryEmployee.js';
import PerHourEmployee from './../models/PerHourEmployee.js';
import EmployeesCollection from './../models/EmployeesCollection.js';
import $ from './../libs/jquery.min.js';

class EmployeeService {
    constructor() {

          this._employees = new EmployeesCollection();

        this.setEmployees = function (employees) {
            let isEmployees = this.isEmployees.call(this, employees);
            if (isEmployees) {
               this._employees.load(employees);
            }
            else {
                throw new Error('Error: setEmployees. Invalid type passed. Expected:  Employee[]');
            }
        };

        this.items = function () {
            return this._employees.items; 
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
             throw new Error('Can not parse data.');
        }
        var employees = privateMethods.convertToTypedEmployees.call(this, parsed);
        
       this.setEmployees(employees);
       
       return employees;
    }

    sort() {

        return this._employees.sort();
    }

    getFirstNames(count) {  

        return this._employees.getFirstNames(count);
    }

    getLastIds(count) {

        return this._employees.getLastIds(count);
    }

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
    }
}

const privateMethods = {
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