/**
 * @module scenes
 */
module scenes {
    /**
     * This class instantiates the Win scene object
     * 
     * @class Win
     * @extends scenes.Scene
     */
    export class Win extends scenes.Scene {
        private _blocker: HTMLElement;
        private _stage: createjs.Stage;
        private _finalScoreLabel: createjs.Text;
        private _restartButton: createjs.Bitmap;
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
            
            this._auxImage = new createjs.Bitmap(assets.getResult("GameWin"));
            this._auxImage.x = (config.Screen.WIDTH * 0.5) - (this._auxImage.getBounds().width * 0.5);
            this._auxImage.y = (config.Screen.HEIGHT * 0.5) - 250;
            this._stage.addChild(this._auxImage);
            
            this._finalScoreLabel = new createjs.Text(
                ""+gameController.score,
                "80px Consolas",
                "#000000");
            this._finalScoreLabel.regX = this._finalScoreLabel.getMeasuredWidth() * 0.5;
            this._finalScoreLabel.regY = this._finalScoreLabel.getMeasuredLineHeight() * 0.5;
            this._finalScoreLabel.x = config.Screen.WIDTH * 0.5;
            this._finalScoreLabel.y = (config.Screen.HEIGHT * 0.5) - 25;
            this._stage.addChild(this._finalScoreLabel);

            this._restartButton = new createjs.Bitmap(assets.getResult("RestartButton"));
            this._restartButton.regX = this._restartButton.getBounds().width * 0.5;
            this._restartButton.regY = this._restartButton.getBounds().height * 0.5;
            this._restartButton.x = config.Screen.WIDTH * 0.5;
            this._restartButton.y = (config.Screen.HEIGHT * 0.5) + 150;
            this._stage.addChild(this._restartButton);

            this._restartButton.on("mouseover", (event: createjs.MouseEvent) => {
                event.target.alpha = 0.7;
            });

            this._restartButton.on("mouseout", (event: createjs.MouseEvent) => {
                event.target.alpha = 1.0;
            });

            this._restartButton.on("click", (event: createjs.MouseEvent) => {
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
            this._restartButton.removeAllEventListeners();
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