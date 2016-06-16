function TODOService(){
    this.db = new DBManager();
}

TODOService.prototype.selectAll = function(list_id, listObject){
    var connect = this.db.getConn();
    connect.transaction(function(tx){
        tx.executeSql('SELECT rowid, todo_text, element_id FROM todo_list WHERE element_id=\''+list_id+'\'', [], function (tx, result) {
            var resultIndex = 0;
            while(resultIndex < result.rows.length && result.rows[resultIndex]){
                var todoRow = result.rows[resultIndex++];
                var todoItem = new TODO(todoRow.rowid, todoRow.todo_text, list_id);
                //resultBlock.appendChild(todoItem.createDOM());
                listObject.resultBlock.appendChild(todoItem.createDOM());
            }
        });
    })
};

TODOService.prototype.insert = function(new_text, list_id, callback){
    var connect = this.db.getConn();
    connect.transaction(function (tx) {
        tx.executeSql('INSERT INTO todo_list (element_id, todo_text) VALUES ("'+list_id+'", "' + new_text + '")', [], function (tranzaction, resultSet) {
            var insertId = resultSet.insertId;
            var todoItem = new TODO(insertId, new_text, list_id);
            //resultBlock.appendChild(todoItem.createDOM());
            if(callback) callback(todoItem);
        });
    })
};

TODOService.prototype.updateTable = function(element, callback){
    var connect = this.db.getConn();
    connect.transaction(function(tx){
        tx.executeSql('UPDATE todo_list SET todo_text="'+element.text+'" WHERE rowid='+element.id, [], function(){
            if(callback) callback();
        }, function(arg1, arg2){
            console.log('arg1'+arg1);
            console.log('arg2'+arg2);
            console.log('обновление прошло НЕ удачно');
        });
    });
};

TODOService.prototype.deleteElement = function(element){
    var connect = this.db.getConn();
    connect.transaction(function(tx){
        tx.executeSql('DELETE FROM todo_list WHERE rowid=' +element.id, [], function(){
            //console.log('Удаление прошло удачно');
        }, function(){
            //console.log('Удаление прошло НЕ удачно');
        });
    });
};
