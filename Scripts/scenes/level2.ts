/**
 * The Scenes module is a namespace to reference all scene objects
 * 
 * @module scenes
 */
module scenes {
    /**
     * The Level2 class is where the main action occurs for the game
     * 
     * @class Level2
     * @param havePointerLock {boolean}
     */
    export class Level2 extends scenes.Scene {
        private havePointerLock: boolean;
        private element: any;

        private blocker: HTMLElement;
        private instructions: HTMLElement;
        private spotLight: SpotLight;
        private ambientLight: AmbientLight;

        private keyboardControls: objects.KeyboardControls;
        private mouseControls: objects.MouseControls;
        //private gameObject: objects.GameObject;
        
        private groundGeometry: CubeGeometry;
        private groundPhysicsMaterial: Physijs.Material;
        private groundMaterial: PhongMaterial;
        private ground: Physijs.Mesh;
        private groundTexture: Texture;

        private ground23Geometry: CubeGeometry;
        private ground4Geometry: CubeGeometry;
        private groundGoalGeometry: CubeGeometry;
        private ground2: Physijs.Mesh;
        private ground3: Physijs.Mesh;
        private ground4: Physijs.Mesh;

        private ground5: Physijs.Mesh;
        private ground6: Physijs.Mesh;
        private ground7: Physijs.Mesh;


        private playerGeometry: CubeGeometry;
        private playerMaterial: Physijs.Material;
        private player: Physijs.Mesh;
        private isGrounded: boolean;
        private deathPlaneGeometry: CubeGeometry;
        private deathPlaneMaterial: LambertMaterial;
        private deathPlane: Physijs.Mesh;

        private velocity: Vector3;
        private prevTime: number;
        private clock: Clock;

        private stage: createjs.Stage;
        private scoreLabel: createjs.Text;
        private livesLabel: createjs.Text;
        private levelLabel: createjs.Text;
        private bgSound: any;
        
        //SCENARIO
        //Skybox
        private skyBox: Mesh;
        private skyBoxTexture: Texture;
        
        //Walls
        private wallTexture: Texture;
        private wallGeometry: CubeGeometry;
        private smallWallGeometry: CubeGeometry;
        private wallPhysicsMaterial: Physijs.Material;
        private wallMaterial: PhongMaterial;
        private wall1: Physijs.Mesh;
        private wall2: Physijs.Mesh;
        private wall3: Physijs.Mesh;
        private wall4: Physijs.Mesh;
        private wall5: Physijs.Mesh;
        private wall6: Physijs.Mesh;
        private wallGoal: Physijs.Mesh;
        
        //Hazards
        //Rocks
        private rockTexture: Texture;
        private rockGeometry: SphereGeometry;
        private rockPhysicsMaterial: Physijs.Material;
        private rockMaterial: PhongMaterial;
        private rock1: Physijs.Mesh;
        
        //Logs
        private logTexture: Texture;
        private logGeometry: CylinderGeometry;
        private logPhysicsMaterial: Physijs.Material;
        private logMaterial: PhongMaterial;
        private log: Physijs.Mesh;
        
        //Pressure plates
        private plateTexture: Texture;
        private plateGeometry: CubeGeometry;
        private smallPlateGeometry: CubeGeometry;
        private platePhysicsMaterial: Physijs.Material;
        private plateMaterial: PhongMaterial;
        private plate1: Physijs.Mesh;
        private plate2: Physijs.Mesh;
        private plate3: Physijs.Mesh;
        private plate4: Physijs.Mesh;
        private plate5: Physijs.Mesh;
        private plate6: Physijs.Mesh;
        private plate7: Physijs.Mesh;      

        //Collectables
        //Berry
        private berryTexture: Texture;
        private berryGeometry: CubeGeometry;
        private berryPhysicsMaterial: Physijs.Material;
        private berryMaterial: PhongMaterial;
        private berry: Physijs.Mesh;
        private berryLocation: Array<THREE.Vector3> = new Array<THREE.Vector3>();
        private berryNum: number = 0;
        
        //Basket
        private basketTexture: Texture;
        private basketGeometry: CubeGeometry;
        private basketPhysicsMaterial: Physijs.Material;
        private basketMaterial: PhongMaterial;
        private basket: Physijs.Mesh;
        private basketLocation: Array<THREE.Vector3> = new Array<THREE.Vector3>();
        private basketNum: number = 0;

