import React from "react";
//gönderilen book stateini burada alıyoruz
export default function AddBook({ book , handleChange , addBook }) {
  return (
    <div>
      <div className="container w-50 mt-5 border border-secondary">
        <form style={{ padding: "20px 20px 10px 20px" }}>
          <div className="form-floating mb-3">
            <input
              type="text" value={book.bookName} onChange ={handleChange}
              name="bookName"
              className="form-control"
              id="floatingInput"
              placeholder="Book Name"
            />
            <label for="floatingInput">Book Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text" value={book.author} onChange ={handleChange}
              name="author"
              className="form-control"
              id="floatingInput"
              placeholder="Author"
            />
            <label for="floatingInput">Author</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="number" value={book.quantity} onChange ={handleChange}
              name="quantity"
              className="form-control"
              id="floatingInput"
              placeholder="Quantity"
            />
            <label for="floatingInput">Quantity</label>
          </div>
          <div className="form-floating mb-3">
            <select
              className="form-select" value={book.department} onChange ={handleChange}
              name="department"
              id="floatingSelect"
              aria-label="Floating label select example"
            >
              <option selected>Department</option>
              <option value="Bilimkurgu">Bilimkurgu</option>
              <option value="Fantastik">Fantastik</option>
              <option value="Korku-Gerilim">Korku-Gerilim</option>
            </select>
            <label for="floatingSelect">Select Book Department</label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              name="comments" value={book.comments} onChange ={handleChange}
              placeholder="Leave a comment here"
              id="floatingTextarea"
            ></textarea>
            <label for="floatingTextarea">Comments</label>
          </div>
          <button type="button" onClick={addBook} className="btn btn-info">Add Book</button>
        </form>
      </div>
    </div>
  );
}
