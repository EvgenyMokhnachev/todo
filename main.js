var NoteBlock = document.getElementById('notes');
var categoryBlock = document.getElementById('newCategory');
//var resultBlock = document.getElementById('result');

var listService = new ListService();
var todoService = new TODOService();
var categoryService = new CategoryService();

//todoService.selectAll();
listService.selectList();
categoryService.selectAll();

var inputList = document.getElementById('newList');
var inputCategory = document.getElementById('newCategory');
var oldClassContainer = document.getElementsByClassName('container')[0].getAttribute('class');

document.getElementById('AddList').onclick = function(){
    //TODO анимация открытия PopUp
    document.getElementsByClassName('container')[0].setAttribute('class', oldClassContainer+' openPopUp');
    document.getElementById('popUp').style.display = 'block';
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
    removeError(inputList);
};
inputCategory.oninput = function(){
    removeError(inputCategory);
};

document.getElementById('closePopUp').onclick = function(){
    removeError(inputList);
    inputList.value = '';
    document.getElementsByClassName('container')[0].setAttribute('class', oldClassContainer);
    document.getElementById('popUp').style.display = 'none';
};

document.getElementById('closePopUpCategory').onclick = function(){
    document.getElementsByClassName('container')[0].setAttribute('class', oldClassContainer);
    document.getElementById('categoryUp').style.display = 'none';
};


function removeError(InputItem){
    if(InputItem.value.length == 1){
        var oldClass = InputItem.getAttribute('class');
        if(oldClass && oldClass.indexOf('error')>=0){
            var newClass = oldClass.replace('error', '');
            InputItem.setAttribute('class', newClass);
        }
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