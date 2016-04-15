/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    export class GameController {
        //PRIVATE INSTANCE VARIABLES +++++++++++++++++++++++++++++++++++++
        public score: number;
        public lives: number;
        //CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            this.score = 0;
            this.lives = 10;
        }
    }
}