        /**
         * @constructor
         */
        constructor() {
            super();

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
        private _setupCanvas(): void {
            canvas.setAttribute("width", config.Screen.WIDTH.toString());
            canvas.setAttribute("height", (config.Screen.HEIGHT * 0.1).toString());
            canvas.style.backgroundColor = "#000000";
        }
        
        /**
        * Sets up the background scene for the play scene
        * 
        * @method playBackgroundSound 
        * @return void
        */
        private playBackgroundSound(): void {
            this.bgSound = createjs.Sound.play("Background", { volume: 0.02 });
            this.bgSound.on("complete", this.playBackgroundSound, this);
        }

        /**
         * The initialize method sets up key objects to be used in the scene
         * 
         * @method _initialize
         * @returns void
         */
        private _initialize(): void {          
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
        }
        /**
         * This method sets up the scoreboard for the scene
         * 
         * @method setupScoreboard
         * @returns void
         */
        private setupScoreboard(): void {
            // initialize  score and lives values

            // Add Lives Label
            this.livesLabel = new createjs.Text(
                "LIVES: " + gameController.lives,
                "40px Consolas",
                "#ffffff"
            );
            this.livesLabel.x = config.Screen.WIDTH * 0.1;
            this.livesLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(this.livesLabel);
            console.log("Added Lives Label to stage");
            
            // Add Level Label
            this.levelLabel = new createjs.Text(
                "LEVEL 2",
                "40px Consolas",
                "#ffffff"
            );
            this.levelLabel.x = config.Screen.WIDTH * 0.45;
            this.levelLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(this.levelLabel);
            console.log("Added Lives Label to stage");

            // Add Score Label
            this.scoreLabel = new createjs.Text(
                "SCORE: " + gameController.score,
                "40px Consolas",
                "#ffffff"
            );
            this.scoreLabel.x = config.Screen.WIDTH * 0.8;
            this.scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(this.scoreLabel);
            console.log("Added Score Label to stage");
        }

        /**
         * Add lights to the scene
         * 
         * @method addLights
         * @return void
         */
        private addLights(): void {
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
        }

        /**
         * Add a ground plane to the scene
         * 
         * @method addGround
         * @return void
         */
        private addGround(): void {

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
            this.ground2.name = "Ground";
            this.add(this.ground2);
            console.log("Added Ground 2 to scene");

            this.ground3 = new Physijs.ConvexMesh(this.ground23Geometry, this.groundPhysicsMaterial, 0);
            this.ground3.position.set(-13.5, 0, 2.5);
            this.ground3.receiveShadow = true;
            this.ground3.name = "Ground";
            this.add(this.ground3);
            console.log("Added Ground 3 to scene");

            this.ground4Geometry = new BoxGeometry(25, 1, 10);

            this.ground4 = new Physijs.ConvexMesh(this.ground4Geometry, this.groundPhysicsMaterial, 0);
            this.ground4.position.set(-29, 0, 0);
            this.ground4.receiveShadow = true;
            this.ground4.name = "Ground";
            this.add(this.ground4);
            console.log("Added Ground 4 to scene");

        }
        
        /**
         * Add goal to the scene
         * 
         * @method addGoal
         * @return void
         */
        private addGoal(): void {
            this.groundGoalGeometry = new BoxGeometry(5, .5, 5);

            this.ground5 = new Physijs.ConvexMesh(this.groundGoalGeometry, this.groundPhysicsMaterial, 0);
            this.ground5.position.set(-44.5, 2, 2.3);
            this.ground5.receiveShadow = true;
            // this.ground5.rotation.z = 1.5708;
            this.ground5.rotation.y = 1.5708;
            this.ground5.name = "Ground";
            this.add(this.ground5);
            console.log("Added Ground 5 to scene");
            
            this.wallTexture = new THREE.TextureLoader().load('../../Assets/images/wallGoal.png');
            this.wallTexture.wrapS = THREE.RepeatWrapping;
            this.wallTexture.wrapT = THREE.RepeatWrapping;
            this.wallTexture.repeat.set(1, 1);
            this.wallMaterial = new PhongMaterial();
            this.wallMaterial.map = this.wallTexture;
            this.wallPhysicsMaterial = Physijs.createMaterial(this.wallMaterial, 0, 0);

            this.wallGeometry = new BoxGeometry(3, 3, .2);
            this.wallGoal = new Physijs.ConvexMesh(this.wallGeometry, this.wallPhysicsMaterial, 0);
            this.wallGoal.position.set(-46, 4, 2.3);
            this.wallGoal.rotation.y = 1.5708;
            this.wallGoal.receiveShadow = true;
            this.wallGoal.name = "WallGoal";
            this.add(this.wallGoal);
            
            // this.ground6 = new Physijs.ConvexMesh(this.groundGoalGeometry, this.groundPhysicsMaterial, 0);
            // this.ground6.position.set(-47, 4.4, 2.3);
            // this.ground6.receiveShadow = true;
            // // this.ground6.rotation.z = 1.5708;
            // this.ground6.rotation.y = 1.5708;
            // this.ground6.name = "Ground";
            // this.add(this.ground6);
            // console.log("Added Ground 6 to scene");
            
            // this.ground7 = new Physijs.ConvexMesh(this.groundGoalGeometry, this.groundPhysicsMaterial, 0);
            // this.ground7.position.set(-50, 6.2, 2.3);
            // this.ground7.receiveShadow = true;
            // // this.ground7.rotation.z = 1.5708;
            // this.ground7.rotation.y = 1.5708;
            // this.ground7.name = "Ground";
            // this.add(this.ground7);
            // console.log("Added Ground 7 to scene");
        }
        
        /**
         * Add walls to the scene
         * 
         * @method addWalls
         * @return void
         */
        private addWalls(): void {

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
            this.wall4.rotation.y = 1.5708;
            this.wall4.receiveShadow = true;
            this.wall4.name = "Wall";
            //this.add(this.wall4);
            console.log("WHERE IS THE WALL?");

            this.wall5 = new Physijs.ConvexMesh(this.smallWallGeometry, this.wallPhysicsMaterial, 0);
            this.wall5.position.set(-27.7, 2, -2.5);
            this.wall5.rotation.y = 1.5708;
            this.wall5.receiveShadow = true;
            this.wall5.name = "Wall";

            this.wall6 = new Physijs.ConvexMesh(this.wallGeometry, this.wallPhysicsMaterial, 0);
            this.wall6.position.set(-4.5, 2, 0);
            this.wall6.rotation.y = 1.5708;
            this.wall6.receiveShadow = true;
            this.wall6.name = "Wall";
            this.add(this.wall6);

        }
        
        /**
        * Add rocks to the scene - actually it just prepare the rock, who really add it to the scene is the pressure plate
        * 
        * @method addRocks
        * @return void
        */
        private addRocks(): void {
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
        }
        
        /**
         * Add Logs to the scene - actually it just prepare the rock, who really add it to the scene is the pressure plate
         * 
         * @method addLogs
         * @return void
         */
        private addLogs(): void {
            this.logTexture = new THREE.TextureLoader().load('../../Assets/images/fallingbranch.png');
            this.logTexture.wrapS = THREE.RepeatWrapping;
            this.logTexture.wrapT = THREE.RepeatWrapping;
            this.logMaterial = new PhongMaterial();
            this.logMaterial.map = this.logTexture;

            this.logGeometry = new CylinderGeometry(1, 1, 5);
            this.logPhysicsMaterial = Physijs.createMaterial(this.logMaterial, 0, 0);
            this.log = new Physijs.ConvexMesh(this.logGeometry, this.logPhysicsMaterial, 1);
            this.log.rotation.z = 1.5708;
            this.log.position.set(-34, 10, -2.7);
            this.log.receiveShadow = true;
            this.log.name = "Log";
        }
         
        /**
         * Add Pressure Plates to the scene
         * 
         * @method addPlates
         * @return void
         */
        private addPlates(): void {
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

            this.smallPlateGeometry = new CubeGeometry(1, 0.001, 1);

            this.plate6 = new Physijs.ConvexMesh(this.smallPlateGeometry, this.platePhysicsMaterial, 0);
            this.plate6.position.set(-3.5, 0.5, -4.3);
            this.plate6.receiveShadow = true;
            this.plate6.name = "Plate6";
            this.add(this.plate6);

            this.plate7 = new Physijs.ConvexMesh(this.plateGeometry, this.platePhysicsMaterial, 0);
            this.plate7.position.set(-40, 0.5, -2.3);
            this.plate7.receiveShadow = true;
            this.plate7.name = "Plate7";
            this.add(this.plate7);
        }
        
        /**
         * Reset all hazards function
         * 
         * @method resetHazards
         * @return void 
         */
        private resetHazards(): void {
            this.remove(this.rock1);
            this.remove(this.log);
            this.rock1.position.set(-7.8, 10, 2.8);
            this.log.position.set(-34, 10, -2.7);
            //this.wall4.position.set(-38.2, 10, 2.3);
        }
        
        /**
         * Adds the player controller to the scene
         * 
         * @method addPlayer
         * @return void
         */
        private addPlayer(): void {
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
        }

        /**
         * Add the death plane to the scene
         * 
         * @method addDeathPlane
         * @return void
         */
        private addDeathPlane(): void {
            this.deathPlaneGeometry = new BoxGeometry(100, 1, 100);
            this.deathPlaneMaterial = new THREE.MeshLambertMaterial({ color: 0xE5E5FF, transparent: true, opacity: 0.1 });

            this.deathPlane = new Physijs.BoxMesh(this.deathPlaneGeometry, this.deathPlaneMaterial, 0);
            this.deathPlane.position.set(0, -20, 0);
            this.deathPlane.name = "DeathPlane";
            this.add(this.deathPlane);
            console.log("Added DeathPlane to scene");
        }
        
        /**
         * Add the Skybox to the scene
         * 
         * @method addSkyBox
         * @return void
         */
        private addSkyBox(): void {
            this.skyBoxTexture = new THREE.TextureLoader().load('../../Assets/images/skyBG.png');
            this.skyBox = new gameObject(new SphereGeometry(60, 60, 60), new LambertMaterial({ map: this.skyBoxTexture }), 2, 2, 2);
            this.skyBox.material.side = THREE.DoubleSide;
            this.skyBox.name = "Skybox";
            this.add(this.skyBox);
            console.log("Added skyBox to scene");
        }              
        
        
        /**
         * Add Berry to the scene
         * 
         * @method addBerry
         * @return void
         */
        private addBerry(): void {
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
        }
        
        /**
         * Add Basket to the scene
         * 
         * @method addBasket
         * @return void
         */
        private addBasket(): void {
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
        }

        /**
         * Event Handler method for any pointerLockChange events
         * 
         * @method pointerLockChange
         * @return void
         */
        pointerLockChange(event): void {
            if (document.pointerLockElement === this.element) {
                // enable our mouse and keyboard controls
                this.keyboardControls.enabled = true;
                this.mouseControls.enabled = true;
                this.blocker.style.display = 'none';
            } else {
                if (gameController.lives <= 0 || this.keyboardControls.loadLevel1 || this.keyboardControls.loadLevel2 || this.keyboardControls.loadLevel3) {
                    this.blocker.style.display = 'none';
                    document.removeEventListener('pointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('mozpointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('webkitpointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('pointerlockerror', this.pointerLockError.bind(this), false);
                    document.removeEventListener('mozpointerlockerror', this.pointerLockError.bind(this), false);
                    document.removeEventListener('webkitpointerlockerror', this.pointerLockError.bind(this), false);
                } else {
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
        }

        /**
         * Event handler for PointerLockError
         * 
         * @method pointerLockError
         * @return void
         */
        private pointerLockError(event): void {
            this.instructions.style.display = '';
            console.log("PointerLock Error Detected!!");
        }

        // Check Controls Function

        /**
         * This method updates the player's position based on user input
         * 
         * @method checkControls
         * @return void
         */
        private checkControls(): void {
            if (this.keyboardControls.enabled) {
                this.velocity = new Vector3();

                var time: number = performance.now();
                var delta: number = (time - this.prevTime) / 1000;

                var speed: number = 600.0;

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
                        this.velocity.y += 5 * speed * delta;
                    } else if (this.player.position.y > 3) {
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
        }

        private _unpauseSimulation(): void {
            scene.onSimulationResume();
            console.log("resume simulation");
        }
        
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
        public start(): void {
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
            this.berryLocation.push(new THREE.Vector3(-34, 1.5, 2.6));
            
            //define basket positions
            this.basketLocation.push(new THREE.Vector3(-14, 3, -2.6));
            this.basketLocation.push(new THREE.Vector3(-40, 3, -1.4));  

            // Check to see if we have pointerLock
            if (this.havePointerLock) {
                this.element = document.body;

                this.instructions.addEventListener('click', () => {

                    // Ask the user for pointer lock
                    console.log("Requesting PointerLock");

                    this.element.requestPointerLock = this.element.requestPointerLock ||
                        this.element.mozRequestPointerLock ||
                        this.element.webkitRequestPointerLock;

                    this.element.requestPointerLock();
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

            // Add death plane to the scene
            this.addDeathPlane();
            
            // Add Skybox to the scene
            this.addSkyBox();

            this.addBasket();
            this.addBerry();

            // Collision Check


            this.player.addEventListener('collision', function(eventObject) {
                if (eventObject.name === "Ground" || eventObject.name === "Wall") {
                    this.isGrounded = true;
                    createjs.Sound.play("land");
                }

                if (eventObject.name === "Wall") {
                    console.log("WALL HIT");
                }

                if (eventObject.name === "DeathPlane") {
                    createjs.Sound.play("Dead",{volume: 0.02});
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
                    this.remove(this.wall2);
                    this.add(this.wall5);
                }

                if (eventObject.name === "Plate4") {
                    this.add(this.log);
                }

                if (eventObject.name === "Plate5") {
                    console.log("Add wall to block path");
                    this.add(this.wall4);
                    this.remove(this.wall5);
                    this.add(this.wall2);
                }

                if (eventObject.name === "Plate6") {
                    console.log("remove START wall");
                    this.remove(this.wall6);
                }

                if (eventObject.name === "Plate7") {
                    console.log("remove START wall");
                    this.addGoal();
                }

                if (eventObject.name === "Rock" || eventObject.name === "Log" && eventObject.position.y > 2) {
                    createjs.Sound.play("Collision");
                    this.addDeath();
                }  
                
                if (eventObject.name === "WallGoal") {
                    document.exitPointerLock();
                    this.children = []; // an attempt to clean up
                    currentScene = config.Scene.LEVEL3;
                    changeScene();
                }              
                
            }.bind(this));
            
            //Rock eventHandler            
            this.rock1.addEventListener('collision', function(eventObject) {

                if (eventObject.name === "Ground" || eventObject.name === "Wall") {
                    this.resetHazards();
                }
            }.bind(this));

            this.log.addEventListener('collision', function(eventObject) {

                if (eventObject.name === "Ground" || eventObject.name === "Wall") {
                    this.resetHazards();
                }
            }.bind(this));  
            

            // create parent-child relationship with camera and player
            this.player.add(camera);
            camera.position.set(0, 1, 0);

            this.simulate();
        }       
        
        
        /**
         * Pick any collectable function
         * 
         * @method collectablePicked
         * @return void
         */
        private collectablePicked(collectable: THREE.Object3D): void {
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
        }
        
        /**
         * add death function
         * 
         * @method addDeath
         * @return void
         */
        private addDeath(): void {
            gameController.lives--;
            if (gameController.lives <= 0) {
                // Exit Pointer Lock
                document.exitPointerLock();
                this.children = []; // an attempt to clean up
                //this._isGamePaused = true;
                
                // Play the Game Over Scene
                currentScene = config.Scene.OVER;
                changeScene();
            } else {
                // otherwise reset my player and update Lives
                this.livesLabel.text = "LIVES: " + gameController.lives;
                this.remove(this.player);
                this.player.position.set(0, 20, 0);
                //this.wall4.position.set(-38.2, -2, -2.3);
                this.add(this.player);
            }
        }
        
        /**
         * This method is used to jump between levels
         * 
         * @method checkShortcut
         * @return void
         */
        private checkShortcut(): void {
            if (this.keyboardControls.loadLevel1) {
                document.exitPointerLock();
                this.children = []; // an attempt to clean up
                currentScene = config.Scene.PRELEVEL1;
                changeScene();
            }
            if (this.keyboardControls.loadLevel2) {
                document.exitPointerLock();
                this.children = []; // an attempt to clean up
                currentScene = config.Scene.PRELEVEL2;
                changeScene();
            }
            if (this.keyboardControls.loadLevel3) {
                document.exitPointerLock();
                this.children = []; // an attempt to clean up
                currentScene = config.Scene.PRELEVEL3;
                changeScene();
            }
        }
        
        /**
         * Camera Look function
         * 
         * @method cameraLook
         * @return void
         */
        private cameraLook(): void {
            var zenith: number = THREE.Math.degToRad(90);
            var nadir: number = THREE.Math.degToRad(-90);

            var cameraPitch: number = camera.rotation.x + this.mouseControls.pitch;

            // Constrain the Camera Pitch
            camera.rotation.x = THREE.Math.clamp(cameraPitch, nadir, zenith);
        }

        /**
         * @method update
         * @returns void
         */
        public update(): void {

            this.checkShortcut();
            this.checkControls();
            this.stage.update();

            if (!this.keyboardControls.paused) {
                this.simulate();
            }

        }

        /**
         * Responds to screen resizes
         * 
         * @method resize
         * @return void
         */
        public resize(): void {
            canvas.style.width = "100%";
            this.livesLabel.x = config.Screen.WIDTH * 0.1;
            this.livesLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.scoreLabel.x = config.Screen.WIDTH * 0.8;
            this.scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.update();
        }
    }
}