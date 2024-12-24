function NavBar(){
 
  return(

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Bad Bank Home</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">         
          <li className="nav-item">
          <button type="button" class="btn btn-primary">
              <a className="nav-link" href="#/deposit/">Deposit</a>
              </button>
          </li>
          <li className="nav-item">
              <button type="button" class="btn btn-success">
              <a className="nav-link" href="#/withdraw/">Withdraw</a>
              </button>
          </li>
          <li className="nav-item">
            <button type="button" class="btn btn-info">
            <a className="nav-link" href="#/balance/">Check Balance</a>
              </button>
          </li>
          <li className="nav-item">
              <button type="button" class="btn btn-warning">
                    <a className="nav-link" href="#/alldata/">AllData</a>
              </button>
          </li>
          <li className="nav-item">
              <button type="button" class="btn btn-danger">
                    <a className="nav-link" href="#/delete/">Delete User</a>
              </button>
          </li>
          <li className="nav-item">
              <div className="flexColumn2">
                <button type="button" class="btn btn-secondary btn-lg">
                  <a className="nav-link" href="#/login/">Login</a>
                </button>
               </div>
          </li>      
          <li className="nav-item">
              <div className="flexColumn">
                  <button type="button" class="btn btn-primary btn-lg">
                  <a className="nav-link" href="#/CreateAccount/">Create Account</a>
                  </button>
              </div>
          </li>

        </ul>
      </div>
    </nav>
  );
}