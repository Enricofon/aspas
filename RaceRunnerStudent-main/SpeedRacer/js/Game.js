class Game {
  constructor() {
    this.resettitle = createElement("h2")
    this.resetbutton = createButton('')
    this.leaderboardtitle =  createElement("h2")
    this.leader1 = createElement("h2")
    this.leader2 = createElement("h2")
  }

  getState() {//método que irá ler o gameState do banco de dados
      var gameStateRef = database.ref("gameState");//me referindo a chave gameState criada no bd
      //criando um ouvinte que fica acompanhando a mudança no valor da variável gameState no bd.
      gameStateRef.on("value", function(data) {        
      gameState = data.val()
    });
  }

  update(state) {//método que irá atualizar o gameState no bd para um valor passado para ele como parâmetro
    database.ref("/").update({//se refere ao banco de dados principal dentro do qual gameState é criado
     gameState : state
    });

  }
  start() {//método para obter o gameState e então iniciar o jogo
    //instância de um novo jogador
    player = new Player();
    playerCount = player.getCount()
    //inciando a variável playerCount
    form = new Form();
    form.display();

    //criar sprites dos jogadores
    car1 = createSprite(width/2-50,height - 1000)
    car1.addImage("car1",car1img)
    car1.scale = 0.07
    car2 = createSprite(width/2-50,height - 1000)
    car2.addImage("car2",car2img)
    car2.scale = 0.07

    //atribuindo os objetos ao vetor cars
   cars = [car1,car2]
  }
  
  handleElements(){
    form.hide();
    form.titleImg.position(40,50);
    form.titleImg.class("gameTitleAfterEffects");
    this.resettitle.html("reiniciar jogo")
    this.resettitle.class("resetText")
    this.resettitle.position(width/2+230,40)
    this.resetbutton.class("resetButton")
    this.resetbutton.position(width/2+230,100)
    this.leaderboardtitle.html("placar")
    this.leaderboardtitle.class("resetText")
    this.leaderboardtitle.position(width/3-60,40)
    this.leader1.class("leadersText")
    this.leader1.position(width/3-50,80)
    this.leader2.class("leadersText")
    this.leader2.position(width/3-50,130)
  }

  play() {
    //função para esconder os elementos
    this.handleElements();
    this.handleresetbutton()
    Player.getPlayersInfo();
  
    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);
      this.showLeaderboard()
      //desenhar os sprites
      var index = 0
      for (var plr in allPlayers) {
        index++
        var x = allPlayers[plr].positionX
        var y = height-allplayers[plr].positionY
        cars [index-1].positon.x = x
        cars [index-1].positon.y = y
        if(index === player.index){
          stroke(10)
          fill("cyan")
          ellipse(x,y,60,60)
          camera.position.x = cars[index - 1].position.x
          camera.position.y = cars[index - 1].position.y
        }
      }
      this.handlePlayerControls()
      drawSprites();

    }
  }
 
  handlePlayerControls() {
    // manipulando eventos de teclado
    if (keyIsDown(UP_ARROW)) {//movendo o carro pra cima
      player.positionY += 10;
      player.update();
    }
    if (keyIsDown(LEFT_ARROW)&&player.positionX>width/3-50) {//movendo o carro pra esquerda
      player.positionX += 5;
      player.update();
    }
    if (keyIsDown(RIGHT_ARROW)&player.positionX<width/2+300) {//movendo o carro pra direita
      player.positionX += 5;
      player.update();
    }
  }
  showLeaderboard() {
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
      // &emsp;    Essa etiqueta é usada para exibir quatro espaços.
      leader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
  
      leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
    }
  
    if (players[1].rank === 1) {
      leader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
  
      leader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
    }
  
    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }
 
handleresetbutton(){
  this.resetbutton.mousePressed (()=>{
   database.ref("/") .set({
    playerCount:0,
    gameState:0,
    players:{}
   }) 
   window.location.reload()
  })
}

}

