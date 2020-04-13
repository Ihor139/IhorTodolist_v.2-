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
            count = 0
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
        }

        // if(this.input.value == '' && this.inputDescr.value == '' && this.inputDate.value == ''){
        //     console.log('empty')
        //     this.input.classList.add('empty');
        //     this.inputDescr.classList.add('empty');
        //     this.inputDate.classList.add('empty');
        // }
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
        let thisTask = newTask.parentNode;
        thisTask.removeChild(newTask);

        // let target = event.target;
        // let parent1 = target.parentElement;
        // let parent2 = parent1.parentElement
        // let parent3 = parent2.parentNode;
        // let parent4 = parent3.parentNode;

        // let currentList = JSON.parse(localStorage.getItem('todolist'))
        // currentList.forEach(objTodo => {
        //     if (objTodo.id === parent4.dataset.id) {
                
        //     }
        // })
        // localStorage.setItem('todolist', JSON.stringify(currentList));

    }

    editTask(newTask) {
        let classChange = newTask.classList.contains('change');
        let titleTask = newTask.querySelector('.title_task');
        let descripTask = newTask.querySelector('.description_p');
        let dateTask = newTask.querySelector('.newDate');
        let btnEdit = newTask.querySelector('.edit');
        let btnSave = newTask.querySelector('.save');

        if (classChange) {
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
            // setTimeout( () => {
            this.sectionRemove.classList.add('unvisibility');
            this.sectionAdd.classList.add('visibility');
            this.btnMenuPlus.classList.add('visibility');
            this.btnMenuBars.classList.add('unvisibility');
            // }, 400)

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
