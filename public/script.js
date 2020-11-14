

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
      'Content-Type':'application/json;charset=UTF-8'
    },
    body: data
  });
}

function create(elem){
    let div = document.createElement('div');
    let good = document.createElement('p')
    let list = document.createElement('p')
    let value = document.createElement('p')
    let work = document.createElement('p')
    let work2 = document.createElement('p')
    div.className = "card #e1bee7 purple lighten-4 col s3 m4"
    good.innerText = elem.good
    list.innerText = elem.list
    value.innerText = elem.value
    work.innerText = elem.work
    work2.innerText = elem.work2
    cont.append(div);
    div.prepend(good,list,value,work,work2)
    
}

btn.addEventListener('click',push)



function push(){
  event.preventDefault();
  let fd = new FormData(form);
  console.log(fd.get('value'))
  let data = {"value": fd.get('value'),"data":fd.get('data'),"work": fd.get('work'),"work2":fd.get('work2'),"work": fd.get('work'),"good":fd.get('good'),"work": fd.get('work'),"list":fd.get('list')}
  
  meFetch(JSON.stringify(data))
  
}