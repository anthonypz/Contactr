// TODO: Add APIs
const deleteBtn = document.querySelectorAll('.del')
const demoItem = document.querySelectorAll('span.not')
const demoComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteDemo)
})

Array.from(demoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(demoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

async function deleteDemo(){
    const demoId = this.parentNode.dataset.id
    console.log(demoId)
    try{
        const response = await fetch('demo/deleteDemo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'demoIdFromJSFile': demoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const demoId = this.parentNode.dataset.id
    try{
        const response = await fetch('demos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'demoIdFromJSFile': demoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const demoId = this.parentNode.dataset.id
    try{
        const response = await fetch('demos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'demoIdFromJSFile': demoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}