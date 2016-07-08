function List(id, name){
    this.id = id;
    this.name = name;

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
        createBtn.click();
        return false;
    };
    createBtn.onclick = function(){
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
    };

    this.DOMObject = listItem;
    return listItem;
};

List.prototype.settingsNameBlock = function(nameBlock){
    var self = this;
    nameBlock.innerHTML = self.name;
    var deleteBtn = document.createElement('a');
    deleteBtn.setAttribute('class', 'deleteBtn');
    nameBlock.appendChild(deleteBtn);
    deleteBtn.onclick = function(){
        listService.removeList(self);
        self.DOMObject.remove();
        initializationPlugin();
    };
    return nameBlock;
};

List.prototype.getListObject = function(){
    var self = this;
    return {
        id: self.id,
        name: self.name
    };
};

