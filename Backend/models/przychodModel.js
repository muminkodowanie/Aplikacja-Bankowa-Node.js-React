const mongoose = require ('mongoose');

const Przychod = new mongoose.Schema({
    Tytuł: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },
    ilość: {
        type:Number,
        required: true,
        maxLength:15,
        trim:true
    },
    typ: {
        type: String,
        default: 'Przychód'
    },
    data: {
        type: Date,
        required: true,
        maxLength: 20,
        trim: true
    },
    Kategoria: {
        type: String,
        enum: ['Jedzenie', 'Transport', 'Mieszkanie', 'Rozrywka', 'Inne'],
        required: true,
        maxLength: 20,
        trim: true
    },
    Opis: {
        type: String,
        required: false,
        maxLength: 20,
        trim: true
    },





},
{
    timestamps: true
})

module.exports = mongoose.model("Przychod",Przychod)