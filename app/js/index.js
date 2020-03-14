class Todolist {
    constructor() {
        this.input = document.querySelector('.title_inp');
        this.inputDescr = document.querySelector('.description_inp');

        this.inputDate = document.querySelector('#date');


        this.btnAdd = document.querySelector('.add');

        this.sectRemTabs = document.querySelector('.section_remove__tabs');
        this.btnNotComplete = document.querySelector('#uncomplete');
        this.btnComplete = document.querySelector('#complete');

        this.sectionUndone = document.querySelector('.section_undone');
        this.sectionDone = document.querySelector('.section_done');

        this.btnAdd.onclick = () => this.addTask();
        this.btnNotComplete.onclick = () => this.changeTabNotComplete();
        this.btnComplete.onclick = () => this.changeTabComplete();

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

    addTask() {
        this.sectionUndone.classList.add('active');
        this.sectionDone.classList.remove('active');
        if (this.input.value && this.inputDescr.value) {
            this.createNewItem();
            this.input.value = '';
            this.inputDescr.value = '';
        }
        this.checkDate();

    }

    removeTask(newTask) {
        let thisTask = newTask.parentNode;
        thisTask.removeChild(newTask);
    }

    editTask(newTask) {
        console.log('edit');
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
    }

    checkDate(newTask) {
        let currentD = new Date();
        console.log(currentD);
        // let inputDateClone = newTask.querySelector('#create_inp_date');
        // if (currentD < inputDateClone) {
        //     console.log('askjfoanfas')
        // }
        // console.log(inputDateClone);
    }

    changeTabNotComplete() {
        if (this.btnNotComplete.onclick) {
            console.log('sectionUNdone');
            this.sectionDone.classList.remove('active');
            this.sectionUndone.classList.add('active');
        }
    }

    changeTabComplete() {
        if (this.btnComplete.onclick) {
            console.log('sectionDone');
            this.sectionUndone.classList.remove('active');
            this.sectionDone.classList.add('active');

        }
    }
}

let todolist = new Todolist();