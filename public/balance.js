
function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState(''); 
  const [balance,setBalance] = React.useState(''); 

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus} setBalance={setBalance}/> :
        <BalanceMsg setShow={setShow} setStatus={setStatus} balance={balance}/>}
    />
  )

}

function BalanceMsg(props){
  return(<>
    <h5>Your balance is {props.balance}</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){
  const [email, setEmail]   = React.useState('');
  

  function handle(){
    if(email.length> 0){
      fetch(`/account/findOne/${email}`)
      .then(response => response.text())
      .then(text => {
          try {
              const data = JSON.parse(text);
              props.setStatus(text);
              props.setShow(false);
              props.setBalance(data.balance);
              props.setStatus('');
          } catch(err) {
              props.setStatus(text);
              props.setShow(false);
              props.setBalance(0 + " because you don't have an account with us!");
              console.log('err:', text);
          }
      });
    }
    else{
      props.setStatus("An email must be submitted to check for your balance!");
    }
  }

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e =>setEmail(e.currentTarget.value)}/><br/>
    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>
  </>);
}