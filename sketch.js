var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obbyg, obby1, obby2, obby3, obby4, obby5, obby6;
var reset, gameover;
var resetImg, gameoverImg;
var deathSound, jumpSound, checkSound;
var cloud, cloudsGroup, cloudImage;
var newImage;
var score;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obby1 = loadImage("obstacle1.png");
  obby2 = loadImage("obstacle2.png");
  obby3 = loadImage("obstacle3.png");
  obby4 = loadImage("obstacle4.png");
  obby5 = loadImage("obstacle5.png");
  obby6 = loadImage("obstacle6.png");
  resetImg = loadImage("restart.png");
  gameoverImg = loadImage("gameOver.png");
  jumpSound = loadSound("jump.mp3");
  checkSound = loadSound("checkpoint.mp3");


}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obbyg = createGroup();
  cloudsGroup = createGroup();

  gameover = createSprite(300, 100);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.5;
  reset = createSprite(300, 150);
  reset.addImage(resetImg);
  reset.scale = 0.5;
  
  trex.setCollider("circle", 0, 0, 40);
  trex.debug = true;
 
  score = 0;
  
}

function draw() {
  background(180);
  text("Score:" + score, 500, 50);
  
  if(gamestate === PLAY)
  {
    gameover.visible = false;
    reset.visible = false;
    ground.velocityX = -(4 + 3* score/300);
    score = score + Math.round(frameCount/90);

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(score >0 && score %100 === 0)
  {
    checkSound.play();
  }
  
  
  
  if(keyDown("space")&& trex.y >= 150) {
    trex.velocityY = -13;
    jumpSound.play();
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  spawnClouds();
  spawnObby();

  if(obbyg.isTouching(trex))
  {
    gamestate = END;
    jumpSound.play();
  }
}
  else if(gamestate === END)
  {
    gameover.visible = true;
    reset.visible = true;
    trex.changeAnimation("collided", trex_collided);
    trex.velocityY = 0;
    ground.velocityX = 0;
    cloudsGroup.setVelocityXEach(0);
    obbyg.setVelocityXEach(0);
    obbyg.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
   
  }
  trex.collide(invisibleGround);
  
  
  
  
  drawSprites();
}

function spawnObby()
{
  if(frameCount % 60 === 0)
  {
    var obby = createSprite(600, 165, 10, 40);
    obby.velocityX = -6;
    var any = Math.round(random(1, 6))
    switch (any){
      case 1: obby.addImage(obby1);
      break;
      case 2: obby.addImage(obby2);
      break;
      case 3: obby.addImage(obby3);
      break;
      case 4: obby.addImage(obby4);
      break;
      case 5: obby.addImage(obby5);
      break;
      case 6: obby.addImage(obby6);
      break;
      default: break;



    }
  obby.scale = 0.5;
  obby.lifetime = 300;

  obbyg.add(obby);
}

}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    cloud.lifetime = 134;
    
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;

    cloudsGroup.add(cloud);
    }
}

