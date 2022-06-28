const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path') //kullanıp kullanmıcamız kesin değildir.
const BookStore = require("./models/BookModel")//BookStore modeli import edildi.

const ProductStore=require("./models/ProductModel")

// uygulamayı başlatmamız, oluşturmamız gerekiyor bunun için ;

const app = express()                         //expressjs ile ilk uygulamamızı oluşturduk.
app.use(bodyParser.json())                    // bodyParser requestleri parçalamak için
app.use(cors())                               //domain ve portlara giriş yapabilmek için

//5000 portunda bizim serverımız dinleme yapsın. 
//kendine gelen requestleri 5000 portunda yakalasın ve onlara burada cevap versin
app.listen(5000, () => {
    console.log("Server Çalıştı")
})

//5000 portu yani anasayfaya ('/') geldiğinde Kullanıcıya Hoşgeldin Denilsin.
//req requesti temsil eder. ress ise response u temsil ederi.
app.get('/', (req, res) => {
    res.send("Hoşgeldiiniz :)")
})

app.get('/html', (req, res) => {
    res.send("Html sayasıda gönderilebilir bir template olusturulup o da gönderilebilirdi. :)")
})


//7-)mongoose kütüphanesiyle bağlantının kurulması
//************************************************************************************************************
//************************************************************************************************************
//************************************************************************************************************

//moongose.connect(databasemizin bulundugu url adresi yazılmalıdır.)
mongoose.connect("mongodb+srv://TEST:123asdqwer@cluster0.g9uvonr.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(console.log("connected to database"))
    .catch((err) => console.log(err))
//bağlantı gerçekleştikten sonra(then)


//8-)veritabanına ürün(kitap) ekleme
//************************************************************************************************************
//************************************************************************************************************
//************************************************************************************************************

//post metodu ile gönderme işlemi yazparız. 
//hanngi url adresine eriştiğimizde post işlemi yapılacak ?
///app.post('/hanngi url adresine eriştiğimizde post işlemi yapılacak',asenkron bir fonksiyon olusturucaz)
//request ve response parametrelerine sahip bir arraw fonksiyon olusturucaz
app.post('/newbook', async (req, res) => {
    //gerçekleşip gerçekleşmeyeceği belli olmayan işlemlerde try catch kullanılmalıdır.
    try {
        //yeni bir kitap nesnesi oluşssun istiyorum
        // const newBook =
        //bu ktap nesnesi peki neyden oluşacak onemli olan o ;
        const newBook = new BookStore({
            //oluşturdugum_yeni_kitabın_bookName_alanı:yaptımız requesttin body alanı.bookName i
            bookName: req.body.bookName,
            author: req.body.author,
            quantity: req.body.quantity,
            department: req.body.department,
            comments: req.body.comments
        })

        //bu ıoluşturdugumuz yeni nesnemizi newBook database e yerleşti.KAYDOLDU
        //await => newBook.save(); in olmasını bekler.
        //await newBook.save();
        const book = await newBook.save()//teyit almak amaçlı br değişkene atayaım
        res.status(200).json(book)//book nesnesini jsona çevrip başarılı olup olmadıgını bana göster diyorum.    
    } catch (err) {
        console.log(err)
    }
})

//GET REQUEST İŞLEMİ
app.get('/books', (req, res) => {
    BookStore.find()//database atmıs oldugumuz dokumanları buldurmuş oluyoruz.
        .then(books => res.json(books))//iççerisindeki butun verileri jsona çevirip response olarak dönmesini sağladım.

})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    BookStore.findByIdAndDelete({ _id: id }, (err) => {
        if(!err) {
            console.log("book deleted");
        }else{
            console.log(err);
        }
    })//findByIdAndDelete moongose kütüphansesinde bir metotdur.
})

app.put('/lend/:id', (req, res) => {
    const id = req.params.id;
    BookStore.findByIdAndUpdate( id, {$inc:{quantity:-1}}, (err) => {
        if(!err) {
            console.log("book lend");
        }else{
            console.log(err);
        }
    })
})

// //LEND işlemi Ödünç verilmesi
// app.put('/lend/:id',async(req,res)=>{
//     try {
//         await BookStore.findByIdAndUpdate(req.params.id,{$inc:{quantity:-1}})
//     } catch (err) {
//         console.log(err)
//     }
// })

//BACK işlemi
app.put('/back/:id',async(req,res)=>{
    try {
        await BookStore.findByIdAndUpdate(req.params.id,{$inc:{quantity:1}})
    } catch (err) {
        console.log(err)
    }
})




















app.post('/newproduct', async (req, res) => {
    try {
        const newProduct = new ProductStore({
            id: req.body.id,
            categoryId: req.body.categoryId,
            productName: req.body.productName,
            quantityPerUnit: req.body.quantityPerUnit,
            unitPrice: req.body.unitPrice,
            unitsInStock: req.body.unitsInStock
        })
        const product = await newProduct.save()
        res.status(200).json(product) 
    } catch (err) {
        console.log(err)
    }
})

//GET REQUEST İŞLEMİ
app.get('/product', (req, res) => {
    ProductStore.find()
        .then(products => res.json(products))

})

app.delete('/deleteproduct/:id', (req, res) => {
    const id = req.params.id;
    console.log("idssssssssssssssssssssssssssssssssssssssssssssssssssssssssi "+id)
    ProductStore.findByIdAndDelete({ _id: id }, (err) => {
        if(!err) {
            console.log("product deleted");
        }else{
            console.log(err);
        }
    })//findByIdAndDelete moongose kütüphansesinde bir metotdur.
})
