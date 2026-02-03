/**
 * Base class for all moving objects in the game
 */
export default class Mobile {
    constructor(x, y, deltaX = 0, deltaY = 0, imageSource) {
        this.image = this.#createImage(imageSource);
        this.x = x;
        this.y = y;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
    }

    /**
     * Draws the mobile object's image on the canvas
     * @param {CanvasRenderingContext2D} context - The 2D rendering context
     */
    draw(context) {
        context.drawImage(this.image, this.x, this.y);
    }

    /**
     * Moves the mobile object and handles canvas boundary collisions
     * @param {HTMLCanvasElement} canvas - The game canvas
     */
    move(canvas) {
        if (this.x + this.deltaX < 0) {
            this.deltaX = -this.deltaX;
        }
        if (this.y + this.deltaY < 0) {
            this.deltaY = -this.deltaY;
        }
        if (this.x + this.deltaX > canvas.width - this.width) {
            this.deltaX = -this.deltaX;
        }
        if (this.y + this.deltaY > canvas.height - this.height) {
            this.deltaY = -this.deltaY;
        }
        this.x = this.x + this.deltaX;
        this.y = this.y + this.deltaY;
    }

    /**
     * Stops the object's movement by setting velocity to zero
     */
    stopMoving() {
        this.deltaX = 0;
        this.deltaY = 0;
    }

    /**
     * Creates and returns an Image object from the specified source
     * @private
     * @param {string} imageSource - The path to the image file
     * @returns {HTMLImageElement} The loaded image
     */
    #createImage(imageSource) {
        const newImg = new Image();
        newImg.src = imageSource;
        return newImg;
    }

    /**
     * Gets the width of the object's image
     * @returns {number} The image width in pixels
     */
    get width() {
        return this.image.width;
    }

    /**
     * Gets the height of the object's image
     * @returns {number} The image height in pixels
     */
    get height() {
        return this.image.height;
    }
}