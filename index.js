const newAnnotation = document.getElementById("new_annotation");
const createdButton = document.getElementById("button_create");
const taskList = document.getElementById("task-list");
const tarefasCriadas = document.getElementById("number_of_tasks");
const tasksRegister = document.getElementById("tasks_register");


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


function tarefasAdicionadas() {
    // adiciona uma tarefa na lista
    taskList.innerHTML = '';
    for (let tarefa in listaDeTarefas) {
        taskList.innerHTML += `
            <div class="Teste">
                <div id="teste">
                    <input type="checkbox" name="checkConcluded" id="check_concluded">
                    <li class="item">${listaDeTarefas[tarefa]}</li>
                </div>
            </div>
        `
    }
}


createdButton.addEventListener("click", () => {

    if (newAnnotation.value == "") {
        return;
    }
    listaDeTarefas.push(newAnnotation.value);
    newAnnotation.value = ""
    tarefasAdicionadas();
    // conta a quantidade na lista
    tarefasCriadas.textContent = listaDeTarefas.length;

    document.querySelector(".list-empty-container").remove();


});

