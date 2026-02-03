/**
 * KeyManager stores the state of pressed keys
 * Provides accessors and methods for up, down, and spacebar keys
 */
export default class KeyManager {
   #up; 
   #down;
   #spaceBar;

   constructor() {
      this.#up = false;
      this.#down = false;
      this.#spaceBar = false;
   }

   /**
    * Gets the up arrow key state
    * @returns {boolean} True if up key is pressed
    */
   get up() {
      return this.#up;
   }

   /**
    * Sets the up arrow key state
    * @param {boolean} value - The key state
    */
   set up(value) {
      this.#up = value;
   }

   /**
    * Marks the up arrow key as pressed
    */
   upPressed() {
      this.#up = true;
   }
   
   /**
    * Marks the up arrow key as released
    */
   upReleased() {
      this.#up = false;
   }

   /**
    * Gets the down arrow key state
    * @returns {boolean} True if down key is pressed
    */
   get down() {
      return this.#down;
   }

   /**
    * Sets the down arrow key state
    * @param {boolean} value - The key state
    */
   set down(value) {
      this.#down = value;
   }
   
   /**
    * Marks the down arrow key as pressed
    */
   downPressed() {
      this.#down = true;
   }

   /**
    * Marks the down arrow key as released
    */
   downReleased() {
      this.#down = false;
   }

   /**
    * Gets the spacebar key state
    * @returns {boolean} True if spacebar is pressed
    */
   get spaceBar() {
      return this.#spaceBar;
   }

   /**
    * Sets the spacebar key state
    * @param {boolean} value - The key state
    */
   set spaceBar(value) {
      this.#spaceBar = value;
   }

   /**
    * Marks the spacebar as pressed
    */
   spaceBarPressed() {
      this.#spaceBar = true;
   }

   /**
    * Marks the spacebar as released
    */
   spaceBarReleased() {
      this.#spaceBar = false;
   }

   /**
    * Checks if any key is currently pressed
    * @returns {boolean} True if at least one key is pressed
    */
   oneKeyPressed() {
      return this.#up || this.#down || this.#spaceBar;
   }

   /**
    * Checks if no key is currently pressed
    * @returns {boolean} True if no key is pressed
    */
   noKeyPressed() {
      return !this.oneKeyPressed();
   }
}