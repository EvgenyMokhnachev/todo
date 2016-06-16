
var NoteBlock = document.getElementById('notes');
//var resultBlock = document.getElementById('result');

var listService = new ListService();
var todoService = new TODOService();
//todoService.selectAll();
listService.selectList();

var inputList = document.getElementById('newList');
var oldClassContainer = document.getElementsByClassName('container')[0].getAttribute('class');
//document.getElementById('createToDo').onclick = function () {
//    var textInput = document.getElementById('textToDo');
//    if (textInput.value == "") {
//        textInput.style.borderColor = 'red';
//    } else {
//        textInput.style.borderColor = 'black';
//        var todoText = textInput.value;
//        todoService.insert(todoText);
//        textInput.value = "";
//    }
//};

document.getElementById('AddList').onclick = function(){
    //TODO анимация открытия PopUp
    //inputList.setAttribute('autofocus', 'autofocus');

    document.getElementsByClassName('container')[0].setAttribute('class', oldClassContainer+' openPopUp');
    document.getElementById('popUp').style.display = 'block';
    inputList.focus();
};

document.getElementById('createList').onclick = function(){
    if(inputList.value == ""){
        addError(inputList);
    }else{
        var nameList = inputList.value;
        listService.insert(nameList);
        document.getElementsByClassName('container')[0].setAttribute('class', oldClassContainer);
        document.getElementById('popUp').style.display = 'none';
        inputList.value = "";
    }
};
inputList.oninput = function(){
    removeError(inputList);

};

document.getElementById('closePopUp').onclick = function(){
    removeError(inputList);
    inputList.value = '';
    document.getElementsByClassName('container')[0].setAttribute('class', oldClassContainer);
    document.getElementById('popUp').style.display = 'none';
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