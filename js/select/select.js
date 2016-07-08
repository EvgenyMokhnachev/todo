function SelectObject(optionId){
    this.optionId = optionId;
}

SelectObject.prototype.createView = function(){
    var selectBlock = document.createElement('div');
    selectBlock.setAttribute('class', 'selectBlock');

    var selectResult = document.createElement('div');
    selectResult.setAttribute('class', 'selected');
    selectBlock.appendChild(selectResult);
    var resultText = document.createElement('span');
    selectResult.appendChild(resultText);
    var selectBtn = document.createElement('div');
    selectBtn.setAttribute('class', 'button');
    selectBtn.setAttribute('data-action', 'close');
    selectResult.appendChild(selectBtn);

    var option = document.createElement('div');
    option.setAttribute('class', 'option');
    option.setAttribute('id', this.optionId);
    selectBlock.appendChild(option);

    selectBtn.onclick = function(){
        var btn = this;
        if(btn.getAttribute('data-action') == 'open'){
            btn.setAttribute('data-action', 'close');
            option.style.display = 'none';
        }else{
            btn.setAttribute('data-action', 'open');
            option.style.display = 'block';
        }
    };

    resultText.onclick = function(){
      selectBtn.onclick();
    };

    return selectBlock;
};

SelectObject.prototype.selectOption = function(){
    var options = document.getElementById(this.optionId).childNodes;
    [].forEach.call(options, function(element){
        element.onclick = function(){
            var result = element.parentElement.previousElementSibling.getElementsByTagName('span')[0];
            result.innerHTML = element.getAttribute('data-text');
            if(element.getAttribute('data-img')){
                var imgSelected = JSON.parse(element.getAttribute('data-img'));
                var img = document.createElement('img');
                img.setAttribute('src', 'images/category/'+imgSelected.img+'_gray.png');
                result.appendChild(img);
            }

            element.parentElement.previousElementSibling.getElementsByTagName('div')[0].onclick();

        }
    });
};