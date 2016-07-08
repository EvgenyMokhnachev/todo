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
        if (!window.openDatabase) {
            this.conn = openDatabase(this.name, '1.0', 'Test DB', 2 * 1024 * 1024);
        }else{
            this.conn = false;
        }
        return this.conn;
    };

    DBManager.prototype.init = function(){
        var connect = this.getConn();
        if(connect){
            connect.transaction(function(tx){
                tx.executeSql('CREATE TABLE IF NOT EXISTS todo_list (element_id, todo_text, todo_checked, category_id)');
                tx.executeSql('CREATE TABLE IF NOT EXISTS todo_element (todo_name)');
                tx.executeSql('CREATE TABLE IF NOT EXISTS category (cat_name, cat_color, cat_image)');
            });
        }else{
            if(localStorage.length == 0){
                localStorage.setItem('todo_list', JSON.stringify([]));
                localStorage.setItem('todo_element', JSON.stringify([]));
                localStorage.setItem('todo_category', JSON.stringify([]));

                localStorage.setItem('next_list', JSON.stringify(0));
                localStorage.setItem('next_element', JSON.stringify(0));
                localStorage.setItem('next_category', JSON.stringify(0));
            }
        }
    };

    return DBManager;

})();
