let input = document.querySelector('input[name=tarefa]');

let btn = document.querySelector('#button');

let lista = document.getElementById('lista');

let card = document.querySelector('.card');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []; 


function renderizarTarefas(){

    lista.innerHTML = ''

    for(tarefa of tarefas){
      let itemLista = document.createElement('li');

      itemLista.classList.add('list-group-item-action', 'list-group-item')
      
      let itemTexto = document.createTextNode(tarefa);

      itemLista.appendChild(itemTexto);

      lista.appendChild(itemLista)

      itemLista.addEventListener('click', (e) => {
          deletarTarefa(e.target);
      })
    }
    

}

btn.addEventListener('click', (e) => {
    let novaTarefa = input.value;

    if(novaTarefa !== ''){ 
        tarefas.push(novaTarefa);

    renderizarTarefas();

    input.value = '';

    removerSpans();

    salvarDadosNoStorage();
    } else {
        removerSpans();


        let span = document.createElement('span');
        span.classList.add('alert','alert-warning');
    
        span.innerHTML = 'Você precisa informar a tarefa!'

        card.appendChild(span)
    }
 
})

function removerSpans(){
    let spans = document.querySelectorAll('span');
    

    for(let i = 0; i < spans.length; i++){
        card.removeChild(spans[i])
    }

}

function deletarTarefa(tar){
    tarefas.splice(tarefas.indexOf(tar.textContent), 1);

    renderizarTarefas();
    salvarDadosNoStorage();
}

renderizarTarefas();


function salvarDadosNoStorage(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}




