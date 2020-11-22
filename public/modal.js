//проблема с линками 
// названия
//на git


//генератор страницы
class modal{
    constructor({over,main,cancel,link,btn,input}){
        this.isOpen = true;
        this.arr = [];
        this.main = document.querySelector(main)
        this.cancel = document.querySelector(cancel)
        this.link = document.querySelectorAll(link)
        this.btn = document.querySelector(btn)
        this.input = document.querySelector(input)
        this.over = document.querySelector(over)
        
    }

    pushArr(){ 
        if(this.input.value != ''){this.arr.push(this.input.value.trim().toUpperCase());this.input.value = '';}
    }

    manageWindowsKey(){
        window.addEventListener('keydown',(e) => {
            if(e.code == "Backquote" && this.isOpen){
                this.close()
            }else if(e.code == "Backquote" && !this.isOpen){
                this.open()
            }
        })
       
    }





    manageWindowsClick(){
        this.cancel.addEventListener('click',this.close.bind(this))
        this.link.forEach(element => {
            element.addEventListener('click',this.open.bind(this))
        });
        this.btn.addEventListener('click',this.pushArr.bind(this))
    }

    manageWindowsClickOnWindows(){
        window.addEventListener('click',(e) => {
            if( e.target == this.over && this.isOpen ){
                this.close();
            }
        })

    }


     isLink(){
        let cont = document.getElementById('cont')
        window.addEventListener('click',(e)=>{
        for(let i = 0; i < cont.children.length;i++){
            if(cont.children[i].contains(e.target)){
                console.log('win')
                this.open(cont.children[i])
            }
        }

} )}

    create(linkClick){
        let text = document.createElement('textarea')
        let work = document.createElement('input')
        let work2 = document.createElement('input')
        let list = document.createElement('input')
        let deal = document.createElement('input')
        let data = document.createElement('input')
        let good = document.createElement('input')
        let contForInput = document.createElement('div')
        let btn = document.createElement('button')
        btn.innerText = 'refresh'
        console.log(linkClick)
        text.value = ''
        work.value = ''
        deal.value = ''
        work2.value = ''
        list.value = ''
        data.value = ''
        good.value = ''
        if(linkClick){
            // text.value = linkClick.firstChild.firstChild.firstChild.firstChild.data
            // work.value = linkClick.firstChild.lastChild.childNodes[3].innerText
            // work2.value = linkClick.firstChild.lastChild.childNodes[4].innerText
            // list.value = linkClick.firstChild.lastChild.childNodes[2].innerText
            // data.value = linkClick.firstChild.lastChild.childNodes[0].innerText
            // good.value = linkClick.firstChild.lastChild.childNodes[1].innerText
        }
        btn.onclick = ()=>{
            let response =  fetch('/refresh',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },

                body: JSON.stringify({'id':linkClick.id,"value": text.value,"data":data.value,"work": work.value,"work2":"dont","list":"listNot","good":good.value}
                )
              });
        }
        contForInput.id = 'contForInput'
        text.className = 'textArea'
        work.className = ' work'
        work2.className = 'deal'
        list.className = 'data'
        deal.className = 'deal'
        data.className = 'data'
        good.className = 'good'
        this.main.append(contForInput)
        contForInput.append(text,work,deal,data,good,btn,work2,list)
        

    }
    remove(){
        console.log("remove")
        let contForInput = document.getElementById('contForInput')
        if(contForInput){
            contForInput.remove()
        }
        
    }

    close(){
        

        console.log('close')
        this.remove()
        this.main.style.opacity = '0';
        this.main.style.transform = 'rotate3d(1, 0, 0, 90deg)'
        this.main.style.top = '-200px'
        this.isOpen = false
        this.over.style.display = 'none'
        
    }

    open(link){
        
        console.log('open') 
  
        this.main.style.opacity = '1';
        this.main.style.transform = 'rotate3d(1, 0, 0, 0deg)'
        this.main.style.top = '50px'
        this.isOpen = true
        this.over.style.display = 'block'
        this.create(link)
    }

    init(){
        this.close()
        this.isLink()
        this.manageWindowsClickOnWindows()
        this.manageWindowsKey()
        this.manageWindowsClick()
        this.pushArr()
    }
}




let vasia = new modal({over:'#overlay',main:'.modal-wind',cancel:".cancel",link:".card",btn:'#btnModal', input:'#inputModal'});
vasia.init();
