
function Spa() {
  return (
    <HashRouter>
      <div>
        <NavBar/>        
        <UserContext.Provider value={{users:[{name:'jacobo',email:'jacoboduez@hotmail.com',password:'chequeo',balance:150000}]}}>
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" component={Home} />
            <Route path="/createAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/delete/" component={DeleteUser} />
            <Route path="/balance/" component={Balance} />
            <Route path="/alldata/" component={AllData} />
          </div>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}


const container =  document.getElementById('root');
const root =  ReactDOM.createRoot(container);


root.render(<Spa/>);

// root.render(<React.StrictMode>
//     <Spa/></React.StrictMode>);

// ReactDOM.render( 
//   <Spa />,
//   document.getElementById('root'));
