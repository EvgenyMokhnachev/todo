function TODOService(){
    this.db = new DBManager();
}

TODOService.prototype.selectAll = function(listObject){
    var connect = this.db.getConn();
    if(connect){
        connect.transaction(function(tx){
            tx.executeSql('SELECT rowid, todo_text, list_id, todo_checked FROM todo_element WHERE list_id=\''+listObject.id+'\'', [], function (tx, result) {
                var resultIndex = 0;
                while(resultIndex < result.rows.length && result.rows[resultIndex]){
                    var todoRow = result.rows[resultIndex++];
                    var todoItem = new TODO(todoRow.rowid, todoRow.todo_text, listObject.id, todoRow.todo_checked);
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
                    var todoItem = new TODO(todoRow.id, todoRow.text, todoRow.elementId, todoRow.isChecked);
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
            tx.executeSql('INSERT INTO todo_element (list_id, todo_text, todo_checked) VALUES ("'+list_id+'", "' + new_text + '", "0")', [], function (tranzaction, resultSet) {
                var insertId = resultSet.insertId;
                var todoItem = new TODO(insertId, new_text, list_id , 0);
                if(callback) callback(todoItem);
            },function(){alert('error')});
        })
    }else{
        var next_todo = JSON.parse(localStorage.getItem('next_todo'))+1;
        localStorage.next_todo = next_todo;
        var todoItem = new TODO(next_todo, new_text, list_id, 0);
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
            tx.executeSql('UPDATE todo_element SET todo_text="'+element.text+'" WHERE rowid=\''+element.id+'\'', [], function(){
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

TODOService.prototype.updateChecked = function(element){
    var connect = this.db.getConn();
    if(connect){
        connect.transaction(function(tx){
            tx.executeSql('UPDATE todo_element SET todo_checked="'+element.isChecked+'" WHERE rowid=\''+element.id+'\'', [], function(){}, function(arg1, arg2){});
        });
    }else{
        var todo_mass = JSON.parse(localStorage.getItem('todo_element'));
        for(var i=0; i< todo_mass.length; i++){
            if(todo_mass[i].id == element.id){
                todo_mass[i].isChecked = element.isChecked;
                break;
            }
        }
        localStorage.todo_element = JSON.stringify(todo_mass);
    }
};

TODOService.prototype.deleteElement = function(element){
    var connect = this.db.getConn();
    if(connect){
        connect.transaction(function(tx){
            tx.executeSql('DELETE FROM todo_element WHERE rowid=\''+element.id+'\'', [], function(){
                //console.log('Удаление прошло удачно');
            }, function(){
                //console.log('Удаление прошло НЕ удачно');
            });
        });
    }else{
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

TODOService.prototype.removeTodoList = function(list_id){
    var connect = this.db.getConn();
    if(connect){
        connect.transaction(function(tx){
            tx.executeSql('SELECT rowid FROM todo_element WHERE list_id=\''+list_id+'\'', [], function (tx, result) {
                var resultIndex = 0;
                while(resultIndex < result.rows.length && result.rows[resultIndex]){
                    var todoRow = result.rows[resultIndex++];
                    tx.executeSql('DELETE FROM todo_element WHERE rowid=\''+todoRow.rowid+'\'', [], function(){
                        //console.log('Удаление прошло удачно');
                    }, function(){
                        //console.log('Удаление прошло НЕ удачно');
                    });
                }
            });
        })
    }else{
        var todo_mass = JSON.parse(localStorage.getItem('todo_element'));
        for(var i=0; i< todo_mass.length; i++){
            if(todo_mass[i].elementId == list_id){
                todo_mass.splice(i, 1);
                i--;
            }
        }
        localStorage.todo_element = JSON.stringify(todo_mass);
    }
};