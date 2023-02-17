const newAnnotation = document.getElementById("new_annotation");
const createdButton = document.getElementById("button_create");
const taskList = document.getElementById("task-list");
const tarefasCriadas = document.getElementById("number_of_tasks");
const tarefasFeitas = document.getElementById("number_of_tasks_completed");
const textCamp = document.querySelector("item");

const tasksRegister = document.getElementById("tasks_register");
const iconRemove = document.getElementById("icon_trash");
const arrayList = document.getElementsByClassName("annotation_field_container");
const isdone = document.querySelector(".check_concluded");

let listaDeTarefas = JSON.parse(localStorage.getItem("todo-list-diego")) || [];


newAnnotation.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && newAnnotation.value != '') {
        adicionarTarefa();
    }
});


function criarListaVazia() {
    let listFromLocalStorage = localStorage.getItem("todo-list-diego");
    let listFromLocalStorageParsed = JSON.parse(listFromLocalStorage)

    if (listFromLocalStorageParsed.length == 0) {
        let listaVazia = document.createElement("div");
        listaVazia.className = "list-empty-container"

        tasksRegister.append(listaVazia);
        listaVazia.innerHTML += `
            <img id="img_clipboard" src="image/Clipboard.png"/>
            <div class="register_empty">
                <p id="not_registered">Você ainda não tem tarefas cadastradas</p>
                <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
        `
    }
}

criarListaVazia();


function generateID() {
    const id = Math.random().toString(16).slice(2);
    return id;
} //vc tinha colocado ,muitos ID, ele substituiu por classe


function tarefasAdicionadas() {
    // Get the list of tasks from local storage
    // Update the list on the page
    taskList.innerHTML = '';
    if (listaDeTarefas) {
      for (let tarefa in listaDeTarefas) {
            taskList.innerHTML += `
            <div class="annotation_field_container">
                <div class="id${listaDeTarefas[tarefa].id} annotation_field">
                <div class="check_task_icon_container">
                    <input onchange="tarefaFeita('${listaDeTarefas[tarefa].id}')" type="checkbox" name="checkConcluded" class="check_concluded" />
                </div>
                <div class="item_container">
                    <p class="${listaDeTarefas[tarefa].isDone ? 'item checked' : 'item'}">${listaDeTarefas[tarefa].value}</p>
                </div>
                <img onclick="removerAnnotation('${listaDeTarefas[tarefa].id}')" class="icon_trash" src="image/trash.png"/>
                </div>
            </div>
            `;
        }
    }
}


tarefasAdicionadas();


// atualiza o numero de tarefas criadas
function atualizarListaDeTarefas() {
    tarefasCriadas.textContent = listaDeTarefas.length;
    tarefasFeitas.textContent = listaDeTarefas.length;

    let listInJSON =  JSON.stringify(listaDeTarefas);
    localStorage.setItem("todo-list-diego", listInJSON);
}

atualizarListaDeTarefas();


// atualiza o numero de tarefas completadas
function atualizarListaDeTarefasFeitas() {
    let isChecked = 0;

    for (let i = 0; i < listaDeTarefas.length; i++) {
        if (listaDeTarefas[i].isDone) {
            isChecked++;
        }
    }
    tarefasFeitas.textContent = `${isChecked} de ${listaDeTarefas.length}`;

    let listInJSON =  JSON.stringify(listaDeTarefas);
    localStorage.setItem("todo-list-diego", listInJSON);
}

atualizarListaDeTarefasFeitas();


// Remover da Lista
function removerAnnotation(idQueFoiClicado) {
    for (let i = 0; i < listaDeTarefas.length; i++) {
        if (listaDeTarefas[i].id == idQueFoiClicado) {
            listaDeTarefas.splice(i, 1);
            break;
        }
    }

    let listInJSON =  JSON.stringify(listaDeTarefas);
    localStorage.setItem("todo-list-diego", listInJSON);

    tarefasAdicionadas();
    atualizarListaDeTarefas();
}


function adicionarTarefa() {
    if (newAnnotation.value == "") {
        return;
    }

    const data = {
        id: generateID(),
        value: newAnnotation.value,
        isDone: false
    }

    listaDeTarefas.push(data);
    let listInJSON =  JSON.stringify(listaDeTarefas);
    localStorage.setItem("todo-list-diego", listInJSON);
  
    let listFromLocalStorage = localStorage.getItem("todo-list-diego");

    let listInMemoryParsed = JSON.parse(listFromLocalStorage);
    newAnnotation.value = ""
    tarefasAdicionadas();

    // conta a quantidade na lista
    atualizarListaDeTarefas();

    if (listInMemoryParsed.length == 1) {
        document.querySelector(".list-empty-container").remove();

        let listInJSON =  JSON.stringify(listaDeTarefas);
        localStorage.setItem("todo-list-diego", listInJSON);
    }
}

adicionarTarefa();


// Lista for feita e clicar checkout
//Correção chatOpenAI
function tarefaFeita(idQueFoiClicado) {
    const idsDaListaDeTarefas = listaDeTarefas;
    let isDone = document.querySelector(`.id${idQueFoiClicado} .check_concluded`);
    const checked = document.querySelector(`.id${idQueFoiClicado} .item`);
    const checkContainer = document.querySelector(`.id${idQueFoiClicado} .check_task_icon_container`);
  
    for (let i = 0; i < idsDaListaDeTarefas.length; i++) {
      if (idsDaListaDeTarefas[i].id == idQueFoiClicado) {
        if (isDone.checked) {
          checked.classList.add("checked");
          let checkIcon = document.createElement("img");
          checkIcon.src = "image/vector.png";
          checkIcon.classList.add('check_vetor', `id${idQueFoiClicado}`);
          checkContainer.append(checkIcon);
          idsDaListaDeTarefas[i].isDone = true;
          let listInJSON =  JSON.stringify(idsDaListaDeTarefas);
          localStorage.setItem("todo-list-diego", listInJSON);
        } 
        else {
          checked.classList.remove("checked");
          let checkIcon = document.querySelector(`.check_vetor.id${idQueFoiClicado}`);
          checkIcon.remove(`id${idQueFoiClicado}`);
          idsDaListaDeTarefas[i].isDone = false;
          let listInJSON =  JSON.stringify(idsDaListaDeTarefas);
          localStorage.setItem("todo-list-diego", listInJSON);
        }
      }
    }
  
    atualizarListaDeTarefasFeitas();
  }


function carregarListaDeTarefas() {
    // Get the list of tasks from localStorage
    const listaDeTarefasSalva = localStorage.getItem("todo-list-diego");
    let listaDeTarefas = [];

    if (listaDeTarefasSalva !== null) {
        listaDeTarefas = JSON.parse(listaDeTarefasSalva);
    }

    // Iterate over the list of tasks
    for (let i = 0; i < listaDeTarefas.length; i++) {
        let checkIcon = document.createElement("img");
        if (listaDeTarefas[i].isDone) {
            // If the task is marked as completed, create a new check icon
            const checkContainer = document.querySelector(`.id${listaDeTarefas[i].id} .check_task_icon_container`);
            checkIcon.src = "image/vector.png";
            checkIcon.classList.add('check_vetor', `id${listaDeTarefas[i].id}`);
            checkContainer.append(checkIcon);
        }
        checkIcon.remove();
    }
}

carregarListaDeTarefas();

// Call the function when the page is loaded
window.onload = carregarListaDeTarefas;

