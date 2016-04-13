/**
 * @module scenes
 */
module scenes {
    /**
     * Menu Scene extends scenes.Scene superclass is used to
     * create a custom menu for the THREEJS Game
     * 
     * @class Menu
     * @extends scene.Scene
     * @param blocker {HTMLElement}
     * @param _stage {createjs.Stage}
     * @param _gameLabel {createjs.Text}
     * @param _startButton {createjs.Bitmap}
     */
    export class Menu extends scenes.Scene {
        private _blocker: HTMLElement;
        private _stage: createjs.Stage;
        private _gameLabel: createjs.Text;
        private _startButton: createjs.Bitmap;
        private _helpButton: createjs.Bitmap;
        private _exitButton: createjs.Bitmap;
        private _bgImage: createjs.Bitmap;
        private _logoImage: createjs.Bitmap;

        /**
         * Empty Constructor - calls _initialize and start methods
         * 
         * @constructor
         */
        constructor() {
            super();

            this._initialize();
            this.start();
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++

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

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++

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
            
            
            this._logoImage = new createjs.Bitmap(assets.getResult("CompanyLogo"));
            this._logoImage.x = config.Screen.WIDTH/2 - (this._logoImage.getBounds().width/2);
            this._logoImage.y = config.Screen.HEIGHT * 0.07;
            this._stage.addChild(this._logoImage);           
            
            
            this._gameLabel = new createjs.Text(
                "AMAZE SKY GAME",
                "80px Consolas",
                "#000000");
            this._gameLabel.regX = this._gameLabel.getMeasuredWidth() * 0.5;
            this._gameLabel.regY = this._gameLabel.getMeasuredLineHeight() * 0.5;
            this._gameLabel.x = config.Screen.WIDTH * 0.5;
            this._gameLabel.y = config.Screen.HEIGHT * 0.5;
            this._stage.addChild(this._gameLabel);

            this._startButton = new createjs.Bitmap(assets.getResult("StartButton"));
            this._startButton.regX = this._startButton.getBounds().width * 0.5;
            this._startButton.regY = this._startButton.getBounds().height * 0.5;
            this._startButton.x = config.Screen.WIDTH * 0.5;
            this._startButton.y = (config.Screen.HEIGHT * 0.5) + 150;
            this._stage.addChild(this._startButton);

            this._startButton.on("mouseover", (event: createjs.MouseEvent) => {
                event.target.alpha = 0.7;
            });

            this._startButton.on("mouseout", (event: createjs.MouseEvent) => {
                event.target.alpha = 1.0;
            });

            this._startButton.on("click", (event: createjs.MouseEvent) => {
                currentScene = config.Scene.LEVEL2;
                changeScene(); 
            });
            
            this._helpButton = new createjs.Bitmap(assets.getResult("HelpButton"));
            this._helpButton.regX = this._helpButton.getBounds().width * 0.5;
            this._helpButton.regY = this._helpButton.getBounds().height * 0.5;
            this._helpButton.x = config.Screen.WIDTH * 0.5;
            this._helpButton.y = (config.Screen.HEIGHT * 0.5) + 250;
            this._stage.addChild(this._helpButton);

            this._helpButton.on("mouseover", (event: createjs.MouseEvent) => {
                event.target.alpha = 0.7;
            });

            this._helpButton.on("mouseout", (event: createjs.MouseEvent) => {
                event.target.alpha = 1.0;
            });

            this._helpButton.on("click", (event: createjs.MouseEvent) => {
                currentScene = config.Scene.HELP;
                changeScene(); 
            });
            
            
            this._exitButton = new createjs.Bitmap(assets.getResult("ExitButton"));
            this._exitButton.regX = this._exitButton.getBounds().width * 0.5;
            this._exitButton.regY = this._exitButton.getBounds().height * 0.5;
            this._exitButton.x = config.Screen.WIDTH * 0.5;
            this._exitButton.y = (config.Screen.HEIGHT * 0.5) + 350;
            this._stage.addChild(this._exitButton);

            this._exitButton.on("mouseover", (event: createjs.MouseEvent) => {
                event.target.alpha = 0.7;
            });

            this._exitButton.on("mouseout", (event: createjs.MouseEvent) => {
                event.target.alpha = 1.0;
            });

            this._exitButton.on("click", (event: createjs.MouseEvent) => {
                alert("LEAVE THE GAME");
            });
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