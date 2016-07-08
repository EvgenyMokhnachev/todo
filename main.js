var NoteBlock = document.getElementById('notes');
var categoryBlock = document.getElementById('newCategory');
//var selectCategory = document.getElementById('selectCategory');
//var resultSelect = document.getElementById('resultSelect');

var listService = new ListService();
var todoService = new TODOService();
var categoryService = new CategoryService();
//var selectObj = new SelectObject();

listService.selectList();
categoryService.selectAll();

var inputList = document.getElementById('newList');
var inputCategory = document.getElementById('newCategory');
var oldClassContainer = document.getElementsByClassName('container')[0].getAttribute('class');

document.getElementById('AddList').onclick = function(){
    //TODO анимация открытия PopUp
    var popUp = document.getElementById('popUp');
    document.getElementsByClassName('container')[0].setAttribute('class', oldClassContainer+' openPopUp');
    popUp.style.display = 'block';
    if(popUp.getElementsByClassName('selected').length == 0){
        var selected = new SelectObject('selectCategory');
        document.getElementById('categorySelect').appendChild(selected.createView());
        categoryService.inputSelect(selected.optionId);
        selected.selectOption();
    }
    inputList.focus();
};

document.getElementById('AddCategory').onclick = function(){
    //TODO анимация открытия PopUp
    document.getElementsByClassName('container')[0].setAttribute('class', oldClassContainer+' openPopUp');
    document.getElementById('categoryUp').style.display = 'block';
};

document.getElementById('createList').onclick = function(){
    if(inputList.value == ""){
        addError(inputList);
    }else{
        listService.insert(inputList.value);
        document.getElementsByClassName('container')[0].setAttribute('class', oldClassContainer);
        document.getElementById('popUp').style.display = 'none';
        inputList.value = "";
    }
};
document.getElementById('createCategory').onclick = function(){
    if(inputCategory.value == ""){
        addError(inputCategory);
    }else{
        var nameCategory = inputCategory.value;
        var color = null, img = null;
        document.getElementsByName('color').forEach(function(element, i, mass){
            if(element.checked){
                color = element.getAttribute('id');
            }
        });
        document.getElementsByName('image').forEach(function(element, i, mass){
            if(element.checked){
                img = element.getAttribute('id');
            }
        });
        categoryService.insertCategory(inputCategory.value, color, img);
    }
};
document.getElementById('createCategory').onsubmit = function(){
    event.preventDefault();
    this.onclick();
    return false;
};

inputList.oninput = function(){
    if(inputList.value.length == 1){
        removeClass(inputList, 'error');
    }
};
inputCategory.oninput = function(){
    if(inputCategory.value.length == 1){
        removeClass(inputCategory, 'error');
    }
};

document.getElementById('closePopUp').onclick = function(){
    removeClass(inputList, 'error');
    inputList.value = '';
    document.getElementsByClassName('container')[0].setAttribute('class', oldClassContainer);
    document.getElementById('popUp').style.display = 'none';
};

document.getElementById('closePopUpCategory').onclick = function(){
    document.getElementsByClassName('container')[0].setAttribute('class', oldClassContainer);
    document.getElementById('categoryUp').style.display = 'none';
};

document.getElementById('AllCategory').onclick = function(){
    var self = this;
    removeClass(document.getElementsByClassName('active')[0], 'active');
    var oldClass = self.getAttribute('class');
    self.setAttribute('class', oldClass + ' active');
};

function removeClass(object, remClass){
    var oldClass = object.getAttribute('class');
    if(oldClass && oldClass.indexOf(remClass)>=0){
        var newClass = oldClass.replace(remClass, '');
        object.setAttribute('class', newClass);
    }
}

function addError(InputItem){
    var tempClass = InputItem.getAttribute('class');
    if(tempClass){
        InputItem.setAttribute('class', tempClass+' error');
    }else{
        InputItem.setAttribute('class', 'error');
    }
}

function initializationPlugin(){
    $("#notes").shapeshift();
}

function loadPage(){
    setTimeout(function(){
        $('.container').addClass('openPopUp');
        $('#popUp').css('display', 'block').find('.popUp').hide();
    },500);
}

$(document).ready(function() {
    setTimeout(function(){
        initializationPlugin();
    }, 500);
});