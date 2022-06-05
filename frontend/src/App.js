import './App.css';

function App() {
  return (
    <div className="col-lg-6 mx-auto p-3 py-md-5">
      <form>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Email
            address</label>
          <input type="email" className="form-control" id="exampleFormControlInput1"
                 placeholder="name@example.com" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Example
            textarea</label>
          <textarea className="form-control" id="exampleFormControlTextarea1"
                    rows="3"></textarea>
        </div>
      </form>

      asd <i className="bi bi-backspace-fill"></i> asd

      <table className={'table table-striped table-hover'}>
        <thead>
          <tr>
            <th>asd</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>asd</td>
          </tr>
          <tr>
            <td>asd</td>
          </tr>
          <tr>
            <td>asd</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
