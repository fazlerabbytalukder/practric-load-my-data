import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  //form er input field e use korar jonno
  const nameRef = useRef();
  const emailRef = useRef();


  //dtaa fetch korar jonno
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [])
  

  const handleAddUser = (e) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;

    const newUser = {
      name: name,
      email: email
    }
    
    //backend theke data new added data fetch korte 
    fetch('http://localhost:5000/users', {
      method: 'post',
      headers: {
        'content-type':'application/json'
      },
      body:JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        const addedUser = data;
        const newUser = [...users, addedUser];
        setUsers(newUser);
    })

    //search remove and form er reload jno na hoy
    nameRef.current.value = '';
    emailRef.current.value = '';
    e.preventDefault();
  }
  return (
    <div className="App">
      <form onSubmit={handleAddUser}>
        <input type="text" ref={nameRef} placeholder='name'/>
        <input type="email" ref={emailRef} placeholder='email' />
        <input type="submit" value="Submit" />
      </form>
      <h2>users: {users.length}</h2>
      <ul>
        {
          users.map(user => <li>{user.id} {user.name} {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
