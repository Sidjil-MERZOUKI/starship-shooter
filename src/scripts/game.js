import Mobile from "./mobile";
import StarShip from "./starShip";
import Saucer from "./saucer";
import KeyManager from "./keyManager";
import Shoot from "./shoot";

/**
 * Main game class handling game logic, animations, and collisions
 */
export default class Game {

    #canvas;
    #starShip;
    #saucers;
    #shoots;
    #score;

    constructor(canvas) {
        this.#canvas = canvas;
        this.#starShip = new StarShip(40, this.#canvas.height / 2);
        this.#saucers = [];
        this.#shoots = [];
        this.#score = 0;
        this.raf = null;
        this.keyManager = new KeyManager();
        this.saucerTimer = null;
    }

    /**
     * Gets the game canvas element
     * @returns {HTMLCanvasElement} The canvas associated with the game area
     */
    get canvas() {
        return this.#canvas;
    }

    /**
     * Gets the current player score
     * @returns {number} The current score
     */
    get score() {
        return this.#score;
    }

    /**
     * Main animation loop - handles movement, collisions, and scoring
     */
    animate() {
        const ctx = this.#canvas.getContext('2d');
        ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

        // Move and draw starship
        this.#starShip.handleMoveKeys(this.keyManager);
        this.#starShip.move(this.#canvas);
        this.#starShip.draw(ctx);

        // Move saucers and shoots
        this.#saucers.forEach(saucer => saucer.move(this.#canvas));
        this.#shoots.forEach(shoot => shoot.move(this.#canvas));

        // Handle collisions between shoots and saucers
        let shootsToRemove = new Set();

        this.#shoots.forEach(shoot => {
            this.#saucers.forEach(saucer => {
                if (!saucer.isFalling && shoot.collisionWith(saucer)) {
                    shootsToRemove.add(shoot);

                    if (!saucer.isFalling) {
                        saucer.fall();
                        this.#score += 200;
                    }
                }
            });
        });

        // Update score display
        document.getElementById("score").textContent = this.#score;

        // Remove shoots that hit a saucer
        this.#shoots = this.#shoots.filter(shoot => !shootsToRemove.has(shoot));

        // Penalize if saucer exits left side of screen
        this.#saucers.filter(saucer => {
            if (saucer.x + saucer.deltaX < 0) {
                this.#score -= 1000;
            }
        });

        // Remove fallen saucers that are below canvas
        this.#saucers = this.#saucers.filter(saucer => saucer.y < this.#canvas.height);

        // Remove stationary elements
        this.#saucers = this.#saucers.filter(saucer => !(saucer.deltaX === 0 && saucer.deltaY === 0));
        this.#shoots = this.#shoots.filter(shoot => !(shoot.deltaX === 0 && shoot.deltaY === 0));

        // Draw saucers and shoots
        this.#saucers.forEach(saucer => saucer.draw(ctx));
        this.#shoots.forEach(shoot => shoot.draw(ctx));

        // Continue animation loop
        this.raf = window.requestAnimationFrame(() => this.animate());
    }

    /**
     * Generates a random integer between min and max (inclusive)
     * @param {number} min - Minimum value (inclusive)
     * @param {number} max - Maximum value (inclusive)
     * @returns {number} Random integer between min and max
     */
    alea(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Adds a new saucer to the game
     */
    addSaucer() {
        let y = this.alea(10, this.#canvas.height - 40);
        this.#saucers.push(new Saucer(this.canvas.width - 40, y, -5, 0));
    }

    /**
     * Adds a new shoot from the starship position
     */
    addShoot() {
        this.#shoots.push(new Shoot(
            this.#starShip.x + this.#starShip.image.width,
            this.#starShip.y + this.#starShip.image.height / 2,
            8,
            0
        ));
    }

    /**
     * Toggles automatic saucer spawning at regular intervals
     */
    toggleSaucerSpawn() {
        if (this.saucerTimer) {
            clearInterval(this.saucerTimer);
            this.saucerTimer = null;
        } else {
            this.saucerTimer = setInterval(() => {
                if (Math.random() < 0.5) {
                    this.addSaucer();
                }
            }, 750);
        }
    }

    /**
     * Handles keydown events
     * @param {KeyboardEvent} event - The keyboard event
     */
    keyDownActionHandler(event) {
        switch (event.key) {
            case "ArrowUp":
            case "Up":
                this.keyManager.upPressed();
                break;
            case "ArrowDown":
            case "Down":
                this.keyManager.downPressed();
                break;
            case " ":
                if (!this.keyManager.spaceBar) {
                    this.keyManager.spaceBarPressed();
                    this.addShoot();
                }
                break;
            default:
                return;
        }
        event.preventDefault();
    }

    /**
     * Handles keyup events
     * @param {KeyboardEvent} event - The keyboard event
     */
    keyUpActionHandler(event) {
        switch (event.key) {
            case "ArrowUp":
            case "Up":
                this.keyManager.upReleased();
                break;
            case "ArrowDown":
            case "Down":
                this.keyManager.downReleased();
                break;
            case " ":
                this.keyManager.spaceBarReleased();
                break;
            default:
                return;
        }
        event.preventDefault();
    }
}