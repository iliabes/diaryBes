

let cont = document.getElementById('cont');
let btn = document.getElementById('btn')
let form = document.getElementById('form')

async function start(){
console.log('start is work')
let url = '/mass'
let response = await fetch(url);

if (await response.ok) { 
  let json = await response.json();
  console.log(json);
  if(json.length){
      for(let i = 0; i < json.length;i++){
          create(json[i])
      }
  }
} else {
  alert("Ошибка HTTP: " + response.status);
}
}start()


async function meFetch(data){
  let response = await fetch('/bd',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });
}


function push(){
  console.log('push')
  event.preventDefault();
  let fd = new FormData(form);
  console.log(fd.get('value'))
  let data = {"value": fd.get('value'),"data":fd.get('data'),"work": fd.get('work'),"work2":fd.get('work2'),"list":fd.get('list'),"good":fd.get('good')}
  
  meFetch(data)
  create(data)
  console.log(data)
}

function create(elem){

  let col = document.createElement('div');
  col.className = "col s12 m5 "

  col.id = elem._id;
  let card = document.createElement('div');
  card.className = "card blue-grey darken-1"
  let cardContent = document.createElement('div');
  cardContent.className = "card-content white-text"
  let title = document.createElement('span')
  title.className ="truncate card-title"
  title.innerText = elem.value
  let cardAction = document.createElement('div');
  cardAction.className = "card-action"

  let good = document.createElement('a')  
  let list = document.createElement('a')
  let work = document.createElement('a')
  let work2 = document.createElement('a')
  let deal = document.createElement('a')
  let btnRemove = document.createElement('a')
  let data = document.createElement('a')

  data.innerText = elem.data
  data.className = 'data'
  good.innerText = elem.good
  good.className = 'good'
  list.innerText = elem.list
  list.className = 'list'
  work.innerText = elem.work
  work.className = 'work'
  work2.innerText = elem.work2
  work2.className = 'deal'
  btnRemove.innerText = 'del'
  btnRemove.addEventListener('click',(e)=>{
    console.log(e.target.closest('.col').id)
    removeElem(e.target.closest('.col').id,e.target.closest('.col'))
  })
  cont.append(col);
  col.append(card)
    card.append(cardContent,cardAction)
    cardContent.prepend(title)
    cardAction.prepend(data,good,list,work,work2,btnRemove)
    
  }

function removeElem(id,elem){
  console.log('remove',id)
  let response =  fetch('/removeElem',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({'id':id})
  });
  elem.remove()

}


btn.addEventListener('click',push)





//-------------------------------------------------modal

// $('#popUp').magnificPopup({
//   items: [
//     {
//       src: '#myPopUp', // CSS selector of an element on page that should be used as a popup
//       type: 'inline'
//     }
//   ],
//   type: 'image' // this is default type
// });


$('.test').magnificPopup({
  
  callbacks: {
    elementParse: function(item) {
      // Function will fire for each target element
      // "item.el" is a target DOM element (if present)
      // "item.src" is a source that you may modify

      console.log(item); // Do whatever you want with "item" object
    }
  },
  items: {  
    type:'inline',
  },
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, {
    opacity: 1
  });
});

// Or with jQuery

$(document).ready(function(){
  $('.modal').modal();
});

$('.open-popup-link').magnificPopup({
  type:'inline',
  midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
});












let curcle = document.getElementById('curcle')
curcle.addEventListener('click',()=>{
  curcle.style.width = '100px'
  curcle.style.height = '100px'
  curcle.innerText = 'text'
})