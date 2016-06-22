function TODOService(){
    this.db = new DBManager();
}

TODOService.prototype.selectAll = function(listObject){
    var connect = this.db.getConn();
    if(connect){
        connect.transaction(function(tx){
            tx.executeSql('SELECT rowid, todo_text, element_id FROM todo_list WHERE element_id=\''+listObject.id+'\'', [], function (tx, result) {
                var resultIndex = 0;
                while(resultIndex < result.rows.length && result.rows[resultIndex]){
                    var todoRow = result.rows[resultIndex++];
                    var todoItem = new TODO(todoRow.rowid, todoRow.todo_text, listObject.id);
                    //resultBlock.appendChild(todoItem.createDOM());
                    listObject.resultBlock.appendChild(todoItem.createDOM());
                }
            });
        })
    }else{
        var todo_mass = JSON.parse(localStorage.getItem('todo_element'));
        if(todo_mass.length > 0){
            for(var i=0; i< todo_mass.length; i++){
                var todoRow = todo_mass[i];
                if(todoRow.elementId == listObject.id){
                    var todoItem = new TODO(todoRow.id, todoRow.text, todoRow.elementId);
                    //resultBlock.appendChild(todoItem.createDOM());
                    listObject.resultBlock.appendChild(todoItem.createDOM());
                }
            }
        }
    }

};

TODOService.prototype.insert = function(new_text, list_id, callback){
    var connect = this.db.getConn();
    if(connect){
        connect.transaction(function (tx) {
            tx.executeSql('INSERT INTO todo_list (element_id, todo_text) VALUES ("'+list_id+'", "' + new_text + '")', [], function (tranzaction, resultSet) {
                var insertId = resultSet.insertId;
                var todoItem = new TODO(insertId, new_text, list_id);
                //resultBlock.appendChild(todoItem.createDOM());
                if(callback) callback(todoItem);
            });
        })
    }else{
        var next_todo = JSON.parse(localStorage.getItem('next_todo'))+1;
        localStorage.next_todo = next_todo;
        var todoItem = new TODO(next_todo, new_text, list_id);
        var todo_mass = JSON.parse(localStorage.getItem('todo_element'));
        todo_mass[todo_mass.length] = todoItem.getTodoObject();
        localStorage.setItem('todo_element', JSON.stringify(todo_mass));
        if(callback) callback(todoItem);
    }
};

TODOService.prototype.updateTable = function(element, callback){
    var connect = this.db.getConn();
    if(connect){
        connect.transaction(function(tx){
            tx.executeSql('UPDATE todo_list SET todo_text="'+element.text+'" WHERE rowid='+element.id, [], function(){
                if(callback) callback();
            }, function(arg1, arg2){
                console.log('arg1'+arg1);
                console.log('arg2'+arg2);
                console.log('обновление прошло НЕ удачно');
            });
        });
    }else{
        var todo_mass = JSON.parse(localStorage.getItem('todo_element'));
        for(var i=0; i< todo_mass.length; i++){
            if(todo_mass[i].id == element.id){
                todo_mass[i].text = element.text;
                break;
            }
        }
        localStorage.todo_element = JSON.stringify(todo_mass);
        if(callback) callback();
    }
};

TODOService.prototype.deleteElement = function(element){
    var connect = this.db.getConn();
    if(connect){
        connect.transaction(function(tx){
            tx.executeSql('DELETE FROM todo_list WHERE rowid=' +element.id, [], function(){
                //console.log('Удаление прошло удачно');
            }, function(){
                //console.log('Удаление прошло НЕ удачно');
            });
        });
    }else{
        //TODO delete
        var todo_mass = JSON.parse(localStorage.getItem('todo_element'));
        for(var i=0; i< todo_mass.length; i++){
            if(todo_mass[i].id == element.id){
                todo_mass.splice(i, 1);
                break;
            }
        }
        localStorage.todo_element = JSON.stringify(todo_mass);
    }
};
