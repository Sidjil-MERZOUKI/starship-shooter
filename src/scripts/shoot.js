import Mobile from "./mobile";
import shootImage from './assets/images/tir.png';

/**
 * Shoot class representing projectiles fired by the starship
 */
export default class Shoot extends Mobile {
    
    constructor(x, y, deltaX, deltaY, imageSource = shootImage) {
        super(x, y, deltaX, deltaY, imageSource);
    }

    /**
     * Moves the shoot horizontally, stopping when it reaches canvas edge
     * @param {HTMLCanvasElement} canvas - The game canvas
     */
    move(canvas) {
        if (this.x + this.deltaX > canvas.width) {
            this.deltaX = 0;
        }
        this.x = this.x + this.deltaX;
    }

    /**
     * Checks if this shoot collides with a saucer using bounding box detection
     * @param {Saucer} saucer - The saucer to check collision with
     * @returns {boolean} True if collision detected, false otherwise
     */
    collisionWith(saucer) {
        let p1X = Math.max(saucer.x, this.x);
        let p1Y = Math.max(saucer.y, this.y);
        let p2X = Math.min(saucer.x + saucer.width, this.x + this.width);
        let p2Y = Math.min(saucer.y + saucer.height, this.y + this.height);
        return p1X < p2X && p1Y < p2Y;
    }
}