//veritabanından verileri alıcam ve buradan ekranı yansıtılacaktır.
import React, { useState, useEffect } from "react";

import "./App.css";
import AddBook from "./components/AddBook";
import Books from "./components/Books";
import axios from "axios"

import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

function App() {

  //DATABASEDEN VERİLERİ ÇEKİLMESİ

  //gelecek olan kitaplar nesne olarak gelicek bunları array içerisinde tutucam.
  const [books, setBooks] = useState([]);

  //çekme işlemi için fetch kullanıcaz. Bunu da useEffect hook u ile kullanıcaz.
  useEffect(() => {
    // DATABASEDEN BÜTÜN DÖKÜMANLARI KİTAPLARI BOOKS İSİMLİ URL ADRESİNE DENK GELİCEK ŞEKİLDE ALMIŞTIK.
    // ////GET REQUEST İŞLEMİ
    // app.get("/books", (req, res) => {
    //   BookStore.find() //database atmıs oldugumuz dokumanları buldurmuş oluyoruz.
    //     .then((books) => res.json(books)); //iççerisindeki butun verileri jsona çevirip response olarak dönmesini sağladım.
    // });
    fetch("/books") // LOCALHOST 5000 ADRESİNDEKİ BOOKS URL SİNE GİRİP BURADAN BÜTÜNDATAYI FETCH ETTİM
      .then((res) => {//GELEN DATA BANA RES ŞEKLİNDE GELDİ
        if (res.ok) {//EĞERKİ GELEN CEVAP OKEY İSE YANİ GELEN BİR CEVAP VARSA
          return res.json();//BUNU JSONA ÇEVİR
        }
      })
      .then((jsonRes) => setBooks(jsonRes)); //
  });

  //FORMDA GİRİLEN DEĞERLERİN VERİTABANINA KAYDEDİLMESİ

  //formda yazılan veriler state göndericem. buradan da veritabanına gönderilecek.
  const [book, setBook] = useState({
    bookName: "",
    author: "",
    quantity: "",
    department: "",
    comments: ""
  })

  const handleChange = (e) => {//Mesela formda bookname yazıyoruz ya
    const { name, value } = e.target// Yazılan o bookname in name ve value sunu çekiyor
    setBook(prevInput => {
      return ({
        ...prevInput,//önceki yapılanlarında eklenmesi için
        [name]: value
      })
    })
  }

  const addBook = (e) => {
    e.preventDefault(); // butona basıldııgnda her seferinde ekranın yenilenmemesi içindir.
    const newBook = {
      bookName: book.bookName,//state e bookName ve diğer değerler atanmıstı şimdi onları da atama işlemi yapıyorum.
      author: book.author,
      quantity: book.quantity,
      department: book.department,
      comments: book.comments
    }
    axios.post('/newbook', newBook)//axios ile göndericez //server.js de newbook url si ne gönderip. orası zaten database e ekliyordu.
    alert('The Book ${book.bookName} is addded')
    setBook({ bookName: "", author: "", quantity: "", department: "", comments: "" })//formun tekrardan boş hale gelebilmesi için
  }

  //DELETEBOOK
  //silinecek olan kitabın id si üzerinden işlem yapıcam.
  const deleteBook = (id) => {
    axios.delete('/delete/' + id)//hangi url ye gitsn
    alert('The Book with id ${id} is deleted')
  }
  //LENDBOOK
  const lendBook = (id) => {//bir update islemi aslında
    axios.put('/lend/' + id)//hangi url ye gitsn
    alert('The Book with id ${id} is lended')
  }
  //BACKBOOK
  const backBook = (id) => {//axios kütüphanesinde update işlemleri için put kullanılmaktadır.
    axios.put('/back/' + id)//hangi url ye gitsn
    alert('The Book with id ${id} is back')
  }

  return (
    <div className="App">
      <Router>


        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">

            <Link className="navbar-brand" to="/">
              Kasibeyaz
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/books">
                    Books
                  </Link>

                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="addbook">
                    Add Book
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Departments
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <a className="dropdown-item" href="#">
                        Bilimkurgu
                      </a>
                    </li>
                    <hr className="dropdown-divider" />
                    <li>
                      <a className="dropdown-item" href="#">
                        Fantastik
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Korku-Gerilim
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled">Disabled</a>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
        <Routes>
          <Route exact path="/addbook"
            element={<AddBook book={book} handleChange={handleChange} addBook={addBook}></AddBook>
            }
          >

          </Route>
          {/* book stateini AddBook a gönderilmesi lazım tabiki */}

        </Routes>
        <Routes>
          <Route exact path="/" element={<Books books={books} lendBook={lendBook} deleteBook={deleteBook} backBook={backBook}></Books>
          }>
            {/* ÇEKİLEN DATAYI  BOOKS COMPONENETİNE GÖNDERİLMESİ */}
            {/* //books stateini kullanıcaz. books statetini Books componentine gönderdik  */}

          </Route>
        </Routes>
        <Routes>
          <Route exact path="/books" element={<Books books={books} lendBook={lendBook} deleteBook={deleteBook} backBook={backBook}></Books>
          }>
            {/* ÇEKİLEN DATAYI  BOOKS COMPONENETİNE GÖNDERİLMESİ */}
            {/* //books stateini kullanıcaz. books statetini Books componentine gönderdik  */}

          </Route>
        </Routes>

      </Router>
    </div>
  );
}

export default App;
