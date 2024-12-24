function DeleteUser(){
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');    
  
    return (
      <Card
        bgcolor="danger"
        header="User Deletion Card"
        status={status}
        body={show ? 
          <DeletionForm setShow={setShow} setStatus={setStatus}/> :
          <DeletedForm setShow={setShow} setStatus={setStatus}/>}
      />
    ) 
  }
  
  function DeletedForm(props){
    return(<>
      <h5>{props.status}</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={function x(){props.setShow(true);
          props.setStatus('');
       }}>
          Delete another user
      </button>
    </>);
  }
  
  function DeletionForm(props){
    const [email, setEmail]       = React.useState('');
  
  
    async function handle(){
      const response = await fetch(`/account/delete/${email}`);
      const text  =   await response.text();
      if(text.toUpperCase()==="USER NOT FOUND"){
        props.setShow(false);
        props.setStatus('User could not be found in the system');
      }
      else{
        props.setShow(false);
        props.setStatus('User Deleted Successfully!');
      }
    }
  
  
    return (<>
  
      User Email<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter User Email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>

      <button type="submit" className="btn btn-light" onClick={handle}>Delete User</button>
     
    </>);
  }