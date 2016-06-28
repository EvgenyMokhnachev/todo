function CategoryService(){
    this.db = new DBManager();
}

CategoryService.prototype.insertCategory = function(name, color, image){
    var connect = this.db.getConn();
    if(connect){
        connect.transaction(function (tx) {
            tx.executeSql('INSERT INTO category (cat_name, cat_color, cat_image) VALUES ("'+name+'", "' + color + '", "'+image+'")', [], function (tranzaction, resultSet) {
                var insertId = resultSet.insertId;
                var categoryItem = new Category(insertId, name, color , image);
                categoryBlock.appendChild(categoryItem.createDOM());
                //if(callback) callback(todoItem);
            },function(){alert('error')});
        })
    }else{
        //TODO localstorage insert category
    }
};