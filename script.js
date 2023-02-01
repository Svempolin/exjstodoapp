const BASE_URL = "https://jsonplaceholder.typicode.com/todos/";
const SCALED_URL = "https://jsonplaceholder.typicode.com/todos?page=&_limit=7";

const todos= []
const userList = document.querySelector("#posts")
const form = document.querySelector("#form")
// const input = document.querySelector('#input')
const msg = document.querySelector('#msg')
const input = document.querySelector('#form > input');



// En Fetch som hämtar datan från databasen och gör om den till json

const getTask = async () => {
    const res = await fetch(SCALED_URL)
    const data = await res.json()
    console.log(data)

    data.forEach(todo =>{
    todos.push(todo)
    })

    

   todoList() 

}

getTask()

const todoList = () => {
    userList.innerHTML = ""
    todos.forEach(todo => {
    const todoElement = createTodoElement(todo)
    
    userList.appendChild(todoElement)
           
    })
}

// DENNA SKAPAR EN NY TOFOKORT SAMT SER OM DEN ÄR KLAr ELLER EJ//

const createTodoElement = (todoData) => {
    let todo = document.createElement('div')
    todo.id = todoData.id
    todo.classList.add('card')

    let checkTodo = document.createElement('a')
    checkTodo.className = 'fa fa-check'
    if(todoData.completed){
    checkTodo.clicked = true
        todo.style.textDecoration = "line-through"
    }

    checkTodo.addEventListener('click', function() {

    fetch(BASE_URL + todoData.id, {

    method: 'PATCH',
    body: JSON.stringify({completed: !todoData.completed}),
    headers: {
         'Content-type': 'application/json; charset=UTF-8'
            },
        })
        .then(res => res.json())
        .then(todo => {
            todoData.completed = todo.completed
        })

        if (todoData.completed) {
            todo.style.textDecoration = 'line-through'
            this.clicked = true
            return true;
        } if(!todoData.completed){
            console.log('not clicked');
            todo.style.textDecoration = 'none'
            this.clicked = false
            return false;
        }
        });
        
        

    let wastBin= document.createElement('a')
     wastBin.className = 'fa fa-trash-alt'
     wastBin.style.color = "red"
    
    wastBin.addEventListener('click', e => {
        if(!todoData.completed){
      
    // HÄR SKA DET VARA EN MODAL 


        }
        fetch(BASE_URL + todoData.id, {
            method:"DELETE",
        })
        .then(res => {
            if(res.ok){
                todo.remove()
                console.log(todos.indexOf(todoData))
                const index = todos.indexOf(todoData)
                todos.splice(index,1)
            }
        })
    })


   
    let title = document.createElement('p')
    title.classList.add('title-stil')
    title.innerText = todoData.title


 

 todo.appendChild(title)
 todo.appendChild(wastBin)
 todo.appendChild(checkTodo)
 return todo

}



const handleSubmit = e => {
    e.preventDefault()

 // detta är valideringen (den gör så att man inte kan göra ett tomt todokort)

if(input.value.trim() === ''){
        msg.innerText = `Your need to write a task`;
        msg.style.display = "block";
        return; 
 }

 // Denna gör så att texten försvinner när man skriver i formuläret igen

 msg.style.display = 'none'



const createTask = {
        title: document.querySelector('#input').value,
        completed: false, 
    }
 
    fetch(BASE_URL, {
        method:'POST',
        body: JSON.stringify(createTask),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
     },
    })
    
    .then((res) =>  res.json())
    .then((data) => {
        // data.id = crypro.randomUUID()
        todos.push(data)
        const todoElement = createTodoElement(data)
        userList.appendChild(todoElement)
    })


  // denna tömmer formuläret
 form.reset()
 
}






form.addEventListener('submit', handleSubmit)