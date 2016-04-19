var config;
(function (config) {
    var Screen = (function () {
        function Screen() {
        }
        Screen.WIDTH = window.innerWidth;
        Screen.HEIGHT = window.innerHeight;
        Screen.RATIO = window.innerWidth / window.innerHeight;
        return Screen;
    }());
    config.Screen = Screen;
    // Scene Constants
    var Scene = (function () {
        function Scene() {
        }
        Scene.MENU = 0;
        Scene.HELP = 1;
        Scene.OVER = 2;
        Scene.LEVEL1 = 3;
        Scene.LEVEL2 = 4;
        Scene.LEVEL3 = 5;
        Scene.WIN = 6;
        Scene.PRELEVEL1 = 7;
        Scene.PRELEVEL2 = 8;
        Scene.PRELEVEL3 = 9;
        return Scene;
    }());
    config.Scene = Scene;
})(config || (config = {}));

//# sourceMappingURL=screen.js.map
