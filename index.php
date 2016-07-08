<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>To Do List</title>
<!--    <link rel="stylesheet" type="text/css" href="style.css" />-->
<!--    <link rel="stylesheet" type="text/css" href="font-awesome/css/font-awesome.min.css">-->
    <link rel="stylesheet" type="text/css" href="css/node-style.css"/>
    <link rel="stylesheet" type="text/css" href="css/select.css"/>

    <script type="text/javascript" src="/lib/jquery.min.js"></script>
    <script type="text/javascript" src="/lib/jquery-ui.min.js"></script>

    <script src="/lib/core/vendor/jquery.touch-punch.min.js"></script>
    <script src="/lib/core/jquery.shapeshift.js"></script>

</head>
<body>
    <div class="container">
        <div class=" buttonLeft">
            <button type="button" id="AddList"></button>
            <button type="button" id="AllCategory" class="categoryBtn all active"></button>
            <div id="newCategory"></div>
            <button type="button" id="AddCategory" class="categoryBtn add"></button>
        </div>
        <div id="notes"></div>
    </div>
    <div class="fonPopUp" id="popUp">
        <div class="popUp">
            <h3>Create new list todo</h3>
            <button type="button" id="closePopUp" class="closeBtn"></button>
            <input id="newList" type="text" />
            <p>Select category</p>
            <div id="categorySelect"></div>
<!--            <div class="selectBlock">-->
<!--                <div class="selected">-->
<!--                    <div class="button"></div>-->
<!--                </div>-->
<!--                <div class="option" id="selectCategory"></div>-->
<!--            </div>-->
            <button type="button" id="createList">Create</button>
        </div>
    </div>
    <div class="fonPopUp" id="categoryUp">
        <div class="popUp">
            <form>
                <h3>Create new category</h3>
                <button type="button" id="closePopUpCategory" class="closeBtn"></button>
                <input id="newCategory" type="text" />
                <p>Select Color</p>
                <div class="colorBlock">
                    <div class="radioBoxBlock"><input type="radio" name="color" id="emptiness"><label for="emptiness"></label></div>
                    <div class="radioBoxBlock"><input type="radio" name="color" id="swuff"><label for="swuff"></label></div>
                    <div class="radioBoxBlock"><input type="radio" name="color" id="radical"><label for="radical"></label></div>
                    <div class="radioBoxBlock"><input type="radio" name="color" id="cinnabar"><label for="cinnabar"></label></div>
                    <div class="radioBoxBlock"><input type="radio" name="color" id="emerald"><label for="emerald"></label></div>
                    <div class="radioBoxBlock"><input type="radio" name="color" id="saffron"><label for="saffron"></label></div>
                    <div class="radioBoxBlock"><input type="radio" name="color" id="california"><label for="california"></label></div>
                    <div class="radioBoxBlock"><input type="radio" name="color" id="turquoise"><label for="turquoise"></label></div>
                </div>
    <!--            <div class="colorBlock">-->
    <!--                -->
    <!--            </div>-->
                <p>Select image</p>
                <div class="colorBlock">
                    <div class="radioBoxBlock"><input type="radio" name="image" id="house"><label for="house"></label></div>
                    <div class="radioBoxBlock"><input type="radio" name="image" id="idea"><label for="idea"></label></div>
                    <div class="radioBoxBlock"><input type="radio" name="image" id="like"><label for="like"></label></div>
                    <div class="radioBoxBlock"><input type="radio" name="image" id="paper"><label for="paper"></label></div>
                    <div class="radioBoxBlock"><input type="radio" name="image" id="photo"><label for="photo"></label></div>
                    <div class="radioBoxBlock"><input type="radio" name="image" id="car"><label for="car"></label></div>
                    <div class="radioBoxBlock"><input type="radio" name="image" id="bike"><label for="bike"></label></div>
                    <div class="radioBoxBlock"><input type="radio" name="image" id="pizza"><label for="pizza"></label></div>
                </div>
    <!--            <div class="colorBlock">-->
    <!--                -->
    <!--            </div>-->
                <button type="submit" id="createCategory">Create</button>
            </form>
        </div>
    </div>
    <script type="text/javascript" src="config.js"></script>
    <script type="text/javascript" src="js/select/select.js"></script>
    <script type="text/javascript" src="js/manageres/DataBaseManager.js"></script>
    <script type="text/javascript" src="js/entities/Category.js"></script>
    <script type="text/javascript" src="js/services/CategoryService.js"></script>
    <script type="text/javascript" src="js/entities/List.js"></script>
    <script type="text/javascript" src="js/services/ListService.js"></script>
    <script type="text/javascript" src="js/entities/TODO.js"></script>
    <script type="text/javascript" src="js/services/TODOService.js"></script>
    <script type="text/javascript" src="main.js"></script>
</body>
</html>