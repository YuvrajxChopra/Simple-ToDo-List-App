function xxx(){
    console.log("Hi");
}


const form = document.getElementById("form");
const input = document.getElementById("inputbox");
const todolist = document.getElementById("todolist");

const todo = JSON.parse(localStorage.getItem("todo")) || [];

if(todo){
    todo.forEach(t => addtodo(t));
}


form.addEventListener('submit', (e) =>{
    e.preventDefault();
    addtodo();
});


function addtodo(t){
    if(input.value.trim()==""){
        return;
    }
    let text = input.value;

    if(t){
        text = t.text;
    }

    if(text){
        const  ele = document.createElement('li');
        const ele1 = document.createElement('input');
        const ele2 = document.createElement('p');
        ele.innerHTML = text;
        ele1.setAttribute('type','checkbox');
        ele2.innerHTML = "x";
        ele1.classList.add("inputcheckbox");
        ele2.classList.add("xclick");


        if(t && t.completed){
            ele.classList.add('completed');
        }
        
        ele.addEventListener('click', () => {
            ele.classList.toggle('completed');
            updateList();
        });

        ele1.addEventListener('click',()=>{
            if(ele1.checked==false){
                ele.style.textDecoration="";
            }
            else{
                ele.style.textDecoration="line-through";
            }
        });

        ele2.addEventListener('click', (e) => {
            e.preventDefault();
            ele.remove();
            updateList();
        });
        ele.appendChild(ele1);
        ele.appendChild(ele2);
        
        todolist.appendChild(ele);
        input.value = '';
        updateList();
    }
}

function updateList() {
    ele = document.querySelectorAll('li');
    const todos = [];
    ele.forEach(ele => {
        todos.push({
            text: ele.innerText,
            completed: ele.classList.contains('completed')
        })
    });
    localStorage.setItem('todos', JSON.stringify(todos))
}