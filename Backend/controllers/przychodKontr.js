
exports.dodajPrzychod = async (req,res)=>{

    const {Tytuł,ilość,typ,data,Kategoria,Opis} = req.body

    try {
        //tutaj moze byc new PrzychodSchemat
        const nowyPrzychod = new Przychod({
            Tytuł,
            ilość,
            typ,
            data,
            Kategoria,
            Opis
        })
        if (ilość <= 0) {
            return res.status(400).json({message: 'Ilość musi być większa od zera'})
        }
        await nowyPrzychod.save()
        res.status(200).json({message: 'Dodano przychód pomyślnie'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Nie udało się dodać przychodu'})
    }
}

exports.getPrzychod = async (req,res)=>{
    try {
        const przychody = await Przychod.find().sort({createdAt: -1})
        res.status(200).json(przychody)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Nie udało się pobrać przychodów'})
    }
} 

exports.updatePrzychod = async (req,res)=>{
    const {id} = req.params
    try {
        const zmienPrzychod = await Przychod.findbyidAndUpdate(id, req.body, {new: true})
        if (!zmienPrzychod) {
            return res.status(404).json({message: 'Nie znaleziono przychodu o podanym id'})
        }
        res.status(200).json({message: 'Zaktualizowano przychód pomyślnie'})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'Nie udało się zaktualizować przychodu'})
    }
}

exports.deletePrzychod = async (req,res) =>{
    const {id} = req.params
    try {
        const usunPrzychod = await Przychod.findByIdAndDelete(id)
        if (!usunPrzychod) {
            return res.status(404).json({message: 'Nie znaleziono przychodu o podanym id'})
        }
        res.status(200).json({message: 'Usunięto przychód pomyślnie'})
    }
    catch (error) {
        console.log(error)
        res.status(500).json({message: 'Nie udało się usunąć przychodu'})
    }


}