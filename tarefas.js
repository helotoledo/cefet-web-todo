let tarefas = [];
class Tarefa {
    constructor(nome, categoria, realizada) {
        this.nome = nome;
        this.categoria = categoria;
        this.realizada = realizada;
    }

    adicionaNaPagina(containerEl) {

        const li = document.createElement('li');

        li.classList.add('item-tarefa');
        li.classList.add(`categoria-${this.categoria}`);
        li.classList.add(this.realizada ? 'marcado' : null);
        li.innerHTML = this.nome;

        containerEl.appendChild(li);

        li.addEventListener('click', () => {
            li.classList.toggle('marcado');
            this.realizada = !this.realizada;
        });

    }
}

let tarefa = new Tarefa('Comprar leite','compras',false);
tarefas.push(tarefa);
tarefa = new Tarefa('Escutar chimbinha','lazer',true);
tarefas.push(tarefa);
tarefa = new Tarefa('Fazer TP de Web', 'estudos', false);
tarefas.push(tarefa);

let lista = document.querySelector('#lista-tarefas');
lista.innerHTML = '';

tarefas.forEach(tarefa => {
    tarefa.adicionaNaPagina(lista);
});

incluir = document.querySelector('#incluir-nova-tarefa');
nomeTarefa = document.querySelector('#nova-tarefa-nome');

incluir.addEventListener('click', incluirTarefa);

function incluirTarefa() {
    const categoriaTarefa = document.querySelector('#nova-tarefa-categoria');

    tarefa = new Tarefa(nomeTarefa.value, categoriaTarefa.value, false);
    tarefas.push(tarefa);
    tarefa.adicionaNaPagina(lista);

    nomeTarefa.value = null;
    nomeTarefa.focus();
}

filtroCategoria = document.querySelector('#filtro-de-categoria');

filtroCategoria.addEventListener('change', (event) => {
    const valorFiltro = event.currentTarget.value;
    console.log(valorFiltro);
    lista.innerHTML = '';
    if (valorFiltro) {
        for (let tarefa of tarefas) {
            if (tarefa.categoria === valorFiltro) {
                tarefa.adicionaNaPagina(lista);
            }
        }
    } else {
        tarefas.forEach(tarefa => {
            tarefa.adicionaNaPagina(lista);
        });
    }
});

nomeTarefa.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        incluirTarefa();
    }
});