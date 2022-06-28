import React from "react";
//gönderilen books stateini burada alıyoruz
export default function Books({ books, deleteBook, lendBook, backBook }) {
  return (
    <div className="container mt-5">
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Book Name</th>
            <th scope="col">Author</th>
            <th scope="col">Quantity</th>
            <th scope="col">Department</th>
            <th scope="col" colSpan="3">
              Process
            </th>
            {/* Process de ekle silme geri ver düğmesi olacak. 3  bölümden oluşacak yani  */}
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => {
            return (
              <tr key={index}>
                <td>{book._id}</td>
                <td>{book.bookName}</td>
                <td>{book.author}</td>
                <td>{book.quantity}</td>
                <td>{book.department}</td>
                <td>
                  <button onClick={()=>deleteBook(book._id)} className="btn btn-danger">
                    DELETE
                  </button>
                </td>
                <td>
                  <button onClick={()=>lendBook(book._id)} className="btn btn-primary">
                    LEND
                  </button>
                </td>
                <td>
                  <button onClick={()=>backBook(book._id)} className="btn btn-success">
                    BACK
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
