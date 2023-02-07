const newAnnotation = document.getElementById("new_annotation");
const createdButton = document.getElementById("button_create");
const taskList = document.getElementById("task-list");
const tarefasCriadas = document.getElementById("number_of_tasks");
const tarefasFeitas = document.getElementById("number_of_tasks_completed");

const tasksRegister = document.getElementById("tasks_register");
const iconRemove = document.getElementById("icon_trash");
const arrayList = document.getElementsByClassName("annotation_field_container");
const isdone = document.getElementById("check_concluded");


let listaDeTarefas = [];


function criarListaVazia() {
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

}

criarListaVazia();

function generateID() {
    const id = Math.random().toString(16).slice(2);
    return id;
} //vc tinha colocado ,muitos ID, ele substituiu por classe

function tarefasAdicionadas() {
    // adiciona uma tarefa na lista
    taskList.innerHTML = '';
    for (let tarefa in listaDeTarefas) {
        taskList.innerHTML += `
            <div class="annotation_field_container">
                <div class="id${listaDeTarefas[tarefa].id} annotation_field">
                    <div class="check_task_icon_container">
                        <input onchange="tarefaFeita('${listaDeTarefas[tarefa].id}')" type="checkbox" name="checkConcluded" class="check_concluded"/>
                        <img class="check_vetor" src="image/vector.png"/>                    
                    </div>
                    <div class="item_container">
                        <p class="item">${listaDeTarefas[tarefa].value}</p>
                    </div>
                    <img onclick="removerAnnotation('${listaDeTarefas[tarefa].id}')" class="icon_trash" src="image/trash.png"/>
                </div>
            </div>
        `
        // <img id="checkVetor" src="image/vector.png"/>
    }
}

// atualiza o numero de tarefas criadas
function atualizarListaDeTarefas() {
    tarefasCriadas.textContent = listaDeTarefas.length;
}

// atualiza o numero de tarefas completadas
function atualizarListaDeTarefasFeitas() {
    let isChecked = 0;

    for (let i = 0; i < listaDeTarefas.length; i++) {
        if (listaDeTarefas[i].isDone) {
            isChecked++;
        }
    }
    tarefasFeitas.textContent = isChecked;
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
    criarListaVazia();
    atualizarListaDeTarefasFeitas();

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
    if (listaDeTarefas.length == 1) {
        document.querySelector(".list-empty-container").remove();
    }
}

// Lista for feita e clicar checkout
function tarefaFeita(idQueFoiClicado) {
    const idsDaListaDeTarefas = listaDeTarefas;
    let isDone = document.querySelector(`.id${idQueFoiClicado} .check_concluded`);
    const checked = document.querySelector(`.id${idQueFoiClicado} .item`);

    for (let i = 0; i < idsDaListaDeTarefas.length; i++) {

        if (idsDaListaDeTarefas[i].id == idQueFoiClicado) {
            if (isDone.checked) {
                checked.classList.add("checked");
                idsDaListaDeTarefas[i].isDone = true;
            } else {
                checked.classList.remove("checked");

                idsDaListaDeTarefas[i].isDone = false;
            }
        }
    }
    atualizarListaDeTarefasFeitas();
}

