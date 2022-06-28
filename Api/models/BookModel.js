//Öncelikli olarak mongooes kütüphanesini import edilmesi gerekmektedir.
const mongoose = require('mongoose')

//const oluşturulacak_şema_ismi  = new mongoose.Schema
//mongoose.Schemadan yeni bir şema olusturucaz.

const bookSchema = new mongoose.Schema({
    //veritabanına atıcağım dökümanda bir bookName olsun ve bu bookName'in type 'ı string olsun. 
    //required olsun yani girilmesi zorunlu olsun. 
    //ve unique olsun yani aynı isimli birden fazla kitap girilemesin.
    //veritabanına atacağım ikinci ifadem author yani yazar olsun.
    bookName: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
        //bu unique olmamalı cunku bir yazarın birden fazla kitabı olabilir.
    },
    //sayısı önemlidir.
    quantity: {
        type: Number,//*
        required: true
    },
    department: {
        type: String,
        required: true
    },
    comments: {
        type: String
    }
},//şemanın altında birde timestamp olsun bu da bize, veritabanında verinin oluşturulma tarihini 
    //veya değiştirme tarihini vericektir.
    { timestamps: true })

//şemayı import edilmesi gerekiyor ki başka yerde kullanabilelim.
//   module.exports=mongoose.model("Veritabanın_ismi_ne_olmasını_istiyorsak","oluşturulacak_şema_ismi=yukarıda bookSchema demiştik")
module.exports = mongoose.model("BookStore", bookSchema)
    //BookStore isimli bir model olusturduk ve bunu da import etmiş tolduk.
