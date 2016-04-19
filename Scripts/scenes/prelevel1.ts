/**
 * @module scenes
 */
module scenes {
    /**
     * This class instantiates the game Help scene object
     * 
     * @class PreLevel1
     * @extends scenes.Scene
     */
    export class PreLevel1 extends scenes.Scene {
        private _blocker: HTMLElement;
        private _stage: createjs.Stage;
        private _startButton: createjs.Bitmap;
        private _bgImage: createjs.Bitmap;
        private _auxImage: createjs.Bitmap;
        private keyboardControls: objects.KeyboardControls;

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
            
            this.keyboardControls = new objects.KeyboardControls();
            
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
            
            this._auxImage = new createjs.Bitmap(assets.getResult("PreLevel1"));
            this._auxImage.x = (config.Screen.WIDTH * 0.5) - (this._auxImage.getBounds().width * 0.5);
            this._auxImage.y = (config.Screen.HEIGHT * 0.5) - 420;
            this._stage.addChild(this._auxImage);

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
           
        }
        
        /**
         * This method is used to jump between levels
         * 
         * @method checkShortcut
         * @return void
         */
        private checkShortcut(): void {
            
            if (this.keyboardControls.loadLevel1) {
                //document.exitPointerLock();
                this.children = []; // an attempt to clean up
                currentScene = config.Scene.PRELEVEL1;
                this._removeAllListeners();
                changeScene();
            }
            if (this.keyboardControls.loadLevel2) {                
                //document.exitPointerLock();
                this.children = []; 
                currentScene = config.Scene.PRELEVEL2;
                this._removeAllListeners();
                changeScene();
            }
            if (this.keyboardControls.loadLevel3) {
                //document.exitPointerLock();
                this.children = []; // an attempt to clean up
                currentScene = config.Scene.PRELEVEL3;
                this._removeAllListeners();
                changeScene();
            }
        }
        
        /**
         * Remove all listener which are lost in somewhere and cause bugs
         * 
         * @method _removeAllListeners
         * @return void
         */
        private _removeAllListeners(): void {
            this._startButton.removeAllEventListeners();
        }

        /**
         * The update method updates the animation loop and other objects
         * 
         * @method update
         * @return void
         */
        public update(): void {
            this.checkShortcut();
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