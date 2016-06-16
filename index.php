<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>To Do List</title>
<!--    <link rel="stylesheet" type="text/css" href="style.css" />-->
<!--    <link rel="stylesheet" type="text/css" href="font-awesome/css/font-awesome.min.css">-->
    <link rel="stylesheet" type="text/css" href="css/node-style.css"/>

    <script type="text/javascript" src="/lib/jquery.min.js"></script>
    <script type="text/javascript" src="/lib/jquery-ui.min.js"></script>

    <script src="/lib/core/vendor/jquery.touch-punch.min.js"></script>
    <script src="/lib/core/jquery.shapeshift.js"></script>

</head>
<body>
    <div class="container">
        <button type="button" id="AddList"></button>
        <div id="notes"></div>
    </div>
    <div class="fonPopUp" id="popUp">
        <div class="popUp">
            <h3>Create new list todo</h3>
            <button type="button" id="closePopUp"></button>
            <input id="newList" type="text" />
            <button type="button" id="createList">Create</button>
        </div>
    </div>
    <script type="text/javascript" src="config.js"></script>
    <script type="text/javascript" src="entities/DataBaseManager.js"></script>
    <script type="text/javascript" src="entities/List.js"></script>
    <script type="text/javascript" src="entities/ListService.js"></script>
    <script type="text/javascript" src="entities/TODO.js"></script>
    <script type="text/javascript" src="entities/TODOService.js"></script>
    <script type="text/javascript" src="main.js"></script>
</body>
</html>