const imagemPersonagem = document.querySelector(".personagem");
const nomePersonagem = document.querySelector(".nome");
const botoesPersonagem = document.querySelectorAll(".avatar");
const botaoSelfie = document.querySelector(".voce");
const fundoPadrao = "imagens/background2.jpg";

function atualizarPersonagem(botao) {
    const imagem = botao.dataset.imagem;
    const nome = botao.dataset.nome;

    if (!imagem || !nome || !imagemPersonagem || !nomePersonagem) {
        return;
    }

    imagemPersonagem.src = imagem;
    imagemPersonagem.alt = nome;
    nomePersonagem.textContent = nome;

    botoesPersonagem.forEach((outroBotao) => {
        const selecionado = outroBotao === botao;
        outroBotao.classList.toggle("selecionado", selecionado);
        outroBotao.setAttribute("aria-pressed", String(selecionado));
    });
}

botoesPersonagem.forEach((botao) => {
    botao.addEventListener("click", () => {
        atualizarPersonagem(botao);
    });
});

if (botaoSelfie) {
    botaoSelfie.addEventListener("click", () => {
        const personagemSelecionado = document.querySelector(".avatar.selecionado");
        const imagemSelecionada = personagemSelecionado?.dataset.imagem || "imagens/lucia.png";
        const fundoAtual = document.body.style.backgroundImage;

        if (fundoAtual && fundoAtual.includes(imagemSelecionada)) {
            document.body.style.backgroundImage = `url("${fundoPadrao}")`;
            botaoSelfie.textContent = "📸";
            return;
        }

        document.body.style.backgroundImage = `url("${imagemSelecionada}")`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        botaoSelfie.textContent = "✅";
    });
}


const btnVoce = document.querySelector('.voce');
const modal = document.getElementById('camera-modal');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const btnTirarFoto = document.getElementById('btn-tirar-foto');
const btnFechar = document.getElementById('btn-fechar-camera');
const menu = document.querySelector('.menu');

let streamCamera = null;

btnVoce.addEventListener('click', async () => {
    try {
        streamCamera = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = streamCamera;
        modal.style.display = 'flex';
    } catch (err) {
        alert('Precisa permitir a câmera pra virar uma lenda!');
    }
});

btnFechar.addEventListener('click', () => {
    fecharCamera();
});

function fecharCamera() {
    modal.style.display = 'none';
    if (streamCamera) {
        streamCamera.getTracks().forEach(track => track.stop());
    }
}

btnTirarFoto.addEventListener('click', () => {
    // tira a foto
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.scale(-1, 1); // espelha igual selfie
    ctx.drawImage(video, -canvas.width, 0);
    
    const fotoData = canvas.toDataURL('image/png');

    // cria novo avatar com sua foto
    const novoBotao = document.createElement('button');
    novoBotao.className = 'avatar selecionado';
    novoBotao.type = 'button';
    novoBotao.dataset.nome = 'VOCÊ';
    novoBotao.dataset.imagem = fotoData;
    novoBotao.setAttribute('aria-label', 'Selecionar Você');
    novoBotao.setAttribute('aria-pressed', 'true');
    novoBotao.innerHTML = `<img src="${fotoData}" alt="" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;

    // remove seleção dos outros
    botoes.forEach(b => {
        b.classList.remove('selecionado');
        b.setAttribute('aria-pressed', 'false');
    });

    menu.insertBefore(novoBotao, btnVoce);
    
    // atualiza personagem principal
    imagemPrincipal.src = fotoData;
    nomePersonagem.textContent = 'VOCÊ';

    // adiciona evento no novo botão também
    novoBotao.addEventListener('click', () => {
        botoes.forEach(b => b.classList.remove('selecionado'));
        novoBotao.classList.add('selecionado');
        imagemPrincipal.src = novoBotao.dataset.imagem;
        nomePersonagem.textContent = novoBotao.dataset.nome;
    });

    fecharCamera();
});