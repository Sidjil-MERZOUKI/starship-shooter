import Mobile from "./mobile";
import saucerImage from './assets/images/flyingSaucer-petit.png';

/**
 * Saucer class representing enemy flying saucers
 */
export default class Saucer extends Mobile {
    
    #isFalling;

    constructor(x, y, deltaX, deltaY, imageSource = saucerImage) {
        super(x, y, deltaX, deltaY, imageSource);
        this.#isFalling = false;
    }

    /**
     * Moves the saucer, applying falling physics if hit
     * @param {HTMLCanvasElement} canvas - The game canvas
     */
    move(canvas) {
        if (this.#isFalling) {
            this.deltaX = 0;
            this.deltaY = 3;
        }
        if (this.x + this.deltaX < 0) {
            this.stopMoving();
        }
        if (this.y + this.deltaY > canvas.height - this.height) {
            this.stopMoving();
        }
        this.x = this.x + this.deltaX;
        this.y = this.y + this.deltaY;
    }

    /**
     * Triggers the saucer to start falling
     */
    fall() {
        this.#isFalling = true;
    }

    /**
     * Gets the falling state of the saucer
     * @returns {boolean} True if the saucer is falling
     */
    get isFalling() {
        return this.#isFalling;
    }

    /**
     * Sets the falling state of the saucer
     * @param {boolean} falling - True to make the saucer fall, false otherwise
     */
    set isFalling(falling) {
        this.#isFalling = falling;
    }
}