const BASE_URL = "https://jsonplaceholder.typicode.com/todos";
const SCALED_URL = "https://jsonplaceholder.typicode.com/todos?page=&_limit=7";

const todos= []
const userList = document.querySelector("#posts")
const form = document.querySelector("#form")
const input = document.querySelector('#input')
const msg = document.querySelector('#msg')


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




const createTodoElement = (todoData) => {
    let todo = document.createElement('div')
    todo.id = todoData.id
    todo.classList.add('card')
    

    
    
    
    
    
    // = document.createElement('i')
    // wastBin.classList.add('fa-fa-trash-alt')
    // let button = document.createElement('button')
    // button.classlist.add("btn")
    // button.innerText = "delete"

    let title = document.createElement('p')
    title.classList.add('title-stil')
    title.innerText = todoData.title

 todo.appendChild(title)
//  todo.appendChild(button)
//  todo.appendChild(wastBin)
 return todo

}



const handleSubmit = e => {
    e.preventDefault()


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
        todos.push(data)
        const todoElement = createTodoElement(data)
        userList.appendChild(todoElement)
    })


}

// FUNKAR EJ 

// let formValidation = () => {
//     if (input.value === ""){
//     msg.innerHTML = "Post cant be blank";
//     console.log("fail")
//     } else{
//         console.log('Yey')
//         msg.innerHTML = " ";
//     }
// }

// formValidation()

const removeTask = e => {
 if(!e.target.classList.contains('card')){
    return document.innerHTML += "you ned to click on the the card"
 }
 fetch( BASE_URL + e.target.id, {
    method: 'DELETE'
 })
 .then(res => {
    if (res.ok) {
        e.target.remove()
        const index = todos.findIndex( card => card.id == e.target.id)
        todos.splice(index, 1)
        console.log(todos)
    }
 })

}


userList.addEventListener('click', removeTask)
form.addEventListener('submit', handleSubmit)