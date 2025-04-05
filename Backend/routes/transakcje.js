const router = require('express').Router();
const {dodajPrzychod,getPrzychod,deletePrzychod,updatePrzychod} = require ('../controllers/PrzychodKontr')
const {dodajWydatek,getWydatek,deleteWydatek,updateWydatek} = require ('../controllers/WydatkiKontr')


router.post ('/dodaj_przychod',dodajPrzychod)
.get ('/get_przychod',getPrzychod)
.put ('/update_przychód/:id',updatePrzychod)
.delete ('/delete_przychód/:id',deletePrzychod)
.post ('/dodaj_wydatek',dodajWydatek)
.get ('/get_wydatek',getWydatek)
.put ('/update_wydatek/:id',updateWydatek)
.delete ('/delete_wydatek/:id',deleteWydatek)


module.exports = router;