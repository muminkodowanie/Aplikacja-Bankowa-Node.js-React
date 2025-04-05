const Wydatek = require('../models/wydatekModel')
exports.dodajWydatek = async (req,res)=>{

    const {Tytuł,ilość,typ,data,Kategoria,Opis} = req.body

    try {

        const nowyWydatek = new Wydatek({
            Tytuł,
            ilość,
            typ,
            data,
            Kategoria,
            Opis
        })
        if (ilość >= 0) {
            return res.status(400).json({message: 'Ilość musi być mniejsza od zera'})
        }
        await nowyWydatek.save()
        res.status(200).json({message: 'Dodano wydatek pomyślnie'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Nie udało się dodać wydatku'})
    }
}

exports.getWydatek = async (req,res)=>{
    try {
        const wydatki = await Wydatek.find().sort({createdAt: -1})
        res.status(200).json(wydatki)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Nie udało się pobrać wydatków'})
    }
} 

exports.updateWydatek = async (req,res)=>{
    const {id} = req.params
    try {
        const zmienWydatek = await Wydatek.findbyidAndUpdate(id, req.body, {new: true})
        if (!zmienWydatek) {
            return res.status(404).json({message: 'Nie znaleziono wydatku o podanym id'})
        }
        res.status(200).json({message: 'Zaktualizowano wydatek pomyślnie'})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'Nie udało się zaktualizować wydatku'})
    }
}

exports.deleteWydatek = async (req,res) =>{
    const {id} = req.params
    try {
        const usunWydatek = await Wydatek.findByIdAndDelete(id)
        if (!usunWydatek) {
            return res.status(404).json({message: 'Nie znaleziono wydatku o podanym id'})
        }
        res.status(200).json({message: 'Usunięto wydatek pomyślnie'})
    }
    catch (error) {
        console.log(error)
        res.status(500).json({message: 'Nie udało się usunąć wydatku'})
    }


}