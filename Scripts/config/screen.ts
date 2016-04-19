module config {
    export class Screen {
        static WIDTH:number = window.innerWidth;
        static HEIGHT:number = window.innerHeight;
        static RATIO:number = window.innerWidth / window.innerHeight;
    }
    
    // Scene Constants
    export class Scene {
        public static MENU: number = 0;
        public static HELP: number = 1;
        public static OVER: number = 2;
        public static LEVEL1: number = 3;
        public static LEVEL2: number = 4;
        public static LEVEL3: number = 5;
        public static WIN: number = 6;
        
        public static PRELEVEL1: number = 7;
        public static PRELEVEL2: number = 8;
        public static PRELEVEL3: number = 9;
        
        
    }
    
}