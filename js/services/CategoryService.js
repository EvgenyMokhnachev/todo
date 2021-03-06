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
        var category_mass = JSON.parse(localStorage.getItem('todo_category'));
        var next_category = JSON.parse(localStorage.getItem('next_category'))+1;
        localStorage.next_category = next_category;
        var categoryItem = new Category(next_category, name, color , image);
        categoryBlock.appendChild(categoryItem.createDOM());
        category_mass[category_mass.length] = categoryItem.getCategoryObject();
        localStorage.setItem('todo_category', JSON.stringify(category_mass));
    }
};

CategoryService.prototype.selectAll = function(){
    var connect = this.db.getConn();
    if(connect){
        connect.transaction(function (tx) {
            tx.executeSql('SELECT rowid, cat_name, cat_color, cat_image FROM category', [], function (tranzaction, result) {
                var resultIndex = 0;
                while(resultIndex < result.rows.length && result.rows[resultIndex]){
                    var categoryRow = result.rows[resultIndex++];
                    var categoryItem = new Category(categoryRow.rowid, categoryRow.cat_name, categoryRow.cat_color, categoryRow.cat_image);
                    categoryBlock.appendChild(categoryItem.createDOM());
                }
            },function(){alert('error')});
        })
    }else{
        var category_mass = JSON.parse(localStorage.getItem('todo_category'));
        if(category_mass.length > 0){
            for(var i=0; i< category_mass.length; i++){
                var categoryRow = category_mass[i];
                var categoryItem = new Category(categoryRow.id, categoryRow.name, categoryRow.color, categoryRow.image);
                categoryBlock.appendChild(categoryItem.createDOM());
            }
        }
    }
};

CategoryService.prototype.inputSelect = function(id){
    var connect = this.db.getConn();
    var selectCategory = document.getElementById(id);
    if(connect){
        connect.transaction(function (tx) {
            tx.executeSql('SELECT rowid, cat_name, cat_color, cat_image FROM category', [], function (tranzaction, result) {
                var resultIndex = 0;
                while(resultIndex < result.rows.length && result.rows[resultIndex]){
                    var categoryRow = result.rows[resultIndex++];
                    var categoryItem = new Category(categoryRow.rowid, categoryRow.cat_name, categoryRow.cat_color, categoryRow.cat_image);
                    selectCategory.appendChild(categoryItem.createSelectDOM());
                }
            },function(){alert('error')});
        })
    }else{
        var category_mass = JSON.parse(localStorage.getItem('todo_category'));
        if(category_mass.length > 0){
            for(var i=0; i< category_mass.length; i++){
                var categoryRow = category_mass[i];
                var categoryItem = new Category(categoryRow.id, categoryRow.name, categoryRow.color, categoryRow.image);
                selectCategory.appendChild(categoryItem.createSelectDOM());
            }
        }
    }
};

CategoryService.prototype.selectedForId = function(idSelect, idCategory){
    var connect = this.db.getConn();
    var selectCategory = document.getElementById(idSelect);
    var spanResult = selectCategory.parentNode.getElementsByClassName('selected')[0].getElementsByTagName('span')[0];
    var dataText, dataColor, dataImg;
    if(connect){
        connect.transaction(function (tx) {
            tx.executeSql('SELECT ROWID, cat_name, cat_color, cat_image FROM category WHERE ROWID =\''+Number(idCategory)+'\'', [], function (tranzaction, result) {
                var categoryRow = result.rows[0];
                //dataText = categoryRow.cat_name;
                //dataImg = categoryRow.cat_image
                spanResult.innerHTML = categoryRow.cat_name;
                if(categoryRow.cat_image){
                    var img = document.createElement('img');
                    if(categoryRow.cat_image == 'null'){
                        img.setAttribute('src', 'images/category/panda_gray.png');
                    }else{
                        img.setAttribute('src', 'images/category/'+categoryRow.cat_image+'_gray.png');
                    }
                    spanResult.appendChild(img);
                }
                spanResult.setAttribute('data-id', idCategory);
            },function(){alert('error')});
        })
    }else{
        var category_mass = JSON.parse(localStorage.getItem('todo_category'));
        if(category_mass.length > 0){
            for(var i=0; i< category_mass.length; i++){
                var categoryRow = category_mass[i];
                if(categoryRow.id == idCategory){
                    spanResult.innerHTML = categoryRow.name;
                    if(categoryRow.image){
                        var img = document.createElement('img');
                        if(categoryRow.image == 'null'){
                            img.setAttribute('src', 'images/category/panda_gray.png');
                        }else{
                            img.setAttribute('src', 'images/category/'+categoryRow.image+'_gray.png');
                        }
                        spanResult.appendChild(img);
                    }
                    spanResult.setAttribute('data-id', idCategory);
                }

            }
        }
    }

};