import './App.css';
import Items from "./components/items";


function App() {

  return (
    <div className="col-lg-6 mx-auto p-3 py-md-5">

      <p>Some text with bootstrap icon <i className="bi bi-person"></i></p>

      <Items />

    </div>
  );
}

export default App;
