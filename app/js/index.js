class Todolist {
    constructor() {
        this.input = document.querySelector('.title_inp');
        this.inputDescr = document.querySelector('.description_inp');

        this.inputDate = document.querySelector('#date');

        this.btnAdd = document.querySelector('.add');

        this.sectRemTabs = document.querySelector('.section_remove__tabs');
        this.btnNotComplete = document.querySelector('#uncomplete');
        this.btnComplete = document.querySelector('#complete');
        this.btnExpired = document.querySelector('#expired');

        this.sectionUndone = document.querySelector('.section_undone');
        this.sectionDone = document.querySelector('.section_done');
        this.sectionExpired = document.querySelector('.section_expired');

        this.btnAdd.onclick = () => this.addTask();
        this.btnNotComplete.onclick = () => this.changeTabNotComplete();
        this.btnComplete.onclick = () => this.changeTabComplete();
        this.btnExpired.onclick = () => this.changeTabExpired();

        this.chekDate = document.querySelector('.chek_date');
    }

    createNewItem() {
        let newTask = document.createElement('div');
        newTask.className = "new__task";

        let check = document.createElement("button");
        check.className = "checked";
        check.innerHTML = '<i class="fas fa-check-double"></i>';
        check.onclick = () => this.checkedTask(newTask);

        let uncheck = document.createElement('button');
        uncheck.className = "unchecked";
        uncheck.innerHTML = '<i class="fas fa-times"></i>';
        uncheck.setAttribute('hidden', 'hidden');
        uncheck.onclick = () => this.checkedTask(newTask);

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

        let newTaskTitle = document.createElement('h2');
        newTaskTitle.className = "title_task";
        newTaskTitle.innerHTML = (this.input.value);

        let newDate = document.createElement('input')
        newDate.className = 'newDate';
        newDate.type = 'date';
        newDate.value = (this.inputDate).value;

        let taskTitleChecked = document.createElement('div');
        taskTitleChecked.className = "task_title_cheked";
        taskTitleChecked.appendChild(newTaskTitle);
        taskTitleChecked.appendChild(newDate);
        taskTitleChecked.appendChild(btnsRemCheckEdit);

        let p = document.createElement('p');
        p.className = "description_p";
        p.innerHTML = this.inputDescr.value;

        let taskDescription = document.createElement('div');
        taskDescription.className = "task_description";
        taskDescription.appendChild(p);

        newTask.appendChild(taskTitleChecked);
        newTask.appendChild(taskDescription);

        this.sectionUndone.appendChild(newTask);
    }

    createTabExpired() {
        let expiredTab = document.createElement('div');
        expiredTab.classList.add('section_expired');
    }
///////////////////////////////////////////////////////////////////////////////////////////////////
    saveLocStor(newTask) {
        let currTask = document.querySelectorAll('.new__task');
        // let jsonCurTitl = JSON.stringify(curTitle.value);
        // localStorage.setItem('items', jsonCurTitl);
        console.log(currTask);
        let itemsArray = [];

        localStorage.setItem('items', JSON.stringify(itemsArray));
        const data = JSON.parse(localStorage.getItem('items'));
        itemsArray.push(currTask.value);
        localStorage.setItem('items', JSON.stringify(itemsArray));

        // localStorage.getItem('title', currTitle);
        // console.log(localStorage.getItem('title', currTitle))
    }
///////////////////////////////////////////////////////////////////////////////////////////
    addTask() {
        this.sectionUndone.classList.add('active');
        this.sectionDone.classList.remove('active');
        if (this.input.value && this.inputDescr.value) {
            this.createNewItem();
            this.input.value = '';
            this.inputDescr.value = '';
        }
        this.saveLocStor();

    }

    removeTask(newTask) {
        let thisTask = newTask.parentNode;
        thisTask.removeChild(newTask);
    }

    editTask(newTask) {
        let classChange = newTask.classList.contains('change');
        let titleTask = newTask.querySelector('.title_task');
        let descripTask = newTask.querySelector('.description_p');
        let btnEdit = newTask.querySelector('.edit');
        let btnSave = newTask.querySelector('.save');

        if (classChange) {
            titleTask.setAttribute('contenteditable', 'false');
            titleTask.classList.remove('check1');
            descripTask.setAttribute('contenteditable', 'false');
            descripTask.classList.remove('check1');
            btnEdit.removeAttribute('hidden', '');
            btnSave.setAttribute('hidden', '');
        } else {
            titleTask.setAttribute('contenteditable', '');
            titleTask.classList.add('check1');
            descripTask.setAttribute('contenteditable', '');
            descripTask.classList.add('check1');
            btnEdit.setAttribute('hidden', '');
            btnSave.removeAttribute('hidden', '');
        }

        newTask.classList.toggle('change');

    }
//////////////////////////////////////////////////////////////////////
    checkDate(newTask) {
        let currD = new Date();
        let createDateVal = new Date(this.newDate.value)
        console.log(currD);
        console.log(createDateVal);
        if (createDateVal > currD) {
            // this.sectionDone.removeChild(newTask);
            this.sectionUndone.removeChild(newTask);
            this.sectionExpired.appendChild(newTask);
            console.log('bolwe');
        }
        else {
            console.log('menwe')
        }
    }
////////////////////////////////////////////////////////////////////////
    checkedTask(newTask) {
        let checkTask = newTask.classList.contains('checked_task');
        let checkBtn = newTask.querySelector('.checked');
        let uncheckBtn = newTask.querySelector('.unchecked');

        if (!checkTask) {
            checkBtn.setAttribute('hidden', 'hidden');
            uncheckBtn.removeAttribute('hidden', 'hidden');
            newTask.parentNode.removeChild(newTask);
            this.sectionDone.appendChild(newTask);
        } else {
            checkBtn.removeAttribute('hidden', 'hidden');
            uncheckBtn.setAttribute('hidden', 'hidden');
            this.sectionDone.removeChild(newTask);
            this.sectionUndone.appendChild(newTask);

        }
        newTask.classList.toggle('checked_task');
        this.checkDate();///////////////////////////////////////////////////////////////////////////
    }

    changeTabNotComplete() {
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
}

let todolist = new Todolist();