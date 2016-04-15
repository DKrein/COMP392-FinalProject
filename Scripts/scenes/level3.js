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
            // Add Lives Label
            this.livesLabel = new createjs.Text("LIVES: " + gameController.lives, "40px Consolas", "#ffffff");
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
            this.scoreLabel = new createjs.Text("SCORE: " + gameController.score, "40px Consolas", "#ffffff");
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
            this.islandGeometry = new BoxGeometry(.7, .2, .7);
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
            //this island is added pressing the pressure plate 4
            this.islandGeometry = new BoxGeometry(3, .2, 3);
            this.island16 = new Physijs.ConvexMesh(this.islandGeometry, this.islandPhysicsMaterial, 0);
            this.island16.position.set(-4, 22, 5);
            this.island16.receiveShadow = true;
            this.island16.name = "Ground";
            //this island is added pressing the pressure plate 5           
            this.islandGeometry = new BoxGeometry(3, .2, 3);
            this.island17 = new Physijs.ConvexMesh(this.islandGeometry, this.islandPhysicsMaterial, 0);
            this.island17.position.set(0, 29, 10);
            this.island17.receiveShadow = true;
            this.island17.name = "Ground";
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
            this.wallGeometry = new BoxGeometry(4, 4, .5);
            this.wallPhysicsMaterial = Physijs.createMaterial(this.wallMaterial, 0, 0);
            this.wall1 = new Physijs.ConvexMesh(this.wallGeometry, this.wallPhysicsMaterial, 0);
            this.wall1.position.set(-22.5, 9, 0);
            //this.wall1.rotateY(1.5708);
            this.wall1.receiveShadow = true;
            this.wall1.name = "Wall";
            this.wallTexture = new THREE.TextureLoader().load('../../Assets/images/wallEnd.png');
            this.wallTexture.wrapS = THREE.RepeatWrapping;
            this.wallTexture.wrapT = THREE.RepeatWrapping;
            this.wallTexture.repeat.set(1, 1);
            this.wallMaterial = new PhongMaterial();
            this.wallMaterial.map = this.wallTexture;
            this.wallGeometry = new BoxGeometry(3, 3, .1);
            this.wallPhysicsMaterial = Physijs.createMaterial(this.wallMaterial, 0, 0);
            this.wallGoal = new Physijs.ConvexMesh(this.wallGeometry, this.wallPhysicsMaterial, 0);
            this.wallGoal.position.set(0, 26, -29);
            this.wallGoal.receiveShadow = true;
            this.wallGoal.name = "WallGoal";
            this.add(this.wallGoal);
            /*
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
            */
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
            this.plateGeometry = new CubeGeometry(.7, 0.001, 1);
            this.plate2 = new Physijs.ConvexMesh(this.plateGeometry, this.platePhysicsMaterial, 0);
            this.plate2.position.set(1, 6.1, -33);
            this.plate2.receiveShadow = true;
            this.plate2.name = "Plate2";
            this.add(this.plate2);
            this.plateGeometry = new CubeGeometry(1, 0.001, 1);
            this.plate3 = new Physijs.ConvexMesh(this.plateGeometry, this.platePhysicsMaterial, 0);
            this.plate3.position.set(-18, 9.1, -18);
            this.plate3.receiveShadow = true;
            this.plate3.name = "Plate3";
            this.add(this.plate3);
            //this pressure plates are good for the player
            this.plateTexture = new THREE.TextureLoader().load('../../Assets/images/PressurePlateGood.png');
            this.plateTexture.wrapS = THREE.RepeatWrapping;
            this.plateTexture.wrapT = THREE.RepeatWrapping;
            this.plateMaterial = new PhongMaterial();
            this.plateMaterial.map = this.plateTexture;
            this.plateGeometry = new CubeGeometry(1, 0.001, 1);
            this.platePhysicsMaterial = Physijs.createMaterial(this.plateMaterial, 0, 0);
            //left side to unlock plataform
            this.plateGeometry = new CubeGeometry(.5, 0.001, .5);
            this.plate4 = new Physijs.ConvexMesh(this.plateGeometry, this.platePhysicsMaterial, 0);
            this.plate4.position.set(10, 10.1, 21);
            this.plate4.receiveShadow = true;
            this.plate4.name = "Plate4";
            this.add(this.plate4);
            this.plate5 = new Physijs.ConvexMesh(this.plateGeometry, this.platePhysicsMaterial, 0);
            this.plate5.position.set(-10, 10.1, 21);
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
            //this.player.position.set(0, 10, 0);
            //this.player.position.set(-21, 11, 15);
            //this.player.position.set(17, 13.5, -34);
            this.player.position.set(0, 26, -25);
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
            this.skyBox = new gameObject(new SphereGeometry(50, 50, 50), new LambertMaterial({ map: this.skyBoxTexture }), 2, 2, 2);
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
            this.berry.position.x = this.berryLocation[0].x;
            this.berry.position.y = this.berryLocation[0].y;
            this.berry.position.z = this.berryLocation[0].z;
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
            this.basket.position.x = this.basketLocation[0].x;
            this.basket.position.y = this.basketLocation[0].y;
            this.basket.position.z = this.basketLocation[0].z;
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
        Level3.prototype.pointerLockChange = function (event) {
            if (document.pointerLockElement === this.element) {
                // enable our mouse and keyboard controls
                this.keyboardControls.enabled = true;
                this.mouseControls.enabled = true;
                this.blocker.style.display = 'none';
            }
            else {
                if (gameController.lives <= 0) {
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
        /**
         * This method is used to jump between levels
         *
         * @method checkShortcut
         * @return void
         */
        Level3.prototype.checkShortcut = function () {
            if (this.keyboardControls.loadLevel1) {
                document.exitPointerLock();
                this.children = []; // an attempt to clean up
                currentScene = config.Scene.LEVEL1;
                changeScene();
            }
            if (this.keyboardControls.loadLevel2) {
                document.exitPointerLock();
                this.children = []; // an attempt to clean up
                currentScene = config.Scene.LEVEL2;
                changeScene();
            }
            if (this.keyboardControls.loadLevel3) {
                document.exitPointerLock();
                this.children = []; // an attempt to clean up
                currentScene = config.Scene.LEVEL3;
                changeScene();
            }
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
            this.berryLocation.push(new THREE.Vector3(0, 8.5, -12));
            this.berryLocation.push(new THREE.Vector3(0, 12.5, -38));
            this.berryLocation.push(new THREE.Vector3(17, 12.5, -34));
            this.berryLocation.push(new THREE.Vector3(-20, 9.5, 16));
            this.berryLocation.push(new THREE.Vector3(20, 9.5, 16));
            //define basket positions
            this.basketLocation.push(new THREE.Vector3(-1, 8.5, -33));
            this.basketLocation.push(new THREE.Vector3(-16, 11, -19));
            this.basketLocation.push(new THREE.Vector3(-17, 6, -34));
            this.basketLocation.push(new THREE.Vector3(0, 13.5, 26));
            this.basketLocation.push(new THREE.Vector3(21, 6.5, 2));
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
                if (eventObject.name === "WallGoal") {
                    this.GameWin();
                }
                if (eventObject.name === "Ground") {
                    this.jumpLower = this.player.position.y;
                    this.isGrounded = true;
                    createjs.Sound.play("land");
                }
                if (eventObject.name === "DeathPlane") {
                    createjs.Sound.play("Dead", { volume: 0.02 });
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
                    this.remove(this.island2);
                    this.remove(this.plate2);
                }
                if (eventObject.name === "Plate3") {
                    this.add(this.wall1);
                }
                if (eventObject.name === "Plate4") {
                    this.add(this.island16);
                }
                if (eventObject.name === "Plate5") {
                    this.add(this.island17);
                }
                if (eventObject.name === "Rock" || eventObject.name === "Log" && eventObject.position.y > 2) {
                    createjs.Sound.play("Collision");
                    this.addDeath();
                }
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
                gameController.score += 2;
            }
            if (collectable.name === "Basket") {
                this.basketNum = this.basketNum === (this.basketLocation.length - 1) ? 0 : (this.basketNum + 1);
                collectable.position.x = this.basketLocation[this.basketNum].x;
                collectable.position.y = this.basketLocation[this.basketNum].y;
                collectable.position.z = this.basketLocation[this.basketNum].z;
                gameController.score += 5;
            }
            this.scoreLabel.text = "SCORE: " + gameController.score;
            this.add(collectable);
        };
        /**
         * add death function
         *
         * @method addDeath
         * @return void
         */
        Level3.prototype.addDeath = function () {
            gameController.lives--;
            if (gameController.lives <= 0) {
                this.GameOver();
            }
            else {
                // otherwise reset my player and update Lives
                this.livesLabel.text = "LIVES: " + gameController.lives;
                this.remove(this.player);
                this.player.position.set(0, 20, 0);
                this.add(this.player);
            }
        };
        /**
         * add level change function
         *
         * @method GameWin
         * @return void
         */
        Level3.prototype.GameWin = function () {
            // Exit Pointer Lock
            document.exitPointerLock();
            this.children = []; // an attempt to clean up
            currentScene = config.Scene.WIN;
            changeScene();
        };
        /**
         * add level change function
         *
         * @method GameWin
         * @return void
         */
        Level3.prototype.GameOver = function () {
            // Exit Pointer Lock
            document.exitPointerLock();
            this.children = []; // an attempt to clean up
            currentScene = config.Scene.OVER;
            changeScene();
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
            this.checkShortcut();
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
