var restart, restartimg, gameover, gameoverimg;

var moonimg;
var cheksound, diesound, jumpsound;
var obstacle;
var gv = -6
var cloudimage ;
var gamestate = "serve";
var ob1, ob2, ob3, ob4, ob5, ob6
var trex ,trex_running, trexcollided;
var ground , groundimage;
var invisibleground ;
var highscore = 0;
var score = 0;

var gamestate = "play";
function preload(){ 
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexcollided = loadImage("trex_collided.png")
groundimage = loadImage("ground2.png");
  cloudimage = loadImage("cloud.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png")
  ob5 = loadImage("obstacle5.png")
  ob6 = loadImage("obstacle6.png")
  gameoverimg = loadImage("gameOver.png")
  restartimg = loadImage("restart.png");
  checksound = loadSound("ck.mp3");
  jumpsound = loadSound("jump.mp3");
  diesound = loadSound("die.mp3");
  moonimg = loadImage("moon.png")
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  
  //create a trex sprite
 
  ground = createSprite(200,height-40,400,20);
  ground.addImage(groundimage)
  ground.x = ground.width/2
  invisibleground = createSprite(200,height-20,400,40)
  invisibleground.visible = false
   trex = createSprite(50,height-20,10,10);
  trex.addAnimation( "running",trex_running);
  trex.addAnimation("collided", trexcollided);
  trex.scale = height/790;
  trex.setCollider("circle", 0, 0, 31);
  //trex.debug = true
  
  // create obstacle and cloud group
  obstaclegroup  = createGroup();
  cloudgroup = createGroup();
  restart = createSprite(width/2, height - 200);
  restart.addImage(restartimg);
  restart.scale = height/2000
  gameover = createSprite(width/2, restart.y - 60)
  gameover.addImage(gameoverimg)    
  gameover.scale = height/300
  restart.visible = false;
  gameover.visible = false;
   
  
}

function draw(){
  
  background("grey");
   

    
  //background("black")
  restart.visible = false;
  gameover.visible = false;
   trex.collide(invisibleground); 
  textSize(20)
  textFont("algerian");
  fill("black ")
  text("SCORE :" + score, width - 164 , 50);
  text("HIGHSCORE: "+ highscore, width - 210, 30);
 
  
  if(gamestate == "play"){
     spawncloud();
   spawnobstacle();
    if(score> highscore){
      highscore = score
    }
    if(score> 0 && score%100 == 0){
     checksound.play();
    }
    
     score = score + Math.round((getFrameRate()/60))
    trex.velocityY = trex.velocityY + 0.8

    ground.velocityX = -(6 + score/100)
    
  if(ground.x < 0){
    ground.x = ground.width/2
  }
    if(touches.length > 0 && trex.y > height - 70||keyDown("space")&& trex.y > height - 70){
      jumpsound.play(); 
    trex.velocityY = -11.5   ; 
     }
    
   
    if(obstaclegroup.isTouching(trex)){
      trex.addImage(trexcollided)
      trex.velocityY = -12;
       jumpsound.play(); 
     // diesound.play();
      //gamestate = "end";
    }
    
  }
  else if(gamestate == "end"){
    trex.changeAnimation("collided", trexcollided)
    trex.velocityY = 0
    restart.visible = true;
    gameover.visible = true;
    ground.velocityX = 0
    obstaclegroup.setVelocityXEach(0)
    cloudgroup.setVelocityXEach(0)
  obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    if(touches.length > 0||mousePressedOver(restart)){
      trex.changeAnimation("running", trex_running)
      frameCount = 0
      jumpsound.play();
      gamestate = "play"
      obstaclegroup.destroyEach();
      cloudgroup.destroyEach();
      score = 0;
      
    }
   
    
  }
 
// console.log(frameCount)

  
  
 

  drawSprites();


}
function spawncloud(){
 if(frameCount%30 == 0){
    
  var cloud = createSprite(width,50, 50, 20);
   cloud.scale = height/400
    cloud.addAnimation("ncloud", cloudimage)
  cloud.velocityX = -(6 + score/150);
   cloud.y = Math.round(random(-height + 20, height - 150));
   cloud.lifetime = 300;
   cloudgroup.add(cloud);
  }
}
function spawnobstacle(){
  if(frameCount%(70)  == 0 && score < 850){
    
  var obstacle = createSprite(width,height - 50, 10, 10);
    obstacle.scale = height/700 
    
    
      obstacle.velocityX = - (6 + score/100 )
    
   var r = Math.round(random(1, 6))
   switch(r){
     case 1: obstacle.addImage(ob1);
      break;
      case 2: obstacle.addImage(ob2);
       break;
       case 3: obstacle.addImage(ob3);
       break;
       case 4: obstacle.addImage(ob4);
       break;
       case 5: obstacle.addImage(ob5);
       break;
       case 6: obstacle.addImage(ob6);
       break;
       default:break;
   }
   
    obstacle.lifetime = 300;
    obstaclegroup.add(obstacle);
     
   }  
   else if(frameCount%50 == 0 && score > 850){
    var obstacle = createSprite(width,height - 50, 10, 10);
    obstacle.scale = height/700
    
    
      obstacle.velocityX = - (6 + score/100 )
    
   var r = Math.round(random(1, 6))
   switch(r){
     case 1: obstacle.addImage(ob1);
      break;
      case 2: obstacle.addImage(ob2);
       break;
       case 3: obstacle.addImage(ob3);
       break;
       case 4: obstacle.addImage(ob4);
       break;
       case 5: obstacle.addImage(ob5);
       break;
       case 6: obstacle.addImage(ob6);
       break;
       default:break;
   }
   
    obstacle.lifetime = 300;
    obstaclegroup.add(obstacle);
    }
  else if(frameCount% 46 == 0 && score > 1500){
  var obstacle = createSprite(width,height - 50, 10, 10);
    obstacle.scale = height/700
    
    
      obstacle.velocityX = - (6 + score/100 )
    
   var r = Math.round(random(1, 6))
   switch(r){
     case 1: obstacle.addImage(ob1);
      break;
      case 2: obstacle.addImage(ob2);
       break;
       case 3: obstacle.addImage(ob3);
       break;
       case 4: obstacle.addImage(ob4);
       break;
       case 5: obstacle.addImage(ob5);
       break;
       case 6: obstacle.addImage(ob6);
       break;
       default:break;
   }
   
    obstacle.lifetime = 300;
    obstaclegroup.add(obstacle);
    
  }
}

