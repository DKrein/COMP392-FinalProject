/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    var GameController = (function () {
        //CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++
        function GameController() {
            this.score = 0;
            this.lives = 5;
        }
        return GameController;
    }());
    objects.GameController = GameController;
})(objects || (objects = {}));

//# sourceMappingURL=gameController.js.map
