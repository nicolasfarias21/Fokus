const fundo = document.querySelector('html')
const listaDeBotao = document.querySelectorAll('button')
const botaoFoco = listaDeBotao[0];
const botaoCurto = listaDeBotao[1];
const botaoLongo = listaDeBotao[2];
const banner = document.querySelector('.app__image')
const title = document.querySelector('.app__title')
const musicaInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const playAudio = new Audio('/sons/play.wav')
const pauseAudio = new Audio('/sons/pause.mp3')
const botaoIniciar = document.querySelector('#start-pause')
const botaoSpan = document.querySelector('#start-pause span')
const botaoSpanImg = document.querySelector('.app__card-primary-butto-icon')
const timer = document.querySelector('#timer')
const audioFinalizado = new Audio('/sons/beep.mp3')
musica.loop = true;   

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})

function alterarContexto(contexto){
    mostrarTempo()
    listaDeBotao.forEach( function(contexto) {
        contexto.classList.remove('active')
    })
    fundo.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)

    switch (contexto) {
        case "foco":
            title.innerHTML = 
            `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
        break;

        case "descanso-curto":
            title.innerHTML =
            `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
        break;
        
        case "descanso-longo":
            title.innerHTML =
            `Hora de voltar à superfície<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
        break;
        default:
            break;
    }
}

function mudarFundo (){

    botaoFoco.onclick = () => {
        alterarContexto('foco');
        tempoDecorridoEmSegundos = 1500;
        botaoFoco.classList.add('active');
    }
    botaoCurto.onclick = () => {
        tempoDecorridoEmSegundos = 300;
        alterarContexto('descanso-curto');
        botaoCurto.classList.add('active');
    }
    botaoLongo.onclick =  () => {
        tempoDecorridoEmSegundos = 900;
        alterarContexto('descanso-longo');
        botaoLongo.classList.add('active');
    }
}


const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioFinalizado.play()
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo()
}
botaoIniciar.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if(intervaloId){
        zerar()
        return
    }
    playAudio.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
    botaoSpan.innerText = `Pausar`;
    botaoSpanImg.setAttribute('src', `/imagens/pause.png`)
}

function zerar(){
    pauseAudio.play()
    botaoSpanImg.setAttribute('src', `/imagens/play_arrow.png`)
    botaoSpan.innerText = `Começar`;
    clearInterval(intervaloId)
    intervaloId = null;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br',{minute: '2-digit', second: '2-digit'})
    timer.innerHTML = `${tempoFormatado}`
}

mostrarTempo();
mudarFundo();