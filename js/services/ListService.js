function ListService(){
    this.db = new DBManager();
}
ListService.prototype.selectList = function(){
    var connect = this.db.getConn();
    if(connect){
        connect.transaction(function(tx){
            tx.executeSql('SELECT ROWID, todo_name FROM todo_list', [], function (tx, result) {
                var resultIndex = 0;
                while(resultIndex < result.rows.length && result.rows[resultIndex]){
                    var listRow = result.rows[resultIndex++];
                    var listItem = new List(listRow.rowid, listRow.todo_name);
                    NoteBlock.appendChild(listItem.createDOM());
                    todoService.selectAll(listItem);
                }
            });
        })
    }else{
        var list_mass = JSON.parse(localStorage.getItem('todo_list'));
        if(list_mass.length > 0){
            for(var i=0; i< list_mass.length; i++){
                var listRow = list_mass[i];
                var listItem = new List(listRow.id, listRow.name);
                NoteBlock.appendChild(listItem.createDOM());
                todoService.selectAll(listItem);
            }
        }
    }
};

ListService.prototype.insert = function(new_text){
    var connect = this.db.getConn();
    if(connect){
        connect.transaction(function (tx) {
            tx.executeSql('INSERT INTO todo_list (todo_name) VALUES ("' + new_text + '")', [], function (tranzaction, resultSet) {
                var insertId = resultSet.insertId;
                var listItem = new List(insertId, new_text);
                NoteBlock.appendChild(listItem.createDOM());
                initializationPlugin();
            });
        })
    }else{
        var list_mass = JSON.parse(localStorage.getItem('todo_list'));
        var next_list = JSON.parse(localStorage.getItem('next_list'))+1;
        localStorage.next_list = next_list;
        var listItem = new List(next_list, new_text);
        NoteBlock.appendChild(listItem.createDOM());
        list_mass[list_mass.length] = listItem.getListObject();
        localStorage.setItem('todo_list', JSON.stringify(list_mass));
        initializationPlugin();
    }
};

ListService.prototype.removeList = function(listItem){
    var connect = this.db.getConn();
    if(connect){
        connect.transaction(function (tx) {
            tx.executeSql('DELETE FROM todo_list WHERE rowid=' +listItem.id, [], function(){
                //console.log('Удаление прошло удачно');
                todoService.removeTodoList(listItem.id);
            }, function(){
                //console.log('Удаление прошло НЕ удачно');
            });
        })
    }else{
        var list_mass = JSON.parse(localStorage.getItem('todo_list'));
        todoService.removeTodoList(listItem.id);
        for(var i=0; i< list_mass.length; i++){
            if(list_mass[i].id == listItem.id){
                list_mass.splice(i, 1);
                break;
            }
        }
        localStorage.todo_list = JSON.stringify(list_mass);

    }
};