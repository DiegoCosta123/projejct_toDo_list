const newAnnotation = document.getElementById("new_annotation");
const createdButton = document.getElementById("button_create");
const taskList = document.getElementById("task-list");
const tarefasCriadas = document.getElementById("number_of_tasks");
const tasksRegister = document.getElementById("tasks_register");
const iconRemove = document.getElementById("icon_trash");


let listaDeTarefas = [];



if (listaDeTarefas.length == 0) {
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

function generateID() {
    const id = Math.random().toString(16).slice(2);
    return id;
}

function tarefasAdicionadas() {
    // adiciona uma tarefa na lista
    taskList.innerHTML = '';
    for (let tarefa in listaDeTarefas) {
        taskList.innerHTML += `
            <div class="annotation_field_container">
                <div id="annotation_field">
                    <input onclick="tarefaFeita()" type="checkbox" name="checkConcluded" id="check_concluded">
                    <div id="item_container">
                        <li class="item">${listaDeTarefas[tarefa].value}</li>
                    </div>
                    <img onclick="removerAnnotation('${listaDeTarefas[tarefa].id}')" id="icon_trash" src="image/trash.png"/>
                </div>
            </div>
        `
    }
}


function atualizarListaDeTarefas() {
    tarefasCriadas.textContent = listaDeTarefas.length;
}

// Remover da Lista
function removerAnnotation(idQueFoiClicado) {
    const idsDaListaDeTarefas = listaDeTarefas;

    for (let i = 0; i < idsDaListaDeTarefas.length; i++) {
        if (idsDaListaDeTarefas[i].id == idQueFoiClicado) {
            idsDaListaDeTarefas.splice(i, 1);
            break;
        }
    }
    // conta a quantidade na lista
    atualizarListaDeTarefas();
    tarefasAdicionadas();

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
    newAnnotation.value = ""
    tarefasAdicionadas();
    // conta a quantidade na lista
    atualizarListaDeTarefas();

    document.querySelector(".list-empty-container").remove();
}

// Lista for feita e clicar checkout
function tarefaFeita() {

    const idsDaListaDeTarefas = listaDeTarefas;
    for (let i = 0; i < idsDaListaDeTarefas.length; i++) {
        if (idsDaListaDeTarefas[i].id == idQueFoiClicado) {
            idsDaListaDeTarefas.splice(i, 1);
            break;
        }
    }
    // conta a quantidade na lista
    atualizarListaDeTarefas();
    tarefasAdicionadas();
}

