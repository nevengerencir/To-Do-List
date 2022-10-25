const itemsUnCom = [...document.querySelectorAll('.uncompleted')]
const itemsCom = [...document.querySelectorAll('.completed')]
const trash = [...document.getElementsByClassName('fa fa-trash')]


trash.forEach(element => element.addEventListener('click',deleteItem))
itemsUnCom.forEach(element=>element.addEventListener('click',complete))
itemsCom.forEach(element=>element.addEventListener('click',undo))


async function deleteItem(){
    const itemText = this.parentNode.childNodes[1].innerText
    console.log(itemText)
    response = await fetch('deleteItem',{
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'itemFromJS': itemText
        })
      })
      data = await response.json()
      console.log(data)
        location.reload()
}


async function complete(){
    const itemText = this.innerText
    response = await fetch('completeItem',{
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'itemFromJS': itemText
        })
      })
      data = await response.json()
      console.log(data)
        location.reload()
}

async function undo(){
    const itemText = this.innerText
    response = await fetch('undoItem',{
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'itemFromJS': itemText
        })
      })
      data = await response.json()
      console.log(data)
        location.reload()
}

yep