/// <reference path="../../typings/tsd.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var GameObject = (function (_super) {
        __extends(GameObject, _super);
        //CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++
        function GameObject(geometry, material, x, y, z) {
            _super.call(this, geometry, material);
            this._geometry = geometry;
            this._material = material;
            this.position.x = x;
            this.position.y = y;
            this.position.z = z;
            this.receiveShadow = true;
            this.castShadow = true;
        }
        return GameObject;
    }(THREE.Mesh));
    objects.GameObject = GameObject;
})(objects || (objects = {}));

//# sourceMappingURL=gameobject.js.map

var objects;
(function (objects) {
    // KeyboardControls Class +++++++++++++++
    var KeyboardControls = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++    
        function KeyboardControls() {
            this.enabled = false;
            document.addEventListener('keydown', this.onKeyDown.bind(this), false);
            document.addEventListener('keyup', this.onKeyUp.bind(this), false);
        }
        // PUBLIC METHODS
        KeyboardControls.prototype.onKeyDown = function (event) {
            switch (event.keyCode) {
                case 38: /*up arrow*/
                case 87:
                    this.moveForward = true;
                    break;
                case 37: /*left arrow*/
                case 65:
                    this.moveLeft = true;
                    break;
                case 40: /*down arrow*/
                case 83:
                    this.moveBackward = true;
                    break;
                case 39: /*right arrow*/
                case 68:
                    this.moveRight = true;
                    break;
                case 32:
                    this.jump = true;
                    break;
                case 81:
                    this.paused = (this.paused) ? false : true;
                    break;
            }
        };
        KeyboardControls.prototype.onKeyUp = function (event) {
            switch (event.keyCode) {
                case 38: /*up arrow*/
                case 87:
                    this.moveForward = false;
                    break;
                case 37: /*left arrow*/
                case 65:
                    this.moveLeft = false;
                    break;
                case 40: /*down arrow*/
                case 83:
                    this.moveBackward = false;
                    break;
                case 39: /*right arrow*/
                case 68:
                    this.moveRight = false;
                    break;
                case 32:
                    this.jump = false;
                    break;
            }
        };
        return KeyboardControls;
    }());
    objects.KeyboardControls = KeyboardControls;
})(objects || (objects = {}));

//# sourceMappingURL=keyboardcontrols.js.map

var objects;
(function (objects) {
    // MouseControls Class +++++++++++++++
    var MouseControls = (function () {
        // CONSTRUCTOR +++++++++++++++++++++++
        function MouseControls() {
            this.enabled = false;
            this.sensitivity = 0.1;
            this.yaw = 0;
            this.pitch = 0;
            document.addEventListener('mousemove', this.OnMouseMove.bind(this), false);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        MouseControls.prototype.OnMouseMove = function (event) {
            this.yaw = -event.movementX * this.sensitivity * 1.4;
            this.pitch = -event.movementY * this.sensitivity * 0.1;
        };
        return MouseControls;
    }());
    objects.MouseControls = MouseControls;
})(objects || (objects = {}));

//# sourceMappingURL=mousecontrols.js.map

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
        return Scene;
    }());
    config.Scene = Scene;
})(config || (config = {}));

//# sourceMappingURL=screen.js.map

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    /**
     * The Scene class is a generic / custom Scene container
     *
     * @class Scene
     */
    var Scene = (function (_super) {
        __extends(Scene, _super);
        /**
         * @constructor
         */
        function Scene() {
            _super.call(this);
        }
        /**
         * The start method is the main method for the scene class
         *
         * @method start
         * @return void
         */
        Scene.prototype.start = function () {
        };
        /**
         * The update method updates the animation loop and other objects
         *
         * @method update
         * @return void
         */
        Scene.prototype.update = function () {
        };
        /**
         * The resize method is a procedure that sets variables and objects on screen resize
         *
         * @method resize
         * @return void
         */
        Scene.prototype.resize = function () {
        };
        return Scene;
    }(Physijs.Scene));
    scenes.Scene = Scene;
})(scenes || (scenes = {}));

//# sourceMappingURL=scene.js.map

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * The Scenes module is a namespace to reference all scene objects
 *
 * @module scenes
 */
