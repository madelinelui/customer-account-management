import logo from './logo.svg';
import './App.css';
import UserCard from './components/UserCard';

function App() {
  return (
    <div className='App'>
      <UserCard
        user="John Smith"
        username="Username: johnsmith1"
        email="Email: john_smith@yahoo.com"
        phone="Phone: 75230492"
        
      ></UserCard>
   
      <UserCard
        user="Jane Jones"
        username="Username: jane_jones"
        email="Email: janejones1@gmail.com"
        phone="Phone: 68975924"
      
      ></UserCard>
    
      <UserCard
        user="John Doe"
        username="Username: jdoe"
        email="Email: jdoeh@aol.com"
        phone="Phone: 27340972"
      ></UserCard>
    </div>
  );
}

export default App;
