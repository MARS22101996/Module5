'use strict';
import EmployeeService from './../services/employee-service.js';
import Counter from './../models/Counter.js';
import $ from './../libs/jquery.min.js';

class AppController {
    constructor() {
        this.ajaxUrl = 'http://localhost:8000/app_data/employees.json';
        this.employeeService = new EmployeeService();
        this.counterCalculator = new Counter(0);

        $('#json-btn').click(this.getFromInput.bind(this));
        $('#ajax-btn').click(this.getFromAjax.bind(this));
        $('.btn-sort').click(this.sort.bind(this));
        $('.btn-get-names').click(this.getFirstNames.bind(this));
        $('.btn-get-ids').click(this.getLastIds.bind(this));
        $('#switch').change(this.changeInput.bind(this));
        $('.btn-close').click(privateMethods.hideError.bind(this));
        $('.btn-up').click(this.incrementValue.bind(this));
        $('.btn-down').click(this.decrementValue.bind(this));
    }

    getFromInput() {
        privateMethods.hideError.call(this);

        var json = $('#json-input').val();

        try {
            var employees = this.employeeService.parseData(json);
        } catch (error) {
            privateMethods.showError.call(this, error);
            return;
        }

        privateMethods.hideFilterResult.call(this);
        this.displayResult(employees);
    }

    getFromAjax() {
        privateMethods.hideError.call(this);
        privateMethods.showLoader.call(this);
        privateMethods.hideFilterResult.call(this);

        this.employeeService.uploadAjax(this.ajaxUrl)
            .then(function () {
                var employees = this.employeeService.items();
                this.displayResult(employees);
            }.bind(this))
            .catch(function (error) {
                privateMethods.showError.call(this, error);
            });
    }

    sort() {
        privateMethods.hideError.call(this);
        privateMethods.hideFilterResult.call(this);
        this.displayResult( this.employeeService.sort());
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

        this.displayFilterResult(result);
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

        this.displayFilterResult(result);
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

        incrementValue() {
        var count = $('#count-input');
       this.counterCalculator.value=count.val();
        this.counterCalculator.incrementValue();

            count.val(this.counterCalculator.value);
    }

        decrementValue() {
       var count = $('#count-input');
       this.counterCalculator.value=count.val();
        this.counterCalculator.decrement();

            count.val(this.counterCalculator.value);
    }

    createTag(tag, innerText) {
        if(Array.isArray(innerText)){
            innerText = innerText.join('');
        }

        return `<${tag}>${innerText}</${tag}>`;
    }

     displayResult(employees) {
        $('.table-holder').show();
        $('.controlls').show();
        $('.loader-section').hide();

        var tableBody = $('#employee-table');
        tableBody.empty();
				var header ="<tr><th>#</th><th>Name</th><th>Average monthly salary</th></tr>";
       tableBody.append(header);
                employees.forEach(function (employee) {
            var raw = $('<tr>');
            var id = this.createTag('td', employee.id);
            var name = this.createTag('td', employee.name);
            var salary = this.createTag('td', employee.salary);
    
            raw.append(id);
            raw.append(name);
            raw.append(salary);

            tableBody.append(raw);
        }, this);
    }

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
    }
}

const privateMethods = {
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
    hideFilterResult() {
        $('.list-holder').hide();
    }
};

export default AppController;