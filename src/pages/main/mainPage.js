import PageTemplate from "../../templates/pageTemplate"

class MainPage extends PageTemplate{
    static menuStateColors={
        color: "rgba(0,111,0,.5)"
    }

    constructor(id){
        super(id)
    }

    render(){
        const menu = this.createPage(MainPage.menuStateColors.color)
        this.conteiner.append(menu)
        return this.conteiner
    }
}

export default MainPage