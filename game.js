const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const groundImg = new Image();//картинка поля
groundImg.src = "image.png";

const foodImg = new Image();//картинка еды
foodImg.src = "food.png";

const foodImg2 = new Image();//картинка еды
foodImg2.src = "food2.png";

const snakeImg = new Image();//картинка еды
snakeImg.src = "snake.png";

let box = 32; //картинка ширины или высоты еды

let score = 0; //счет змейки 

let food = {
	x: Math.floor(Math.random() * 17 + 1) * box, // рисование где будет появлятся еда
	y: Math.floor(Math.random() * 15 + 3) * box
};

let snake = [];
snake[0] = {
	x: 9 * box, // змейка спавн центр
	y: 10 * box
};

document.addEventListener("keydown", direction);// добавление обрабочика событий нажатия кнопок

let dir;

function direction(event) { // управление змейкой
	if (event.keyCode == 65  && dir!="right") // коды клавиш и змейка не может двигаться в право если идет в лево
		dir = "left";
	else if(event.keyCode ==  87 && dir!="down")
		dir = "up";
	else if(event.keyCode ==  68 && dir!="left")
		dir = "right";
	else if(event.keyCode ==  83 && dir!="up")
		dir = "down";

}

function eatTail(head, arr) { // проверка на седение хвоста
	for(let i = 0; i < arr.length; i++){
		if(head.x == arr[i].x && head.y == arr[i].y)
			clearInterval(game);

	}

	
}

function drawGame() {
	ctx.drawImage(groundImg, 0, 0);//рисуем поле

	//
	var imagesArray = [foodImg2, foodImg];


	//create a function named displayImage
	//it should not have any values passed into it

	function displayImage(){

    	//the first statement should generate a random number in the range 0 to 6 (the subscript values of the image file names in the imagesArray)
    	var num = Math.floor(Math.random() * 2); // 0...6
    	//the second statement display the random image from the imagesArray array in the canvas image using the random number as the subscript value
    	document.canvas.src = imagesArray[num];

	}

	//
	ctx.drawImage(foodImg, food.x, food.y); //рисуем еду
	ctx.drawImage(foodImg2, food.x, food.y); //рисуем еду

	

	for(let i =0; i < snake.length; i++){ // цикл чтобы зммейка росла
		
		ctx.drawImage(snakeImg, snake[i].x, snake[i].y);
		var pat = ctx.createPattern(snakeImg, "repeat"); // добавление картинки вместо тела
		ctx.fillStyle = i == 0 ? pat : "green" ; // цвет змеи

		//ctx.fillStyle = i == 0 ? "red" : "yellow" ; // цвет змеи
		ctx.fillRect(snake[i].x, snake[i].y, box, box);//рисование головки змейки поцентру
	}

	ctx.fillStyle = "white";// цвет шрифта
	ctx.font = "50px Arial" // стиль шрифта
	ctx.fillText(score, box * 2.5, box * 1.7); // кордината счета

	let snakeX = snake[0].x; // передвижение самой змейки по x and y
	let snakeY = snake[0].y;

	if(snakeX == food.x && snakeY == food.y){ // проверка на седение еды
	  score++;
	  food = {
	    x: Math.floor((Math.random() * 17 + 1)) * box,
		y: Math.floor((Math.random() * 15 + 3)) * box,
	  };			  
	} else {
	  snake.pop(); //удаляем последний элемент в массиве
	}

	if(snakeX < box || snakeX > box * 17 ||
	 snakeY < 3 * box || snakeY > box * 17) // проверка выхода змеики за пля
		clearInterval(game);


	if(dir == "left") snakeX -= box;
	if(dir == "right") snakeX += box; // проверка на какие клавиши нажали
	if(dir == "up") snakeY -= box;
	if(dir == "down") snakeY += box;

	let newHead ={ // добавление новой головки змейке
		x: snakeX,
		y: snakeY
	};

	eatTail(newHead, snake);// вызов функции едящий хвост

	snake.unshift(newHead); // добавление головки в самое начало
}

let game = setInterval(drawGame, 100);//вызывание функции каждые 100 мил/сек
                                      //чтобы рисовался рисунок