var player;
var projectiles = [];
var projectileDir = "R";
var golems = [];
var paused = false;
var gameOver = false;

function setup() {
	createCanvas(650, 650);
	background(50);
	player = new Player(width/2, height/2)
	frameRate(60);
}

function draw() {
	background(50);
	var posPlayer = createVector(player.x,player.y);
	//////
	/// DRAWING PLAYER HP METER
	//////
	rectMode(CORNER);
	fill(66,0,0);
	rect(0,0,width,20);
	fill(142,0,0);
	rect(1,1,map(player.HP,0,player.maxHP,0,width-2),18);
	//////
	/// Detecting movement
	//////
	if (keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)) {				// LU
   		player.move("LU");
   		projectileDir = "LU";
	} else if (keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)) {		// RU
   		player.move("RU");
   		projectileDir = "RU";
	} else if (keyIsDown(LEFT_ARROW) && keyIsDown(DOWN_ARROW)) { 	// LD
   		player.move("LD");
   		projectileDir = "LD";
	} else if (keyIsDown(RIGHT_ARROW) && keyIsDown(DOWN_ARROW)) { 	// RD
   		player.move("RD");
   		projectileDir = "RD";
	} else if (keyIsDown(LEFT_ARROW)) {								// L				
   		player.move("L");
   		projectileDir = "L";
	} else if (keyIsDown(RIGHT_ARROW)) {							// R
   		player.move("R");
   		projectileDir = "R";
	} else if (keyIsDown(UP_ARROW)) {								// U
   		player.move("U");
   		projectileDir = "U";	
	} else if (keyIsDown(DOWN_ARROW)) {								// D
   		player.move("D");
   		projectileDir = "D";
	}
	//////
	/// LIMITING PLAYER MOVEMENT
	//////
	if(player.x > width - 8){
		player.x = width - 8;
	} else if (player.x < 8){
		player.y = 8;
	}
	if(player.y > height - 8){
		player.y = height- 8;
	} else if (player.y < 8){
		player.y = 8;
	}
	//////
	/// SPAWNING GOLEMS
	//////
	if(random(0,100) < sqrt(frameCount)/50 && golems.length < 25){
		console.log("Spawning a golem.");
		var side = floor(random(0,4));
		switch(side){
			case 0: // UP
				golems.push(new Golem(random(width),-10));
				break;
			case 1: // RIGHT
				golems.push(new Golem(width+10,random(height)));
				break;
			case 2: // DOWN
				golems.push(new Golem(random(width),height+10));
				break;
			case 3: // LEFT
				golems.push(new Golem(-10, random(height)));
				break;
		}
	}

	////////////
	/// DRAWING ENTITIES
	////////////
	player.show();
	for (var i = projectiles.length - 1; i >= 0; i--) {
		projectiles[i].show();
		projectiles[i].move();
		if(projectiles[i].x > width + 20 || projectiles[i].x < -20 || projectiles[i].y > height + 20 || projectiles[i].y < - 20){
			projectiles.splice(i,1);
		}
	}
	for (var i = golems.length - 1; i >= 0; i--) {
		var posGolem1 = createVector(golems[i].x,golems[i].y);
		golems[i].show();
		golems[i].moving = true;
		for (var j = golems.length - 1; j >= 0; j--) {
			if(i==j || !golems[j].moving)
				continue;
			var posGolem2 = createVector(golems[j].x,golems[j].y);
			if(posGolem1.dist(posGolem2) <= 40){
				golems[i].moving = false;
				break;
			}
		}
		if(golems[i].moving){
			golems[i].move(player.x,player.y);
		}
		if(golems[i].HP <= 0){
			golems.splice(i,1);
		}
	}
	////////
	// COLLISION DETECTION
	////////
	for (var i = projectiles.length - 1; i >= 0; i--) {
		var posProj = createVector(projectiles[i].x,projectiles[i].y);
		for (var j = golems.length - 1; j >= 0; j--) {
			var posGolem = createVector(golems[j].x, golems[j].y);
			if(posProj.dist(posGolem) < 25){
				golems[j].hit(projectiles[i]);
				projectiles.splice(i,1);
			}
		}
	}
	for (var i = golems.length - 1; i >= 0; i--) {
		var posGolem = createVector(golems[i].x, golems[i].y);
		if(posPlayer.dist(posGolem) < 15){
			player.HP = player.HP - golems[i].damage;
			if (player.HP <= 0){
				gameOver = true;
				noLoop();
			}
			golems.splice(i,1);
		}
	}
}

function keyPressed() {
	if (gameOver)
		return;
	console.log(keyCode);
	//////
	/// SHOOTING PROJECTILES
	//////
	if (keyCode == 81) { // Q - Fire
		player.element = "fire";
		projectiles.push(new Projectile(player.x, player.y, projectileDir,"player","fire"));
	} else if (keyCode == 87) { // W - Water
		player.element = "water";
		projectiles.push(new Projectile(player.x, player.y, projectileDir,"player","water"));
	} else if (keyCode == 69) { // E - Earth
		player.element = "earth";
		projectiles.push(new Projectile(player.x, player.y, projectileDir,"player","earth"));
	} else if (keyCode == 82) { // R - Air
		player.element = "air";
		projectiles.push(new Projectile(player.x, player.y, projectileDir,"player","air"));
	}
	/////
	// PAUSE BUTTON
	/////
	if (keyCode === ESCAPE){
		if (!paused) {
			background(100);
			console.log("PAUSED");
			noLoop();
			paused = true;
		} else {
			paused = false;
			console.log("UNPAUSED");
			loop();
		}
	}
}