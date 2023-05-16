import { useState } from 'react';
import './App.css';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import data from './data.js'
// import {변수명1, 변수명2} from './data.js'; 중괄호로 가져올때는 export한 변수명 그대로
// import 작명 from './data.js';


function App() {

  let [shoes] = useState(data);

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Siyori Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className='main-bg'></div>

      <div className="container">
        <div className="row">
          {
            shoes.map((a, i)=>{
              return(
                <Card shoes={shoes[i]} i={i+1}></Card>
              )
            })
          };
        </div>
      </div> 


    </div>
  );
};

function Card(props){
  return(
    <div className="col-md-4">
      <img src={"https://codingapple1.github.io/shop/shoes"+ props.i +".jpg"} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  );
};

export default App;
