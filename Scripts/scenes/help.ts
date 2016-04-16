/**
 * @module scenes
 */
module scenes {
    /**
     * This class instantiates the game Help scene object
     * 
     * @class Help
     * @extends scenes.Scene
     */
    export class Help extends scenes.Scene {
        private _blocker: HTMLElement;
        private _stage: createjs.Stage;
        private _gameHelpLabel: createjs.Text;
        private _startButton: createjs.Bitmap;
        private _backButton: createjs.Bitmap;
        private _bgImage: createjs.Bitmap;
         private _auxImage: createjs.Bitmap;

        /**
         * Empty Contructor
         * 
         * @constructor
         */
        constructor() {
            super();

            this._initialize();
            this.start();
        }

        private _setupCanvas(): void {
            canvas.style.width = "100%";
            canvas.setAttribute("height", config.Screen.HEIGHT.toString());
            canvas.style.backgroundColor = "#ffffff";
        }

        /**
         * This method sets up default values for class member variables
         * and objects
         * 
         * @method _initialize
         * @return void
         */
        private _initialize(): void {
            // Create to HTMLElements
            this._blocker = document.getElementById("blocker");
            this._blocker.style.display = "none";

            // setup canvas for menu scene
            this._setupCanvas();
            // setup a stage on the canvas
            this._stage = new createjs.Stage(canvas);
            this._stage.enableMouseOver(20);
        }


        /**
         * The start method is the main method for the scene class
         * 
         * @method start
         * @return void
         */
        public start(): void {
            this._bgImage = new createjs.Bitmap(assets.getResult("MenuBackground"));
            this._bgImage.scaleX = 2;
            this._bgImage.scaleY = 2;
            this._stage.addChild(this._bgImage);
            
            this._auxImage = new createjs.Bitmap(assets.getResult("HelpScreen"));
            this._auxImage.x = (config.Screen.WIDTH * 0.5) - (this._auxImage.getBounds().width * 0.5);
            this._auxImage.y = (config.Screen.HEIGHT * 0.5) - 420;
            this._stage.addChild(this._auxImage);
            
            this._gameHelpLabel = new createjs.Text(
                "GAME Help",
                "80px Consolas",
                "#000000");
            this._gameHelpLabel.regX = this._gameHelpLabel.getMeasuredWidth() * 0.5;
            this._gameHelpLabel.regY = this._gameHelpLabel.getMeasuredLineHeight() * 0.5;
            this._gameHelpLabel.x = config.Screen.WIDTH * 0.5;
            this._gameHelpLabel.y = config.Screen.HEIGHT * 0.5;
            //this._stage.addChild(this._gameHelpLabel);

            this._startButton = new createjs.Bitmap(assets.getResult("StartButton"));
            this._startButton.regX = this._startButton.getBounds().width * 0.5;
            this._startButton.regY = this._startButton.getBounds().height * 0.5;
            this._startButton.x = config.Screen.WIDTH * 0.5;
            this._startButton.y = (config.Screen.HEIGHT * 0.5) + 350;
            this._stage.addChild(this._startButton);

            this._startButton.on("mouseover", (event: createjs.MouseEvent) => {
                event.target.alpha = 0.7;
            });

            this._startButton.on("mouseout", (event: createjs.MouseEvent) => {
                event.target.alpha = 1.0;
            });

            this._startButton.on("click", (event: createjs.MouseEvent) => {
                this._removeAllListeners();
                currentScene = config.Scene.LEVEL1;
                changeScene();
            });
            
            this._backButton = new createjs.Bitmap(assets.getResult("BackButton"));
            this._backButton.regX = this._backButton.getBounds().width * 0.5;
            this._backButton.regY = this._backButton.getBounds().height * 0.5;
            this._backButton.x = config.Screen.WIDTH * 0.5;
            this._backButton.y = (config.Screen.HEIGHT * 0.5) + 250;
            this._stage.addChild(this._backButton);

            this._backButton.on("mouseover", (event: createjs.MouseEvent) => {
                event.target.alpha = 0.7;
            });

            this._backButton.on("mouseout", (event: createjs.MouseEvent) => {
                event.target.alpha = 1.0;
            });

            this._backButton.on("click", (event: createjs.MouseEvent) => {
                this._removeAllListeners();
                currentScene = config.Scene.MENU;
                changeScene();
            });
        }
        
        /**
         * Remove all listener which are lost in somewhere and cause bugs
         * 
         * @method _removeAllListeners
         * @return void
         */
        private _removeAllListeners(): void {
            this._startButton.removeAllEventListeners();
            this._backButton.removeAllEventListeners();
        }

        /**
         * The update method updates the animation loop and other objects
         * 
         * @method update
         * @return void
         */
        public update(): void {
            this._stage.update();
        }

        /**
         * The resize method is a procedure that sets variables and objects on screen resize
         * 
         * @method resize
         * @return void
         */
        public resize(): void {
            this._setupCanvas();
        }

    }
}