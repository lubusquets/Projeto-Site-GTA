const imagemPersonagem = document.querySelector(".personagem");
const nomePersonagem = document.querySelector(".nome");
const botoesPersonagem = document.querySelectorAll(".avatar");

botoesPersonagem.forEach((botao) => {
    botao.addEventListener("click", () => {
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
    });
});