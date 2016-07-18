function TODO (id, text, elementId, checked){
    this.id = id;
    this.text = text;
    this.elementId = elementId;
    this.isChecked = checked;
    this.DOMObject = undefined;
    this.DOMTextObject = undefined;
}

TODO.prototype.createDOM = function(){
    var self = this;
    var todoItem = document.createElement('div');
        todoItem.setAttribute('class', 'todoItem');
    var checkBoxBlock = document.createElement('div');
        todoItem.appendChild(self.settingCheckboxBloc(checkBoxBlock));
    self.DOMTextObject = document.createElement('span');
    if(self.isChecked == 1){
        self.DOMTextObject.setAttribute('class', 'checked');
    }
    self.DOMTextObject.innerHTML = self.text;
    todoItem.appendChild(this.DOMTextObject);
    var editBtn = document.createElement('a');
        todoItem.appendChild(self.settingEditBtn(editBtn));
        editBtn.onclick = function(){
            self.showEditBlock(editForm.getElementsByTagName('input')[0], editBtn, removeBtn, editForm.getElementsByTagName('button')[0], checkBoxBlock);
        };
    var removeBtn = document.createElement('a');
        todoItem.appendChild(self.settingDeleteBtn(removeBtn));
        removeBtn.onclick = function(){
            todoService.deleteElement(self);
            self.remove();
            initializationPlugin();
        };

    var editForm = document.createElement('form');
        todoItem.appendChild(self.settingEditForm(editForm));

    editForm.onsubmit = function(event){
        event.preventDefault();
        if(editForm.getElementsByTagName('input')[0].value == ''){
            addError(editForm.getElementsByTagName('button')[0]);
        }else{
            self.hideEditBlock(editForm.getElementsByTagName('input')[0], editForm.getElementsByTagName('button')[0], editBtn, removeBtn, checkBoxBlock);
            self.saveTODO(function(){
                self.DOMTextObject.innerHTML = self.text;
            });
        }
        return false;
    };
    this.DOMObject = todoItem;
    return todoItem;
};

TODO.prototype.remove = function(){
    this.DOMObject.remove();
};

TODO.prototype.saveTODO = function(callback){
    todoService.updateTable(this, callback);
};

TODO.prototype.showEditBlock = function(editInput, editBtn, removeBtn, saveBtn, checkBoxBlock){
    var self = this;
    editInput.value = self.text;
    self.DOMTextObject.style.display = 'none';
    editBtn.style.display = 'none';
    removeBtn.style.display = 'none';
    checkBoxBlock.style.opacity = 0;
    checkBoxBlock.style.display = 'none';
    editInput.style.display = 'inline-block';
    editInput.focus();
    saveBtn.style.display = 'inline-block';
};

TODO.prototype.hideEditBlock = function(editInput, saveBtn, editBtn, removeBtn, checkBoxBlock){
    var self = this;
    editInput.style.display = 'none';
    saveBtn.style.display = 'none';
    self.DOMTextObject.style.display = 'inline';
    editBtn.style.display = 'inline-block';
    removeBtn.style.display = 'inline-block';
    checkBoxBlock.style.opacity = 1;
    checkBoxBlock.style.display = 'inline-block';
    self.text = editInput.value;
};

TODO.prototype.settingCheckboxBloc = function(checkBoxBlock){
    var self = this;
    checkBoxBlock.setAttribute('class', 'checkBoxBlock');

    var checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('id', 'todo'+self.id);
    if(self.isChecked == 1){
        checkBox.checked = true;
    }
    checkBoxBlock.appendChild(checkBox);

    checkBox.onchange = function(){
        var checkBoxSelf = this;
        if(checkBoxSelf.checked){
            checkBoxSelf.parentElement.nextElementSibling.setAttribute('class', 'checked');
            self.isChecked = 1; // true
        }else{
            checkBoxSelf.parentElement.nextElementSibling.setAttribute('class', '');
            self.isChecked = 0; //false
        }
        todoService.updateChecked(self);
    };

    var labelItem = document.createElement('label');
    labelItem.setAttribute('for', 'todo'+self.id);
    checkBoxBlock.appendChild(labelItem);

    return checkBoxBlock;
};

TODO.prototype.settingEditBtn = function(editBtn){
    editBtn.setAttribute('class', 'updateBtn');
    //editBtn.innerHTML = 'Update';
    return editBtn;
};

TODO.prototype.settingDeleteBtn = function(removeBtn){
    removeBtn.setAttribute('class', 'deleteBtn');
    //removeBtn.innerHTML = 'Delete';
    return removeBtn;
};

TODO.prototype.settingInputEdit = function(editInput){
    editInput.style.display = 'none';
    editInput.setAttribute('type', 'text');
    return editInput;
};

TODO.prototype.settingSaveBtn = function(saveBtn){
    saveBtn.style.display = 'none';
    saveBtn.setAttribute('type', 'button');
    saveBtn.value = 'Save';
    return saveBtn;
};

TODO. prototype.settingEditForm = function(editForm){
    var self = this;
    editForm.setAttribute('class', 'editTodo');
    var editInput = document.createElement('input');
    editInput.style.display = 'none';
    editInput.setAttribute('type', 'text');
    editForm.appendChild(editInput);

    var saveBtn = document.createElement('button');
    saveBtn.style.display = 'none';
    saveBtn.setAttribute('type', 'submit');
    editForm.appendChild(saveBtn);

    editInput.oninput = function(){
        removeClass(editInput, 'error');
    };

    return editForm;
};

TODO.prototype.getTodoObject = function(){
    var self = this;
    return {
        id: self.id,
        text: self.text,
        elementId: self.elementId,
        isChecked: self.isChecked
    };
};