var scenes;
(function (scenes) {
    /**
     * The Level1 class is where the main action occurs for the game
     *
     * @class Level1
     * @param havePointerLock {boolean}
     */
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        /**
         * @constructor
         */
        function Level1() {
            _super.call(this);
            this.berryLocation = new Array();
            this.berryNum = 0;
            this.basketLocation = new Array();
            this.basketNum = 0;
            this._initialize();
            this.start();
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++
        /**
         * Sets up the initial canvas for the play scene
         *
         * @method setupCanvas
         * @return void
         */
        Level1.prototype._setupCanvas = function () {
            canvas.setAttribute("width", config.Screen.WIDTH.toString());
            canvas.setAttribute("height", (config.Screen.HEIGHT * 0.1).toString());
            canvas.style.backgroundColor = "#000000";
        };
        /**
        * Sets up the background scene for the play scene
        *
        * @method playBackgroundSound
        * @return void
        */
        Level1.prototype.playBackgroundSound = function () {
            this.bgSound = createjs.Sound.play("Background", { volume: 0.02 });
            this.bgSound.on("complete", this.playBackgroundSound, this);
        };
        /**
         * The initialize method sets up key objects to be used in the scene
         *
         * @method _initialize
         * @returns void
         */
        Level1.prototype._initialize = function () {
            // Create to HTMLElements
            this.blocker = document.getElementById("blocker");
            this.instructions = document.getElementById("instructions");
            this.blocker.style.display = "block";
            // setup canvas for menu scene
            this._setupCanvas();
            this.prevTime = 0;
            this.stage = new createjs.Stage(canvas);
            this.velocity = new Vector3(0, 0, 0);
            // setup a THREE.JS Clock object
            this.clock = new Clock();
            // Instantiate Game Controls
            this.keyboardControls = new objects.KeyboardControls();
            this.mouseControls = new objects.MouseControls();
        };
        /**
         * This method sets up the scoreboard for the scene
         *
         * @method setupScoreboard
         * @returns void
         */
        Level1.prototype.setupScoreboard = function () {
            // initialize  score and lives values
            this.scoreValue = 0;
            this.livesValue = 1;
            // Add Lives Label
            this.livesLabel = new createjs.Text("LIVES: " + this.livesValue, "40px Consolas", "#ffffff");
            this.livesLabel.x = config.Screen.WIDTH * 0.1;
            this.livesLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(this.livesLabel);
            console.log("Added Lives Label to stage");
            // Add Level Label
            this.levelLabel = new createjs.Text("LEVEL 1", "40px Consolas", "#ffffff");
            this.levelLabel.x = config.Screen.WIDTH * 0.45;
            this.levelLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(this.levelLabel);
            console.log("Added Lives Label to stage");
            // Add Score Label
            this.scoreLabel = new createjs.Text("SCORE: " + this.scoreValue, "40px Consolas", "#ffffff");
            this.scoreLabel.x = config.Screen.WIDTH * 0.8;
            this.scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(this.scoreLabel);
            console.log("Added Score Label to stage");
        };
        /**
         * Add lights to the scene
         *
         * @method addLights
         * @return void
         */
        Level1.prototype.addLights = function () {
            // Spot Light
            this.spotLight = new SpotLight(0xffffff);
            this.spotLight.position.set(20, 50, -15);
            this.spotLight.castShadow = true;
            this.spotLight.intensity = 2;
            this.spotLight.lookAt(new Vector3(0, 0, 0));
            this.spotLight.shadowCameraNear = 2;
            this.spotLight.shadowCameraFar = 200;
            this.spotLight.shadowCameraLeft = -5;
            this.spotLight.shadowCameraRight = 5;
            this.spotLight.shadowCameraTop = 5;
            this.spotLight.shadowCameraBottom = -5;
            this.spotLight.shadowMapWidth = 2048;
            this.spotLight.shadowMapHeight = 2048;
            this.spotLight.shadowDarkness = 0.5;
            this.spotLight.name = "Spot Light";
            this.add(this.spotLight);
            //AmbientLight
            this.ambientLight = new AmbientLight(0x404040);
            this.add(this.ambientLight);
            console.log("Added Lights to scene");
        };
        /**
         * Add a ground plane to the scene
         *
         * @method addGround
         * @return void
         */
        Level1.prototype.addGround = function () {
            this.groundTexture = new THREE.TextureLoader().load('../../Assets/images/grass.png');
            this.groundTexture.wrapS = THREE.RepeatWrapping;
            this.groundTexture.wrapT = THREE.RepeatWrapping;
            this.groundTexture.repeat.set(8, 8);
            this.groundMaterial = new PhongMaterial();
            this.groundMaterial.map = this.groundTexture;
            this.groundGeometry = new BoxGeometry(20, 1, 20);
            this.groundPhysicsMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.ground = new Physijs.ConvexMesh(this.groundGeometry, this.groundPhysicsMaterial, 0);
            this.ground.receiveShadow = true;
            this.ground.name = "Ground";
            this.add(this.ground);
            console.log("Added Burnt Ground to scene");
        };
        /**
         * Add the islands to the scene
         *
         * @method addIslands
         * @return void
         */
        Level1.prototype.addIslands = function () {
            this.islandGeometry = new BoxGeometry(6, 1, 25);
            this.islandPhysicsMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.island1 = new Physijs.ConvexMesh(this.islandGeometry, this.islandPhysicsMaterial, 0);
            this.island1.position.set(-17, 0, 0);
            this.island1.receiveShadow = true;
            this.island1.name = "Ground";
            this.add(this.island1);
            this.island2 = new Physijs.ConvexMesh(this.islandGeometry, this.islandPhysicsMaterial, 0);
            this.island2.position.set(17, 0, 0);
            this.island2.receiveShadow = true;
            this.island2.name = "Ground";
            this.add(this.island2);
            this.island3 = new Physijs.ConvexMesh(this.islandGeometry, this.islandPhysicsMaterial, 0);
            this.island3.position.set(0, 0, -17);
            this.island3.receiveShadow = true;
            this.island3.rotateY(1.5708);
            this.island3.name = "Ground";
            this.add(this.island3);
            this.island4 = new Physijs.ConvexMesh(this.islandGeometry, this.islandPhysicsMaterial, 0);
            this.island4.position.set(0, 0, 17);
            this.island4.receiveShadow = true;
            this.island4.rotateY(1.5708);
            this.island4.name = "Ground";
            this.add(this.island4);
        };
        /**
         * Add walls to the scene
         *
         * @method addWalls
         * @return void
         */
        Level1.prototype.addWalls = function () {
            this.wallTexture = new THREE.TextureLoader().load('../../Assets/images/wall.png');
            this.wallTexture.wrapS = THREE.RepeatWrapping;
            this.wallTexture.wrapT = THREE.RepeatWrapping;
            this.wallTexture.repeat.set(8, 8);
            this.wallMaterial = new PhongMaterial();
            this.wallMaterial.map = this.wallTexture;
            this.wallGeometry = new BoxGeometry(20, 4, .5);
            this.wallPhysicsMaterial = Physijs.createMaterial(this.wallMaterial, 0, 0);
            this.wall1 = new Physijs.ConvexMesh(this.wallGeometry, this.wallPhysicsMaterial, 0);
            this.wall1.position.set(14.2, 2.5, -4.1);
            this.wall1.rotateY(1.5708);
            this.wall1.receiveShadow = true;
            this.wall1.name = "Wall";
            this.add(this.wall1);
            this.wall2 = new Physijs.ConvexMesh(this.wallGeometry, this.wallPhysicsMaterial, 0);
            this.wall2.position.set(6, 2.5, 6.4);
            this.wall2.rotateY(1.5708);
            this.wall2.receiveShadow = true;
            this.wall2.name = "Wall";
            this.add(this.wall2);
            this.wall3 = new Physijs.ConvexMesh(this.wallGeometry, this.wallPhysicsMaterial, 0);
            this.wall3.position.set(-10, 2.5, -6.1);
            this.wall3.rotateY(1.5708);
            this.wall3.receiveShadow = true;
            this.wall3.name = "Wall";
            this.add(this.wall3);
            this.wall4 = new Physijs.ConvexMesh(this.wallGeometry, this.wallPhysicsMaterial, 0);
            this.wall4.position.set(-7.7, 2.5, 9.7);
            this.wall4.receiveShadow = true;
            this.wall4.name = "Wall";
            this.add(this.wall4);
            this.wall5 = new Physijs.ConvexMesh(this.wallGeometry, this.wallPhysicsMaterial, 0);
            this.wall5.position.set(-7.6, 2.5, -3.85);
            this.wall5.receiveShadow = true;
            this.wall5.name = "Wall";
            this.add(this.wall5);
            this.wallGeometry = new BoxGeometry(10, 4, .5);
            this.wall6 = new Physijs.ConvexMesh(this.wallGeometry, this.wallPhysicsMaterial, 0);
            this.wall6.position.set(-1.9, 2.5, -13);
            this.wall6.rotateY(1.5708);
            this.wall6.receiveShadow = true;
            this.wall6.name = "Wall";
            this.add(this.wall6);
        };
        /**
        * Add rocks to the scene - actually it just prepare the rock, who really add it to the scene is the pressure plate
        *
        * @method addRocks
        * @return void
        */
        Level1.prototype.addRocks = function () {
            this.rockTexture = new THREE.TextureLoader().load('../../Assets/images/rock.png');
            this.rockTexture.wrapS = THREE.RepeatWrapping;
            this.rockTexture.wrapT = THREE.RepeatWrapping;
            this.rockMaterial = new PhongMaterial();
            this.rockMaterial.map = this.rockTexture;
            this.rockGeometry = new SphereGeometry(1, 5, 5);
            this.rockPhysicsMaterial = Physijs.createMaterial(this.rockMaterial, 0, 0);
            this.rock1 = new Physijs.ConvexMesh(this.rockGeometry, this.rockPhysicsMaterial, 1);
            this.rock1.position.set(-4, 10, -5.5);
            this.rock1.receiveShadow = true;
            this.rock1.name = "Rock";
            this.rock2 = new Physijs.ConvexMesh(this.rockGeometry, this.rockPhysicsMaterial, 1);
            this.rock2.position.set(-17, 10, -8);
            this.rock2.receiveShadow = true;
            this.rock2.name = "Rock";
            this.rock3 = new Physijs.ConvexMesh(this.rockGeometry, this.rockPhysicsMaterial, 1);
            this.rock3.position.set(-18, 10, 2);
            this.rock3.receiveShadow = true;
            this.rock3.name = "Rock";
        };
        /**
         * Add Logs to the scene - actually it just prepare the rock, who really add it to the scene is the pressure plate
         *
         * @method addLogs
         * @return void
         */
        Level1.prototype.addLogs = function () {
            this.logTexture = new THREE.TextureLoader().load('../../Assets/images/fallingbranch.png');
            this.logTexture.wrapS = THREE.RepeatWrapping;
            this.logTexture.wrapT = THREE.RepeatWrapping;
            this.logMaterial = new PhongMaterial();
            this.logMaterial.map = this.logTexture;
            this.logGeometry = new CylinderGeometry(1, 1, 10);
            this.logPhysicsMaterial = Physijs.createMaterial(this.logMaterial, 0, 0);
            this.log = new Physijs.ConvexMesh(this.logGeometry, this.logPhysicsMaterial, 1);
            this.log.position.set(4, 15, 10);
            this.log.rotation.x = 1.5708;
            this.log.receiveShadow = true;
            this.log.name = "Log";
        };
        /**
         * Add Pressure Plates to the scene
         *
         * @method addPlates
         * @return void
         */
        Level1.prototype.addPlates = function () {
            this.plateTexture = new THREE.TextureLoader().load('../../Assets/images/PressurePlate.jpg');
            this.plateTexture.wrapS = THREE.RepeatWrapping;
            this.plateTexture.wrapT = THREE.RepeatWrapping;
            this.plateMaterial = new PhongMaterial();
            this.plateMaterial.map = this.plateTexture;
            this.plateGeometry = new CubeGeometry(1, 0.001, 1);
            this.platePhysicsMaterial = Physijs.createMaterial(this.plateMaterial, 0, 0);
            this.plate1 = new Physijs.ConvexMesh(this.plateGeometry, this.platePhysicsMaterial, 0);
            this.plate1.position.set(1, .5, -5.5);
            this.plate1.receiveShadow = true;
            this.plate1.name = "Plate1";
            this.add(this.plate1);
            this.plate2 = new Physijs.ConvexMesh(this.plateGeometry, this.platePhysicsMaterial, 0);
            this.plate2.position.set(-18.7, .5, -3);
            this.plate2.receiveShadow = true;
            this.plate2.name = "Plate2";
            this.add(this.plate2);
            this.plate3 = new Physijs.ConvexMesh(this.plateGeometry, this.platePhysicsMaterial, 0);
            this.plate3.position.set(4, .5, 9);
            this.plate3.receiveShadow = true;
            this.plate3.name = "Plate3";
            this.add(this.plate3);
        };
        /**
         * Reset all hazards function
         *
         * @method resetHazards
         * @return void
         */
        Level1.prototype.resetHazards = function () {
            this.remove(this.rock1);
            this.remove(this.rock2);
            this.remove(this.rock3);
            this.remove(this.log);
            this.rock1.position.set(-4, 10, -5.5);
            this.rock2.position.set(-17, 10, -8);
            this.rock3.position.set(-18, 10, 2);
            this.log.position.set(4, 15, 10);
        };
        /**
         * Adds the player controller to the scene
         *
         * @method addPlayer
         * @return void
         */
        Level1.prototype.addPlayer = function () {
            // Player Object
            this.playerGeometry = new BoxGeometry(2, 4, 2);
            this.playerMaterial = Physijs.createMaterial(new LambertMaterial({ color: 0x00ff00 }), 0.4, 0);
            this.player = new Physijs.BoxMesh(this.playerGeometry, this.playerMaterial, 1);
            this.player.position.set(0, 20, 0);
            this.player.receiveShadow = true;
            this.player.castShadow = true;
            this.player.name = "Player";
            this.add(this.player);
            console.log("Added Player to Scene");
            this.player.setAngularFactor(new THREE.Vector3(0, 0, 0));
        };
        /**
         * Add the death plane to the scene
         *
         * @method addDeathPlane
         * @return void
         */
        Level1.prototype.addDeathPlane = function () {
            this.deathPlaneGeometry = new BoxGeometry(100, 1, 100);
            this.deathPlaneMaterial = new THREE.MeshLambertMaterial({ color: 0xE5E5FF, transparent: true, opacity: 0.1 });
            this.deathPlane = new Physijs.BoxMesh(this.deathPlaneGeometry, this.deathPlaneMaterial, 0);
            this.deathPlane.position.set(0, -20, 0);
            this.deathPlane.name = "DeathPlane";
            this.add(this.deathPlane);
            console.log("Added DeathPlane to scene");
        };
        /**
         * Add the Skybox to the scene
         *
         * @method addSkyBox
         * @return void
         */
        Level1.prototype.addSkyBox = function () {
            this.skyBoxTexture = new THREE.TextureLoader().load('../../Assets/images/skyBG.png');
            this.skyBox = new gameObject(new SphereGeometry(60, 60, 60), new LambertMaterial({ map: this.skyBoxTexture }), 2, 2, 2);
            this.skyBox.material.side = THREE.DoubleSide;
            this.skyBox.name = "Skybox";
            this.add(this.skyBox);
            console.log("Added skyBox to scene");
        };
        /**
         * Add Berry to the scene
         *
         * @method addBerry
         * @return void
         */
        Level1.prototype.addBerry = function () {
            this.berryTexture = new THREE.TextureLoader().load('../../Assets/images/berry.png');
            this.berryTexture.wrapS = THREE.RepeatWrapping;
            this.berryTexture.wrapT = THREE.RepeatWrapping;
            this.berryMaterial = new PhongMaterial();
            this.berryMaterial.map = this.berryTexture;
            this.berryGeometry = new BoxGeometry(.5, .5, .5);
            this.berryPhysicsMaterial = Physijs.createMaterial(this.berryMaterial, 0, 0);
            this.berry = new Physijs.ConvexMesh(this.berryGeometry, this.berryPhysicsMaterial, 0);
            this.berry.position.set(-8.5, 1.5, -5.5);
            this.berry.receiveShadow = true;
            this.berry.name = "Berry";
            this.add(this.berry);
            console.log("Added Berry to scene");
        };
        /**
         * Add Basket to the scene
         *
         * @method addBasket
         * @return void
         */
        Level1.prototype.addBasket = function () {
            this.basketTexture = new THREE.TextureLoader().load('../../Assets/images/bask.png');
            this.basketTexture.wrapS = THREE.RepeatWrapping;
            this.basketTexture.wrapT = THREE.RepeatWrapping;
            this.basketMaterial = new PhongMaterial();
            this.basketMaterial.map = this.basketTexture;
            this.basketGeometry = new BoxGeometry(.5, .5, .5);
            this.basketPhysicsMaterial = Physijs.createMaterial(this.basketMaterial, 0, 0);
            this.basket = new Physijs.ConvexMesh(this.basketGeometry, this.basketPhysicsMaterial, 0);
            this.basket.position.set(-16, 3, 14);
            this.basket.receiveShadow = true;
            this.basket.name = "Basket";
            this.add(this.basket);
            console.log("Added basket to scene");
        };
        /**
         * Event Handler method for any pointerLockChange events
         *
         * @method pointerLockChange
         * @return void
         */
        Level1.prototype.pointerLockChange = function (event) {
            if (document.pointerLockElement === this.element) {
                // enable our mouse and keyboard controls
                this.keyboardControls.enabled = true;
                this.mouseControls.enabled = true;
                this.blocker.style.display = 'none';
            }
            else {
                if (this.livesValue <= 0) {
                    this.blocker.style.display = 'none';
                    document.removeEventListener('pointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('mozpointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('webkitpointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('pointerlockerror', this.pointerLockError.bind(this), false);
                    document.removeEventListener('mozpointerlockerror', this.pointerLockError.bind(this), false);
                    document.removeEventListener('webkitpointerlockerror', this.pointerLockError.bind(this), false);
                }
                else {
                    this.blocker.style.display = '-webkit-box';
                    this.blocker.style.display = '-moz-box';
                    this.blocker.style.display = 'box';
                    this.instructions.style.display = '';
                }
                // disable our mouse and keyboard controls
                this.keyboardControls.enabled = false;
                this.mouseControls.enabled = false;
                console.log("PointerLock disabled");
            }
        };
        /**
         * Event handler for PointerLockError
         *
         * @method pointerLockError
         * @return void
         */
        Level1.prototype.pointerLockError = function (event) {
            this.instructions.style.display = '';
            console.log("PointerLock Error Detected!!");
        };
        // Check Controls Function
        /**
         * This method updates the player's position based on user input
         *
         * @method checkControls
         * @return void
         */
        Level1.prototype.checkControls = function () {
            if (this.keyboardControls.enabled) {
                this.velocity = new Vector3();
                var time = performance.now();
                var delta = (time - this.prevTime) / 1000;
                var speed = 600.0;
                //if (this.isGrounded) {
                var direction = new Vector3(0, 0, 0);
                if (this.keyboardControls.moveForward) {
                    this.velocity.z -= speed * delta;
                }
                if (this.keyboardControls.moveLeft) {
                    this.velocity.x -= speed * delta;
                }
                if (this.keyboardControls.moveBackward) {
                    this.velocity.z += speed * delta;
                }
                if (this.keyboardControls.moveRight) {
                    this.velocity.x += speed * delta;
                }
                if (this.keyboardControls.jump && this.isGrounded) {
                    if (this.player.position.y >= 1 && this.player.position.y <= 3) {
                        this.velocity.y += 10 * speed * delta;
                    }
                    else if (this.player.position.y > 3) {
                        this.isGrounded = false;
                        createjs.Sound.play("jump");
                    }
                }
                this.player.setDamping(0.7, 0.1);
                // Changing player's rotation
                this.player.setAngularVelocity(new Vector3(0, this.mouseControls.yaw, 0));
                direction.addVectors(direction, this.velocity);
                direction.applyQuaternion(this.player.quaternion);
                if (Math.abs(this.player.getLinearVelocity().x) < 20 && Math.abs(this.player.getLinearVelocity().y) < 10) {
                    this.player.applyCentralForce(direction);
                }
                this.cameraLook();
                //} // isGrounded ends
                //reset Pitch and Yaw
                this.mouseControls.pitch = 0;
                this.mouseControls.yaw = 0;
                this.prevTime = time;
            } // Controls Enabled ends
            else {
                this.player.setAngularVelocity(new Vector3(0, 0, 0));
            }
        };
        Level1.prototype._unpauseSimulation = function () {
            scene.onSimulationResume();
            console.log("resume simulation");
        };
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * The start method is the main method for the scene class
         *
         * @method start
         * @return void
         */
        Level1.prototype.start = function () {
            var _this = this;
            // Set Up Scoreboard
            this.setupScoreboard();
            // Set Up background sound
            this.playBackgroundSound();
            //check to see if pointerlock is supported
            this.havePointerLock = 'pointerLockElement' in document ||
                'mozPointerLockElement' in document ||
                'webkitPointerLockElement' in document;
            //define berry positions        
            this.berryLocation.push(new THREE.Vector3(-8.5, 1.5, -5.5));
            this.berryLocation.push(new THREE.Vector3(-2, 1.5, 16));
            this.berryLocation.push(new THREE.Vector3(17, 1.5, 0));
            this.berryLocation.push(new THREE.Vector3(-15, 1.5, -2));
            //define basket positions
            this.basketLocation.push(new THREE.Vector3(-16, 3, 14));
            this.basketLocation.push(new THREE.Vector3(15, 3, 16));
            this.basketLocation.push(new THREE.Vector3(-15, 3, -16));
            this.basketLocation.push(new THREE.Vector3(17, 3, -15));
            // Check to see if we have pointerLock
            if (this.havePointerLock) {
                this.element = document.body;
                this.instructions.addEventListener('click', function () {
                    // Ask the user for pointer lock
                    console.log("Requesting PointerLock");
                    _this.element.requestPointerLock = _this.element.requestPointerLock ||
                        _this.element.mozRequestPointerLock ||
                        _this.element.webkitRequestPointerLock;
                    _this.element.requestPointerLock();
                });
                document.addEventListener('pointerlockchange', this.pointerLockChange.bind(this), false);
                document.addEventListener('mozpointerlockchange', this.pointerLockChange.bind(this), false);
                document.addEventListener('webkitpointerlockchange', this.pointerLockChange.bind(this), false);
                document.addEventListener('pointerlockerror', this.pointerLockError.bind(this), false);
                document.addEventListener('mozpointerlockerror', this.pointerLockError.bind(this), false);
                document.addEventListener('webkitpointerlockerror', this.pointerLockError.bind(this), false);
            }
            // Scene changes for Physijs
            this.name = "Main";
            this.fog = new THREE.Fog(0xffffff, 0, 750);
            this.setGravity(new THREE.Vector3(0, -10, 0));
            // start simulation
            /*
            this.addEventListener('update', this._simulateScene);
            console.log("Start Simulation"); */
            // Add Spot Light to the scene
            this.addLights();
            // Ground Object
            this.addGround();
            //Add all the island arround the main ground
            this.addIslands();
            //Add Walls in the scenario
            this.addWalls();
            //Add Rocks in the scenario
            this.addRocks();
            //Add Logs in the scenario
            this.addLogs();
            //Add the pressure plates in the scenario
            this.addPlates();
            //Reset the first time
            this.resetHazards();
            // Add player controller
            this.addPlayer();
            // Add death plane to the scene
            this.addDeathPlane();
            // Add Skybox to the scene
            this.addSkyBox();
            this.addBasket();
            this.addBerry();
            // Collision Check
            this.player.addEventListener('collision', function (eventObject) {
                if (eventObject.name === "Ground" || eventObject.name === "Wall") {
                    this.isGrounded = true;
                    createjs.Sound.play("land");
                }
                if (eventObject.name === "DeathPlane") {
                    createjs.Sound.play("Falling");
                    this.addDeath();
                }
                if (eventObject.name === "Berry") {
                    createjs.Sound.play("Collect");
                    this.collectablePicked(eventObject);
                    console.log("player ate a berry");
                }
                if (eventObject.name === "Basket") {
                    createjs.Sound.play("Collect");
                    this.collectablePicked(eventObject);
                    console.log("player ate a basket");
                }
                if (eventObject.name === "Plate1") {
                    this.add(this.rock1);
                }
                if (eventObject.name === "Plate2") {
                    this.add(this.rock2);
                    this.add(this.rock3);
                }
                if (eventObject.name === "Plate3") {
                    this.add(this.log);
                }
                if (eventObject.name === "Rock" || eventObject.name === "Log" && eventObject.position.y > 2) {
                    createjs.Sound.play("Collision");
                    this.addDeath();
                }
            }.bind(this));
            //Rock eventHandler            
            this.rock1.addEventListener('collision', function (eventObject) {
                if (eventObject.name === "Ground" || eventObject.name === "Wall") {
                    this.resetHazards();
                }
            }.bind(this));
            this.rock2.addEventListener('collision', function (eventObject) {
                if (eventObject.name === "Ground" || eventObject.name === "Wall") {
                    this.resetHazards();
                }
            }.bind(this));
            this.rock3.addEventListener('collision', function (eventObject) {
                if (eventObject.name === "Ground" || eventObject.name === "Wall") {
                    this.resetHazards();
                }
            }.bind(this));
            this.log.addEventListener('collision', function (eventObject) {
                if (eventObject.name === "Ground" || eventObject.name === "Wall") {
                    this.resetHazards();
                }
            }.bind(this));
            // create parent-child relationship with camera and player
            this.player.add(camera);
            camera.position.set(0, 1, 0);
            this.simulate();
        };
        /**
         * Pick any collectable function
         *
         * @method collectablePicked
         * @return void
         */
        Level1.prototype.collectablePicked = function (collectable) {
            this.remove(collectable);
            if (collectable.name === "Berry") {
                this.berryNum = this.berryNum === (this.berryLocation.length - 1) ? 0 : (this.berryNum + 1);
                collectable.position.x = this.berryLocation[this.berryNum].x;
                collectable.position.y = this.berryLocation[this.berryNum].y;
                collectable.position.z = this.berryLocation[this.berryNum].z;
                this.scoreValue += 2;
            }
            if (collectable.name === "Basket") {
                this.basketNum = this.basketNum === (this.basketLocation.length - 1) ? 0 : (this.basketNum + 1);
                collectable.position.x = this.basketLocation[this.basketNum].x;
                collectable.position.y = this.basketLocation[this.basketNum].y;
                collectable.position.z = this.basketLocation[this.basketNum].z;
                this.scoreValue += 5;
            }
            this.scoreLabel.text = "SCORE: " + this.scoreValue;
            this.add(collectable);
        };
        /**
         * add death function
         *
         * @method addDeath
         * @return void
         */
        Level1.prototype.addDeath = function () {
            this.livesValue--;
            if (this.livesValue <= 0) {
                // Exit Pointer Lock
                document.exitPointerLock();
                this.children = []; // an attempt to clean up
                //this._isGamePaused = true;
                // Play the Game Over Scene
                currentScene = config.Scene.OVER;
                changeScene();
            }
            else {
                // otherwise reset my player and update Lives
                this.livesLabel.text = "LIVES: " + this.livesValue;
                this.remove(this.player);
                this.player.position.set(0, 20, 0);
                this.add(this.player);
            }
        };
        /**
         * add level change function
         *
         * @method addLevelChange
         * @return void
         */
        Level1.prototype.addLevelChange = function () {
            if (this.scoreValue > 1) {
                this.children = []; // an attempt to clean up
                //this._isGamePaused = true;
                // Play the Level2 Scene
                currentScene = config.Scene.LEVEL2;
                changeScene();
            }
        };
        /**
         * Camera Look function
         *
         * @method cameraLook
         * @return void
         */
        Level1.prototype.cameraLook = function () {
            var zenith = THREE.Math.degToRad(90);
            var nadir = THREE.Math.degToRad(-90);
            var cameraPitch = camera.rotation.x + this.mouseControls.pitch;
            // Constrain the Camera Pitch
            camera.rotation.x = THREE.Math.clamp(cameraPitch, nadir, zenith);
        };
        /**
         * @method update
         * @returns void
         */
        Level1.prototype.update = function () {
            this.checkControls();
            this.stage.update();
            this.addLevelChange();
            if (!this.keyboardControls.paused) {
                this.simulate();
            }
        };
        /**
         * Responds to screen resizes
         *
         * @method resize
         * @return void
         */
        Level1.prototype.resize = function () {
            canvas.style.width = "100%";
            this.livesLabel.x = config.Screen.WIDTH * 0.1;
            this.livesLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.scoreLabel.x = config.Screen.WIDTH * 0.8;
            this.scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.update();
        };
        return Level1;
    }(scenes.Scene));
    scenes.Level1 = Level1;
})(scenes || (scenes = {}));

//# sourceMappingURL=level1.js.map

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * The Scenes module is a namespace to reference all scene objects
 *
 * @module scenes
 */
var scenes;
(function (scenes) {
    /**
     * The Level2 class is where the main action occurs for the game
     *
     * @class Level2
     * @param havePointerLock {boolean}
     */
    var Level2 = (function (_super) {
        __extends(Level2, _super);
        /**
         * @constructor
         */
        function Level2() {
            _super.call(this);
            this.berryLocation = new Array();
            this.berryNum = 0;
            this.basketLocation = new Array();
            this.basketNum = 0;
            this._initialize();
            this.start();
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++
        /**
         * Sets up the initial canvas for the play scene
         *
         * @method setupCanvas
         * @return void
         */
        Level2.prototype._setupCanvas = function () {
            canvas.setAttribute("width", config.Screen.WIDTH.toString());
            canvas.setAttribute("height", (config.Screen.HEIGHT * 0.1).toString());
            canvas.style.backgroundColor = "#000000";
        };
        /**
        * Sets up the background scene for the play scene
        *
        * @method playBackgroundSound
        * @return void
        */
        Level2.prototype.playBackgroundSound = function () {
            this.bgSound = createjs.Sound.play("Background", { volume: 0.02 });
            this.bgSound.on("complete", this.playBackgroundSound, this);
        };
        /**
         * The initialize method sets up key objects to be used in the scene
         *
         * @method _initialize
         * @returns void
         */
        Level2.prototype._initialize = function () {
            // Create to HTMLElements
            this.blocker = document.getElementById("blocker");
            this.instructions = document.getElementById("instructions");
            this.blocker.style.display = "block";
            // setup canvas for menu scene
            this._setupCanvas();
            this.coinCount = 10;
            this.prevTime = 0;
            this.stage = new createjs.Stage(canvas);
            this.velocity = new Vector3(0, 0, 0);
            // setup a THREE.JS Clock object
            this.clock = new Clock();
            // Instantiate Game Controls
            this.keyboardControls = new objects.KeyboardControls();
            this.mouseControls = new objects.MouseControls();
        };
        /**
         * This method sets up the scoreboard for the scene
         *
         * @method setupScoreboard
         * @returns void
         */
        Level2.prototype.setupScoreboard = function () {
            // initialize  score and lives values
            this.scoreValue = 0;
            this.livesValue = 1;
            // Add Lives Label
            this.livesLabel = new createjs.Text("LIVES: " + this.livesValue, "40px Consolas", "#ffffff");
            this.livesLabel.x = config.Screen.WIDTH * 0.1;
            this.livesLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(this.livesLabel);
            console.log("Added Lives Label to stage");
            // Add Level Label
            this.levelLabel = new createjs.Text("LEVEL 2", "40px Consolas", "#ffffff");
            this.levelLabel.x = config.Screen.WIDTH * 0.45;
            this.levelLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(this.levelLabel);
            console.log("Added Lives Label to stage");
            // Add Score Label
            this.scoreLabel = new createjs.Text("SCORE: " + this.scoreValue, "40px Consolas", "#ffffff");
            this.scoreLabel.x = config.Screen.WIDTH * 0.8;
            this.scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(this.scoreLabel);
            console.log("Added Score Label to stage");
        };
        /**
         * Add lights to the scene
         *
         * @method addLights
         * @return void
         */
        Level2.prototype.addLights = function () {
            // Spot Light
            this.spotLight = new SpotLight(0xffffff);
            this.spotLight.position.set(20, 50, -15);
            this.spotLight.castShadow = true;
            this.spotLight.intensity = 2;
            this.spotLight.lookAt(new Vector3(0, 0, 0));
            this.spotLight.shadowCameraNear = 2;
            this.spotLight.shadowCameraFar = 200;
            this.spotLight.shadowCameraLeft = -5;
            this.spotLight.shadowCameraRight = 5;
            this.spotLight.shadowCameraTop = 5;
            this.spotLight.shadowCameraBottom = -5;
            this.spotLight.shadowMapWidth = 2048;
            this.spotLight.shadowMapHeight = 2048;
            this.spotLight.shadowDarkness = 0.5;
            this.spotLight.name = "Spot Light";
            this.add(this.spotLight);
            //AmbientLight
            this.ambientLight = new AmbientLight(0x404040);
            this.add(this.ambientLight);
            console.log("Added Lights to scene");
        };
        /**
         * Add a ground plane to the scene
         *
         * @method addGround
         * @return void
         */
        Level2.prototype.addGround = function () {
            this.groundTexture = new THREE.TextureLoader().load('../../Assets/images/grass.png');
            this.groundTexture.wrapS = THREE.RepeatWrapping;
            this.groundTexture.wrapT = THREE.RepeatWrapping;
            this.groundTexture.repeat.set(8, 8);
            this.groundMaterial = new PhongMaterial();
            this.groundMaterial.map = this.groundTexture;
            this.groundGeometry = new BoxGeometry(12, 1, 10);
            this.groundPhysicsMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.ground = new Physijs.ConvexMesh(this.groundGeometry, this.groundPhysicsMaterial, 0);
            this.ground.position.set(-4.5, 0, 0);
            this.ground.receiveShadow = true;
            this.ground.name = "Ground";
            this.add(this.ground);
            console.log("Added Burnt Ground to scene");
            this.ground23Geometry = new BoxGeometry(6, 1, 5);
            this.ground2 = new Physijs.ConvexMesh(this.ground23Geometry, this.groundPhysicsMaterial, 0);
            this.ground2.position.set(-13.5, 0, -2.5);
            this.ground2.receiveShadow = true;
            this.ground2.name = "Ground23";
            this.add(this.ground2);
            console.log("Added Ground 2 to scene");
            this.ground3 = new Physijs.ConvexMesh(this.ground23Geometry, this.groundPhysicsMaterial, 0);
            this.ground3.position.set(-13.5, 0, 2.5);
            this.ground3.receiveShadow = true;
            this.ground3.name = "Ground23";
            this.add(this.ground3);
            console.log("Added Ground 3 to scene");
            this.ground4Geometry = new BoxGeometry(25, 1, 10);
            this.ground4 = new Physijs.ConvexMesh(this.ground4Geometry, this.groundPhysicsMaterial, 0);
            this.ground4.position.set(-29, 0, 0);
            this.ground4.receiveShadow = true;
            this.ground4.name = "Ground23";
            this.add(this.ground4);
            console.log("Added Ground 4 to scene");
        };
        /**
         * Add walls to the scene
         *
         * @method addWalls
         * @return void
         */
        Level2.prototype.addWalls = function () {
            this.wallTexture = new THREE.TextureLoader().load('../../Assets/images/wall.png');
            this.wallTexture.wrapS = THREE.RepeatWrapping;
            this.wallTexture.wrapT = THREE.RepeatWrapping;
            this.wallTexture.repeat.set(8, 8);
            this.wallMaterial = new PhongMaterial();
            this.wallMaterial.map = this.wallTexture;
            this.wallGeometry = new BoxGeometry(10, 4, .5);
            this.smallWallGeometry = new BoxGeometry(5.5, 4, 0.5);
            this.wallPhysicsMaterial = Physijs.createMaterial(this.wallMaterial, 0, 0);
            this.wall1 = new Physijs.ConvexMesh(this.wallGeometry, this.wallPhysicsMaterial, 0);
            this.wall1.position.set(-7.5, 2, 0);
            this.wall1.receiveShadow = true;
            this.wall1.name = "Wall";
            this.add(this.wall1);
            this.wall2 = new Physijs.ConvexMesh(this.wallGeometry, this.wallPhysicsMaterial, 0);
            this.wall2.position.set(-20.5, 2, 0);
            this.wall2.receiveShadow = true;
            this.wall2.name = "Wall";
            this.add(this.wall2);
            this.wall3 = new Physijs.ConvexMesh(this.wallGeometry, this.wallPhysicsMaterial, 0);
            this.wall3.position.set(-33, 2, 0);
            this.wall3.receiveShadow = true;
            this.wall3.name = "Wall";
            this.add(this.wall3);
            console.log("WHERE IS THE WALL3?");
            this.wall4 = new Physijs.ConvexMesh(this.smallWallGeometry, this.wallPhysicsMaterial, 0);
            this.wall4.position.set(-38.2, 2, 2.3);
            this.wall4.rotation.x = 1.5708;
            this.wall4.rotation.y = 1.5708;
            this.wall4.receiveShadow = true;
            this.wall4.name = "Wall";
            //this.add(this.wall4);
            console.log("WHERE IS THE WALL?");
        };
        /**
        * Add rocks to the scene - actually it just prepare the rock, who really add it to the scene is the pressure plate
        *
        * @method addRocks
        * @return void
        */
        Level2.prototype.addRocks = function () {
            this.rockTexture = new THREE.TextureLoader().load('../../Assets/images/rock.png');
            this.rockTexture.wrapS = THREE.RepeatWrapping;
            this.rockTexture.wrapT = THREE.RepeatWrapping;
            this.rockMaterial = new PhongMaterial();
            this.rockMaterial.map = this.rockTexture;
            this.rockGeometry = new SphereGeometry(1, 5, 5);
            this.rockPhysicsMaterial = Physijs.createMaterial(this.rockMaterial, 0, 0);
            this.rock1 = new Physijs.ConvexMesh(this.rockGeometry, this.rockPhysicsMaterial, 1);
            this.rock1.position.set(-7.8, 10, 2.8);
            this.rock1.receiveShadow = true;
            this.rock1.name = "Rock";
        };
        /**
         * Add Logs to the scene - actually it just prepare the rock, who really add it to the scene is the pressure plate
         *
         * @method addLogs
         * @return void
         */
        Level2.prototype.addLogs = function () {
            this.logTexture = new THREE.TextureLoader().load('../../Assets/images/fallingbranch.png');
            this.logTexture.wrapS = THREE.RepeatWrapping;
            this.logTexture.wrapT = THREE.RepeatWrapping;
            this.logMaterial = new PhongMaterial();
            this.logMaterial.map = this.logTexture;
            this.logGeometry = new CylinderGeometry(1, 1, 5);
            this.logPhysicsMaterial = Physijs.createMaterial(this.logMaterial, 0, 0);
            this.log = new Physijs.ConvexMesh(this.logGeometry, this.logPhysicsMaterial, 1);
            this.log.rotation.y = 1.5708;
            this.log.rotation.z = 1.5708;
            this.log.position.set(-32, 10, -2.7);
            this.log.receiveShadow = true;
            this.log.name = "Log";
        };
        /**
         * Add Pressure Plates to the scene
         *
         * @method addPlates
         * @return void
         */
        Level2.prototype.addPlates = function () {
            this.plateTexture = new THREE.TextureLoader().load('../../Assets/images/PressurePlate.jpg');
            this.plateTexture.wrapS = THREE.RepeatWrapping;
            this.plateTexture.wrapT = THREE.RepeatWrapping;
            this.plateMaterial = new PhongMaterial();
            this.plateMaterial.map = this.plateTexture;
            this.plateGeometry = new CubeGeometry(2, 0.001, 2);
            this.platePhysicsMaterial = Physijs.createMaterial(this.plateMaterial, 0, 0);
            this.plate1 = new Physijs.ConvexMesh(this.plateGeometry, this.platePhysicsMaterial, 0);
            this.plate1.position.set(-5.8, 0.5, 2.8);
            this.plate1.receiveShadow = true;
            this.plate1.name = "Plate1";
            this.add(this.plate1);
            this.plate2 = new Physijs.ConvexMesh(this.plateGeometry, this.platePhysicsMaterial, 0);
            this.plate2.position.set(-13, 0.5, -2.6);
            this.plate2.receiveShadow = true;
            this.plate2.name = "Plate2";
            this.add(this.plate2);
            this.plate3 = new Physijs.ConvexMesh(this.plateGeometry, this.platePhysicsMaterial, 0);
            this.plate3.position.set(-21, 0.5, 2.7);
            this.plate3.receiveShadow = true;
            this.plate3.name = "Plate3";
            this.add(this.plate3);
            this.plate4 = new Physijs.ConvexMesh(this.plateGeometry, this.platePhysicsMaterial, 0);
            this.plate4.position.set(-27, 0.5, -2.7);
            this.plate4.receiveShadow = true;
            this.plate4.name = "Plate4";
            this.add(this.plate4);
            this.plate5 = new Physijs.ConvexMesh(this.plateGeometry, this.platePhysicsMaterial, 0);
            this.plate5.position.set(-32, 0.5, 2.3);
            this.plate5.receiveShadow = true;
            this.plate5.name = "Plate5";
            this.add(this.plate5);
        };
        /**
         * Reset all hazards function
         *
         * @method resetHazards
         * @return void
         */
        Level2.prototype.resetHazards = function () {
            this.remove(this.rock1);
            this.remove(this.log);
            this.rock1.position.set(-7.8, 10, 2.8);
            this.log.position.set(-27, 10, -2.7);
            //this.wall4.position.set(-38.2, 10, 2.3);
        };
        /**
         * Adds the player controller to the scene
         *
         * @method addPlayer
         * @return void
         */
        Level2.prototype.addPlayer = function () {
            // Player Object
            this.playerGeometry = new BoxGeometry(2, 4, 2);
            this.playerMaterial = Physijs.createMaterial(new LambertMaterial({ color: 0x00ff00 }), 0.4, 0);
            this.player = new Physijs.BoxMesh(this.playerGeometry, this.playerMaterial, 1);
            this.player.position.set(0, 5, 0);
            this.player.receiveShadow = true;
            this.player.castShadow = true;
            this.player.name = "Player";
            this.add(this.player);
            console.log("Added Player to Scene");
            this.player.setAngularFactor(new THREE.Vector3(0, 0, 0));
        };
        /**
         * Add the death plane to the scene
         *
         * @method addDeathPlane
         * @return void
         */
        Level2.prototype.addDeathPlane = function () {
            this.deathPlaneGeometry = new BoxGeometry(100, 1, 100);
            this.deathPlaneMaterial = new THREE.MeshLambertMaterial({ color: 0xE5E5FF, transparent: true, opacity: 0.1 });
            this.deathPlane = new Physijs.BoxMesh(this.deathPlaneGeometry, this.deathPlaneMaterial, 0);
            this.deathPlane.position.set(0, -20, 0);
            this.deathPlane.name = "DeathPlane";
            this.add(this.deathPlane);
            console.log("Added DeathPlane to scene");
        };
        /**
         * Add the Skybox to the scene
         *
         * @method addSkyBox
         * @return void
         */
        Level2.prototype.addSkyBox = function () {
            this.skyBoxTexture = new THREE.TextureLoader().load('../../Assets/images/skyBG.png');
            this.skyBox = new gameObject(new SphereGeometry(60, 60, 60), new LambertMaterial({ map: this.skyBoxTexture }), 2, 2, 2);
            this.skyBox.material.side = THREE.DoubleSide;
            this.skyBox.name = "Skybox";
            this.add(this.skyBox);
            console.log("Added skyBox to scene");
        };
        /**
         * Add Berry to the scene
         *
         * @method addBerry
         * @return void
         */
        Level2.prototype.addBerry = function () {
            this.berryTexture = new THREE.TextureLoader().load('../../Assets/images/berry.png');
            this.berryTexture.wrapS = THREE.RepeatWrapping;
            this.berryTexture.wrapT = THREE.RepeatWrapping;
            this.berryMaterial = new PhongMaterial();
            this.berryMaterial.map = this.berryTexture;
            this.berryGeometry = new BoxGeometry(.5, .5, .5);
            this.berryPhysicsMaterial = Physijs.createMaterial(this.berryMaterial, 0, 0);
            this.berry = new Physijs.ConvexMesh(this.berryGeometry, this.berryPhysicsMaterial, 0);
            this.berry.position.set(-9.5, 1.5, 2.8);
            this.berry.receiveShadow = true;
            this.berry.name = "Berry";
            this.add(this.berry);
            console.log("Added Berry to scene");
        };
        /**
         * Add Basket to the scene
         *
         * @method addBasket
         * @return void
         */
        Level2.prototype.addBasket = function () {
            this.basketTexture = new THREE.TextureLoader().load('../../Assets/images/bask.png');
            this.basketTexture.wrapS = THREE.RepeatWrapping;
            this.basketTexture.wrapT = THREE.RepeatWrapping;
            this.basketMaterial = new PhongMaterial();
            this.basketMaterial.map = this.basketTexture;
            this.basketGeometry = new BoxGeometry(.5, .5, .5);
            this.basketPhysicsMaterial = Physijs.createMaterial(this.basketMaterial, 0, 0);
            this.basket = new Physijs.ConvexMesh(this.basketGeometry, this.basketPhysicsMaterial, 0);
            this.basket.position.set(-14, 3, -2.6);
            this.basket.receiveShadow = true;
            this.basket.name = "Basket";
            this.add(this.basket);
            console.log("Added basket to scene");
        };
        /**
         * This method adds a coin to the scene
         *
         * @method addCoinMesh
         * @return void
         */
        Level2.prototype.addCoinMesh = function () {
            var self = this;
            this.coins = new Array(); // Instantiate a convex mesh array
            var coinLoader = new THREE.JSONLoader().load("../../Assets/imported/coin.json", function (geometry) {
                var phongMaterial = new PhongMaterial({ color: 0xE7AB32 });
                phongMaterial.emissive = new THREE.Color(0xE7AB32);
                var coinMaterial = Physijs.createMaterial((phongMaterial), 0.4, 0.6);
                for (var count = 0; count < self.coinCount; count++) {
                    self.coins[count] = new Physijs.ConvexMesh(geometry, coinMaterial);
                    self.coins[count].receiveShadow = true;
                    self.coins[count].castShadow = true;
                    self.coins[count].name = "Coin";
                    self.setCoinPosition(self.coins[count]);
                    console.log("Added Coin Mesh to Scene, at position: " + self.coins[count].position);
                }
            });
        };
        /**
         * This method randomly sets the coin object's position
         *
         * @method setCoinPosition
         * @return void
         */
        Level2.prototype.setCoinPosition = function (coin) {
            var randomPointX = Math.floor(Math.random() * 20) - 10;
            var randomPointZ = Math.floor(Math.random() * 20) - 10;
            coin.position.set(randomPointX, 10, randomPointZ);
            console.log(randomPointX);
            console.log(randomPointZ);
            this.add(coin);
        };
        /**
         * Event Handler method for any pointerLockChange events
         *
         * @method pointerLockChange
         * @return void
         */
        Level2.prototype.pointerLockChange = function (event) {
            if (document.pointerLockElement === this.element) {
                // enable our mouse and keyboard controls
                this.keyboardControls.enabled = true;
                this.mouseControls.enabled = true;
                this.blocker.style.display = 'none';
            }
            else {
                if (this.livesValue <= 0) {
                    this.blocker.style.display = 'none';
                    document.removeEventListener('pointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('mozpointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('webkitpointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('pointerlockerror', this.pointerLockError.bind(this), false);
                    document.removeEventListener('mozpointerlockerror', this.pointerLockError.bind(this), false);
                    document.removeEventListener('webkitpointerlockerror', this.pointerLockError.bind(this), false);
                }
                else {
                    this.blocker.style.display = '-webkit-box';
                    this.blocker.style.display = '-moz-box';
                    this.blocker.style.display = 'box';
                    this.instructions.style.display = '';
                }
                // disable our mouse and keyboard controls
                this.keyboardControls.enabled = false;
                this.mouseControls.enabled = false;
                console.log("PointerLock disabled");
            }
        };
        /**
         * Event handler for PointerLockError
         *
         * @method pointerLockError
         * @return void
         */
        Level2.prototype.pointerLockError = function (event) {
            this.instructions.style.display = '';
            console.log("PointerLock Error Detected!!");
        };
        // Check Controls Function
        /**
         * This method updates the player's position based on user input
         *
         * @method checkControls
         * @return void
         */
        Level2.prototype.checkControls = function () {
            if (this.keyboardControls.enabled) {
                this.velocity = new Vector3();
                var time = performance.now();
                var delta = (time - this.prevTime) / 1000;
                var speed = 600.0;
                //if (this.isGrounded) {
                var direction = new Vector3(0, 0, 0);
                if (this.keyboardControls.moveForward) {
                    this.velocity.z -= speed * delta;
                }
                if (this.keyboardControls.moveLeft) {
                    this.velocity.x -= speed * delta;
                }
                if (this.keyboardControls.moveBackward) {
                    this.velocity.z += speed * delta;
                }
                if (this.keyboardControls.moveRight) {
                    this.velocity.x += speed * delta;
                }
                if (this.keyboardControls.jump && this.isGrounded) {
                    if (this.player.position.y >= 1 && this.player.position.y <= 3) {
                        this.velocity.y += 10 * speed * delta;
                    }
                    else if (this.player.position.y > 3) {
                        this.isGrounded = false;
                        createjs.Sound.play("jump");
                    }
                }
                this.player.setDamping(0.7, 0.1);
                // Changing player's rotation
                this.player.setAngularVelocity(new Vector3(0, this.mouseControls.yaw, 0));
                direction.addVectors(direction, this.velocity);
                direction.applyQuaternion(this.player.quaternion);
                if (Math.abs(this.player.getLinearVelocity().x) < 20 && Math.abs(this.player.getLinearVelocity().y) < 10) {
                    this.player.applyCentralForce(direction);
                }
                this.cameraLook();
                //} // isGrounded ends
                //reset Pitch and Yaw
                this.mouseControls.pitch = 0;
                this.mouseControls.yaw = 0;
                this.prevTime = time;
            } // Controls Enabled ends
            else {
                this.player.setAngularVelocity(new Vector3(0, 0, 0));
            }
        };
        Level2.prototype._unpauseSimulation = function () {
            scene.onSimulationResume();
            console.log("resume simulation");
        };
        //Code to move wall - buggy
        // private render(): void{
        //     requestAnimationFrame(this.render.bind(this));
        //     this.wall2.position.z += 1;
        //     this.player.position.z += 1;
        //     renderer.render(scene, camera);
        //}
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * The start method is the main method for the scene class
         *
         * @method start
         * @return void
         */
        Level2.prototype.start = function () {
            var _this = this;
            // Set Up Scoreboard
            this.setupScoreboard();
            // Set Up background sound
            this.playBackgroundSound();
            //check to see if pointerlock is supported
            this.havePointerLock = 'pointerLockElement' in document ||
                'mozPointerLockElement' in document ||
                'webkitPointerLockElement' in document;
            //define berry positions        
            this.berryLocation.push(new THREE.Vector3(-9.5, 1.5, 2.8));
            this.berryLocation.push(new THREE.Vector3(-27, 1.5, 0));
            this.berryLocation.push(new THREE.Vector3(-34, 1.5, -2.6));
            //define basket positions
            this.basketLocation.push(new THREE.Vector3(-14, 3, -2.6));
            this.basketLocation.push(new THREE.Vector3(-40, 3, -1.4));
            // Check to see if we have pointerLock
            if (this.havePointerLock) {
                this.element = document.body;
                this.instructions.addEventListener('click', function () {
                    // Ask the user for pointer lock
                    console.log("Requesting PointerLock");
                    _this.element.requestPointerLock = _this.element.requestPointerLock ||
                        _this.element.mozRequestPointerLock ||
                        _this.element.webkitRequestPointerLock;
                    _this.element.requestPointerLock();
                });
                document.addEventListener('pointerlockchange', this.pointerLockChange.bind(this), false);
                document.addEventListener('mozpointerlockchange', this.pointerLockChange.bind(this), false);
                document.addEventListener('webkitpointerlockchange', this.pointerLockChange.bind(this), false);
                document.addEventListener('pointerlockerror', this.pointerLockError.bind(this), false);
                document.addEventListener('mozpointerlockerror', this.pointerLockError.bind(this), false);
                document.addEventListener('webkitpointerlockerror', this.pointerLockError.bind(this), false);
            }
            // Scene changes for Physijs
            this.name = "Main";
            this.fog = new THREE.Fog(0xffffff, 0, 750);
            this.setGravity(new THREE.Vector3(0, -10, 0));
            // start simulation
            /*
            this.addEventListener('update', this._simulateScene);
            console.log("Start Simulation"); */
            // Add Spot Light to the scene
            this.addLights();
            // Ground Object
            this.addGround();
            //Add Walls in the scenario
            this.addWalls();
            //Add Rocks in the scenario
            this.addRocks();
            //Add Logs in the scenario
            this.addLogs();
            //Add the pressure plates in the scenario
            this.addPlates();
            //Reset the first time
            this.resetHazards();
            // Add player controller
            this.addPlayer();
            // Add custom coin imported from Blender
            //this.addCoinMesh();
            // Add death plane to the scene
            this.addDeathPlane();
            // Add Skybox to the scene
            this.addSkyBox();
            this.addBasket();
            this.addBerry();
            // Collision Check
            this.player.addEventListener('collision', function (eventObject) {
                if (eventObject.name === "Ground" || eventObject.name === "Wall") {
                    this.isGrounded = true;
                    createjs.Sound.play("land");
                }
                if (eventObject.name === "Wall") {
                    console.log("WALL HIT");
                }
                if (eventObject.name === "DeathPlane") {
                    createjs.Sound.play("Falling");
                    this.addDeath();
                }
                if (eventObject.name === "Berry") {
                    createjs.Sound.play("Collect");
                    this.collectablePicked(eventObject);
                    console.log("player ate a berry");
                }
                if (eventObject.name === "Basket") {
                    createjs.Sound.play("Collect");
                    this.collectablePicked(eventObject);
                    console.log("player ate a basket");
                }
                if (eventObject.name === "Plate1") {
                    this.add(this.rock1);
                }
                if (eventObject.name === "Plate2") {
                    this.remove(this.ground2);
                    this.remove(this.plate2);
                }
                if (eventObject.name === "Plate3") {
                    //this.render();
                    console.log("Move wall");
                }
                if (eventObject.name === "Plate4") {
                    this.add(this.log);
                }
                if (eventObject.name === "Plate5") {
                    console.log("Add wall to block path");
                    this.add(this.wall4);
                }
                if (eventObject.name === "Rock" || eventObject.name === "Log" && eventObject.position.y > 2) {
                    createjs.Sound.play("Collision");
                    this.addDeath();
                }
                /*
                if (eventObject.name === "Coin") {
                    createjs.Sound.play("coin");
                    this.remove(eventObject);
                    this.setCoinPosition(eventObject);
                    this.scoreValue += 100;
                    this.scoreLabel.text = "SCORE: " + this.scoreValue;
                }*/
            }.bind(this));
            //Rock eventHandler            
            this.rock1.addEventListener('collision', function (eventObject) {
                if (eventObject.name === "Ground" || eventObject.name === "Wall") {
                    this.resetHazards();
                }
            }.bind(this));
            this.log.addEventListener('collision', function (eventObject) {
                if (eventObject.name === "Ground" || eventObject.name === "Wall") {
                    this.resetHazards();
                }
            }.bind(this));
            // create parent-child relationship with camera and player
            this.player.add(camera);
            camera.position.set(0, 1, 0);
            this.simulate();
        };
        /**
         * Pick any collectable function
         *
         * @method collectablePicked
         * @return void
         */
        Level2.prototype.collectablePicked = function (collectable) {
            this.remove(collectable);
            if (collectable.name === "Berry") {
                this.berryNum = this.berryNum === (this.berryLocation.length - 1) ? 0 : (this.berryNum + 1);
                collectable.position.x = this.berryLocation[this.berryNum].x;
                collectable.position.y = this.berryLocation[this.berryNum].y;
                collectable.position.z = this.berryLocation[this.berryNum].z;
                this.scoreValue += 2;
            }
            if (collectable.name === "Basket") {
                this.basketNum = this.basketNum === (this.basketLocation.length - 1) ? 0 : (this.basketNum + 1);
                collectable.position.x = this.basketLocation[this.basketNum].x;
                collectable.position.y = this.basketLocation[this.basketNum].y;
                collectable.position.z = this.basketLocation[this.basketNum].z;
                this.scoreValue += 5;
            }
            this.scoreLabel.text = "SCORE: " + this.scoreValue;
            this.add(collectable);
        };
        /**
         * add death function
         *
         * @method addDeath
         * @return void
         */
        Level2.prototype.addDeath = function () {
            this.livesValue--;
            if (this.livesValue <= 0) {
                // Exit Pointer Lock
                document.exitPointerLock();
                this.children = []; // an attempt to clean up
                //this._isGamePaused = true;
                // Play the Game Over Scene
                currentScene = config.Scene.OVER;
                changeScene();
            }
            else {
                // otherwise reset my player and update Lives
                this.livesLabel.text = "LIVES: " + this.livesValue;
                this.remove(this.player);
                this.player.position.set(0, 20, 0);
                //this.wall4.position.set(-38.2, -2, -2.3);
                this.add(this.player);
            }
        };
        /**
         * add level change function
         *
         * @method addLevelChange
         * @return void
         */
        Level2.prototype.addLevelChange = function () {
            if (this.scoreValue > 1) {
                // Exit Pointer Lock
                document.exitPointerLock();
                this.children = []; // an attempt to clean up
                //this._isGamePaused = true;
                // Play the Level3 Scene
                currentScene = config.Scene.LEVEL3;
                changeScene();
            }
        };
        /**
         * Camera Look function
         *
         * @method cameraLook
         * @return void
         */
        Level2.prototype.cameraLook = function () {
            var zenith = THREE.Math.degToRad(90);
            var nadir = THREE.Math.degToRad(-90);
            var cameraPitch = camera.rotation.x + this.mouseControls.pitch;
            // Constrain the Camera Pitch
            camera.rotation.x = THREE.Math.clamp(cameraPitch, nadir, zenith);
        };
        /**
         * @method update
         * @returns void
         */
        Level2.prototype.update = function () {
            /*
            this.coins.forEach(coin => {
                coin.setAngularFactor(new Vector3(0, 0, 0));
                coin.setAngularVelocity(new Vector3(0, 1, 0));
            });
            */
            this.checkControls();
            this.stage.update();
            if (!this.keyboardControls.paused) {
                this.simulate();
            }
        };
        /**
         * Responds to screen resizes
         *
         * @method resize
         * @return void
         */
        Level2.prototype.resize = function () {
            canvas.style.width = "100%";
            this.livesLabel.x = config.Screen.WIDTH * 0.1;
            this.livesLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.scoreLabel.x = config.Screen.WIDTH * 0.8;
            this.scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.update();
        };
        return Level2;
    }(scenes.Scene));
    scenes.Level2 = Level2;
})(scenes || (scenes = {}));

//# sourceMappingURL=level2.js.map

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * The Scenes module is a namespace to reference all scene objects
 *
 * @module scenes
 */
var scenes;
(function (scenes) {
    /**
     * The Level3 class is where the main action occurs for the game
     *
     * @class Level3
     * @param havePointerLock {boolean}
     */
    var Level3 = (function (_super) {
        __extends(Level3, _super);
        /**
         * @constructor
         */
        function Level3() {
            _super.call(this);
            this.jumpLower = 0;
            this.berryLocation = new Array();
            this.berryNum = 0;
            this.basketLocation = new Array();
            this.basketNum = 0;
            this._initialize();
            this.start();
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++
        /**
         * Sets up the initial canvas for the play scene
         *
         * @method setupCanvas
         * @return void
         */
        Level3.prototype._setupCanvas = function () {
            canvas.setAttribute("width", config.Screen.WIDTH.toString());
            canvas.setAttribute("height", (config.Screen.HEIGHT * 0.1).toString());
            canvas.style.backgroundColor = "#000000";
        };
        /**
        * Sets up the background scene for the play scene
        *
        * @method playBackgroundSound
        * @return void
        */
        Level3.prototype.playBackgroundSound = function () {
            this.bgSound = createjs.Sound.play("Background", { volume: 0.02 });
            this.bgSound.on("complete", this.playBackgroundSound, this);
        };
        /**
         * The initialize method sets up key objects to be used in the scene
         *
         * @method _initialize
         * @returns void
         */
        Level3.prototype._initialize = function () {
            // Create to HTMLElements
            this.blocker = document.getElementById("blocker");
            this.instructions = document.getElementById("instructions");
            this.blocker.style.display = "block";
            // setup canvas for menu scene
            this._setupCanvas();
            this.coinCount = 10;
            this.prevTime = 0;
            this.stage = new createjs.Stage(canvas);
            this.velocity = new Vector3(0, 0, 0);
            // setup a THREE.JS Clock object
            this.clock = new Clock();
            // Instantiate Game Controls
            this.keyboardControls = new objects.KeyboardControls();
            this.mouseControls = new objects.MouseControls();
        };
        /**
         * This method sets up the scoreboard for the scene
         *
         * @method setupScoreboard
         * @returns void
         */
        Level3.prototype.setupScoreboard = function () {
            // initialize  score and lives values
            this.scoreValue = 0;
            this.livesValue = 1;
            // Add Lives Label
            this.livesLabel = new createjs.Text("LIVES: " + this.livesValue, "40px Consolas", "#ffffff");
            this.livesLabel.x = config.Screen.WIDTH * 0.1;
            this.livesLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(this.livesLabel);
            console.log("Added Lives Label to stage");
            // Add Level Label
            this.levelLabel = new createjs.Text("LEVEL 3", "40px Consolas", "#ffffff");
            this.levelLabel.x = config.Screen.WIDTH * 0.45;
            this.levelLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(this.levelLabel);
            console.log("Added Lives Label to stage");
            // Add Score Label
            this.scoreLabel = new createjs.Text("SCORE: " + this.scoreValue, "40px Consolas", "#ffffff");
            this.scoreLabel.x = config.Screen.WIDTH * 0.8;
            this.scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(this.scoreLabel);
            console.log("Added Score Label to stage");
        };
        /**
         * Add lights to the scene
         *
         * @method addLights
         * @return void
         */
        Level3.prototype.addLights = function () {
            // Spot Light
            this.spotLight = new SpotLight(0xffffff);
            this.spotLight.position.set(20, 50, -15);
            this.spotLight.castShadow = true;
            this.spotLight.intensity = 2;
            this.spotLight.lookAt(new Vector3(0, 0, 0));
            this.spotLight.shadowCameraNear = 2;
            this.spotLight.shadowCameraFar = 200;
            this.spotLight.shadowCameraLeft = -5;
            this.spotLight.shadowCameraRight = 5;
            this.spotLight.shadowCameraTop = 5;
            this.spotLight.shadowCameraBottom = -5;
            this.spotLight.shadowMapWidth = 2048;
            this.spotLight.shadowMapHeight = 2048;
            this.spotLight.shadowDarkness = 0.5;
            this.spotLight.name = "Spot Light";
            this.add(this.spotLight);
            //AmbientLight
            this.ambientLight = new AmbientLight(0x404040);
            this.add(this.ambientLight);
            console.log("Added Lights to scene");
        };
        /**
         * Add a ground plane to the scene
         *
         * @method addGround
         * @return void
         */
        Level3.prototype.addGround = function () {
            this.groundTexture = new THREE.TextureLoader().load('../../Assets/images/grass.png');
            this.groundTexture.wrapS = THREE.RepeatWrapping;
            this.groundTexture.wrapT = THREE.RepeatWrapping;
            this.groundTexture.repeat.set(8, 8);
            this.groundMaterial = new PhongMaterial();
            this.groundMaterial.map = this.groundTexture;
            this.groundGeometry = new BoxGeometry(5, 1, 10);
            this.groundPhysicsMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.ground = new Physijs.ConvexMesh(this.groundGeometry, this.groundPhysicsMaterial, 0);
            this.ground.position.set(0, 0, -4);
            this.ground.receiveShadow = true;
            this.ground.name = "Ground";
            this.add(this.ground);
            console.log("Added Burnt Ground to scene");
        };
        /**
         * Add the islands to the scene
         *
         * @method addIslands
         * @return void
         */
        Level3.prototype.addIslands = function () {
            this.islandGeometry = new BoxGeometry(3, .2, 3);
            this.islandPhysicsMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            // left right, height, front
            this.island1 = new Physijs.ConvexMesh(this.islandGeometry, this.islandPhysicsMaterial, 0);
            this.island1.position.set(0, 3, -19);
            this.island1.receiveShadow = true;
            this.island1.name = "Ground";
            this.add(this.island1);
            this.island2 = new Physijs.ConvexMesh(this.islandGeometry, this.islandPhysicsMaterial, 0);
            this.island2.position.set(0, 6, -34);
            this.island2.receiveShadow = true;
            this.island2.name = "Ground";
            this.add(this.island2);
            this.island3 = new Physijs.ConvexMesh(this.islandGeometry, this.islandPhysicsMaterial, 0);
            this.island3.position.set(-17, 6, -34);
            this.island3.receiveShadow = true;
            this.island3.name = "Ground";
            this.add(this.island3);
            this.island4 = new Physijs.ConvexMesh(this.islandGeometry, this.islandPhysicsMaterial, 0);
            this.island4.position.set(17, 6, -34);
            this.island4.receiveShadow = true;
            this.island4.name = "Ground";
            this.add(this.island4);
            this.island5 = new Physijs.ConvexMesh(this.islandGeometry, this.islandPhysicsMaterial, 0);
            this.island5.position.set(17, 9, -19);
            this.island5.receiveShadow = true;
            this.island5.name = "Ground";
            this.add(this.island5);
            this.island6 = new Physijs.ConvexMesh(this.islandGeometry, this.islandPhysicsMaterial, 0);
            this.island6.position.set(-17, 9, -19);
            this.island6.receiveShadow = true;
            this.island6.name = "Ground";
            this.add(this.island6);
            this.islandGeometry = new BoxGeometry(.5, .2, 3);
            this.island7 = new Physijs.ConvexMesh(this.islandGeometry, this.islandPhysicsMaterial, 0);
            this.island7.position.set(21, 6, 2);
            this.island7.receiveShadow = true;
            this.island7.name = "Ground";
            this.add(this.island7);
            this.islandGeometry = new BoxGeometry(.2, .2, 3);
            this.island8 = new Physijs.ConvexMesh(this.islandGeometry, this.islandPhysicsMaterial, 0);
            this.island8.position.set(-21, 6, 2);
            this.island8.receiveShadow = true;
            this.island8.name = "Ground";
            this.add(this.island8);
            this.islandGeometry = new BoxGeometry(3, .2, .2);
            this.island9 = new Physijs.ConvexMesh(this.islandGeometry, this.islandPhysicsMaterial, 0);
            this.island9.position.set(21, 8, 16);
            this.island9.receiveShadow = true;
            this.island9.name = "Ground";
            this.add(this.island9);
            this.islandGeometry = new BoxGeometry(3, .2, .5);
            this.island10 = new Physijs.ConvexMesh(this.islandGeometry, this.islandPhysicsMaterial, 0);
            this.island10.position.set(-21, 8, 16);
            this.island10.receiveShadow = true;
            this.island10.name = "Ground";
            this.add(this.island10);
            this.islandGeometry = new BoxGeometry(1, .2, 1);
            this.island11 = new Physijs.ConvexMesh(this.islandGeometry, this.islandPhysicsMaterial, 0);
            this.island11.position.set(10, 10, 21);
            this.island11.receiveShadow = true;
            this.island11.name = "Ground";
            this.add(this.island11);
            this.island12 = new Physijs.ConvexMesh(this.islandGeometry, this.islandPhysicsMaterial, 0);
            this.island12.position.set(-10, 10, 21);
            this.island12.receiveShadow = true;
            this.island12.name = "Ground";
            this.add(this.island12);
            this.islandGeometry = new BoxGeometry(2, .2, 2);
            this.island13 = new Physijs.ConvexMesh(this.islandGeometry, this.islandPhysicsMaterial, 0);
            this.island13.position.set(0, 12, 26);
            this.island13.receiveShadow = true;
            this.island13.name = "Ground";
            this.add(this.island13);
            this.islandGeometry = new BoxGeometry(3, .2, 3);
            this.island14 = new Physijs.ConvexMesh(this.islandGeometry, this.islandPhysicsMaterial, 0);
            this.island14.position.set(0, 13, 15);
            this.island14.receiveShadow = true;
            this.island14.name = "Ground";
            this.add(this.island14);
            this.islandGeometry = new BoxGeometry(3, .2, 3);
            this.island15 = new Physijs.ConvexMesh(this.islandGeometry, this.islandPhysicsMaterial, 0);
            this.island15.position.set(-8, 16, 10);
            this.island15.receiveShadow = true;
            this.island15.name = "Ground";
            this.add(this.island15);
            this.islandGeometry = new BoxGeometry(3, .2, 3);
            this.island16 = new Physijs.ConvexMesh(this.islandGeometry, this.islandPhysicsMaterial, 0);
            this.island16.position.set(-4, 22, 5);
            this.island16.receiveShadow = true;
            this.island16.name = "Ground";
            this.add(this.island16);
            this.islandGeometry = new BoxGeometry(3, .2, 3);
            this.island17 = new Physijs.ConvexMesh(this.islandGeometry, this.islandPhysicsMaterial, 0);
            this.island17.position.set(0, 29, 10);
            this.island17.receiveShadow = true;
            this.island17.name = "Ground";
            this.add(this.island17);
            this.islandGeometry = new BoxGeometry(3, .2, 3);
            this.island18 = new Physijs.ConvexMesh(this.islandGeometry, this.islandPhysicsMaterial, 0);
            this.island18.position.set(0, 29, -8);
            this.island18.receiveShadow = true;
            this.island18.name = "Ground";
            this.add(this.island18);
            this.islandGeometry = new BoxGeometry(3, .2, 3);
            this.island19 = new Physijs.ConvexMesh(this.islandGeometry, this.islandPhysicsMaterial, 0);
            this.island19.position.set(0, 24, -25);
            this.island19.receiveShadow = true;
            this.island19.name = "Ground";
            this.add(this.island19);
        };
        /**
         * Add walls to the scene
         *
         * @method addWalls
         * @return void
         */
        Level3.prototype.addWalls = function () {
            this.wallTexture = new THREE.TextureLoader().load('../../Assets/images/wall.png');
            this.wallTexture.wrapS = THREE.RepeatWrapping;
            this.wallTexture.wrapT = THREE.RepeatWrapping;
            this.wallTexture.repeat.set(8, 8);
            this.wallMaterial = new PhongMaterial();
            this.wallMaterial.map = this.wallTexture;
            this.wallGeometry = new BoxGeometry(20, 4, .5);
            this.wallPhysicsMaterial = Physijs.createMaterial(this.wallMaterial, 0, 0);
            this.wall1 = new Physijs.ConvexMesh(this.wallGeometry, this.wallPhysicsMaterial, 0);
            this.wall1.position.set(14.2, 2.5, -4.1);
            this.wall1.rotateY(1.5708);
            this.wall1.receiveShadow = true;
            this.wall1.name = "Wall";
            this.add(this.wall1);
            this.wall2 = new Physijs.ConvexMesh(this.wallGeometry, this.wallPhysicsMaterial, 0);
            this.wall2.position.set(6, 2.5, 6.4);
            this.wall2.rotateY(1.5708);
            this.wall2.receiveShadow = true;
            this.wall2.name = "Wall";
            this.add(this.wall2);
            this.wall3 = new Physijs.ConvexMesh(this.wallGeometry, this.wallPhysicsMaterial, 0);
            this.wall3.position.set(-10, 2.5, -6.1);
            this.wall3.rotateY(1.5708);
            this.wall3.receiveShadow = true;
            this.wall3.name = "Wall";
            this.add(this.wall3);
            this.wall4 = new Physijs.ConvexMesh(this.wallGeometry, this.wallPhysicsMaterial, 0);
            this.wall4.position.set(-7.7, 2.5, 9.7);
            this.wall4.receiveShadow = true;
            this.wall4.name = "Wall";
            this.add(this.wall4);
            this.wall5 = new Physijs.ConvexMesh(this.wallGeometry, this.wallPhysicsMaterial, 0);
            this.wall5.position.set(-7.6, 2.5, -3.85);
            this.wall5.receiveShadow = true;
            this.wall5.name = "Wall";
            this.add(this.wall5);
            this.wallGeometry = new BoxGeometry(10, 4, .5);
            this.wall6 = new Physijs.ConvexMesh(this.wallGeometry, this.wallPhysicsMaterial, 0);
            this.wall6.position.set(-1.9, 2.5, -13);
            this.wall6.rotateY(1.5708);
            this.wall6.receiveShadow = true;
            this.wall6.name = "Wall";
            this.add(this.wall6);
        };
        /**
        * Add rocks to the scene - actually it just prepare the rock, who really add it to the scene is the pressure plate
        *
        * @method addRocks
        * @return void
        */
        Level3.prototype.addRocks = function () {
            this.rockTexture = new THREE.TextureLoader().load('../../Assets/images/rock.png');
            this.rockTexture.wrapS = THREE.RepeatWrapping;
            this.rockTexture.wrapT = THREE.RepeatWrapping;
            this.rockMaterial = new PhongMaterial();
            this.rockMaterial.map = this.rockTexture;
            this.rockGeometry = new SphereGeometry(1, 5, 5);
            this.rockPhysicsMaterial = Physijs.createMaterial(this.rockMaterial, 0, 0);
            this.rock1 = new Physijs.ConvexMesh(this.rockGeometry, this.rockPhysicsMaterial, 1);
            this.rock1.position.set(-4, 15, -9);
            this.rock1.receiveShadow = true;
            this.rock1.name = "Rock";
            this.rock2 = new Physijs.ConvexMesh(this.rockGeometry, this.rockPhysicsMaterial, 1);
            this.rock2.position.set(-17, 10, -9);
            this.rock2.receiveShadow = true;
            this.rock2.name = "Rock";
            this.rock3 = new Physijs.ConvexMesh(this.rockGeometry, this.rockPhysicsMaterial, 1);
            this.rock3.position.set(-18, 10, 2);
            this.rock3.receiveShadow = true;
            this.rock3.name = "Rock";
        };
        /**
         * Add Logs to the scene - actually it just prepare the rock, who really add it to the scene is the pressure plate
         *
         * @method addLogs
         * @return void
         */
        Level3.prototype.addLogs = function () {
            this.logTexture = new THREE.TextureLoader().load('../../Assets/images/fallingbranch.png');
            this.logTexture.wrapS = THREE.RepeatWrapping;
            this.logTexture.wrapT = THREE.RepeatWrapping;
            this.logMaterial = new PhongMaterial();
            this.logMaterial.map = this.logTexture;
            this.logGeometry = new CylinderGeometry(1, 1, 10);
            this.logPhysicsMaterial = Physijs.createMaterial(this.logMaterial, 0, 0);
            this.log = new Physijs.ConvexMesh(this.logGeometry, this.logPhysicsMaterial, 1);
            this.log.position.set(4, 15, 10);
            this.log.rotation.x = 1.5708;
            this.log.receiveShadow = true;
            this.log.name = "Log";
        };
        /**
         * Add Pressure Plates to the scene
         *
         * @method addPlates
         * @return void
         */
        Level3.prototype.addPlates = function () {
            this.plateTexture = new THREE.TextureLoader().load('../../Assets/images/PressurePlate.jpg');
            this.plateTexture.wrapS = THREE.RepeatWrapping;
            this.plateTexture.wrapT = THREE.RepeatWrapping;
            this.plateMaterial = new PhongMaterial();
            this.plateMaterial.map = this.plateTexture;
            this.plateGeometry = new CubeGeometry(1, 0.001, 1);
            this.platePhysicsMaterial = Physijs.createMaterial(this.plateMaterial, 0, 0);
            this.plate1 = new Physijs.ConvexMesh(this.plateGeometry, this.platePhysicsMaterial, 0);
            this.plate1.position.set(0, .5, -8);
            this.plate1.receiveShadow = true;
            this.plate1.name = "Plate1";
            this.add(this.plate1);
            this.plate2 = new Physijs.ConvexMesh(this.plateGeometry, this.platePhysicsMaterial, 0);
            this.plate2.position.set(.6, 6.1, -33);
            this.plate2.receiveShadow = true;
            this.plate2.name = "Plate2";
            this.add(this.plate2);
            this.plate3 = new Physijs.ConvexMesh(this.plateGeometry, this.platePhysicsMaterial, 0);
            this.plate3.position.set(4, .5, 9);
            this.plate3.receiveShadow = true;
            this.plate3.name = "Plate3";
            this.add(this.plate3);
        };
        /**
         * Reset all hazards function
         *
         * @method resetHazards
         * @return void
         */
        Level3.prototype.resetHazards = function () {
            this.remove(this.rock1);
            this.remove(this.rock2);
            this.remove(this.rock3);
            this.remove(this.log);
            this.rock1.position.set(0, 13, -15);
            this.rock2.position.set(-17, 10, -8);
            this.rock3.position.set(-18, 10, 2);
            this.log.position.set(4, 15, 10);
        };
        /**
         * Adds the player controller to the scene
         *
         * @method addPlayer
         * @return void
         */
        Level3.prototype.addPlayer = function () {
            // Player Object
            this.playerGeometry = new BoxGeometry(2, 4, 2);
            this.playerMaterial = Physijs.createMaterial(new LambertMaterial({ color: 0x00ff00 }), 0.4, 0);
            this.player = new Physijs.BoxMesh(this.playerGeometry, this.playerMaterial, 1);
            this.player.position.set(0, 10, 0);
            //this.player.position.set(0, 13, 26);
            this.player.receiveShadow = true;
            this.player.castShadow = true;
            this.player.name = "Player";
            this.add(this.player);
            console.log("Added Player to Scene");
            this.player.setAngularFactor(new THREE.Vector3(0, 0, 0));
        };
        /**
         * Add the death plane to the scene
         *
         * @method addDeathPlane
         * @return void
         */
        Level3.prototype.addDeathPlane = function () {
            this.deathPlaneGeometry = new BoxGeometry(500, 1, 500);
            this.deathPlaneMaterial = new THREE.MeshLambertMaterial({ color: 0xE5E5FF, transparent: true, opacity: 0.1 });
            this.deathPlane = new Physijs.BoxMesh(this.deathPlaneGeometry, this.deathPlaneMaterial, 0);
            this.deathPlane.position.set(0, -20, 0);
            this.deathPlane.name = "DeathPlane";
            this.add(this.deathPlane);
            console.log("Added DeathPlane to scene");
        };
        /**
         * Add the Skybox to the scene
         *
         * @method addSkyBox
         * @return void
         */
        Level3.prototype.addSkyBox = function () {
            this.skyBoxTexture = new THREE.TextureLoader().load('../../Assets/images/skyBG.png');
            this.skyBox = new gameObject(new SphereGeometry(60, 60, 60), new LambertMaterial({ map: this.skyBoxTexture }), 2, 2, 2);
            this.skyBox.material.side = THREE.DoubleSide;
            this.skyBox.name = "Skybox";
            this.add(this.skyBox);
            console.log("Added skyBox to scene");
        };
        /**
         * Add Berry to the scene
         *
         * @method addBerry
         * @return void
         */
        Level3.prototype.addBerry = function () {
            this.berryTexture = new THREE.TextureLoader().load('../../Assets/images/berry.png');
            this.berryTexture.wrapS = THREE.RepeatWrapping;
            this.berryTexture.wrapT = THREE.RepeatWrapping;
            this.berryMaterial = new PhongMaterial();
            this.berryMaterial.map = this.berryTexture;
            this.berryGeometry = new BoxGeometry(.5, .5, .5);
            this.berryPhysicsMaterial = Physijs.createMaterial(this.berryMaterial, 0, 0);
            this.berry = new Physijs.ConvexMesh(this.berryGeometry, this.berryPhysicsMaterial, 0);
            this.berry.position.set(-8.5, 1.5, -5.5);
            this.berry.receiveShadow = true;
            this.berry.name = "Berry";
            this.add(this.berry);
            console.log("Added Berry to scene");
        };
        /**
         * Add Basket to the scene
         *
         * @method addBasket
         * @return void
         */
        Level3.prototype.addBasket = function () {
            this.basketTexture = new THREE.TextureLoader().load('../../Assets/images/bask.png');
            this.basketTexture.wrapS = THREE.RepeatWrapping;
            this.basketTexture.wrapT = THREE.RepeatWrapping;
            this.basketMaterial = new PhongMaterial();
            this.basketMaterial.map = this.basketTexture;
            this.basketGeometry = new BoxGeometry(.5, .5, .5);
            this.basketPhysicsMaterial = Physijs.createMaterial(this.basketMaterial, 0, 0);
            this.basket = new Physijs.ConvexMesh(this.basketGeometry, this.basketPhysicsMaterial, 0);
            this.basket.position.set(-16, 3, 14);
            this.basket.receiveShadow = true;
            this.basket.name = "Basket";
            this.add(this.basket);
            console.log("Added basket to scene");
        };
        /**
         * This method adds a coin to the scene
         *
         * @method addCoinMesh
         * @return void
         */
        Level3.prototype.addCoinMesh = function () {
            var self = this;
            this.coins = new Array(); // Instantiate a convex mesh array
            var coinLoader = new THREE.JSONLoader().load("../../Assets/imported/coin.json", function (geometry) {
                var phongMaterial = new PhongMaterial({ color: 0xE7AB32 });
                phongMaterial.emissive = new THREE.Color(0xE7AB32);
                var coinMaterial = Physijs.createMaterial((phongMaterial), 0.4, 0.6);
                for (var count = 0; count < self.coinCount; count++) {
                    self.coins[count] = new Physijs.ConvexMesh(geometry, coinMaterial);
                    self.coins[count].receiveShadow = true;
                    self.coins[count].castShadow = true;
                    self.coins[count].name = "Coin";
                    self.setCoinPosition(self.coins[count]);
                    console.log("Added Coin Mesh to Scene, at position: " + self.coins[count].position);
                }
            });
        };
        /**
         * This method randomly sets the coin object's position
         *
         * @method setCoinPosition
         * @return void
         */
        Level3.prototype.setCoinPosition = function (coin) {
            var randomPointX = Math.floor(Math.random() * 20) - 10;
            var randomPointZ = Math.floor(Math.random() * 20) - 10;
            coin.position.set(randomPointX, 10, randomPointZ);
            console.log(randomPointX);
            console.log(randomPointZ);
            this.add(coin);
        };
        /**
         * Event Handler method for any pointerLockChange events
         *
         * @method pointerLockChange
         * @return void
         */
        Level3.prototype.pointerLockChange = function (event) {
            if (document.pointerLockElement === this.element) {
                // enable our mouse and keyboard controls
                this.keyboardControls.enabled = true;
                this.mouseControls.enabled = true;
                this.blocker.style.display = 'none';
            }
            else {
                if (this.livesValue <= 0) {
                    this.blocker.style.display = 'none';
                    document.removeEventListener('pointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('mozpointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('webkitpointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('pointerlockerror', this.pointerLockError.bind(this), false);
                    document.removeEventListener('mozpointerlockerror', this.pointerLockError.bind(this), false);
                    document.removeEventListener('webkitpointerlockerror', this.pointerLockError.bind(this), false);
                }
                else {
                    this.blocker.style.display = '-webkit-box';
                    this.blocker.style.display = '-moz-box';
                    this.blocker.style.display = 'box';
                    this.instructions.style.display = '';
                }
                // disable our mouse and keyboard controls
                this.keyboardControls.enabled = false;
                this.mouseControls.enabled = false;
                console.log("PointerLock disabled");
            }
        };
        /**
         * Event handler for PointerLockError
         *
         * @method pointerLockError
         * @return void
         */
        Level3.prototype.pointerLockError = function (event) {
            this.instructions.style.display = '';
            console.log("PointerLock Error Detected!!");
        };
        // Check Controls Function
        /**
         * This method updates the player's position based on user input
         *
         * @method checkControls
         * @return void
         */
        Level3.prototype.checkControls = function () {
            if (this.keyboardControls.enabled) {
                this.velocity = new Vector3();
                var time = performance.now();
                var delta = (time - this.prevTime) / 1000;
                var speed = 600.0;
                //if (this.isGrounded) {
                var direction = new Vector3(0, 0, 0);
                if (this.keyboardControls.moveForward) {
                    this.velocity.z -= speed * delta;
                }
                if (this.keyboardControls.moveLeft) {
                    this.velocity.x -= speed * delta;
                }
                if (this.keyboardControls.moveBackward) {
                    console.log(this.player.position);
                    this.velocity.z += speed * delta;
                }
                if (this.keyboardControls.moveRight) {
                    this.velocity.x += speed * delta;
                }
                if (this.keyboardControls.jump && this.isGrounded) {
                    if (this.player.position.y >= (this.jumpLower - .3) && this.player.position.y <= (this.jumpLower + 3)) {
                        this.velocity.y += 10 * speed * delta;
                    }
                    else if (this.player.position.y > (this.jumpLower + 3)) {
                        this.isGrounded = false;
                        createjs.Sound.play("jump");
                    }
                }
                this.player.setDamping(0.7, 0.1);
                // Changing player's rotation
                this.player.setAngularVelocity(new Vector3(0, this.mouseControls.yaw, 0));
                direction.addVectors(direction, this.velocity);
                direction.applyQuaternion(this.player.quaternion);
                if (Math.abs(this.player.getLinearVelocity().x) < 20 && Math.abs(this.player.getLinearVelocity().y) < 10) {
                    this.player.applyCentralForce(direction);
                }
                this.cameraLook();
                //} // isGrounded ends
                //reset Pitch and Yaw
                this.mouseControls.pitch = 0;
                this.mouseControls.yaw = 0;
                this.prevTime = time;
            } // Controls Enabled ends
            else {
                this.player.setAngularVelocity(new Vector3(0, 0, 0));
            }
        };
        Level3.prototype._unpauseSimulation = function () {
            scene.onSimulationResume();
            console.log("resume simulation");
        };
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * The start method is the main method for the scene class
         *
         * @method start
         * @return void
         */
        Level3.prototype.start = function () {
            var _this = this;
            // Set Up Scoreboard
            this.setupScoreboard();
            // Set Up background sound
            this.playBackgroundSound();
            //check to see if pointerlock is supported
            this.havePointerLock = 'pointerLockElement' in document ||
                'mozPointerLockElement' in document ||
                'webkitPointerLockElement' in document;
            //define berry positions        
            this.berryLocation.push(new THREE.Vector3(-8.5, 1.5, -5.5));
            this.berryLocation.push(new THREE.Vector3(-2, 1.5, 16));
            this.berryLocation.push(new THREE.Vector3(17, 1.5, 0));
            this.berryLocation.push(new THREE.Vector3(-15, 1.5, -2));
            //define basket positions
            this.basketLocation.push(new THREE.Vector3(-16, 3, 14));
            this.basketLocation.push(new THREE.Vector3(15, 3, 16));
            this.basketLocation.push(new THREE.Vector3(-15, 3, -16));
            this.basketLocation.push(new THREE.Vector3(17, 3, -15));
            // Check to see if we have pointerLock
            if (this.havePointerLock) {
                this.element = document.body;
                this.instructions.addEventListener('click', function () {
                    // Ask the user for pointer lock
                    console.log("Requesting PointerLock");
                    _this.element.requestPointerLock = _this.element.requestPointerLock ||
                        _this.element.mozRequestPointerLock ||
                        _this.element.webkitRequestPointerLock;
                    _this.element.requestPointerLock();
                });
                document.addEventListener('pointerlockchange', this.pointerLockChange.bind(this), false);
                document.addEventListener('mozpointerlockchange', this.pointerLockChange.bind(this), false);
                document.addEventListener('webkitpointerlockchange', this.pointerLockChange.bind(this), false);
                document.addEventListener('pointerlockerror', this.pointerLockError.bind(this), false);
                document.addEventListener('mozpointerlockerror', this.pointerLockError.bind(this), false);
                document.addEventListener('webkitpointerlockerror', this.pointerLockError.bind(this), false);
            }
            // Scene changes for Physijs
            this.name = "Main";
            this.fog = new THREE.Fog(0xffffff, 0, 750);
            this.setGravity(new THREE.Vector3(0, -10, 0));
            // start simulation
            /*
            this.addEventListener('update', this._simulateScene);
            console.log("Start Simulation"); */
            // Add Spot Light to the scene
            this.addLights();
            // Ground Object
            this.addGround();
            //Add all the island arround the main ground
            this.addIslands();
            //Add Walls in the scenario
            //this.addWalls();
            //Add Rocks in the scenario
            this.addRocks();
            //Add Logs in the scenario
            this.addLogs();
            //Add the pressure plates in the scenario
            this.addPlates();
            //Reset the first time
            this.resetHazards();
            // Add player controller
            this.addPlayer();
            // Add custom coin imported from Blender
            //this.addCoinMesh();
            // Add death plane to the scene
            this.addDeathPlane();
            // Add Skybox to the scene
            this.addSkyBox();
            //this.addBasket();
            //this.addBerry();
            // Collision Check
            this.player.addEventListener('collision', function (eventObject) {
                if (eventObject.name === "Ground" || eventObject.name === "Wall") {
                    this.jumpLower = this.player.position.y;
                    this.isGrounded = true;
                    createjs.Sound.play("land");
                }
                if (eventObject.name === "DeathPlane") {
                    createjs.Sound.play("Falling");
                    this.addDeath();
                }
                if (eventObject.name === "Berry") {
                    createjs.Sound.play("Collect");
                    this.collectablePicked(eventObject);
                    console.log("player ate a berry");
                }
                if (eventObject.name === "Basket") {
                    createjs.Sound.play("Collect");
                    this.collectablePicked(eventObject);
                    console.log("player ate a basket");
                }
                if (eventObject.name === "Plate1") {
                    this.add(this.rock1);
                }
                if (eventObject.name === "Plate2") {
                    //this.add(this.rock2);
                    //this.add(this.rock3);
                    this.remove(this.island2);
                    this.remove(this.plate2);
                }
                if (eventObject.name === "Plate3") {
                    this.add(this.log);
                }
                if (eventObject.name === "Rock" || eventObject.name === "Log" && eventObject.position.y > 2) {
                    createjs.Sound.play("Collision");
                    this.addDeath();
                }
                /*
                if (eventObject.name === "Coin") {
                    createjs.Sound.play("coin");
                    this.remove(eventObject);
                    this.setCoinPosition(eventObject);
                    this.scoreValue += 100;
                    this.scoreLabel.text = "SCORE: " + this.scoreValue;
                }*/
            }.bind(this));
            //Rock eventHandler            
            this.rock1.addEventListener('collision', function (eventObject) {
                if (eventObject.name === "Ground" || eventObject.name === "DeathPlane") {
                    this.resetHazards();
                }
            }.bind(this));
            this.rock2.addEventListener('collision', function (eventObject) {
                if (eventObject.name === "Ground" || eventObject.name === "DeathPlane") {
                    this.resetHazards();
                }
            }.bind(this));
            this.rock3.addEventListener('collision', function (eventObject) {
                if (eventObject.name === "Ground" || eventObject.name === "DeathPlane") {
                    this.resetHazards();
                }
            }.bind(this));
            this.log.addEventListener('collision', function (eventObject) {
                if (eventObject.name === "Ground" || eventObject.name === "DeathPlane") {
                    this.resetHazards();
                }
            }.bind(this));
            // create parent-child relationship with camera and player
            this.player.add(camera);
            camera.position.set(0, 1, 0);
            this.simulate();
        };
        /**
         * Pick any collectable function
         *
         * @method collectablePicked
         * @return void
         */
        Level3.prototype.collectablePicked = function (collectable) {
            this.remove(collectable);
            if (collectable.name === "Berry") {
                this.berryNum = this.berryNum === (this.berryLocation.length - 1) ? 0 : (this.berryNum + 1);
                collectable.position.x = this.berryLocation[this.berryNum].x;
                collectable.position.y = this.berryLocation[this.berryNum].y;
                collectable.position.z = this.berryLocation[this.berryNum].z;
                this.scoreValue += 2;
            }
            if (collectable.name === "Basket") {
                this.basketNum = this.basketNum === (this.basketLocation.length - 1) ? 0 : (this.basketNum + 1);
                collectable.position.x = this.basketLocation[this.basketNum].x;
                collectable.position.y = this.basketLocation[this.basketNum].y;
                collectable.position.z = this.basketLocation[this.basketNum].z;
                this.scoreValue += 5;
            }
            this.scoreLabel.text = "SCORE: " + this.scoreValue;
            this.add(collectable);
        };
        /**
         * add death function
         *
         * @method addDeath
         * @return void
         */
        Level3.prototype.addDeath = function () {
            this.livesValue--;
            if (this.livesValue <= 0) {
                // Exit Pointer Lock
                document.exitPointerLock();
                this.children = []; // an attempt to clean up
                //this._isGamePaused = true;
                // Play the Game Over Scene
                currentScene = config.Scene.OVER;
                changeScene();
            }
            else {
                // otherwise reset my player and update Lives
                this.livesLabel.text = "LIVES: " + this.livesValue;
                this.remove(this.player);
                this.player.position.set(0, 20, 0);
                this.add(this.player);
            }
        };
        /**
         * add level change function
         *
         * @method addLevelChange
         * @return void
         */
        Level3.prototype.addLevelChange = function () {
            if (this.scoreValue > 1) {
                this.children = []; // an attempt to clean up
                //this._isGamePaused = true;
                // Play the Level2 Scene
                currentScene = config.Scene.OVER;
                changeScene();
            }
        };
        /**
         * Camera Look function
         *
         * @method cameraLook
         * @return void
         */
        Level3.prototype.cameraLook = function () {
            var zenith = THREE.Math.degToRad(90);
            var nadir = THREE.Math.degToRad(-90);
            var cameraPitch = camera.rotation.x + this.mouseControls.pitch;
            // Constrain the Camera Pitch
            camera.rotation.x = THREE.Math.clamp(cameraPitch, nadir, zenith);
        };
        /**
         * @method update
         * @returns void
         */
        Level3.prototype.update = function () {
            /*
            this.coins.forEach(coin => {
                coin.setAngularFactor(new Vector3(0, 0, 0));
                coin.setAngularVelocity(new Vector3(0, 1, 0));
            });
            */
            this.checkControls();
            this.stage.update();
            this.addLevelChange();
            if (!this.keyboardControls.paused) {
                this.simulate();
            }
        };
        /**
         * Responds to screen resizes
         *
         * @method resize
         * @return void
         */
        Level3.prototype.resize = function () {
            canvas.style.width = "100%";
            this.livesLabel.x = config.Screen.WIDTH * 0.1;
            this.livesLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.scoreLabel.x = config.Screen.WIDTH * 0.8;
            this.scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.update();
        };
        return Level3;
    }(scenes.Scene));
    scenes.Level3 = Level3;
})(scenes || (scenes = {}));

//# sourceMappingURL=level3.js.map

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
     * This class instantiates the game over scene object
     *
     * @class Over
     * @extends scenes.Scene
     */
    var Over = (function (_super) {
        __extends(Over, _super);
        /**
         * Empty Contructor
         *
         * @constructor
         */
        function Over() {
            _super.call(this);
            this._initialize();
            this.start();
        }
        Over.prototype._setupCanvas = function () {
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
        Over.prototype._initialize = function () {
            // Create to HTMLElements
            this._blocker = document.getElementById("blocker");
            this._blocker.style.display = "none";
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
        Over.prototype.start = function () {
            this._bgImage = new createjs.Bitmap(assets.getResult("MenuBackground"));
            this._bgImage.scaleX = 2;
            this._bgImage.scaleY = 2;
            this._stage.addChild(this._bgImage);
            this._gameOverLabel = new createjs.Text("GAME OVER", "80px Consolas", "#000000");
            this._gameOverLabel.regX = this._gameOverLabel.getMeasuredWidth() * 0.5;
            this._gameOverLabel.regY = this._gameOverLabel.getMeasuredLineHeight() * 0.5;
            this._gameOverLabel.x = config.Screen.WIDTH * 0.5;
            this._gameOverLabel.y = config.Screen.HEIGHT * 0.5;
            this._stage.addChild(this._gameOverLabel);
            this._restartButton = new createjs.Bitmap(assets.getResult("RestartButton"));
            this._restartButton.regX = this._restartButton.getBounds().width * 0.5;
            this._restartButton.regY = this._restartButton.getBounds().height * 0.5;
            this._restartButton.x = config.Screen.WIDTH * 0.5;
            this._restartButton.y = (config.Screen.HEIGHT * 0.5) + 150;
            this._stage.addChild(this._restartButton);
            this._restartButton.on("mouseover", function (event) {
                event.target.alpha = 0.7;
            });
            this._restartButton.on("mouseout", function (event) {
                event.target.alpha = 1.0;
            });
            this._restartButton.on("click", function (event) {
                currentScene = config.Scene.MENU;
                changeScene();
            });
        };
        /**
         * The update method updates the animation loop and other objects
         *
         * @method update
         * @return void
         */
        Over.prototype.update = function () {
            this._stage.update();
        };
        /**
         * The resize method is a procedure that sets variables and objects on screen resize
         *
         * @method resize
         * @return void
         */
        Over.prototype.resize = function () {
            this._setupCanvas();
        };
        return Over;
    }(scenes.Scene));
    scenes.Over = Over;
})(scenes || (scenes = {}));

//# sourceMappingURL=over.js.map

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
     * @class Help
     * @extends scenes.Scene
     */
    var Help = (function (_super) {
        __extends(Help, _super);
        /**
         * Empty Contructor
         *
         * @constructor
         */
        function Help() {
            _super.call(this);
            this._initialize();
            this.start();
        }
        Help.prototype._setupCanvas = function () {
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
        Help.prototype._initialize = function () {
            // Create to HTMLElements
            this._blocker = document.getElementById("blocker");
            this._blocker.style.display = "none";
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
        Help.prototype.start = function () {
            this._bgImage = new createjs.Bitmap(assets.getResult("MenuBackground"));
            this._bgImage.scaleX = 2;
            this._bgImage.scaleY = 2;
            this._stage.addChild(this._bgImage);
            this._gameHelpLabel = new createjs.Text("GAME Help", "80px Consolas", "#000000");
            this._gameHelpLabel.regX = this._gameHelpLabel.getMeasuredWidth() * 0.5;
            this._gameHelpLabel.regY = this._gameHelpLabel.getMeasuredLineHeight() * 0.5;
            this._gameHelpLabel.x = config.Screen.WIDTH * 0.5;
            this._gameHelpLabel.y = config.Screen.HEIGHT * 0.5;
            this._stage.addChild(this._gameHelpLabel);
            this._startButton = new createjs.Bitmap(assets.getResult("StartButton"));
            this._startButton.regX = this._startButton.getBounds().width * 0.5;
            this._startButton.regY = this._startButton.getBounds().height * 0.5;
            this._startButton.x = config.Screen.WIDTH * 0.5;
            this._startButton.y = (config.Screen.HEIGHT * 0.5) + 150;
            this._stage.addChild(this._startButton);
            this._startButton.on("mouseover", function (event) {
                event.target.alpha = 0.7;
            });
            this._startButton.on("mouseout", function (event) {
                event.target.alpha = 1.0;
            });
            this._startButton.on("click", function (event) {
                currentScene = config.Scene.MENU;
                changeScene();
            });
            this._backButton = new createjs.Bitmap(assets.getResult("BackButton"));
            this._backButton.regX = this._backButton.getBounds().width * 0.5;
            this._backButton.regY = this._backButton.getBounds().height * 0.5;
            this._backButton.x = config.Screen.WIDTH * 0.5;
            this._backButton.y = (config.Screen.HEIGHT * 0.5) + 250;
            this._stage.addChild(this._backButton);
            this._backButton.on("mouseover", function (event) {
                event.target.alpha = 0.7;
            });
            this._backButton.on("mouseout", function (event) {
                event.target.alpha = 1.0;
            });
            this._backButton.on("click", function (event) {
                currentScene = config.Scene.MENU;
                changeScene();
            });
        };
        /**
         * The update method updates the animation loop and other objects
         *
         * @method update
         * @return void
         */
        Help.prototype.update = function () {
            this._stage.update();
        };
        /**
         * The resize method is a procedure that sets variables and objects on screen resize
         *
         * @method resize
         * @return void
         */
        Help.prototype.resize = function () {
            this._setupCanvas();
        };
        return Help;
    }(scenes.Scene));
    scenes.Help = Help;
})(scenes || (scenes = {}));

//# sourceMappingURL=help.js.map

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
    var Menu = (function (_super) {
        __extends(Menu, _super);
        /**
         * Empty Constructor - calls _initialize and start methods
         *
         * @constructor
         */
        function Menu() {
            _super.call(this);
            this._initialize();
            this.start();
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        Menu.prototype._setupCanvas = function () {
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
        Menu.prototype._initialize = function () {
            // Create to HTMLElements
            this._blocker = document.getElementById("blocker");
            this._blocker.style.display = "none";
            // setup canvas for menu scene
            this._setupCanvas();
            // setup a stage on the canvas
            this._stage = new createjs.Stage(canvas);
            this._stage.enableMouseOver(20);
        };
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * The start method is the main method for the scene class
         *
         * @method start
         * @return void
         */
        Menu.prototype.start = function () {
            this._bgImage = new createjs.Bitmap(assets.getResult("MenuBackground"));
            this._bgImage.scaleX = 2;
            this._bgImage.scaleY = 2;
            this._stage.addChild(this._bgImage);
            this._logoImage = new createjs.Bitmap(assets.getResult("CompanyLogo"));
            this._logoImage.x = config.Screen.WIDTH / 2 - (this._logoImage.getBounds().width / 2);
            this._logoImage.y = config.Screen.HEIGHT * 0.07;
            this._stage.addChild(this._logoImage);
            this._gameLabel = new createjs.Text("AMAZE SKY GAME", "80px Consolas", "#000000");
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
            this._startButton.on("mouseover", function (event) {
                event.target.alpha = 0.7;
            });
            this._startButton.on("mouseout", function (event) {
                event.target.alpha = 1.0;
            });
            this._startButton.on("click", function (event) {
                currentScene = config.Scene.LEVEL2;
                changeScene();
            });
            this._helpButton = new createjs.Bitmap(assets.getResult("HelpButton"));
            this._helpButton.regX = this._helpButton.getBounds().width * 0.5;
            this._helpButton.regY = this._helpButton.getBounds().height * 0.5;
            this._helpButton.x = config.Screen.WIDTH * 0.5;
            this._helpButton.y = (config.Screen.HEIGHT * 0.5) + 250;
            this._stage.addChild(this._helpButton);
            this._helpButton.on("mouseover", function (event) {
                event.target.alpha = 0.7;
            });
            this._helpButton.on("mouseout", function (event) {
                event.target.alpha = 1.0;
            });
            this._helpButton.on("click", function (event) {
                currentScene = config.Scene.HELP;
                changeScene();
            });
            this._exitButton = new createjs.Bitmap(assets.getResult("ExitButton"));
            this._exitButton.regX = this._exitButton.getBounds().width * 0.5;
            this._exitButton.regY = this._exitButton.getBounds().height * 0.5;
            this._exitButton.x = config.Screen.WIDTH * 0.5;
            this._exitButton.y = (config.Screen.HEIGHT * 0.5) + 350;
            this._stage.addChild(this._exitButton);
            this._exitButton.on("mouseover", function (event) {
                event.target.alpha = 0.7;
            });
            this._exitButton.on("mouseout", function (event) {
                event.target.alpha = 1.0;
            });
            this._exitButton.on("click", function (event) {
                alert("LEAVE THE GAME");
            });
        };
        /**
         * The update method updates the animation loop and other objects
         *
         * @method update
         * @return void
         */
        Menu.prototype.update = function () {
            this._stage.update();
        };
        /**
         * The resize method is a procedure that sets variables and objects on screen resize
         *
         * @method resize
         * @return void
         */
        Menu.prototype.resize = function () {
            this._setupCanvas();
        };
        return Menu;
    }(scenes.Scene));
    scenes.Menu = Menu;
})(scenes || (scenes = {}));

//# sourceMappingURL=menu.js.map

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/keyboardcontrols.ts" />
/// <reference path="../objects/mousecontrols.ts" />
/// <reference path="../config/screen.ts"/>
/// <reference path="../scenes/scene.ts" />
/// <reference path="../scenes/level1.ts" />
/// <reference path="../scenes/level2.ts" />
/// <reference path="../scenes/level3.ts" />
/// <reference path="../scenes/over.ts" />
/// <reference path="../scenes/menu.ts" />
/// <reference path="../scenes/help.ts" /> 

//# sourceMappingURL=_reference.js.map

/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = Physijs.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var CylinderGeometry = THREE.CylinderGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var LineBasicMaterial = THREE.LineBasicMaterial;
var PhongMaterial = THREE.MeshPhongMaterial;
var Material = THREE.Material;
var Texture = THREE.Texture;
var Line = THREE.Line;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var CScreen = config.Screen;
var Clock = THREE.Clock;
var ImageUtils = THREE.ImageUtils;
//Custom Game Objects
var gameObject = objects.GameObject;
// Setup a Web Worker for Physijs
Physijs.scripts.worker = "/Scripts/lib/Physijs/physijs_worker.js";
Physijs.scripts.ammo = "/Scripts/lib/Physijs/examples/js/ammo.js";
var myWorker = new Worker(Physijs.scripts.worker);
console.log(myWorker);
// Game Variables
var scene;
var currentScene;
var renderer;
var camera;
var level1;
var level2;
var level3;
var menu;
var over;
var help;
var stats;
var canvas;
var assets;
var manifest = [
    { id: "land", src: "../../Assets/audio/Land.wav" },
    { id: "hit", src: "../../Assets/audio/hit.wav" },
    { id: "coin", src: "../../Assets/audio/coin.mp3" },
    { id: "jump", src: "../../Assets/audio/Jump.wav" },
    { id: "Collision", src: "../../Assets/sounds/collision.mp3" },
    { id: "Collect", src: "../../Assets/sounds/collecting.mp3" },
    { id: "Falling", src: "../../Assets/sounds/falling.mp3" },
    { id: "Background", src: "../../Assets/sounds/background.mp3" },
    { id: "StartButton", src: "../../Assets/images/StartButton.png" },
    { id: "RestartButton", src: "../../Assets/images/RestartButton.png" },
    { id: "HelpButton", src: "../../Assets/images/HelpButton.png" },
    { id: "BackButton", src: "../../Assets/images/BackButton.png" },
    { id: "ExitButton", src: "../../Assets/images/ExitButton.png" },
    { id: "MenuBackground", src: "../../Assets/images/menuBg.jpg" },
    { id: "CompanyLogo", src: "../../Assets/images/comapanyLogo.png" },
];
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this);
    assets.loadManifest(manifest);
}
function setupCanvas() {
    canvas = document.getElementById("canvas");
    canvas.setAttribute("width", config.Screen.WIDTH.toString());
    canvas.setAttribute("height", (config.Screen.HEIGHT * 0.1).toString());
    canvas.style.backgroundColor = "#000000";
}
function init() {
    // setup the canvas for the game
    setupCanvas();
    // setup the default renderer
    setupRenderer();
    // setup the camera
    setupCamera();
    // set initial scene
    currentScene = config.Scene.MENU;
    changeScene();
    // Add framerate stats
    addStatsObject();
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    // setup the resize event listener
    window.addEventListener('resize', onWindowResize, false);
}
// Window Resize Event Handler
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    scene.resize();
}
// Add Frame Rate Stats to the Scene
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}
// Setup main game loop
function gameLoop() {
    stats.update();
    scene.update();
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer({ antialias: true });
    renderer.setClearColor(0x404040, 1.0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
    renderer.shadowMap.enabled = true;
    renderer.autoClear = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(35, config.Screen.RATIO, 0.1, 100);
    //camera.position.set(0, 10, 30);
    //camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera...");
}
function changeScene() {
    // Launch various scenes
    switch (currentScene) {
        case config.Scene.MENU:
            // show the MENU scene
            menu = new scenes.Menu();
            scene = menu;
            console.log("Starting MENU Scene");
            break;
        case config.Scene.LEVEL1:
            // show the LEVEL1 scene
            level1 = new scenes.Level1();
            scene = level1;
            console.log("Starting LEVEL1 Scene");
            break;
        case config.Scene.LEVEL2:
            // show the LEVEL2 scene
            level2 = new scenes.Level2();
            scene = level2;
            console.log("Starting LEVEL2 Scene");
            break;
        case config.Scene.LEVEL3:
            // show the LEVEL3 scene
            level3 = new scenes.Level3();
            scene = level3;
            console.log("Starting LEVEL3 Scene");
            break;
        case config.Scene.OVER:
            // show the game OVER scene
            over = new scenes.Over();
            scene = over;
            console.log("Starting OVER Scene");
            break;
        case config.Scene.HELP:
            // show the game HELP scene
            help = new scenes.Help();
            scene = help;
            console.log("Starting HELP Scene");
            break;
    }
}
window.onload = preload;

//# sourceMappingURL=game.js.map
