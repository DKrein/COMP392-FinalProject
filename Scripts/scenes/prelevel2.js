var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @module scenes
 */
var scenes;
(function (scenes) {
    /**
     * This class instantiates the game Help scene object
     *
     * @class PreLevel1
     * @extends scenes.Scene
     */
    var PreLevel2 = (function (_super) {
        __extends(PreLevel2, _super);
        /**
         * Empty Contructor
         *
         * @constructor
         */
        function PreLevel2() {
            _super.call(this);
            this._initialize();
            this.start();
        }
        PreLevel2.prototype._setupCanvas = function () {
            canvas.style.width = "100%";
            canvas.setAttribute("height", config.Screen.HEIGHT.toString());
            canvas.style.backgroundColor = "#ffffff";
        };
        /**
         * This method sets up default values for class member variables
         * and objects
         *
         * @method _initialize
         * @return void
         */
        PreLevel2.prototype._initialize = function () {
            // Create to HTMLElements
            this._blocker = document.getElementById("blocker");
            this._blocker.style.display = "none";
            this.keyboardControls = new objects.KeyboardControls();
            // setup canvas for menu scene
            this._setupCanvas();
            // setup a stage on the canvas
            this._stage = new createjs.Stage(canvas);
            this._stage.enableMouseOver(20);
        };
        /**
         * The start method is the main method for the scene class
         *
         * @method start
         * @return void
         */
        PreLevel2.prototype.start = function () {
            var _this = this;
            this._bgImage = new createjs.Bitmap(assets.getResult("MenuBackground"));
            this._bgImage.scaleX = 2;
            this._bgImage.scaleY = 2;
            this._stage.addChild(this._bgImage);
            this._auxImage = new createjs.Bitmap(assets.getResult("PreLevel2"));
            this._auxImage.x = (config.Screen.WIDTH * 0.5) - (this._auxImage.getBounds().width * 0.5);
            this._auxImage.y = (config.Screen.HEIGHT * 0.5) - 420;
            this._stage.addChild(this._auxImage);
            this._startButton = new createjs.Bitmap(assets.getResult("StartButton"));
            this._startButton.regX = this._startButton.getBounds().width * 0.5;
            this._startButton.regY = this._startButton.getBounds().height * 0.5;
            this._startButton.x = config.Screen.WIDTH * 0.5;
            this._startButton.y = (config.Screen.HEIGHT * 0.5) + 350;
            this._stage.addChild(this._startButton);
            this._startButton.on("mouseover", function (event) {
                event.target.alpha = 0.7;
            });
            this._startButton.on("mouseout", function (event) {
                event.target.alpha = 1.0;
            });
            this._startButton.on("click", function (event) {
                _this._removeAllListeners();
                currentScene = config.Scene.LEVEL2;
                changeScene();
            });
        };
        /**
         * Remove all listener which are lost in somewhere and cause bugs
         *
         * @method _removeAllListeners
         * @return void
         */
        PreLevel2.prototype._removeAllListeners = function () {
            this._startButton.removeAllEventListeners();
        };
        /**
         * This method is used to jump between levels
         *
         * @method checkShortcut
         * @return void
         */
        PreLevel2.prototype.checkShortcut = function () {
            if (this.keyboardControls.loadLevel1) {
                document.exitPointerLock();
                this.children = []; // an attempt to clean up
                currentScene = config.Scene.PRELEVEL1;
                this._removeAllListeners();
                changeScene();
            }
            if (this.keyboardControls.loadLevel2) {
                document.exitPointerLock();
                this.children = [];
                currentScene = config.Scene.PRELEVEL2;
                this._removeAllListeners();
                changeScene();
            }
            if (this.keyboardControls.loadLevel3) {
                document.exitPointerLock();
                this.children = []; // an attempt to clean up
                currentScene = config.Scene.PRELEVEL3;
                this._removeAllListeners();
                changeScene();
            }
        };
        /**
         * The update method updates the animation loop and other objects
         *
         * @method update
         * @return void
         */
        PreLevel2.prototype.update = function () {
            this.checkShortcut();
            this._stage.update();
        };
        /**
         * The resize method is a procedure that sets variables and objects on screen resize
         *
         * @method resize
         * @return void
         */
        PreLevel2.prototype.resize = function () {
            this._setupCanvas();
        };
        return PreLevel2;
    }(scenes.Scene));
    scenes.PreLevel2 = PreLevel2;
})(scenes || (scenes = {}));

//# sourceMappingURL=prelevel2.js.map
