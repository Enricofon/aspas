class Form {
  constructor() {//estrutura do formulário
    //exibir uma caixa vazia com o texto fornecido no placeholder
    this.input = createInput("").attribute("placeholder","name")
    //botão para iniciar o jogo
    this.playButton = createButton("jogue")
    //elemento para exibir a imagem de boas vindas ao jogador
    this.titleimg = createImg("./assets/title.png","title of game")
    //criando um título que será exibido para dar boas vindas ao jogador
    this.greeting = createElement("h2")
  }

  setElementPosition() {
   this.titleimg.position(120,50) 
   this.input.position(width/2-110,height/2-80)
   this.playButton.position(width/2 -90,height/2-20)
   this.greeting.position(width/2-300,height/2-100)
  }

  hide() {//esconder alguns elementos depois que o botão for clicado
    this.greeting.hide()
    this.input.hide()
    this.playButton.hide()

  }

  //método que criará classes nos elementos html para adicionar estílos que estão no styles.css
  setElementsStyle() {
    this.titleimg.class("gameTitle");
    this.input.class("customInput");
    this.playButton.class("customButton");
    this.greeting.class("greeting");
  }

  handleMousePressed() {
    this.playButton.mousePressed(()=>{
      this.input.hide()
      this.playButton.hide()
      var message =`oi ${this.input.value()}</br>espere outro tyrone`;
      this.greeting.html(message)
      playerCount +=1
      player.name = this.input.value()
      player.index = playerCount
      player.addPlayer()
      player.updateCount(playerCount)
      player.getDistance()
    })
  }

  display() {
    //chamar funções criadas nessa classe
    this.handleMousePressed()
    this.setElementPosition()
    this.setElementsStyle()



  }
}
