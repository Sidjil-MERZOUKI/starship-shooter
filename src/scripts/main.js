
// Import the Game class
import Game from './game.js';

const init = () => {
   const canvas = document.getElementById("stars");
   const game = new Game(canvas);
   
   // Start game animation
   game.animate();
   
   // Keyboard event listeners
   window.addEventListener('keydown', game.keyDownActionHandler.bind(game));
   window.addEventListener('keyup', game.keyUpActionHandler.bind(game));
   
   // Game button event listeners
   document.getElementById("nouvelleSoucoupe").addEventListener("click", () => game.addSaucer());
   document.getElementById("flotteSoucoupes").addEventListener("click", () => game.toggleSaucerSpawn());
}

window.addEventListener("load", init);

console.log('Bundle generated successfully');