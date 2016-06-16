function ListService(){
    this.db = new DBManager();
}
ListService.prototype.selectList = function(){
    var connect = this.db.getConn();
    connect.transaction(function(tx){
        tx.executeSql('SELECT ROWID, todo_name FROM todo_element', [], function (tx, result) {
            var resultIndex = 0;
            while(resultIndex < result.rows.length && result.rows[resultIndex]){
                var todoRow = result.rows[resultIndex++];
                var listItem = new List(todoRow.rowid, todoRow.todo_name);
                NoteBlock.appendChild(listItem.createDOM());
                todoService.selectAll(todoRow.rowid, listItem);
            }
        });
    })
};

ListService.prototype.insert = function(new_text){
    var connect = this.db.getConn();
    connect.transaction(function (tx) {
        tx.executeSql('INSERT INTO todo_element (todo_name) VALUES ("' + new_text + '")', [], function (tranzaction, resultSet) {
            var insertId = resultSet.insertId;
            var listItem = new List(insertId, new_text);
            NoteBlock.appendChild(listItem.createDOM());
            initializationPlugin();
        });
    })
};