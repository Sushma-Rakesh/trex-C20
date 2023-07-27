var ground;
var trex ,trex_running;
var invisibleGround
var cloud
var cloudimage
var score=0;
var gamestate="play";
var obstaclesGroup,cloudsGroup
var gameOverImg,restartImg;

var jumpSound,dieSound,checkpointSound;


function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  ground1=loadImage("ground2.png");
  cloudimage=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  gameOverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");
  trexOutImg=loadImage("trex_collided.png");
  jumpSound=loadSound("jump.mp3");
  dieSound=loadSound("die.mp3");
  checkpointSound=loadSound("checkpoint.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  var rand=Math.round(random(1,100))
  //create a trex sprite
  trex=createSprite(150,windowHeight-70,20,0);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("Out",trexOutImg)
  trex.scale=0.5;

 ground=createSprite(200,windowHeight-80,1500,20);
 ground.addImage("ground",ground1);
 ground.x=ground.width/2

  gameOver=createSprite(600,windowHeight/3.5);
  gameOver.addImage(gameOverImg);

  restart=createSprite(600,windowHeight/2.8);
  restart.addImage(restartImg);
 

  gameOver.scale=1;
  restart.scale=0.6;

  gameOver.visible=false;
  restart.visible=false;

  invisibleGround=createSprite(200,(windowHeight-80)+10,2000,20)
  invisibleGround.visible=false


  obstaclesGroup=new Group()
  cloudsGroup=new Group()


  trex.setCollider("circle",0,0,40)
  trex.debug=false

  
  
}

function draw(){
  background("white")
  text("Score : "+score,20,20)
  if(gamestate==="play"){
    ground.velocityX=-(10+score/200)
if(ground.x<555){
  ground.x=ground.width/2
}



if(touches.length>0 || keyDown("SPACE") && trex.y>=windowHeight-100){
  trex.velocityY=-10;
  jumpSound.play();
  touches = [];
}
trex.velocityY+=0.5;

spawnObstacles()
spawnClouds()

score=score+Math.round(getFrameRate()/60);


if(score>0 && score%100===0){
  checkpointSound.play();
}


  if(obstaclesGroup.isTouching(trex)){
    gamestate="end";
    dieSound.play();
  }

  }
  else if (gamestate==="end"){
    
    ground.velocityX=0;
    gameOver.visible=true;
    restart.visible=true;
    trex.velocityY=0;
    trex.changeAnimation("Out",trexOutImg);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);

  }
  trex.collide(invisibleGround);

if(touches.length>0 && mousePressedOver(restart)){
  reset();
  touches = [];
}

drawSprites();
}

function reset(){
  gamestate="play"
  gameOver.visible=false;
  restart.visible=false;

  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();

  trex.changeAnimation("running",trex_running)

  score=0
}



function spawnClouds(){
  if(frameCount%100===0){
    cloud=createSprite(1500,(windowHeight-100)-60,10,10)
    cloud.y=Math.round(random(50,200))
    cloud.velocityX=-3
    cloud.addImage("cloudimage",cloudimage)
    cloud.scale=0.6
    

    trex.depth=cloud.depth+1
    cloud.lifetime=500
    cloudsGroup.add(cloud)


  }
  
}
function spawnObstacles(){
  if(frameCount%100===0){
    var obstacle=createSprite(1500,(windowHeight-75)-20,10,10)
    obstacle.velocityX=-(8+score/100)
    var rand =Math.round(random(1,6))
    switch(rand){
      case 1 : obstacle.addImage(obstacle1)
      break;
      case 2 : obstacle.addImage(obstacle2)
      break;
      case 3 : obstacle.addImage(obstacle3)
      break;
      case 4 : obstacle.addImage(obstacle4)
      break;
      case 5 : obstacle.addImage(obstacle5)
      break;
      case 6 : obstacle.addImage(obstacle6)
      break;
      default : break;
    }
    obstacle.scale=0.5
    obstacle.lifetime=500;

    obstaclesGroup.add(obstacle)

  }
}