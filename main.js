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
var inputCategory = document.getElementById('inputCategory');
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
    }
    inputList.focus();
};

document.getElementById('AddCategory').onclick = function(){
    //TODO анимация открытия PopUp
    document.getElementsByClassName('container')[0].setAttribute('class', oldClassContainer+' openPopUp');
    document.getElementById('categoryUp').style.display = 'block';
};

document.getElementById('createList').onsubmit = function(event){
    //TODO убрать категории как основное поле
    event.preventDefault();
    var self = this;
    var selected = document.getElementById('categorySelect').getElementsByTagName('span')[0].getAttribute('data-id');
    if(inputList.value == ""){
        addError(inputList);
        if(!selected){
            document.getElementById('categorySelect').getElementsByTagName('div')[1].style.borderColor = '#e64c65';
        }
        return false;
    }else{
        //if(selected){
            listService.insert(inputList.value, selected);
            document.getElementsByClassName('container')[0].setAttribute('class', oldClassContainer);
            document.getElementById('popUp').style.display = 'none';
            inputList.value = "";
        //}else{
        //    self.previousElementSibling.getElementsByTagName('div')[1].style.borderColor = '#e64c65';
        //    return false;
        //}

    }
    return false;
};
document.getElementById('createCategory').onsubmit = function(event){
    event.preventDefault();
    if(inputCategory.value == ""){
        addError(inputCategory);
        return false;
    }else{
        var nameCategory = inputCategory.value;
        inputCategory.value = '';
        var color = null, img = null;

        var selectColor = document.getElementsByName('color');
        selectColor = Array.prototype.slice.call(selectColor);
        selectColor.forEach(function(element, i, mass){
            if(element.checked){
                color = element.getAttribute('id');
            }
        });

        var selectImage = document.getElementsByName('image');
        selectImage = Array.prototype.slice.call(selectImage);
        selectImage.forEach(function(element, i, mass){
            if(element.checked){
                img = element.getAttribute('id');
            }
        });
        categoryService.insertCategory(nameCategory, color, img);
    }
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
    clearSelectCategory();
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
    removeResulBlock();
    listService.selectList();
    setTimeout(function(){
        initializationPlugin();
    }, 100)
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
    var windowWidth = $('html').width();
    if(windowWidth > 700){
        $("#notes").shapeshift();
    }
}

function loadPage(){
    setTimeout(function(){
        $('.container').addClass('openPopUp');
        $('#popUp').css('display', 'block').find('.popUp').hide();
    },500);
}

function removeResulBlock(){
    NoteBlock.innerHTML = '';
}

function clearSelectCategory(){
    var categorySelect = document.getElementById('categorySelect');
    var resultSpan = categorySelect.getElementsByTagName('span')[0];
    resultSpan.innerHTML = '';
    resultSpan.setAttribute('data-id', '');

    var optionBlock = categorySelect.getElementsByClassName('selectBlock')[0].getElementsByClassName('option')[0];
    if(optionBlock.style.display == 'block'){
        resultSpan.onclick();
    }
}

$(document).ready(function() {
    setTimeout(function(){
        initializationPlugin();
    }, 500);
});

$(window).on("load",function(){
    var categoryBlock = $(".categoryBlock");
    var buttonLeftHeight = $(".buttonLeft").height();
    categoryBlock.css('height', buttonLeftHeight-75);
    categoryBlock.mCustomScrollbar({
        theme:"my-theme"
    });
});

$(window).on("resize",function(){
    var categoryBlock = $(".categoryBlock");
    var buttonLeftHeight = $(".buttonLeft").height();
    categoryBlock.css('height', buttonLeftHeight-75);
    setTimeout(function(){
        initializationPlugin();
    }, 10);
    //$("#notes").shapeshift();
});
