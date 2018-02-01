document.addEventListener('DOMContentLoaded', function () {

    function Furry() {
        this.x = 0;
        this.y = 0;
        this.direction = 'right';
    }



    function Coin(){
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    }



    function Game() {

        this.board = document.querySelectorAll('#board > div');
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 0;
        var self = this;

        this.index = function(x,y) {
            return x + (y * 10);
        };

        this.showFurry = function () {
            this.hideVisibleFurry();
            this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
        };

        this.moveFurry = function () {
            if(this.furry.direction === 'right'){this.furry.x += 1}
            else if(this.furry.direction === 'left'){this.furry.x -= 1}
            else if(this.furry.direction === 'top'){this.furry.y -= 1}
            else {this.furry.y += 1}

            this.gameover();
            this.showFurry();
            this.checkCoinCollision();
        };

        this.hideVisibleFurry = function(){
            if(document.querySelector('.furry') !== null){
                document.querySelector('.furry').classList.remove('furry');
            }
        };

        this.showCoin = function () {
            this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
        };

        this.startGame = function () {
            this.showFurry();
            this.showCoin();
            this.idSetInterval = setInterval(function () {
                self.moveFurry();
            }, 150);

            document.addEventListener('keydown', function (event) {
                self.turnFurry(event);
            })
        };

        this.turnFurry = function (event) {

            switch (event.which) {
                case 37:
                    this.furry.direction = 'left';
                    break;
                case 38:
                    this.furry.direction = 'top';
                    break;
                case 39:
                    this.furry.direction = 'right';
                    break;
                case 40:
                    this.furry.direction = 'down';
                    break;
            }
        };

        this.checkCoinCollision = function () {
          if(this.coin.x === this.furry.x && this.coin.y === this.furry.y){
              document.querySelector('#score strong').innerText = ++this.score;
              document.querySelector('.coin').classList.remove('coin');
              this.coin = new Coin();
              this.showCoin();
          }
        };

        this.gameover = function () {
            if(this.furry.x < 0 || this.furry.x > 9|| this.furry.y < 0 || this.furry.y > 9){
                clearInterval(this.idSetInterval);

                var body = document.querySelector('body');
                var fullScreenDiv = document.createElement('div');
                var span = document.createElement('span');

                fullScreenDiv.innerText = 'Game Over';
                fullScreenDiv.classList.add('fullScreen');
                span.innerText = 'Your score: ' + this.score;
                span.style.fontSize = '40px';
                body.appendChild(fullScreenDiv);
                fullScreenDiv.appendChild(span);
            }
        };

    }

    var newGame = new Game();
    newGame.startGame();
});