let estrelas = [];
let score = 0;
let premio = '';
let tempoLimite = 30; // Tempo em segundos
let tempoRestante = tempoLimite; // Tempo restante para atingir a meta
let tempoInicio; // Armazena o tempo de início para calcular o tempo restante

function setup() {
  createCanvas(600, 400);
  // Cria algumas estrelas no início
  for (let i = 0; i < 10; i++) {
    estrelas.push(new Estrela());
  }
  
  tempoInicio = millis(); // Marca o tempo de início
}

function draw() {
  background(220, 255, 200); // Fundo que lembra natureza e urbanização
  
  // Calcula o tempo restante
  tempoRestante = tempoLimite - Math.floor((millis() - tempoInicio) / 1000);
  
  // Se o tempo acabou, reinicia o jogo
  if (tempoRestante <= 0) {
    tempoRestante = 0; // Evita que o tempo vá para valores negativos
    // Se o jogador não atingiu 50 pontos, reinicia o jogo
    if (score < 50) {
      score = 0;
      premio = '';
      estrelas = [];
      for (let i = 0; i < 10; i++) {
        estrelas.push(new Estrela());
      }
      tempoInicio = millis(); // Reinicia o contador de tempo
    }
  }

  fill(0);
  textSize(16);
  text("Clique nas estrelas para celebrar a conexão!", 10, 20);
  text("Pontuação: " + score, 10, 40);
  text("Prêmio: " + premio, 10, 60);
  text("Tempo Restante: " + tempoRestante + "s", 10, 80);

  // Desenha e atualiza as estrelas
  for (let i = estrelas.length - 1; i >= 0; i--) {
    estrelas[i].mostrar();
    estrelas[i].mover();
    if (estrelas[i].clicado()) {
      score++;
      estrelas.splice(i, 1);
      // Adiciona uma nova estrela para manter o jogo ativo
      estrelas.push(new Estrela());
      verificarPremio();
    }
  }

  // Verificar se o jogo atingiu 50 pontos e reiniciar
  if (score >= 50) {
    premio = "Parabéns! Você ganhou um super desconto!";
    score = 0;  // Reinicia a pontuação
    estrelas = [];  // Reseta as estrelas
    for (let i = 0; i < 10; i++) {
      estrelas.push(new Estrela()); // Cria novas estrelas
    }
    tempoInicio = millis(); // Reinicia o contador de tempo
  }
}

// Classe Estrela
class Estrela {
  constructor() {
    this.x = random(width);
    this.y = random(height / 2);
    this.tamanho = 20;
    this.velocidade = random(1, 3);
  }

  mostrar() {
    fill(255, 215, 0);
    noStroke();
    star(this.x, this.y, this.tamanho / 2, this.tamanho / 4, 5);
  }

  mover() {
    this.y += this.velocidade;
    if (this.y > height) {
      this.y = 0;
      this.x = random(width);
    }
  }

  clicado() {
    if (mouseIsPressed && dist(mouseX, mouseY, this.x, this.y) < this.tamanho) {
      return true;
    }
    return false;
  }
}

// Função para desenhar uma estrela
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius1;
    let sy = y + sin(a) * radius1;
    vertex(sx, sy);
    
    sx = x + cos(a + angle / 2) * radius2;
    sy = y + sin(a + angle / 2) * radius2;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// Função para verificar o prêmio com base na pontuação
function verificarPremio() {
  if (score >= 10 && score < 20) {
    premio = "Você ganhou uma medalha de bronze!";
  } else if (score >= 20 && score < 30) {
    premio = "Você ganhou uma medalha de prata!";
  } else if (score >= 30 && score < 50) {
    premio = "Você ganhou uma medalha de ouro!";
  } else if (score >= 50) {
    premio = "Parabéns! Você ganhou um super desconto!";
  } else {
    premio = ''; // Nenhum prêmio se não tiver atingido nenhum marco
  }
}
