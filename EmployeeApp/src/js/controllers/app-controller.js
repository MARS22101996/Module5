'use strict';
import EmployeeService from './../services/employee-service.js';
import $ from './../libs/jquery.min.js';

class AppController {
    constructor() {
        this.ajaxUrl = 'http://localhost:8000/app_data/employees.json';
        this.employeeService = new EmployeeService();

        $('#json-btn').click(this.getFromInput.bind(this));
        $('#ajax-btn').click(this.getFromAjax.bind(this));
        $('.btn-sort').click(this.sort.bind(this));
        $('.btn-get-names').click(this.getFirstNames.bind(this));
        $('.btn-get-ids').click(this.getLastIds.bind(this));
        $('#switch').change(this.changeInput.bind(this));
        $('.btn-close').click(privateMethods.hideError.bind(this));
        $('.btn-up').click(privateMethods.incrementCount.bind(this));
        $('.btn-down').click(privateMethods.decrementCount.bind(this));
    }

    getFromInput() {
        privateMethods.hideError.call(this);

        var json = $('#json-input').val();

        try {
            var employees = this.employeeService.uploadJson(json);
        } catch (error) {
            privateMethods.showError.call(this, error);
            return;
        }

        privateMethods.hideFilterResult.call(this);
        privateMethods.displayResult.call(this, employees);
    }

    getFromAjax() {
        privateMethods.hideError.call(this);
        privateMethods.showLoader.call(this);
        privateMethods.hideFilterResult.call(this);

        this.employeeService.uploadAjax(this.ajaxUrl)
            .then(function () {
                var employees = this.employeeService.items();
                privateMethods.displayResult.call(this, employees);
            }.bind(this))
            .catch(function (error) {
                privateMethods.showError.call(this, error);
            });
    }

    sort() {
        privateMethods.hideError.call(this);
        privateMethods.hideFilterResult.call(this);
        privateMethods.displayResult.call(this, this.employeeService.getSorted());
    }

    getFirstNames() {
        privateMethods.hideError.call(this);

        var n = $('#count-input').val();
        var result;
        if (n <= 0) {
            result = this.employeeService.getFirstNames(5);
        }
        else {
            result = this.employeeService.getFirstNames(n);
        }

        privateMethods.displayFilterResult.call(this, result);
    }

    getLastIds() {
        privateMethods.hideError.call(this);

        var n = $('#count-input').val();
        var result;
        if (n <= 0) {
            result = this.employeeService.getLastIds(3);
        }
        else {
            result = this.employeeService.getLastIds(n);
        }

        privateMethods.displayFilterResult.call(this, result);
    }

    changeInput() {
        var checked = $('#switch').is(':checked');
        privateMethods.hideError.call(this);
        privateMethods.hideResult.call(this);
        privateMethods.hideFilterResult.call(this);

        if (checked) {
            $('#ajax-input').show();
            $('#text-input').hide();
        }
        else {
            $('#ajax-input').hide();
            $('#text-input').show();
        }
    }
}

const privateMethods = {
    displayResult(employees) {
        $('.table-holder').show();
        $('.controlls').show();
        $('.loader-section').hide();

        var tableBody = $('#employee-table');
        tableBody.empty();

        employees.forEach(function (employee) {
            var raw = $('<tr>');
            var idCol = $('<td>').text(employee.id);
            var nameCol = $('<td>').text(employee.name);
            var salaryCol = $('<td>').text(employee.salary);
    
            raw.append(idCol);
            raw.append(nameCol);
            raw.append(salaryCol);

            tableBody.append(raw);
        }, this);
    },
    hideResult() {
        $('.table-holder').hide();
        $('.controlls').hide();
    },
    showError(error) {
        console.log(error);
        $('.loader-section').hide();
        $('.error-box').show();
    },
    hideError(error) {
        $('.error-box').hide();
    },
    showLoader() {
        $('.table-holder').hide();
        $('.controlls').hide();
        $('.loader-section').show();
    },
    displayFilterResult(array) {
        $('.list-holder').show();

        var list = $('#filter-result-list');
        list.empty();
        
        var count = 1;
        array.forEach(function(element) {
            var li = $('<li>');
            var indexSpan = $('<span>').text(count);
            li.append(indexSpan);
            li.text(element);
            list.append(li);
            
            count++;
        }, this);
    },
    hideFilterResult() {
        $('.list-holder').hide();
    },
    incrementCount() {
        var count = $('#count-input');
        if (count.val() < 1000000) {
            count.val(+count.val() + 1);
        }
    },
    decrementCount() {
        var count = $('#count-input');
        if (count.val() > 0) {
            count.val(+count.val() - 1);
        }
    }
};

export default AppController;