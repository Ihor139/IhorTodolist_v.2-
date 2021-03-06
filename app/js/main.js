(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
document.addEventListener("DOMContentLoaded", function () {

    const datepicker = require('js-datepicker');
    let inpDate = document.querySelector('#date');
    const picker = datepicker(inpDate);

    if (localStorage.getItem("todolist") !== null) {
        let locArr = JSON.parse(localStorage.getItem('todolist'));
        todolist.createFromLocalNewItem();
    } else {
        console.log('LocalStorage is empty');
    }
});

class Todolist {
    constructor() {

        this.input = document.querySelector('.title_inp');
        this.inputDescr = document.querySelector('.description_inp');
        this.inputDate = document.querySelector('#date');
        this.btnAdd = document.querySelector('.add');

        this.btnMenu = document.querySelector('.menu');
        this.btnMenuPlus = document.querySelector('.menu_plus');
        this.btnMenuBars = document.querySelector('.menu_bars');

        this.sectRemTabs = document.querySelector('.section_remove__tabs');
        this.btnNotComplete = document.querySelector('#uncomplete');
        this.btnComplete = document.querySelector('#complete');
        this.btnExpired = document.querySelector('#expired');

        this.sectionAdd = document.querySelector('.section_add');
        this.sectionRemove = document.querySelector('.section_remove');
        this.sectionUndone = document.querySelector('.section_undone');
        this.sectionDone = document.querySelector('.section_done');
        this.sectionExpired = document.querySelector('.section_expired');

        let count = 0;

        if (localStorage.getItem('todolist')) {
            let locLength = JSON.parse(localStorage.getItem('todolist'));
            count = locLength.length
        } else {
            count = 0;
        }

        this.btnAdd.addEventListener('click', () => {

            if (this.input.value && this.inputDescr.value && this.inputDate.value) {
                count++;
                this.createNewItem(count);
            } else{
                this.input.classList.add('empty');
                this.inputDescr.classList.add('empty');
                this.inputDate.classList.add('empty');

            }
        })

        this.btnNotComplete.onclick = () => this.changeTabNotCompleteClick();
        this.btnComplete.onclick = () => this.changeTabComplete();
        this.btnExpired.onclick = () => this.changeTabExpired();
        this.btnMenuPlus.onclick = () => this.menu();
        this.btnMenuBars.onclick = () => this.menu();

        this.chekDate = document.querySelector('.chek_date');

        this.changeTabNotComplete();
        this.menu();

    }

    createNewItem(count) {

        if (this.input.value && this.inputDescr.value && this.inputDate.value) {

            let newTask = document.createElement('div');
            newTask.className = "new__task";
            newTask.dataset.id = count;
            newTask.dataset.status = '0';

            let check = document.createElement("button");
            check.className = "checked";
            check.innerHTML = '<i class="fas fa-check-double"></i>';
            check.onclick = () => { this.checkTaskFromUndone(newTask) };

            let uncheck = document.createElement('button');
            uncheck.className = "unchecked";
            uncheck.innerHTML = '<i class="fas fa-times"></i>';
            uncheck.setAttribute('hidden', 'hidden');
            uncheck.addEventListener('click', () => {
                this.checkTaskFromDone(newTask)
            });

            let edit = document.createElement("button");
            edit.className = "edit";
            edit.innerHTML = '<i class="far fa-edit"></i>';
            edit.onclick = () => this.editTask(newTask);

            let save = document.createElement("button");
            save.className = "save";
            save.innerHTML = '<i class="fas fa-save"></i>';
            save.setAttribute('hidden', 'hidden');
            save.onclick = () => this.editTask(newTask);

            let del = document.createElement("button");
            del.className = "remove";
            del.innerHTML = '<i class="fas fa-trash-alt"></i>';
            del.onclick = () => this.removeTask(newTask);

            let btnsRemCheckEdit = document.createElement('div');
            btnsRemCheckEdit.className = "task_title_cheked_btn";

            btnsRemCheckEdit.appendChild(check);
            btnsRemCheckEdit.appendChild(uncheck);
            btnsRemCheckEdit.appendChild(edit);
            btnsRemCheckEdit.appendChild(save);
            btnsRemCheckEdit.appendChild(del);

            let newTaskTitle = document.createElement('input');
            newTaskTitle.className = "title_task";
            newTaskTitle.setAttribute('value', this.input.value)
            newTaskTitle.setAttribute('readonly', '');

            let newDate = document.createElement('input')
            newDate.setAttribute('readonly', '');
            newDate.className = 'newDate';
            newDate.value = (this.inputDate).value;

            let taskTitleChecked = document.createElement('div');
            taskTitleChecked.className = "task_title_cheked";
            taskTitleChecked.appendChild(newTaskTitle);
            taskTitleChecked.appendChild(newDate);
            taskTitleChecked.appendChild(btnsRemCheckEdit);

            let inputDescrip = document.createElement('textarea');
            inputDescrip.className = "description_p";
            inputDescrip.setAttribute('readonly', '');
            inputDescrip.innerHTML = this.inputDescr.value

            let taskDescription = document.createElement('div');
            taskDescription.className = "task_description";
            taskDescription.appendChild(inputDescrip);

            newTask.appendChild(taskTitleChecked);
            newTask.appendChild(taskDescription);

            this.sectionUndone.appendChild(newTask);

            this.saveToLocalStorage(newTask);

            this.input.value = '';
            this.inputDescr.value = '';
            this.inputDate.value = '';
            this.input.classList.remove('empty');
            this.inputDescr.classList.remove('empty');
            this.inputDate.classList.remove('empty');


            this.changeTabNotComplete();
        }
     }

    createFromLocalNewItem() {

        let data = JSON.parse(localStorage.getItem('todolist'));

        data.forEach(objTodo => {

            let newTask = document.createElement('div');
            newTask.className = "new__task";
            newTask.dataset.id = objTodo.id;
            newTask.dataset.status = objTodo.status;

            let check = document.createElement("button");
            check.className = "checked";
            check.innerHTML = '<i class="fas fa-check-double"></i>';
            check.onclick = () => { this.checkTaskFromUndone(newTask) };

            let uncheck = document.createElement('button');
            uncheck.className = "unchecked";
            uncheck.innerHTML = '<i class="fas fa-times"></i>';
            uncheck.setAttribute('hidden', 'hidden');
            uncheck.addEventListener('click', () => {
                this.checkTaskFromDone(newTask)
            });

            let edit = document.createElement("button");
            edit.className = "edit";
            edit.innerHTML = '<i class="far fa-edit"></i>';
            edit.onclick = () => this.editTask(newTask);

            let save = document.createElement("button");
            save.className = "save";
            save.innerHTML = '<i class="fas fa-save"></i>';
            save.setAttribute('hidden', 'hidden');
            save.onclick = () => this.editTask(newTask);

            let del = document.createElement("button");
            del.className = "remove";
            del.innerHTML = '<i class="fas fa-trash-alt"></i>';
            del.onclick = () => this.removeTask(newTask);

            let btnsRemCheckEdit = document.createElement('div');
            btnsRemCheckEdit.className = "task_title_cheked_btn";

            btnsRemCheckEdit.appendChild(check);
            btnsRemCheckEdit.appendChild(uncheck);
            btnsRemCheckEdit.appendChild(edit);
            btnsRemCheckEdit.appendChild(save);
            btnsRemCheckEdit.appendChild(del);

            let newTaskTitle = document.createElement('input');
            newTaskTitle.className = "title_task";
            newTaskTitle.setAttribute('value', objTodo.valueTitle)
            newTaskTitle.setAttribute('readonly', '');

            let newDate = document.createElement('input')
            newDate.className = 'newDate';
            newDate.setAttribute('readonly', '')
            newDate.value = objTodo.valueDate;

            let taskTitleChecked = document.createElement('div');
            taskTitleChecked.className = "task_title_cheked";
            taskTitleChecked.appendChild(newTaskTitle);
            taskTitleChecked.appendChild(newDate);
            taskTitleChecked.appendChild(btnsRemCheckEdit);

            let inputDescrip = document.createElement('textarea');
            inputDescrip.className = "description_p";
            inputDescrip.setAttribute('readonly', '');
            inputDescrip.innerHTML = objTodo.valueDescript

            let taskDescription = document.createElement('div');
            taskDescription.className = "task_description";
            taskDescription.appendChild(inputDescrip);

            newTask.appendChild(taskTitleChecked);
            newTask.appendChild(taskDescription);

            if (objTodo.status == '0') {
                this.sectionUndone.appendChild(newTask);
            } else if (objTodo.status == '1') {
                this.sectionDone.appendChild(newTask);
                check.setAttribute('hidden', 'hidden');
                uncheck.removeAttribute('hidden', 'hidden');
            } else if (objTodo.status == '2') {
                this.sectionExpired.appendChild(newTask);
                check.remove();
                edit.remove();
            }
            else if (objTodo.status == '3') {
                newTask.setAttribute('visibility', 'unvisibility')
                newTask.remove();
            }
        })

    }

    createTabExpired() {
        let expiredTab = document.createElement('div');
        expiredTab.classList.add('section_expired');
    }

    saveToLocalStorage(newTask) {
        let titVal = newTask.querySelector('.title_task');
        let descVal = newTask.querySelector('.description_p');
        let dateVal = newTask.querySelector('.newDate');

        let valueTitle = titVal.value;
        let valueDescript = descVal.value;
        let valueDate = dateVal.value;
        let status = newTask.dataset.status;
        let id = newTask.dataset.id;

        let objTodo = { valueTitle, valueDescript, valueDate, status, id };

        let todoArray = localStorage.getItem('todolist') === null ? [] : JSON.parse(localStorage.getItem('todolist'));
        todoArray.push(objTodo);
        localStorage["todolist"] = JSON.stringify(todoArray);
    }

    removeTask(newTask) {

        let target = event.target;
        let parent1 = target.parentElement;
        let parent2 = parent1.parentElement
        let parent3 = parent2.parentNode;
        let parent4 = parent3.parentNode;
        let currentList = JSON.parse(localStorage.getItem('todolist'));
        
        currentList.forEach(objTodo => {
        if (objTodo.id === parent4.dataset.id) {
            objTodo.status = 3;
        console.log('remove');
        }
        return
    })

        localStorage.setItem('todolist', JSON.stringify(currentList));

        let thisTask = newTask.parentNode;
        thisTask.removeChild(newTask);

    }

    editTask(newTask) {
        let classChange = newTask.classList.contains('change');
        let titleTask = newTask.querySelector('.title_task');
        let descripTask = newTask.querySelector('.description_p');
        let dateTask = newTask.querySelector('.newDate');
        let btnEdit = newTask.querySelector('.edit');
        let btnSave = newTask.querySelector('.save');

        if (classChange) {

            let target = event.target;
            let parent1 = target.parentElement;
            let parent2 = parent1.parentElement
            let parent3 = parent2.parentNode;
            let parent4 = parent3.parentNode;
    
            let currentList = JSON.parse(localStorage.getItem('todolist'))
            currentList.forEach(objTodo => {
                if (objTodo.id === parent4.dataset.id) {
                    objTodo.valueTitle = titleTask.value;
                    objTodo.valueDescript = descripTask.value;
                    objTodo.valueDate = dateTask.value;
                }
            })
            localStorage.setItem('todolist', JSON.stringify(currentList));
    

            titleTask.setAttribute('readonly', '');
            titleTask.classList.remove('check1');

            descripTask.setAttribute('readonly', '');
            descripTask.classList.remove('check1');

            dateTask.setAttribute('readonly', '')
            dateTask.classList.remove('check1');

            btnEdit.removeAttribute('hidden', '');
            btnSave.setAttribute('hidden', '');
        } else {
            titleTask.removeAttribute('readonly', '');
            titleTask.classList.add('check1');

            descripTask.removeAttribute('readonly', '');
            descripTask.classList.add('check1');

            dateTask.removeAttribute('readonly', '')
            dateTask.classList.add('check1');

            btnEdit.setAttribute('hidden', '');
            btnSave.removeAttribute('hidden', '');
        }

        newTask.classList.toggle('change');

    }

    checkDate(newTask) {
        let delChecktBtn = newTask.querySelector('.checked');
        let delUnchecktBtn = newTask.querySelector('.unchecked');
        let delEditktBtn = newTask.querySelector('.edit');
        let delSaveBtn = newTask.querySelector('.save');

        let selecDate = new Date(newTask.querySelector('.newDate').value);
        let currD = new Date();

        if (selecDate < currD) {

            let target = event.target;
            let parent1 = target.parentElement;
            let parent2 = parent1.parentElement
            let parent3 = parent2.parentNode;
            let parent4 = parent3.parentNode;

            let currentList = JSON.parse(localStorage.getItem('todolist'))
            currentList.forEach(objTodo => {
                if (objTodo.id === parent4.dataset.id) {
                    objTodo.status = 2;
                }
            })
            localStorage.setItem('todolist', JSON.stringify(currentList));

            newTask.dataset.status = '2';
            this.sectionExpired.appendChild(newTask);
            delChecktBtn.remove();
            delUnchecktBtn.remove();
            delEditktBtn.remove();
            delSaveBtn.remove();
        }
    }

    checkTaskFromUndone(newTask) {
        let checkBtn = newTask.querySelector('.checked');
        let uncheckBtn = newTask.querySelector('.unchecked');

        checkBtn.setAttribute('hidden', 'hidden');
        uncheckBtn.removeAttribute('hidden', 'hidden');
        this.sectionUndone.removeChild(newTask);
        this.sectionDone.appendChild(newTask);

        let target = event.target;
        let parent1 = target.parentElement;
        let parent2 = parent1.parentElement
        let parent3 = parent2.parentNode;
        let parent4 = parent3.parentNode;

        let currentList = JSON.parse(localStorage.getItem('todolist'))
        currentList.forEach(objTodo => {
            if (objTodo.id === parent4.dataset.id) {
                objTodo.status = 1;
            }
        })
        localStorage.setItem('todolist', JSON.stringify(currentList));

        this.checkDate(newTask);
    }

    checkTaskFromDone(newTask) {

        let checkBtn = newTask.querySelector('.checked');
        let uncheckBtn = newTask.querySelector('.unchecked');

        this.sectionDone.removeChild(newTask);
        this.sectionUndone.appendChild(newTask);
        checkBtn.removeAttribute('hidden', 'hidden');
        uncheckBtn.setAttribute('hidden', 'hidden');

        let target = event.target;
        let parent1 = target.parentElement;
        let parent2 = parent1.parentElement
        let parent3 = parent2.parentNode;
        let parent4 = parent3.parentNode;

        let currentList = JSON.parse(localStorage.getItem('todolist'))
        currentList.forEach(objTodo => {
            console.log('else')
            if (objTodo.id === parent4.dataset.id) {
                objTodo.status = 0;
            }
        })
        localStorage.setItem('todolist', JSON.stringify(currentList));

        this.checkDate(newTask);
    }

    changeTabNotComplete() {
        this.sectionExpired.classList.remove('active');
        this.sectionDone.classList.remove('active');
        this.sectionUndone.classList.add('active');
        this.btnNotComplete.classList.add('active');
        this.btnComplete.classList.remove('active');
        this.btnExpired.classList.remove('active');
    }

    changeTabNotCompleteClick() {
        if (this.btnNotComplete.onclick) {
            this.sectionExpired.classList.remove('active');
            this.sectionDone.classList.remove('active');
            this.sectionUndone.classList.add('active');

            this.btnNotComplete.classList.add('active');
            this.btnComplete.classList.remove('active');
            this.btnExpired.classList.remove('active');
        }
    }

    changeTabComplete() {
        if (this.btnComplete.onclick) {
            this.sectionExpired.classList.remove('active');
            this.sectionUndone.classList.remove('active');
            this.sectionDone.classList.add('active');

            this.btnNotComplete.classList.remove('active');
            this.btnComplete.classList.add('active');
            this.btnExpired.classList.remove('active');
        }
    }

    changeTabExpired() {
        if (this.btnExpired.onclick) {
            this.sectionUndone.classList.remove('active');
            this.sectionDone.classList.remove('active');
            this.sectionExpired.classList.add('active');

            this.btnNotComplete.classList.remove('active');
            this.btnComplete.classList.remove('active');
            this.btnExpired.classList.add('active');
        }
    }

    menu() {
        let addClass = this.sectionAdd.classList.contains('visibility');

        if (!addClass) {
            this.sectionRemove.classList.add('unvisibility');
            this.sectionAdd.classList.add('visibility');
            this.btnMenuPlus.classList.add('visibility');
            this.btnMenuBars.classList.add('unvisibility');

        } else {

            this.sectionRemove.classList.remove('unvisibility');
            this.sectionAdd.classList.remove('visibility');

        }

        this.btnMenuPlus.classList.toggle('visibility');
        this.btnMenuPlus.classList.toggle('unvisibility');
        this.btnMenuBars.classList.toggle('visibility');
        this.btnMenuBars.classList.toggle('unvisibility');
    }
}

let todolist = new Todolist();

},{"js-datepicker":2}],2:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.datepicker=t():e.datepicker=t()}(window,(function(){return function(e){var t={};function n(a){if(t[a])return t[a].exports;var i=t[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(a,i,function(t){return e[t]}.bind(null,i));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){n(1);var a=[],i=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],o=["January","February","March","April","May","June","July","August","September","October","November","December"],r={t:"top",r:"right",b:"bottom",l:"left",c:"centered"};function s(){}var l=["click","focusin","keydown","input"];function c(e){l.forEach((function(t){e.addEventListener(t,e===document?E:L)}))}function d(e){return Array.isArray(e)?e.map(d):"[object Object]"===C(e)?Object.keys(e).reduce((function(t,n){return t[n]=d(e[n]),t}),{}):e}function u(e,t){var n=e.calendar.querySelector(".qs-overlay"),a=n&&!n.classList.contains("qs-hidden");t=t||new Date(e.currentYear,e.currentMonth),e.calendar.innerHTML=[h(t,e,a),f(t,e,a),v(e,a)].join(""),a&&window.requestAnimationFrame((function(){M(!0,e)}))}function h(e,t,n){return['<div class="qs-controls'+(n?" qs-blur":"")+'">','<div class="qs-arrow qs-left"></div>','<div class="qs-month-year">','<span class="qs-month">'+t.months[e.getMonth()]+"</span>",'<span class="qs-year">'+e.getFullYear()+"</span>","</div>",'<div class="qs-arrow qs-right"></div>',"</div>"].join("")}function f(e,t,n){var a=t.currentMonth,i=t.currentYear,o=t.dateSelected,r=t.maxDate,s=t.minDate,l=t.showAllDates,c=t.days,d=t.disabledDates,u=t.disabler,h=t.noWeekends,f=t.startDay,v=t.weekendIndices,m=t.events,y=t.getRange?t.getRange():{},p=+y.start,D=+y.end,b=new Date,g=i===b.getFullYear()&&a===b.getMonth(),w=q(new Date(e).setDate(1)),S=w.getDay()-f,M=S<0?7:0;w.setMonth(w.getMonth()+1),w.setDate(0);var x=w.getDate(),C=[],j=M+7*((S+x)/7|0);j+=(S+x)%7?7:0,0!==f&&0===S&&(j+=7);for(var E=1;E<=j;E++){var L=(E-1)%7,Y=c[L],P=E-(S>=0?S:7+S),k=new Date(i,a,P),O=m[+k],N="qs-num",_='<span class="qs-num">'+k.getDate()+"</span>",I=p&&D&&+k>=p&&+k<=D;P<1||P>x?(N="qs-empty qs-outside-current-month",l?(O&&(N+=" qs-event"),N+=" qs-disabled"):_=""):((s&&k<s||r&&k>r||u(k)||d.some((function(e){return e===+k}))||h&&v.some((function(e){return e===L})))&&(N="qs-disabled"),O&&(N+=" qs-event"),g&&P===b.getDate()&&(N+=" qs-current"),+k==+o&&(N+=" qs-active"),I&&(N+=" qs-range-date-"+L,p!==D&&(N+=+k===p?" qs-range-date-start qs-active":+k===D?" qs-range-date-end qs-active":" qs-range-date-middle"))),C.push('<div class="qs-square '+N+" "+Y+'">'+_+"</div>")}var R=c.map((function(e){return'<div class="qs-square qs-day">'+e+"</div>"})).concat(C);if(R.length%7!=0)throw"Calendar not constructed properly. The # of squares should be a multiple of 7.";return R.unshift('<div class="qs-squares'+(n?" qs-blur":"")+'">'),R.push("</div>"),R.join("")}function v(e,t){var n=e.overlayPlaceholder,a=e.overlayButton;return['<div class="qs-overlay'+(t?"":" qs-hidden")+'">',"<div>",'<input class="qs-overlay-year" placeholder="'+n+'" />','<div class="qs-close">&#10005;</div>',"</div>",'<div class="qs-overlay-month-container">'+e.overlayMonths.map((function(e,t){return['<div class="qs-overlay-month" data-month-num="'+t+'">','<span data-month-num="'+t+'">'+e+"</span>","</div>"].join("")})).join("")+"</div>",'<div class="qs-submit qs-disabled">'+a+"</div>","</div>"].join("")}function m(e,t,n){var a=t.el,i=t.calendar.querySelector(".qs-active"),o=e.textContent,r=t.sibling;(a.disabled||a.readOnly)&&t.respectDisabledReadOnly||(t.dateSelected=n?void 0:new Date(t.currentYear,t.currentMonth,o),i&&i.classList.remove("qs-active"),n||e.classList.add("qs-active"),p(a,t,n),n||w(t),r&&(y({instance:t,deselect:n}),t.first&&!r.dateSelected&&(r.currentYear=t.currentYear,r.currentMonth=t.currentMonth,r.currentMonthName=t.currentMonthName),u(t),u(r)),t.onSelect(t,n?void 0:new Date(t.dateSelected)))}function y(e){var t=e.instance.first?e.instance:e.instance.sibling,n=t.sibling;t===e.instance?e.deselect?(t.minDate=t.originalMinDate,n.minDate=n.originalMinDate):n.minDate=t.dateSelected:e.deselect?(n.maxDate=n.originalMaxDate,t.maxDate=t.originalMaxDate):t.maxDate=n.dateSelected}function p(e,t,n){if(!t.nonInput)return n?e.value="":t.formatter!==s?t.formatter(e,t.dateSelected,t):void(e.value=t.dateSelected.toDateString())}function D(e,t,n,a){n||a?(n&&(t.currentYear=+n),a&&(t.currentMonth=+a)):(t.currentMonth+=e.contains("qs-right")?1:-1,12===t.currentMonth?(t.currentMonth=0,t.currentYear++):-1===t.currentMonth&&(t.currentMonth=11,t.currentYear--)),t.currentMonthName=t.months[t.currentMonth],u(t),t.onMonthChange(t)}function b(e){if(!e.noPosition){var t=e.position.top,n=e.position.right;if(e.position.centered)return e.calendarContainer.classList.add("qs-centered");var a=e.positionedEl.getBoundingClientRect(),i=e.el.getBoundingClientRect(),o=e.calendarContainer.getBoundingClientRect(),r=i.top-a.top+(t?-1*o.height:i.height)+"px",s=i.left-a.left+(n?i.width-o.width:0)+"px";e.calendarContainer.style.setProperty("top",r),e.calendarContainer.style.setProperty("left",s)}}function g(e){return"[object Date]"===C(e)&&"Invalid Date"!==e.toString()}function q(e){if(g(e)||"number"==typeof e&&!isNaN(e)){var t=new Date(+e);return new Date(t.getFullYear(),t.getMonth(),t.getDate())}}function w(e){e.disabled||!e.calendarContainer.classList.contains("qs-hidden")&&!e.alwaysShow&&(M(!0,e),e.calendarContainer.classList.add("qs-hidden"),e.onHide(e))}function S(e){e.disabled||(e.calendarContainer.classList.remove("qs-hidden"),b(e),e.onShow(e))}function M(e,t){var n=t.calendar,a=n.querySelector(".qs-overlay"),i=a.querySelector(".qs-overlay-year"),o=n.querySelector(".qs-controls"),r=n.querySelector(".qs-squares");e?(a.classList.add("qs-hidden"),o.classList.remove("qs-blur"),r.classList.remove("qs-blur"),i.value=""):(a.classList.remove("qs-hidden"),o.classList.add("qs-blur"),r.classList.add("qs-blur"),i.focus())}function x(e,t,n,a){var i=isNaN(+(new Date).setFullYear(t.value||void 0)),o=i?null:t.value;if(13===(e.which||e.keyCode)||"click"===e.type)a?D(null,n,o,a):i||t.classList.contains("qs-disabled")||D(null,n,o,a);else if(n.calendar.contains(t)){n.calendar.querySelector(".qs-submit").classList[i?"add":"remove"]("qs-disabled")}}function C(e){return{}.toString.call(e)}function j(e){a.forEach((function(t){t!==e&&w(t)}))}function E(e){if(!e.__qs_shadow_dom){var t=e.type,n=e.target,i=n.classList,o=a.filter((function(e){return e.calendar.contains(n)||e.el===n}))[0],r=o&&o.calendar.contains(n);if(!(o&&o.isMobile&&o.disableMobile))if("click"===t){if(!o)return a.forEach(w);if(o.disabled)return;var s=o.calendar,l=o.calendarContainer,c=o.disableYearOverlay,d=o.nonInput,u=s.querySelector(".qs-overlay-year"),h=!!s.querySelector(".qs-hidden"),f=s.querySelector(".qs-month-year").contains(n),v=n.dataset.monthNum;if(o.noPosition&&!r)(l.classList.contains("qs-hidden")?S:w)(o);else if(i.contains("qs-arrow"))D(i,o);else if(f||i.contains("qs-close"))c||M(!h,o);else if(v)x(e,u,o,v);else{if(i.contains("qs-num")){var y="SPAN"===n.nodeName?n.parentNode:n,p=n.textContent;return void(+new Date(o.currentYear,o.currentMonth,p)==+o.dateSelected?m(y,o,!0):y.classList.contains("qs-disabled")||m(y,o))}i.contains("qs-submit")&&!i.contains("qs-disabled")?x(e,u,o):d&&n===o.el&&(S(o),j(o))}}else if("focusin"===t&&o)S(o),j(o);else if("keydown"===t&&o&&!o.disabled){var b=!o.calendar.querySelector(".qs-overlay").classList.contains("qs-hidden");13===(e.which||e.keyCode)&&b&&r?x(e,n,o):27===(e.which||e.keyCode)&&b&&r&&M(!0,o)}else if("input"===t){if(!o||!o.calendar.contains(n))return;var g=o.calendar.querySelector(".qs-submit"),q=n.value.split("").reduce((function(e,t){return e||"0"!==t?e+(t.match(/[0-9]/)?t:""):""}),"").slice(0,4);n.value=q,g.classList[4===q.length?"remove":"add"]("qs-disabled")}}}function L(e){E(e),e.__qs_shadow_dom=!0}function Y(e,t){l.forEach((function(n){e.removeEventListener(n,t)}))}function P(){S(this)}function k(){w(this)}function O(e,t){var n=q(e),a=this.currentYear,i=this.currentMonth,o=this.sibling;if(null==e)return this.dateSelected=void 0,p(this.el,this,!0),o&&(y({instance:this,deselect:!0}),u(o)),u(this),this;if(!g(e))throw"`setDate` needs a JavaScript Date object.";if(this.disabledDates.some((function(e){return+e==+n}))||n<this.minDate||n>this.maxDate)throw"You can't manually set a date that's disabled.";return this.dateSelected=n,t&&(this.currentYear=n.getFullYear(),this.currentMonth=n.getMonth(),this.currentMonthName=this.months[n.getMonth()]),p(this.el,this),o&&(y({instance:this}),u(o)),(a===n.getFullYear()&&i===n.getMonth()||t)&&u(this,n),this}function N(e){return I(this,e,!0)}function _(e){return I(this,e)}function I(e,t,n){var a=e.dateSelected,i=e.first,o=e.sibling,r=e.minDate,s=e.maxDate,l=q(t),c=n?"Min":"Max";function d(){return"original"+c+"Date"}function h(){return c.toLowerCase()+"Date"}function f(){return"set"+c}function v(){throw"Out-of-range date passed to "+f()}if(null==t)e[d()]=void 0,o?(o[d()]=void 0,n?(i&&!a||!i&&!o.dateSelected)&&(e.minDate=void 0,o.minDate=void 0):(i&&!o.dateSelected||!i&&!a)&&(e.maxDate=void 0,o.maxDate=void 0)):e[h()]=void 0;else{if(!g(t))throw"Invalid date passed to "+f();o?((i&&n&&l>(a||s)||i&&!n&&l<(o.dateSelected||r)||!i&&n&&l>(o.dateSelected||s)||!i&&!n&&l<(a||r))&&v(),e[d()]=l,o[d()]=l,(n&&(i&&!a||!i&&!o.dateSelected)||!n&&(i&&!o.dateSelected||!i&&!a))&&(e[h()]=l,o[h()]=l)):((n&&l>(a||s)||!n&&l<(a||r))&&v(),e[h()]=l)}return o&&u(o),u(e),e}function R(){var e=this.first?this:this.sibling,t=e.sibling;return{start:e.dateSelected,end:t.dateSelected}}function A(){var e=this.shadowDom,t=this.positionedEl,n=this.calendarContainer,i=this.sibling,o=this;this.inlinePosition&&(a.some((function(e){return e!==o&&e.positionedEl===t}))||t.style.setProperty("position",null));n.remove(),a=a.filter((function(e){return e!==o})),i&&delete i.sibling,a.length||Y(document,E);var r=a.some((function(t){return t.shadowDom===e}));for(var s in e&&!r&&Y(e,L),this)delete this[s];a.length||l.forEach((function(e){document.removeEventListener(e,E)}))}e.exports=function(e,t){var n=function(e,t){var n,l,c=function(e){var t=d(e);t.events&&(t.events=t.events.reduce((function(e,t){if(!g(t))throw'"options.events" must only contain valid JavaScript Date objects.';return e[+q(t)]=!0,e}),{}));["startDate","dateSelected","minDate","maxDate"].forEach((function(e){var n=t[e];if(n&&!g(n))throw'"options.'+e+'" needs to be a valid JavaScript Date object.';t[e]=q(n)}));var n=t.position,o=t.maxDate,l=t.minDate,c=t.dateSelected,u=t.overlayPlaceholder,h=t.overlayButton,f=t.startDay,v=t.id;if(t.startDate=q(t.startDate||c||new Date),t.disabledDates=(t.disabledDates||[]).map((function(e){var t=+q(e);if(!g(e))throw'You supplied an invalid date to "options.disabledDates".';if(t===+q(c))throw'"disabledDates" cannot contain the same date as "dateSelected".';return t})),t.hasOwnProperty("id")&&null==v)throw"Id cannot be `null` or `undefined`";if(null!=v){var m=a.filter((function(e){return e.id===v}));if(m.length>1)throw"Only two datepickers can share an id.";m.length?(t.second=!0,t.sibling=m[0]):t.first=!0}var y=["tr","tl","br","bl","c"].some((function(e){return n===e}));if(n&&!y)throw'"options.position" must be one of the following: tl, tr, bl, br, or c.';if(t.position=function(e){var t=e[0],n=e[1],a={};a[r[t]]=1,n&&(a[r[n]]=1);return a}(n||"bl"),o<l)throw'"maxDate" in options is less than "minDate".';if(c){function p(e){throw'"dateSelected" in options is '+(e?"less":"greater")+' than "'+(e||"max")+'Date".'}l>c&&p("min"),o<c&&p()}if(["onSelect","onShow","onHide","onMonthChange","formatter","disabler"].forEach((function(e){"function"!=typeof t[e]&&(t[e]=s)})),["customDays","customMonths","customOverlayMonths"].forEach((function(e,n){var a=t[e],i=n?12:7;if(a){if(!Array.isArray(a)||a.length!==i||a.some((function(e){return"string"!=typeof e})))throw'"'+e+'" must be an array with ${num} strings.';t[n?n<2?"months":"overlayMonths":"days"]=a}})),f&&f>0&&f<7){var D=(t.customDays||i).slice(),b=D.splice(0,f);t.customDays=D.concat(b),t.startDay=+f,t.weekendIndices=[D.length-1,D.length]}else t.startDay=0,t.weekendIndices=[6,0];"string"!=typeof u&&delete t.overlayPlaceholder;"string"!=typeof h&&delete t.overlayButton;return t}(t||{startDate:q(new Date),position:"bl"}),u=e;if("string"==typeof u)u="#"===u[0]?document.getElementById(u.slice(1)):document.querySelector(u);else{if("[object ShadowRoot]"===C(u))throw"Using a shadow DOM as your selector is not supported.";try{var h=u.getRootNode();"[object ShadowRoot]"===C(h)&&(n=h,l=h.host)}catch(e){throw console.warn("You have to polyfill the web components spec - http://bit.ly/3axUZHC"),e}}if(!u)throw"No selector / element found.";if(a.some((function(e){return e.el===u})))throw"A datepicker already exists on that element.";var f=u===document.body,v=n?u.parentElement||n:f?document.body:u.parentElement,m=n?u.parentElement||l:v,y=document.createElement("div"),D=document.createElement("div");y.className="qs-datepicker-container qs-hidden",D.className="qs-datepicker";var b={shadowDom:n,customElement:l,positionedEl:m,el:u,parent:v,nonInput:"INPUT"!==u.nodeName,noPosition:f,position:!f&&c.position,startDate:c.startDate,dateSelected:c.dateSelected,disabledDates:c.disabledDates,minDate:c.minDate,maxDate:c.maxDate,noWeekends:!!c.noWeekends,weekendIndices:c.weekendIndices,calendarContainer:y,calendar:D,currentMonth:(c.startDate||c.dateSelected).getMonth(),currentMonthName:(c.months||o)[(c.startDate||c.dateSelected).getMonth()],currentYear:(c.startDate||c.dateSelected).getFullYear(),events:c.events||{},setDate:O,remove:A,setMin:N,setMax:_,show:P,hide:k,onSelect:c.onSelect,onShow:c.onShow,onHide:c.onHide,onMonthChange:c.onMonthChange,formatter:c.formatter,disabler:c.disabler,months:c.months||o,days:c.customDays||i,startDay:c.startDay,overlayMonths:c.overlayMonths||(c.months||o).map((function(e){return e.slice(0,3)})),overlayPlaceholder:c.overlayPlaceholder||"4-digit year",overlayButton:c.overlayButton||"Submit",disableYearOverlay:!!c.disableYearOverlay,disableMobile:!!c.disableMobile,isMobile:"ontouchstart"in window,alwaysShow:!!c.alwaysShow,id:c.id,showAllDates:!!c.showAllDates,respectDisabledReadOnly:!!c.respectDisabledReadOnly,first:c.first,second:c.second};if(c.sibling){var w=c.sibling,M=b,x=w.minDate||M.minDate,j=w.maxDate||M.maxDate;M.sibling=w,w.sibling=M,w.minDate=x,w.maxDate=j,M.minDate=x,M.maxDate=j,w.originalMinDate=x,w.originalMaxDate=j,M.originalMinDate=x,M.originalMaxDate=j,w.getRange=R,M.getRange=R}c.dateSelected&&p(u,b);var E=getComputedStyle(m).position;f||E&&"static"!==E||(b.inlinePosition=!0,m.style.setProperty("position","relative"));b.inlinePosition&&a.forEach((function(e){e.positionedEl===b.positionedEl&&(e.inlinePosition=!0)}));y.appendChild(D),v.appendChild(y),b.alwaysShow&&S(b);return b}(e,t);if(a.length||c(document),n.shadowDom&&(a.some((function(e){return e.shadowDom===n.shadowDom}))||c(n.shadowDom)),a.push(n),n.second){var l=n.sibling;y({instance:n,deselect:!n.dateSelected}),y({instance:l,deselect:!l.dateSelected}),u(l)}return u(n,n.startDate||n.dateSelected),n.alwaysShow&&b(n),n}},function(e,t,n){}])}));
},{}]},{},[1]);
