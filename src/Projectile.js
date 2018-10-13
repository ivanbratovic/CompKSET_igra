function Projectile(x,y,dir,affinity,element) {
	// Konstruktor
	this.x = x;
	this.y = y;
	//
	this.affinity = affinity;
	this.element = element;
	//
	this.direction = dir;
	console.log(this.direction)
	this.velocity = 6;
	this.acceleration = 0.05;

	switch (this.element) {
		case "fire":
			this.color = color(181, 27, 27);
			break;
		case "air":
			this.color = color(196, 180, 232);
			break;
		case "earth":
			this.color = color(79, 66, 56);
			break;
		case "water":
			this.color = color(41, 103, 178);
			break;
	}
	// Metode
	this.show = function(){
		fill(this.color);
		noStroke();
		ellipse(this.x,this.y,10,10);
	}

	this.move = function(){
		switch (this.direction){
			case "LU":
				this.x -= this.velocity / sqrt(2);
				this.y -= this.velocity / sqrt(2);
				break;
			case "RU":
				this.x += this.velocity / sqrt(2);
				this.y -= this.velocity / sqrt(2);
				break;
			case "LD":
				this.x -= this.velocity / sqrt(2);
				this.y += this.velocity / sqrt(2);
				break;
			case "RD":
				this.x += this.velocity / sqrt(2);
				this.y += this.velocity / sqrt(2);
				break;
			case "L":
				this.x -= this.velocity;
				break;
			case "R":
				this.x += this.velocity;
				break;
			case "U":
				this.y -= this.velocity;
				break;
			case "D":
				this.y += this.velocity;
				break;
		}
	}
}