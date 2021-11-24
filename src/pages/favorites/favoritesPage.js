import PageTemplate from "../../templates/pageTemplate"

class FavoritesPage extends PageTemplate{
    static menuStateColors={
        color: "rgba(0,33,0,.5)"
    }

    constructor(id){
        super(id)
    }

    render(){
        const menu = this.createPage(FavoritesPage.menuStateColors.color)
        this.conteiner.append(menu)
        return this.conteiner
    }
}

export default FavoritesPage