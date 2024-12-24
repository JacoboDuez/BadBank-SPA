function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}


function DepositMsg(props){
  return (<>
      <h5>{props.status} Your deposit was posted!</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => {
            props.setShow(true);
            props.setStatus('');
        }}>
          Make more deposits
      </button>
  </>);
} 

function DepositForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');


    function handle(){
    if(email.length >  0 && amount >0){
   
      fetch(`/account/update/${email}/${amount}`)
      .then(response => response.text())
      .then(text => {
          try {
              console.log('here');
              const data = JSON.parse(text);
              props.setStatus("Successful Transaction!");
              props.setShow(false);
          } catch(err) {
              if(err.toUpperCase() == "SUCCESSFUL TRANSACTION"){
                props.setStatus('Successful Transaction!');
                props.setShow(false);
              }
              else{
                props.setStatus('Deposit failed')
                console.log('err:', text);
                props.setShow(false);
              }
             

          }
      });    
      props.setShow(false);
    }
    else
    {
      props.setStatus("You must enter an email and amount first");
    }
  }

  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email}
      onChange={e => setEmail(e.currentTarget.value)}/><br/>
      
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>
  </>);
}