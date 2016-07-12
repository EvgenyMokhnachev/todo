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
    categoryItem.setAttribute('class', 'categoryBtn '+self.color+' '+self.image);
    //categoryItem.style.backgroundColor = self.color;
    //if(self.color == 'emptiness'){
    //    categoryItem.style.backgroundImage = 'url(\'/images/category/'+ self.image +'_gray.png\')';
    //}else{
    //    categoryItem.style.backgroundImage = 'url(\'/images/category/'+ self.image +'_white.png\')';
    //}
    categoryItem.onclick = function(){
        listService.selectActiveCategory(self.id);
        self.setActive(this);
    };

    return categoryItem;
};

Category.prototype.createSelectDOM = function(){
    var self = this;
    var optionBlock = document.createElement('div');
    optionBlock.setAttribute('data-text', self.name);
    optionBlock.setAttribute('data-img', JSON.stringify({color: self.color, img: self.image}));
    optionBlock.setAttribute('data-id', self.id);
    var imgSpan = document.createElement('span');
    imgSpan.setAttribute('class', 'img ' + self.color+' '+self.image);
    optionBlock.appendChild(imgSpan);
    var textSpan = document.createElement('span');
    textSpan.innerHTML = self.name;
    textSpan.setAttribute('class', 'text');
    optionBlock.appendChild(textSpan);

    return optionBlock;
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

Category.prototype.setActive = function(btn){
    var self = this;
    removeClass(document.getElementsByClassName('active')[0], 'active');
    var oldClass = btn.getAttribute('class');
    btn.setAttribute('class', oldClass + ' active');
};
