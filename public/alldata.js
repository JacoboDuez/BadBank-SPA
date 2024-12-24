

function AllData(){
    const [data, setData] = React.useState([]);
        
             React.useEffect(() => { fetch('/account/all')
             .then(response => response.json())
             .then(data =>setData(data))
             .catch(error => console.error('Error fetching users:', error));
            },[]);

            console.log(data);
         return (
         <>
            <h1>Users</h1>
            <ul> {data.map(datum =>
            ( <li key={datum._id}>{'  --UserName: ' + datum.name + '   --Email: ' + datum.email + '   --Account Balance: ' + datum.balance}</li>))}
            </ul> 
            </> );
}

