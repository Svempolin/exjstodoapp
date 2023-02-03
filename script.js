const BASE_URL = "https://jsonplaceholder.typicode.com/todos/";
const SCALED_URL = "https://jsonplaceholder.typicode.com/todos?page=&_limit=7";
const opitions = document.querySelector('.options')
const todos= []
const userList = document.querySelector("#posts")
const form = document.querySelector("#form")
// const input = document.querySelector('#input')
const msg = document.querySelector('#msg')
const input = document.querySelector('#form > input');
const popBtn = document.querySelector("#openBtn")
const modalCard=document.querySelector("#modalCard")
const closingBtn = document.querySelector("#closingBtn")
const wrapper = document.querySelector("#mainWrapper")



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
    todo.classList.add('card')

    let todoCard =document.createElement('div')
    todo.id = todoData.id
    todoCard.classList.add('todoCard-id')

    let title = document.createElement('p')
    title.classList.add('title-stil')
    title.innerText = todoData.title

    let checkTodo = document.createElement('a')
    checkTodo.className = 'fa fa-check'

    if(todoData.completed){
    checkTodo.clicked = true
        todo.style.textDecoration = "line-through"
    }

    checkTodo.addEventListener('click', function() {
        fetch(BASE_URL + todoData.id, {
            method: 'PATCH',
            headers: {
            'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({completed: !todoData.completed
            }), // updaterar den till den inte är true || false
        })
        .then(res => res.json())
        .then(data => {

            todoData.completed = data.completed 

            console.log(todoData)
            console.log(data)
            if (todoData.completed) {
                wastBin.style.color = "darkslategray"
                todo.style.textDecoration = 'line-through'
                todo.style.color = 'white'
                console.log(todo)
                this.clicked = true
                console.log(todoData.completed)
                return true  
              }   
              if(!todoData.completed){
                console.log('not clicked');
                todo.style.textDecoration = 'none'
                this.clicked = false
                return false;
            } 
        })
        
        });
        
    let wastBin= document.createElement('a')
    wastBin.className = 'fa fa-trash-alt '
   
    wastBin.addEventListener('click', e => {
        console.log(todoData)
        if(!todoData.completed){
            wastBin.style.color = "red" 
        modalCard.classList.toggle("hidden")
          
        return 
    
        } 
        (todoData.completed)
            console.log("item is completed")
           
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
   


todo.appendChild(checkTodo)
todo.appendChild(title)
todo.appendChild(wastBin)


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



closingBtn.addEventListener("click", hideBtn)
function hideBtn() {
 modalCard.classList.add("hidden")
}
form.addEventListener('submit', handleSubmit)