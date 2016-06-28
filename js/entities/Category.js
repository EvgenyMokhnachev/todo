function Category(id, name, color, image){
    this.id = id;
    this.name = name;
    this.color = color;
    this.image = image;
    this.isActive = undefined;
}
Category.prototype.createDOM = function(){
    var self = this;

    var categoryItem = document.createElement('button');
    categoryItem.setAttribute('type', 'button');
    categoryItem.setAttribute('class', 'categoryBtn '+self.color);
    //categoryItem.style.backgroundColor = self.color;
    if(self.color == 'emptiness'){
        categoryItem.style.backgroundImage = 'url(\'/images/category/'+ self.image +'_gray.png\')';
    }else{
        categoryItem.style.backgroundImage = 'url(\'/images/category/'+ self.image +'_white.png\')';
    }


    return categoryItem;
};

Category.prototype.getCategoryObject =function(){
    var self = this;
    return {
        id: self.id,
        name: self.name,
        color: self.color,
        image: self.image
    };
};