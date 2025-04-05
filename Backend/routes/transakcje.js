const router = require('express').Router();
const {dodajPrzychod,getPrzychod,deletePrzychod,updatePrzychod} = require ('../controllers/przychodKontr')


router.post ('/dodaj_przychód',dodajPrzychod)
.get ('/get_przychód',getPrzychod)
.put ('/update_przychód/:id',updatePrzychod)
.delete ('/delete_przychód/:id',deletePrzychod)


module.exports = router;