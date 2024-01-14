//create insert beforefunction

//create Insert After

/*function insertAfter(insertion, sible){
    sible.parentElement.insertBefore(insertion, sible.nextSibling)

}
    const itemBefore = document.createElement('li');
    itemBefore.innerText = 'insert item before';

    const third = document.querySelector('li:first-child');

    insertAfter(itemBefore, third);

//replace element

function replaceFirstElement(){
    const firstitem = document.querySelector('li:first-child');
    const li = document.createElement('li');
    li.textContent = 'replaced element';

    firstitem.replaceWith(li);
}

function replaceChildHead(){
    const header = document.querySelector('header');
    const h1 = document.querySelector('header h1');
    const h2 = document.createElement('h2');
    h2.textContent = 'for 2ndh shopping list'
    header.replaceChild(h2, h1)
}

//removing
function removeButton(){
    const btnToRemove = document.querySelector('#clear');
    btnToRemove.remove();
}
function removeFirstItem(){
    const ul = document.querySelector('ul');
    const firstItem = document.querySelector('li:first-child');
    ul.removeChild(firstItem);

}
function removeItem(itemNumber){
    const ul = document.querySelector('ul');
    const items = document.querySelector(`li:nth-child(${itemNumber})`);
    ul.removeChild(items);
}
removeItem(1);

//form events

const iteminput = document.querySelector('#item-input');
const priorityinput = document.querySelector('#priority-input');
const checkboxinput = document.querySelector('#checkbox');

const header = document.querySelector('h1');

function oninput(e){
    header.textContent = e.target.value
}
function oncheck(e){
    const isChecked = e.target.checked
    header.textContent = isChecked ? 'checked': 'not checked';
}
function onfocus() {
iteminput.style.outlineStyle = 'solid';
iteminput.style.outlineWidth = '2px';
iteminput.style.outlineColor = 'green';

    
}
function onblur() {
    iteminput.style.outlineStyle = 'none';

}

iteminput.addEventListener('input', oninput)
priorityinput.addEventListener('input', oninput)
checkboxinput.addEventListener('change', oncheck)

iteminput.addEventListener('focus', onfocus);
iteminput.addEventListener('blur', onblur)


const submit = document.querySelector('.btn')
const form = document.querySelector('#item-form');

function onsubmit(e) {
    const item = document.querySelector('#item-input').value;
    const priority = document.getElementById('priority-input').value
    e.preventDefault();
    if (item === '' || priority == 0) {
        alert('remplir tt les cages stp')
        return;
    } else {
        console.log(item, priority)

    }
    
}

form.addEventListener('submit', onsubmit);

*/


//starting project

//add item
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemFilter = document.getElementById('filter')
const formbtn = document.querySelector('button');

let editMode = false;

//buttons
const clearBtn = document.getElementById('clear');
const btnremove = document.querySelector('.remove-item .btn-link .text-red')

//event listeners
function addItem(e){
    e.preventDefault();
    const newItem = itemInput.value.trim()
    if(newItem ===''){
        alert('Veillez entrez un élément')
        return;
    }
    if(editMode){
        const itemtoedit = document.querySelector('.edit-mode');
        removeItemOnstrg(itemtoedit.textContent);
        itemtoedit.classList.remove('edit-mode')
        removeItem(itemtoedit);
        editMode = false;
    }else if (itemexist(newItem)) {
        alert(`l'element ${newItem} existe déja`);
        return;
        
    }
    addingItemonDom(newItem);
    tolocalsrtg(newItem);
    improveUi()
}
function displayItem(){
    const fromstrg = fromlocalstrg();
    fromstrg.forEach(item => addingItemonDom(item))
}
function tolocalsrtg(item) {
    let getitemstrg = fromlocalstrg();

    getitemstrg.push(item);

    localStorage.setItem('items', JSON.stringify(getitemstrg));
}
function fromlocalstrg(){
    let itemInstrg = JSON.parse(localStorage.getItem('items')) ?? [];
    return itemInstrg;
}
function addingItemonDom(item){
    const newItem = document.createElement('li');
    //create buttons
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-item btn-link text-red';
    const icone = document.createElement('i');
    icone.className = 'fa-solid fa-xmark';


    removeButton.appendChild(icone);
    newItem.appendChild(document.createTextNode(item));
    newItem.appendChild(removeButton);
    itemList.appendChild(newItem)

}
//clear all item
function clearItems(){
    if (confirm('are you sure to delete all?'))
    {
        while(itemList.firstChild){
            itemList.removeChild(itemList.firstChild)
        }
        improveUi()
    }
}
//removing item
function removeItemOnstrg(itemName){
    let fromstrg = fromlocalstrg();
    fromstrg = fromstrg.filter(item => item !== itemName);
    localStorage.setItem('items', JSON.stringify(fromstrg));
}
function removeItem(listItem){

    const textItem = listItem.textContent.trim();
    //console.log(listItem)
    if(confirm('are you sure?')){
    listItem.remove();
    removeItemOnstrg(textItem)
    improveUi()
    }
}
function OnclickItem(e){
    const isRemoveBtn = e.target.parentElement.classList.contains('remove-item');
    const toEdit = e.target;
    const listItem = e.target.parentElement.parentElement;


    if (isRemoveBtn)
    {
        removeItem(listItem)
    }else{
        EditItem(toEdit)
    }
}
function EditItem(item) {
    editMode = true;
    const lists= document.querySelectorAll('li');
    lists.forEach(i => i.classList.remove('edit-mode'))
    item.classList.add('edit-mode');
    formbtn.innerHTML = `<i class="fa-solid fa-pen"></i>
    Update Item`;
    formbtn.style.backgroundColor = 'green'
    itemInput.value = item.textContent;
}
//displaying clear and filter when need
function improveUi(){
    const items = itemList.querySelectorAll('li');
    itemInput.value= '';
    if(items.length === 0){
        itemFilter.style.display = 'none';
        clearBtn.style.display = 'none';

    }else{
        clearBtn.style.display= 'block'
        itemFilter.style.display = 'block'
    
    }
    formbtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item'
    formbtn.style.backgroundColor = "#333"
    editMode= false;
}
//filtering search
function filtering(e){
    const items = itemList.querySelectorAll('li');
    const itemtext = e.target.value.toLowerCase();

    items.forEach((item)=>{
        const itemcontent = item.firstChild.textContent.toLowerCase();
        if(itemcontent.indexOf(itemtext) != -1){
            item.style.display = 'flex';
        }else{
            item.style.display = 'none'
        }
    });

}
function itemexist(newItem) {
    let checkstorage = fromlocalstrg();
    return checkstorage.includes(newItem)
}
function initialize(){
    itemForm.addEventListener('submit', addItem);
    itemList.addEventListener('click', OnclickItem)
    clearBtn.addEventListener('click',clearItems)
    itemFilter.addEventListener('input', filtering)
    document.addEventListener('DOMContentLoaded', displayItem)
    
    improveUi();
}
initialize();
