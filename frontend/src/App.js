import './App.css';
import Listing from './components/listing.js';
import { useState } from "react";

function App() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let body = JSON.stringify({
        title: title,
        description: description,
      });
      console.log('body', body);
      let res = await fetch("http://localhost:8000/api/item", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: body,
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setTitle("");
        setDescription("");
        setMessage("Item added successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="col-lg-6 mx-auto p-3 py-md-5">

      <p>Some text with bootstrap icon <i className="bi bi-person"></i></p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" value={title} className="form-control" id="title"
                 onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description"
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3">{description}</textarea>
        </div>
        <div>
          <input type="submit" className="btn btn-primary" value="Submit"/>
        </div>

        {message ? <div className="alert alert-info my-3">{message}</div> : null}
      </form>

      <Listing />

    </div>
  );
}

export default App;
