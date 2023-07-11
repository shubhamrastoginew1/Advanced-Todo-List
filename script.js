const form = document.querySelector("form")
const input = document.querySelector("#input");
const description = document.querySelector("#description");
const temp = document.querySelector("#temp");
const ul = document.querySelector('.tasks');



let todos = load();
todos.forEach(todo=>{
    render(todo)
});


ul.addEventListener('change', e=>{
    if(!e.target.matches(".unique")){
        return;
    }
    else{
        const parent = e.target.closest(".list-item");
        const todoId = parent.dataset.todoId;
        const todoWithId = todos.find(T => T.id === todoId)
        todoWithId.complete = e.target.checked;
        save();
    }
})

ul.addEventListener('click', e=>{
    if(!e.target.matches('.delete')){
        return;
    }
    else{
        const parent = e.target.closest('.list-item');
        const todoId = parent.dataset.todoId;
        parent.remove();

        for(let i=0;i<todos.length;i++){
            if(todos[i].id == todoId){
                todos.splice(i,1);
            }
        }
        save();
    }
})

input.addEventListener("keydown", e=>{
    if(e.key == 'Enter'){
        e.preventDefault();
        description.focus();
    }
})
description.addEventListener("keydown", e=>{
    if(e.key == 'Enter'){
        
        input.focus();
    }
})


form.addEventListener('submit', e=>{
    e.preventDefault();
    let value = input.value;
    let des = description.value;
    if(value==='') return;

    let newDate = new Date();

    let months=["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let date = months[newDate.getMonth()] + " " + newDate.getDate() + ", "+ newDate.getFullYear();
    let hrs = (newDate.getHours()<10)? "0"+newDate.getHours() : newDate.getHours();
    let min = (newDate.getMinutes()<10)? "0"+newDate.getMinutes() : newDate.getMinutes();
    let time = hrs+":"+min;

    const todoObject = {
        name: value,
        about: des,
        complete: false,
        id: new Date().valueOf().toString(),
        DATE : date.toString(),
        TIME : time.toString()
    }

    render(todoObject);
    todos.push(todoObject);
    save();
    input.value = "";
    description.value = "";
})

function render(todoObject){
    const t = temp.content.cloneNode(true);
    let content = t.querySelector('#content');
    const listItem = t.querySelector(".list-item");
    listItem.dataset.todoId = todoObject.id;
    content.innerText  = todoObject.name;
    let description_value = t.querySelector(".description_value");
    description_value.innerText = todoObject.about;

    const c = t.querySelector('.unique');
    c.checked = todoObject.complete;

    const curr_date = t.querySelector(".curr_date");
    const curr_time = t.querySelector(".curr_time");
    curr_date.innerText = todoObject.DATE;
    curr_time.innerText  = todoObject.TIME;


    ul.appendChild(t);
}

function save(){
    localStorage.setItem("advanced-todo-list-todos", JSON.stringify(todos));
    return;
}

function load(){
    const todosString = localStorage.getItem("advanced-todo-list-todos");
    return JSON.parse(todosString) || [];
}



// localStorage.clear();
