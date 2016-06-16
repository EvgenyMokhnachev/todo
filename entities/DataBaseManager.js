var DBManager = (function(){

    var instance = undefined;

    function DBManager (){
        if(instance) return instance;
        else instance = this;

        this.name = AppCong.database.name;
        this.conn = undefined;
        this.init();
    }

    DBManager.prototype.getConn = function(){
        if(this.conn) return this.conn;
        this.conn = openDatabase(this.name, '1.0', 'Test DB', 2 * 1024 * 1024);
        return this.conn;
    };

    DBManager.prototype.init = function(){
        var connect = this.getConn();
        connect.transaction(function(tx){
            tx.executeSql('CREATE TABLE IF NOT EXISTS todo_list (element_id, todo_text)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS todo_element (todo_name)');
        });
    };

    return DBManager;

})();
