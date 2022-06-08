import './App.css';
// import Items from "./components/items";
import BasicChat from "./components/basicChat.js";


function App() {

  return (
    <div className="col-lg-6 mx-auto p-3 py-md-5">

      {/*<p>Some text with bootstrap icon <i className="bi bi-person"></i></p>*/}

      <BasicChat />

    </div>
  );
}

export default App;
