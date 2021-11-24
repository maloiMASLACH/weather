class MenuTemplate{
    constructor(tagName,className){
        this.conteiner=document.createElement(tagName)
        this.conteiner.className=className
    }

    render(){
        return this.conteiner
    }
}
export default MenuTemplate