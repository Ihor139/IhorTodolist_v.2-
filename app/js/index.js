document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("todolist") === null) {
        console.log('LocalStorage is empty');
    } else {
        todolist.createFromLocalNewItem();

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

        this.btnAdd.onclick = () => this.addTask();
        this.btnNotComplete.onclick = () => this.changeTabNotCompleteClick();
        this.btnComplete.onclick = () => this.changeTabComplete();
        this.btnExpired.onclick = () => this.changeTabExpired();
        this.btnMenuPlus.onclick = () => this.menu();
        this.btnMenuBars.onclick = () => this.menu();

        this.chekDate = document.querySelector('.chek_date');

        this.changeTabNotComplete();
        this.menu();

    }

    createNewItem() {
        let newTask = document.createElement('div');
        newTask.className = "new__task";
        newTask.dataset.status = '0';

        let check = document.createElement("button");
        check.className = "checked";
        check.innerHTML = '<i class="fas fa-check-double"></i>';
        check.onclick = () => this.checkTask(newTask);

        let uncheck = document.createElement('button');
        uncheck.className = "unchecked";
        uncheck.innerHTML = '<i class="fas fa-times"></i>';
        uncheck.setAttribute('hidden', 'hidden');
        uncheck.onclick = () => this.checkTask(newTask);

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
        newDate.type = 'date';
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
    }


    createFromLocalNewItem() {

        let data = JSON.parse(localStorage.getItem('todolist'));

        data.forEach(objTodo => {

            let newTask = document.createElement('div');
            newTask.className = "new__task";
            newTask.dataset.status = objTodo.status;



            let check = document.createElement("button");
            check.className = "checked";
            check.innerHTML = '<i class="fas fa-check-double"></i>';
            check.onclick = () => (this.checkTask(newTask));

            let uncheck = document.createElement('button');
            uncheck.className = "unchecked";
            uncheck.innerHTML = '<i class="fas fa-times"></i>';
            uncheck.setAttribute('hidden', 'hidden');
            uncheck.onclick = () => (this.checkTask(newTask));

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
            newDate.type = 'date';
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

            switch (objTodo.status) {
                case ("0"):
                    this.sectionUndone.appendChild(newTask);
                    console.log('0')
                    break;
                case ("1"):
                    this.sectionDone.appendChild(newTask);
                    console.log('1');
                    break;
                case ('2'):
                    console.log('2');
                    this.sectionExpired.appendChild(newTask);
                    break;
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
        let status = newTask.getAttribute('data-status', '');

        let objTodo = { valueTitle, valueDescript, valueDate, status };

        let todoArray = localStorage.getItem('todolist') === null ? [] : JSON.parse(localStorage.getItem('todolist'));
        todoArray.push(objTodo);
        localStorage["todolist"] = JSON.stringify(todoArray);
    }

    // checkTaskFromLocal(newTask) {

    //     let objTodo = localStorage.getItem('todolist', 'status');
    //     console.log(objTodo);


    // if (this.objTodo.status === '0') {
    //     console.log('0');
    //     this.sectionUndone.appendChild(newTask);

    // } else if (this.objTodo.status === '1') {
    //     console.log('1');
    //     this.sectionUndone.removeChild(newTask);
    //     this.sectionDone.appendChild(newTask);
    //     this.sectionExpired.removeChild(newTask);
    // } else if (this.objTodo.status === '2') {
    //     console.log('2');
    //     this.sectionUndone.removeChild(newTask);
    //     this.sectionDone.removeChild(newTask);
    //     this.sectionExpired.appendChild(newTask);
    // }

    // }

    addTask() {

        this.changeTabNotComplete();

        if (this.input.value && this.inputDescr.value && this.inputDate.value) {
            this.createNewItem();
            this.input.value = '';
            this.inputDescr.value = '';
            this.inputDate.value = '';
            this.input.classList.remove('empty');
            this.inputDescr.classList.remove('empty')
            this.inputDate.classList.remove('empty')
        } else {
            this.input.classList.add('empty');
            this.inputDescr.classList.add('empty')
            this.inputDate.classList.add('empty')
        }

    }

    removeTask(newTask) {
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
            newTask.dataset.status = '2';
            this.sectionExpired.appendChild(newTask);
            delChecktBtn.remove();
            delUnchecktBtn.remove();
            delEditktBtn.remove();
            delSaveBtn.remove();
        }
    }

    checkTask(newTask) {
        let checkTask = newTask.classList.contains('checked_task');
        let checkBtn = newTask.querySelector('.checked');
        let uncheckBtn = newTask.querySelector('.unchecked');

        if (!checkTask) {
            newTask.dataset.status = '1';
            checkBtn.setAttribute('hidden', 'hidden');
            uncheckBtn.removeAttribute('hidden', 'hidden');
            newTask.parentNode.removeChild(newTask);
            this.sectionDone.appendChild(newTask);
        } else {
            newTask.dataset.status = '0';
            checkBtn.removeAttribute('hidden', 'hidden');
            uncheckBtn.setAttribute('hidden', 'hidden');
            this.sectionDone.removeChild(newTask);
            this.sectionUndone.appendChild(newTask);
            // localStorage.removeItem
        }
        this.checkDate(newTask);

        this.rewritingLocalStorage(newTask);

    }

    rewritingLocalStorage(newTask) {

        let titVal = newTask.querySelector('.title_task');
        let descVal = newTask.querySelector('.description_p');
        let dateVal = newTask.querySelector('.newDate');

        let valueTitle = titVal.value;
        let valueDescript = descVal.value;
        let valueDate = dateVal.value;
        let status = newTask.getAttribute('data-status', '');

        let objTodo = { valueTitle, valueDescript, valueDate, status };

        let todoArray = localStorage.getItem('todolist') === null ? [] : JSON.parse(localStorage.getItem('todolist'));
        todoArray.push(objTodo);
        localStorage["todolist"] = JSON.stringify(todoArray);
        
        if(localStorage.hasOwnProperty('todolist')){
        console.log(JSON.parse(localStorage.getItem('todolist')))}
        console.log(localStorage.key(0));
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

class Calendar {
    constructor() {
        this.days = [
            "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
        ];
        this.month = [
            "Январь", "Ферваль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ];

    }

}
let calendar = new Calendar();