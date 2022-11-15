class Player {
  constructor() {
  this.name = null
  this.index = null
  this.positionX = 0 
  this.positionY = 0 
  this.rank = 0
  this.score = 0
  this.fuel = 175
  this.life = 185
  }
  addPlayer(){
    var playerIndex ="players/player"+this.index
    if(this.index === 1){
       this.positionX = width/2-100
    }else{
      
       this.positionX = width/2+100
  }
  database.ref(playerIndex).set({
    name:this.name,
    positionX:this.positionX,
  positionY:this.positionY,
  rank: this.rank,
  score: this.score,
  life: this.life

}
  )


}
getDistance() {//atualizando a distância
  var playerDistanceRef = database.ref("players/player" + this.index);
  playerDistanceRef.on("value", data => {
    var data = data.val();
    this.positionX = data.positionX;
    this.positionY = data.positionY;
  });
}


  //método para obter o playerCount e updateCount() epara atualizar o playerCount no bd
  getCount() {
    //ler os dados e armazenar dentro da função
    var playerCountRef = database.ref('playerCount');//referenciando ao bd
    playerCountRef.on("value",data=>{
      playerCount = data.val()
    })
  }
  
  //método para atualizar o playerCount no bd
  updateCount(count) {
    database.ref("/").update({
    playerCount : count  
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
     database.ref(playerIndex).update({//atualizando posições dos carros na tela
       positionX: this.positionX,
       positionY: this.positionY,
       rank: this.rank,
       score: this.score
     });
    }
  //As funções estáticas não ficam anexadas a cada objeto da classe
  static getPlayersInfo() {//function para obter todas as informações dos jogadores
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", data => {
      allPlayers = data.val();
    });
  }
 


 
}

