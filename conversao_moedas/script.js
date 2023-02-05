const from = document.getElementById('from');
const to = document.getElementById('to');
const value = document.getElementById('value');
const result = document.getElementById('result');

function adjustSelect(object, anotherObject){
    for(let anotherElement of anotherObject.options){
        anotherElement.disabled = anotherElement.value === object[object.selectedIndex].value
    }

    for(let element of object.options){
        element.disabled = element.value ===  anotherObject[anotherObject.selectedIndex].value
    }
}

from.addEventListener('change', () => {
    adjustSelect(from, to)
})

to.addEventListener('change', () => {
    adjustSelect(to, from)
})

value.addEventListener('input', () => {
    console.log(value.value);
    console.log(value);
})