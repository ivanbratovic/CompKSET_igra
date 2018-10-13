function Golem(x,y) {
	// Konstruktor
	this.x = x;
	this.y = y;
	//
	this.maxHP = 100;
	this.HP = 100;
	this.damage = 10;
	this.buffed = false;
	//
	this.moving = true;
	this.velocity = random(1,5);
	this.element= floor(random(0,4))
	switch (this.element) {
		case 0:
			this.colour = color(181, 27, 27);	// FIRE
			this.velocity = 0.5;
			this.HP = 75;
			this.maxHP = 75;
			this.damage = 15;
			this.element = "fire";
			break;
		case 1:
			this.colour = color(196, 180, 232);	// AIR
			this.velocity = 1;
			this.HP = 30
			this.maxHP = 30;
			this.damage = 8;
			this.element = "air";
			break;
		case 2:
			this.colour = color(79, 66, 56);	// EARTH
			this.velocity = 0.25;
			this.HP = 200;
			this.maxHP = 200;
			this.damage = 15;
			this.element = "earth";
			break;
		case 3:
			this.colour = color(41, 103, 178);	// WATER
			this.velocity = 0.5;
			this.element = "water";
			break;
	}
	// Metode
	this.show = function(){
		rectMode(CENTER);
		fill(this.colour);
		stroke(50);
		rect(this.x,this.y,30,30);
		fill(142,0,0);
		if(this.buffed)
			fill(163, 110, 6);
		rect(this.x,this.y+20,map(sqrt(this.HP),0,10,0,50),7);
	}

	this.move = function(x,y){
		// calculate the angle to the player
		var pGolem = createVector(this.x,this.y);
		var pPlayer = createVector(x,y);
		
		var distance = pGolem.dist(pPlayer);
		if(distance < 50){
		//	return;
		}
		var direction = pPlayer.sub(pGolem).normalize();

		pGolem.add(direction.mult(this.velocity));
		this.x = pGolem.x;
		this.y = pGolem.y;
	}

	this.hit = function(projectile){
		var projectileElement = projectile.element;
		if(projectileElement == this.element){
			if (!this.buffed){
				this.maxHP = this.maxHP * 1.2;
				this.buffed = true;
			}
			if (this.HP > this.maxHP){
				this.HP = this.maxHP;
			}
			this.HP = this.maxHP;
			this.damage = this.damage * 1.2;
			switch (projectileElement) {
				case "fire":
					this.colour = color(237, 16, 16);
					break;
				case "water":
					this.colour = color(7, 191, 242);
					break;
				case "air":
					this.colour = color(155, 155, 155);
					break;
				case "earth":
					this.colour = color(63, 45, 35);
					break;
			}
		} else {
			if(this.element === "fire"){
				switch(projectileElement){
					case "water":
						this.HP = this.HP - 30;
						break;
					case "earth":
						this.HP = this.HP - 10;
						break;
					case "air":
						this.HP = this.HP - 17;
						break;
				}
			} else if (this.element === "air"){
				switch(projectileElement){
					case "water":
						this.HP = this.HP - 17;
						break;
					case "earth":
						this.HP = this.HP - 7;
						break;
					case "fire":
						this.HP = this.HP - 17;
						break;
				}
			} else if (this.element === "water"){
				switch(projectileElement){
					case "fire":
						this.HP = this.HP - 7;
						break;
					case "earth":
						this.HP = this.HP - 17;
						break;
					case "air":
						this.HP = this.HP - 17;
						break;
				}
			} else {			/// earth
				switch(projectileElement){
					case "water":
						this.HP = this.HP - 30;
						break;
						break;
					case "fire":
						this.HP = this.HP - 17;
						break;
					case "air":
						this.HP = this.HP - 10;
						break;
				}
			}
		}
		return;
	}
}