const symbols = ["🍒", "🍋", "🍉", "🍊", "🍇", "⭐","HELTIGRINHO"];
let spinning = false;
let saldo = 50;

const frasesDePerda = [
    "PERDEU, mas o Heltigrinho paga fi, esqueça tudo ",
    "Minha vó é mais sortuda que você ",
    "não foi dessa vez amigao, só pra vc não ficar triste leva um chorinho",
    "kkkk muito ruim parça, tó ",
    "Olha você perdeu mas não faz mal vo te dar um troquinho",
    "Aqui é impossivel de perder irmão ",
    "Aqui a carta é solta memo quando vc perde vc ganha"
  ]


  function renderSymbol(symbol, isWinner = false) {
    if (symbol === "HELTIGRINHO") {
        return `<div class="symbol ${isWinner ? "winner" : ""}">
                    <img src="images/Heltigrinho.png" alt="Heltigrinho" style="width:80px; height:80px;">
                </div>`;
    } else {
        return `<div class="symbol ${isWinner ? "winner" : ""}">${symbol}</div>`;
    }
}

function atualizarSaldo() {
    document.getElementById("saldo-texto").textContent = `Saldo R$: ${saldo}`;
}
const spinSound = new Audio("sounds/slot.mp3")

function spin() {  
    if (spinning) return;
    spinning = true;
    spinSound.play();

    saldo -= 5; 
    atualizarSaldo();
    
    let reels = [
        document.getElementById("reel1").querySelector(".reel-content"),
        document.getElementById("reel2").querySelector(".reel-content"),
        document.getElementById("reel3").querySelector(".reel-content")
    ];
    let result = document.getElementById("result");
    result.textContent = '  '
    

    let finalSymbols = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
    ];
    
    reels.forEach((reel, index) => {
        spinReel(reel, 2 + index * 0.5, finalSymbols[index]);
    });
    
    setTimeout(() => {
        reels.forEach((reel, index) => {
            reel.style.animation = "";
            reel1.style.animation = "";
            reel2.style.animation = "";
            reel3.style.animation = "";
            reel.innerHTML = generateReelContent(finalSymbols[index]);
            reel.style.transform = "translateY(-80px)";
        });
        
        spinning = false;
        let premio = Math.floor((Math.random() * 15)+6);
        let frasePerdeu = frasesDePerda[Math.floor(Math.random() * frasesDePerda.length)];
        
        if (finalSymbols[0] === finalSymbols[1] && finalSymbols[1] === finalSymbols[2]) {
            result.textContent = `🎉 Você ganhou! 🎉`;
            let premiotrue = premio * 10;
            document.getElementById("retanguloPremio").textContent = `Prêmio: ${premiotrue} reais`;
            saldo = saldo + premiotrue;
            atualizarSaldo();
            const videoIndex = Math.floor(Math.random() * 2) + 1 ; // Gera 1 ou 2
            const videoPremio = document.getElementById(`videoPremio${videoIndex}`);

            videoPremio.style.display = "block";
            videoPremio.play();
            videoPremio.onended = () => {
                videoPremio.style.display = "none";
            };
        } else {
            result.textContent = ` ${frasePerdeu}`;
            document.getElementById("retanguloPremio").textContent =`Premio : ${premio} reais`; 
            saldo = saldo + premio;
            atualizarSaldo();
        }
        
    }, 4000);
}


function generateReelContent(finalSymbol) {
    let content = "";

    for (let i = 0; i < 2; i++) {
        content += renderSymbol(symbols[Math.floor(Math.random() * symbols.length)]);
    }

    content += renderSymbol(finalSymbol, true);

    for (let i = 0; i < 2; i++) {
        content += renderSymbol(symbols[Math.floor(Math.random() * symbols.length)]);
    }
    return content;
}


function spinReel(reel, duration, finalSymbol) {
    reel.innerHTML = "";
    for (let i = 0; i < 20; i++) {
        reel.innerHTML += `<div class="symbol">${symbols[Math.floor(Math.random() * symbols.length)]}</div>`;
    }
    reel.innerHTML += `<div class="symbol">${finalSymbol}</div>`;
    reel.style.animation = `moveUp ${duration}s linear infinite`;
}

let botao = document.getElementById("meuBotao");
let modal = document.getElementById("modal");
let fechar = document.getElementsByClassName("fechar")[0];

botao.onclick = function() {
  modal.style.display = "block";
};

fechar.onclick = function() {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

let botaoInstagram = document.getElementById("botaoInstagram");

botaoInstagram.onclick = function() {
  window.open("https://www.instagram.com/heltolol", "_blank");
};

let botaofecha = document.getElementById("botaofecha");
botaofecha.onclick = function(){
    modal.style.display = "none";
};

function ajustarMargemSlotMachine() {
    const letreiro = document.getElementById("letreiroTopo");
    const slotMachine = document.querySelector(".slot-machine");

    if (letreiro && slotMachine) {
        const alturaLetreiro = letreiro.offsetHeight;
        slotMachine.style.marginTop = `${alturaLetreiro + 30}px`; // 20px de espaço adicional
    }
}

// Chame a função quando a página carregar e quando a janela for redimensionada
window.onload = ajustarMargemSlotMachine;
window.onresize = ajustarMargemSlotMachine;

