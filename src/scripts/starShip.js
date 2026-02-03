import Mobile from "./mobile";
import starShipImage from './assets/images/vaisseau-ballon-petit.png';

/**
 * StarShip class representing the player's spaceship
 */
export default class StarShip extends Mobile {
    
    constructor(x, y, deltaX, deltaY, imageSource = starShipImage) {
        super(x, y, deltaX, deltaY, imageSource);
    }

    /**
     * Moves the starship vertically, stopping at canvas boundaries
     * @param {HTMLCanvasElement} canvas - The game canvas
     */
    move(canvas) {
        if (this.y + this.deltaY < 0) {
            this.stopMoving();
        }
        if (this.y + this.deltaY > canvas.height - this.height) {
            this.stopMoving();
        }
        this.y = this.y + this.deltaY;
    }

    /**
     * Moves the starship upward at 8 pixels per frame
     */
    moveUp() {
        this.deltaY = -8;
    }

    /**
     * Moves the starship downward at 8 pixels per frame
     */
    moveDown() {
        this.deltaY = 8;
    }

    /**
     * Handles starship movement based on key manager state
     * @param {KeyManager} keyManager - The keyboard state manager
     */
    handleMoveKeys(keyManager) {
        this.stopMoving();
        
        if (keyManager.up) {
            this.moveUp();
        }
        if (keyManager.down) {
            this.moveDown();
        }
    }
}