function List(id, name, category){
    this.id = id;
    this.name = name;
    this.category_id = category;
    this.DOMObject = undefined;
    this.resultBlock = undefined;
}

List.prototype.createDOM = function(){
    var self = this;

    var listItem = document.createElement('div');
    listItem.setAttribute('class', 'listBlock');
    listItem.setAttribute('data-id', self.id);

    var nameBlock = document.createElement('h2');
    listItem.appendChild(self.settingsNameBlock(nameBlock));
    var formBlock = document.createElement('form');
    formBlock.setAttribute('class', 'createTodo');
    listItem.appendChild(formBlock);

    var inputBlock = document.createElement('input');
    inputBlock.setAttribute('type', 'text');
    inputBlock.oninput = function(){
        removeClass(inputBlock, 'error');
    };
    formBlock.appendChild(inputBlock);

    var createBtn = document.createElement('button');
    createBtn.setAttribute('type', 'submit');
    //createBtn.innerHTML = 'Add Todo';
    formBlock.appendChild(createBtn);

    self.resultBlock = document.createElement('div');
    self.resultBlock.setAttribute('class', 'result');
    listItem.appendChild(self.resultBlock);
    formBlock.onsubmit = function(event){
        event.preventDefault();
        if (inputBlock.value == "") {
            addError(inputBlock);
        } else {
            var todoText = inputBlock.value;
            todoService.insert(todoText, self.id, function(todoItem){
                self.resultBlock.appendChild(todoItem.createDOM());
                initializationPlugin();
            });
            inputBlock.value = "";
        }
        return false;
    };
    //createBtn.onclick = function(){
    //    if (inputBlock.value == "") {
    //        addError(inputBlock);
    //    } else {
    //        var todoText = inputBlock.value;
    //        todoService.insert(todoText, self.id, function(todoItem){
    //            self.resultBlock.appendChild(todoItem.createDOM());
    //            initializationPlugin();
    //        });
    //        inputBlock.value = "";
    //    }
    //};

    this.DOMObject = listItem;
    return listItem;
};

List.prototype.settingsNameBlock = function(nameBlock){
    var self = this;
    nameBlock.innerHTML = self.name;
    var settingBtn = document.createElement('a');
    settingBtn.setAttribute('class', 'settingBtn');
    nameBlock.appendChild(settingBtn);
    var deleteBtn = document.createElement('a');
    deleteBtn.setAttribute('class', 'deleteBtn');
    nameBlock.appendChild(deleteBtn);
    deleteBtn.onclick = function(){
        listService.removeList(self);
        self.DOMObject.remove();
        initializationPlugin();
    };
    settingBtn.onclick = function(){
        self.editPopUp();
    };
    return nameBlock;
};

List.prototype.getListObject = function(){
    var self = this;
    return {
        id: self.id,
        name: self.name,
        category_id: self.category_id
    };
};

List.prototype.editPopUp = function(){
    var self = this;
    var fonPopUp = document.createElement('div');
    fonPopUp.setAttribute('class', 'fonPopUp');
    fonPopUp.setAttribute('id', 'settingList');
    fonPopUp.style.display = 'block';
    var popUp = document.createElement('div');
    popUp.setAttribute('class', 'popUp');
    fonPopUp.appendChild(popUp);
    var form = document.createElement('form');
    popUp.appendChild(form);
    var h3 = document.createElement('h3');
    h3.innerHTML = 'Edit list todo';
    form.appendChild(h3);
    var closeBtn = document.createElement('button');
    closeBtn.setAttribute('class','closeBtn');
    closeBtn.setAttribute('type', 'button');
    form.appendChild(closeBtn);
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'editListInput');
    input.value = self.name;
    form.appendChild(input);
    var pCategory = document.createElement('p');
    pCategory.innerHTML = 'Category';
    form.appendChild(pCategory);
    var selectBlock = document.createElement('div');
    var selected = new SelectObject('selectEditCategory');

    form.appendChild(selectBlock);
    var editBtn = document.createElement('button');
    editBtn.setAttribute('type','submit');
    editBtn.setAttribute('id', 'editListBtn');
    editBtn.innerHTML = 'Update';
    form.appendChild(editBtn);

    closeBtn.onclick = function(){
        document.getElementsByTagName('body')[0].removeChild(fonPopUp);
    };

    form.onsubmit = function(event){
        event.preventDefault();
        self.name = input.value;
        self.category_id = document.getElementById(selected.optionId).previousSibling.getElementsByTagName('span')[0].getAttribute('data-id');
        listService.updateList(self);
        return false;
    };
    input.focus();
    document.getElementsByTagName('body')[0].appendChild(fonPopUp);
    selectBlock.appendChild(selected.createView());
    categoryService.inputSelect(selected.optionId);
    categoryService.selectedForId(selected.optionId, self.category_id);
};

