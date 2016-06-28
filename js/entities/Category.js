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
    categoryItem.style.backgroundImage = 'url(\'/images/category/'+ self.image +'\')';

    return categoryItem;
};