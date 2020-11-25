//переделать чтоб окно чисто создавалось


//генератор страницы
class modal{
    constructor({over,main,cancel,link,btn,cont}){
        this.isOpen = true;
        this.arr = [];
        this.main = document.querySelector(main)
        this.cancel = document.querySelector(cancel)
        this.link = document.querySelectorAll(link)
        this.btn = document.querySelector(btn)
        this.cont = document.querySelector(cont)
        this.over = document.querySelector(over)
    }

    pushArr(){ 
        // if(this.input.value != ''){this.arr.push(this.input.value.trim().toUpperCase());this.input.value = '';}
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
        // this.cancel.addEventListener('click',this.close.bind(this))
        this.link.forEach(element => {
            element.addEventListener('click',this.open.bind(this))
        });
        // this.btn.addEventListener('click',this.pushArr.bind(this))
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
        console.log(linkClick.firstChild.children)
        let overlay = document.createElement('div')
        overlay.className = 'overlay'
        overlay.id = 'overlay'

        let modalWind = document.createElement('div')
        modalWind.className = 'modal-wind'
        modalWind.id = 'modal'

        let modalAction = document.createElement('div')
        let modalContent = document.createElement('div')
        let modalFooter = document.createElement('div')
        modalAction.className = 'modal-action'
        modalContent.className = 'modal-content'
        modalFooter.className = 'modal-footer'

        let value = document.createElement('textarea')
        let text = document.createElement('textarea')
        let work = document.createElement('input')
        let list = document.createElement('input')
        let deal = document.createElement('input')
        let data = document.createElement('input')
        let good = document.createElement('input')
        let contForInput = document.createElement('div')
        let btn = document.createElement('button')
        let cancel = document.createElement('button')
        btn.innerText = 'refresh'
        text.value = ''
        work.value = ''
        deal.value = ''
        list.value = ''
        data.value = ''
        good.value = ''
        value.value = ''
        cancel.innerText = 'cancel'
        if(linkClick){
            console.log(linkClick.firstChild.children[0].children[4].className)
            text.value = linkClick.firstChild.children[1].children[0].innerText
            work.value = linkClick.firstChild.children[0].children[1].innerText
            deal.value = linkClick.firstChild.children[0].children[2].innerText
            list.value = linkClick.firstChild.children[0].children[3].innerText
            data.value = linkClick.firstChild.children[0].children[0].innerText
            value.value = linkClick.firstChild.children[1].children[0].innerText
            good.value = linkClick.firstChild.children[0].children[4].className
        }

        cancel.onclick = ()=>{
            this.close()
        }
        text.className = 'textArea'
        work.className = ' work'
        list.className = 'list'
        deal.className = 'deal'
        data.className = 'data'
        good.className = 'good'
        cancel.className = 'cancel'

        // this.cont.append(overlay)
        // this.cont.append(modalWind)
        this.main.append(modalAction,modalContent,modalFooter)
        modalAction.append(data,work,deal,list,good)
        modalContent.append(value)
        modalFooter.append(btn,cancel)

        btn.onclick = ()=>{
            // let modalAction = document.getElementsByClassName('modal-action')
            // console.log(modalAction[0].childNodes[0].value)
            // console.log(modalContent.childNodes[0].value)
            let response =  fetch('/refresh',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },

                body: JSON.stringify({'id':linkClick.id,"value": modalContent.childNodes[0].value,"data":modalAction.childNodes[0].value,"work": modalAction.childNodes[1].value,"work2":modalAction.childNodes[2].value,"list":modalAction.childNodes[3].value,"good":modalAction.childNodes[4].value}
                )
              });
        }

    }
    remove(){
        console.log("remove")
        console.log(this.main.children)
        let lengthElem = this.main.children.length;
        if(lengthElem > 0){
            for(let i = 0; i < lengthElem; i++){
                console.log(lengthElem[i])
                this.main.children[0].remove()
            }
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
        this.create(link)
        console.log
        this.main.style.opacity = '1';
        this.main.style.transform = 'rotate3d(1, 0, 0, 0deg)'
        this.main.style.top = '50px'
        this.isOpen = true
        this.over.style.display = 'block'

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




let vasia = new modal({over:'#overlay',main:'#modal',cancel:".cancel",link:".card",btn:'#btnModal', cont:'#cont',});
vasia.init();
