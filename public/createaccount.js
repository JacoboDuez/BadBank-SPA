// const { useContext } = require("react");

function CreateAccount(){
const [show, setShow]     = React.useState(true);
const [status, setStatus] = React.useState('');

    return (
      <Card
        bgcolor="primary"
        header="Create Account"
        status={status}
        body={show  ? 
        <CreateForm setShow={setShow} setStatus={setStatus}/> : 
         <CreateMsg setShow={setShow} setStatus={setStatus}/>}
      />)
  }



function CreateMsg(props){
  return(<>
    <h5>{props.status}</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('')}}>Add another account</button>
  </>);
}


function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  
  function handle() {
    let url =  `/account/create/${name}/${email}/${password}`;
    (async () => {
        var res  = await fetch(url);
        var text =  await res.text();
      
        if(text.toUpperCase()=="USER ALREADY EXISTS"){
          props.setStatus('This is an existent account, did you forget your password? \n Go to the Log in Section!');
          //props.setShow(false);  
        }
        else{

           props.setShow(false);
           props.setStatus('User created successfully!');          
        }
        // props.setShow(false);
    })();
    
  };   

  return (<>

    Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e=> setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Create Account</button>
  </>);
}