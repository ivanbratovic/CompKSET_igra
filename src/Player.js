function Player(x,y) {
	// Konstruktor
	this.x = x;
	this.y = y;
	this.posVector = createVector(x,y);
	this.sprite = 5;
	this.h = 5;
	this.element = "none";
	//
	this.direction = "R";
	this.dirVector = createVector(1,0)
	//
	this.maxHP = 200;
	this.HP = this.maxHP;
	//
	this.velocity = 3;
	this.acceleration = 0.05;
	// Metode
	this.show = function(){
		noStroke();
		fill(255);
		ellipse(this.x,this.y,15,15);
		var amp = 3;
		var dirEllipse = createVector(this.posVector.x + amp * this.dirVector.x, this.posVector.y + amp * this.dirVector.y);
		switch(this.element) {
			case "fire":
				fill(163, 29, 14);
				break;
			case "water":
				fill(9, 83, 117);
				break;
			case "earth":
				fill(104, 39, 9);
				break;
			case "air":
				fill(178, 132, 214);
				break;
		}
		ellipse(dirEllipse.x,dirEllipse.y,8,8);
		fill(20);
		ellipse(dirEllipse.x,dirEllipse.y,4,4);
	}

	this.move = function(dir){
		this.direction = dir;
		switch (dir){
			case "LU":
				this.x -= this.velocity / sqrt(2);
				this.y -= this.velocity / sqrt(2);
				this.dirVector = createVector(-1,-1).normalize();
				break;
			case "RU":
				this.x += this.velocity / sqrt(2);
				this.y -= this.velocity / sqrt(2);
				this.dirVector = createVector(1,-1).normalize();
				break;
			case "LD":
				this.x -= this.velocity / sqrt(2);
				this.y += this.velocity / sqrt(2);
				this.dirVector = createVector(-1,1).normalize();
				break;
			case "RD":
				this.x += this.velocity / sqrt(2);
				this.y += this.velocity / sqrt(2);
				this.dirVector = createVector(1,1).normalize();
				break;
			case "L":
				this.x -= this.velocity;
				this.dirVector = createVector(-1,0);
				break;
			case "R":
				this.x += this.velocity;
				this.dirVector = createVector(1,0);
				break;
			case "U":
				this.y -= this.velocity;
				this.dirVector = createVector(0,-1);
				break;
			case "D":
				this.y += this.velocity;
				this.dirVector = createVector(0,1);
				break;
		}
		this.posVector = createVector(this.x, this.y);
	}
}