const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var rope2, rope3
var fruit_con;
var fruit_con2;
var fruit_con3

var bg_img;
var food;
var rabbit;

var button;
var button2, button3
var bunny;
var blink,eat,sad;

var canW, canH
function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false;

  air = loadSound("air.wav")
  cutting_foliage = loadSound("cutting_through_foliage.mp3")
  eating_sound = loadSound("eating_sound.mp3")
  rope_cut = loadSound("rope_cut.mp3")
  sad_sound = loadSound("sad.wav")
  bg_sound = loadSound("sound1.mp3")
}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth
    canH = displayHeight
    createCanvas(canW + 80, canH);
  }
  else{
    canW = windowWidth
    canH = windowHeight
    createCanvas(canW, canH)
  }
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

  mute_button = createImg('mute.png')
  mute_button.position(450, 20)
  mute_button.size(50, 50)
  mute_button.mouseClicked(mute)

  button2 = createImg('cut_btn.png');
  button2.position(330,35);
  button2.size(60,60);
  button2.mouseClicked(drop2);

  button3 = createImg('cut_btn.png');
  button3.position(360, 200);
  button3.size(60,60);
  button3.mouseClicked(drop3);
  
  // blower_button = createImg('balloon.png')
  // blower_button.position(10, 250)
  // blower_button.size(150, 100)
  // blower_button.mouseClicked(airBlow)

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;
  bunny = createSprite(420,canH-80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  rope = new Rope(8,{x:40,y:30});
  

  rope2 = new Rope(7, {x:370, y:40})

  rope3 = new Rope(4, {x:400, y:225})
  
  ground = new Ground(200,canH,600,20);

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,  fruit);
  fruit_con3 = new Link(rope3, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);

  bg_sound.play()
  bg_sound.setVolume(0.5)
}

function draw() 
{

  background(51);
  image(bg_img, 0, 0, canW + 80, canH);


  rope.show();
  rope2.show()
  rope3.show()
  Engine.update(engine);
  ground.show();
  imageMode(CENTER);
  if(fruit != null){
    image(food,fruit.position.x,fruit.position.y,70,70);
    
  }
  if(collide(fruit, bunny) == true){
    bunny.changeAnimation('eating')
    bg_sound.stop()
    eating_sound.play()
  }
  if(fruit != null && fruit.position.y >= 650){
    bg_sound.stop()
    bunny.changeAnimation('crying')
    sad.play()
    fruit = null
  }

  drawSprites();
}

function drop()
{
  rope_cut.play()
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}
function drop2()
{
  rope_cut.play()
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null; 
}
function drop3()
{
  rope_cut.play()
  rope3.break();
  fruit_con3.detach();
  fruit_con3 = null; 
}
function collide(body, sprite){
  if(body != null){
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
    if(d <= 80){
      World.remove(engine.world, body)
      fruit = null
      return true
    }
    else{
      return false
    }
  }
}
function mute(){
  if(bg_sound.isPlaying()){
    bg_sound.stop()
  }
  else{
    bg_sound.play()
  }
}
// function airBlow(){
//   Matter.Body.applyForce(fruit, {x: 0, y:0}, {x:0.01, y:0})
//   air.play()
// }

