

function Withdraw(){
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="success"
      header="Withdraw from your account"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>{props.status}</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Withdraw More Money
    </button>
  </>);
}

function WithdrawForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');

  async function handle(){
    var tempAmount  = -amount;
    if(email.length >0 && amount > 0 ){
      const response = await fetch(`/account/update/${email}/${tempAmount}`);
      const text  =   await response.text();
      if(text.toUpperCase()=="SUCCESSFUL TRANSACTION"){
        props.setStatus("Succesful Transaction");
        props.setShow(false);
        console.log('1');
      }
      else{
        if(text.toUpperCase()=="SUCCESSFUL TRANSACTION"){
           props.setStatus("Succesful Transaction");
           props.setShow(false);
           console.log('2');
        }
        else{
          console.log("Insufficient Funds");
          props.setStatus("Failed Transaction!");
          props.setShow(true);
        }
      }
  }
  else
  {
    props.setStatus("You must submit an email and account first");
  }}

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
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}
