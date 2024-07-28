const mediaQuery = window.matchMedia('(max-width: 600px)')
if (mediaQuery.matches) {
    var Speed = 1; // vitesse de la balle //
    var CPUSpeed = 3; // vitesse des pad // 
  } else {
   var Speed = 5;
   var CPUSpeed = 6;
  }

////////////////
var paddle1;
var paddle2;
var ball;
var box;
var msg;


var dx, dy; // la vitesse en x et y 
var ballX, ballY; // la position de la balle en x et y 
var playerY; // position y du pad du joueur

var cpuY; // position y du pad adverse
var iID; 
window.onload = Init;


// iniatilisation des objets
function Init()
{

////////////////
   paddle1 = document.getElementById('paddle1');
   paddle2 = document.getElementById('paddle2');
   ball = document.getElementById('ball');
   box = document.getElementById('box');
   msg = document.getElementById('msg');

   // Valeurs de base // 
   ballX = (box.offsetWidth / 2) - (ball.offsetWidth / 2);
   ballY = (box.offsetHeight / 2) - (ball.offsetHeight / 2);
   cpuY = (box.offsetHeight / 2) - (paddle2.offsetHeight / 2);
   playerY = (box.offsetHeight / 2) - (paddle1.offsetHeight / 2);
   dx = dy = Speed;

   paddle1.style.left = 20 + 'px';
   paddle1.style.top = playerY + 'px';
   paddle2.style.left = box.offsetWidth - (20 + paddle2.offsetWidth) + 'px';
   paddle2.style.top = cpuY + 'px';
   ball.style.left = ballX + 'px';
   ball.style.top = ballY + 'px';


}
// lance la partie // 
function Start()
{
   box.onmousemove = MovePaddleMouse
   // call la fonction GL tt les 10ms //
   iID = setInterval('GameLoop()', 10);
function GFG_click() {
                var gfg_down = document.getElementById("gfg_down");
                gfg_down.parentNode.removeChild(gfg_down);
            }
}

// GL boucle // 
function GameLoop()
{
// direction de la balle //
   ballX += dx;
   ballY += dy;
   // check si la balle est hors jeu --> côté joueur //
   if(ballX < 0)
   {
      clearInterval(iID);
      Init();
      box.onmousemove = '';
   }
   // check si la balle est hors jeu --> côté adverse //
   if((ballX + ball.offsetWidth) > box.offsetWidth)
   {
      clearInterval(iID);
      Init();
      box.onmousemove = '';
   }

        // detection des collisions // 
   // collision mur supérieur ou inférieur // 
   if(ballY < 0 || ((ballY + ball.offsetHeight) > box.offsetHeight))
      dy = -dy; // direction opposé // 

   // si la balle touche le pad du joueur
   if(ballX < (paddle1.offsetLeft + paddle1.offsetWidth))
      if(((ballY + ball.offsetHeight) > playerY) && ballY < (playerY + paddle1.offsetHeight))
         dx = -dx;

   // si la balle touche le pad adverse
   if((ballX + ball.offsetWidth) > paddle2.offsetLeft)
      if(((ballY + ball.offsetHeight) > cpuY) && ballY < (cpuY + paddle2.offsetHeight))
         dx = -dx;

   // Placement de la balle à des postions // 
   ball.style.left = ballX + 'px';
   ball.style.top = ballY + 'px';


        // mouvement du pad adverse // 
   // bouger le pad seulement si la balle est vers le pad // 
   if(dx > 0)
   {
      if((cpuY + (paddle2.offsetHeight / 2)) > (ballY + ball.offsetHeight)) cpuY -= CPUSpeed;
      else cpuY += CPUSpeed;

      paddle2.style.top = cpuY + 'px';
   }
}

            // deplacer le pad du joueur lors du déplacement de la souris // 
function MovePaddleMouse(e)
{
   // recuperer les coos y de souris //
   var y = (e.clientY - (box.offsetTop - document.documentElement.scrollTop));
   // mousemove actif seulement qd la souris est dans la boîte //
   if(y > (box.offsetHeight - paddle1.offsetHeight))
      y = (box.offsetHeight - paddle1.offsetHeight);
   playerY = y;
   // def la pos // 
   paddle1.style.top = y + 'px';
}

