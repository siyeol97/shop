import { createContext, useEffect, useState } from 'react';
import './App.css';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import data from './data.js'
import Detail from './routes/Detail';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios';
import Cart from './routes/Cart'
import { useQuery } from '@tanstack/react-query';
// import {변수명1, 변수명2} from './data.js'; 중괄호로 가져올때는 export한 변수명 그대로
// import 작명 from './data.js';

export let Context1 = createContext();

function App() {

  useEffect(()=>{
    let test = localStorage.getItem('watched');
    if(!test){
      localStorage.setItem('watched', JSON.stringify([]))
    }
    
  }, [])
  
  let [inven, setInven] = useState([10, 11, 12]);
  let [shoes, setShoes] = useState(data);
  let [btn, setBtn] = useState(true);
  let [cnt, setCnt] = useState(2);
  let [isloading, setIsloading] = useState(false);
  let navigate = useNavigate();

  let result = useQuery(['작명'], ()=>{
    return axios.get('https://codingapple1.github.io/userdata.json')
      .then((a)=>{
        console.log('요청됨')
        return a.data
      })
  }, { staleTime : 2000 })


  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Siyori Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            { result.isLoading && '로딩중' }
            { result.error && '에러남' }
            { result.data && result.data.name }
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={<Home isloading={isloading} setIsloading={setIsloading} shoes={shoes} setShoes={setShoes} navigate={navigate} setBtn={setBtn} btn={btn} cnt={cnt} setCnt={setCnt}/> }/>

        <Route path='/detail/:id' element={
          <Context1.Provider value={{inven, shoes}}>
            <Detail shoes={shoes}/>
          </Context1.Provider>
        }/>

        <Route path='/cart' element={ <Cart shoes={shoes} />}></Route>

        <Route path='/about' element={<About/>}>
          <Route path='member' element={<div>멤버임</div>} />
          <Route path='location' element={<div>위치정보임</div>} />
        </Route>
      
        <Route path='/event' element={<Event/>}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path='two' element={<div>생일기념 쿠폰받기</div>} />
        </Route>

        <Route path='*' element={<div>없는페이지에요</div>}/>
      </Routes>

      


    </div>
  )
}

function Event(){
  return(
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function About(){
  return(
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props){
  return(
    <div className="col-md-4">
      <img src={"https://codingapple1.github.io/shop/shoes"+ props.i +".jpg"} width="80%" alt=''/>
      <h4 onClick={()=>{ props.navigate('/detail/'+props.id) }}>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )
}

function Home(props){
  return(
    <>
      
      <div className='main-bg'></div>
      <div className="container">
        <div className="row">
          {
            props.shoes.map((a, i)=>{
              return(
                <Card key={i} shoes={props.shoes[i]} i={i+1} navigate={props.navigate} id={i}></Card>
              )
            })
          }
        </div>
      </div>
      {
        props.cnt <= 3
        ? <button onClick={()=>{
          props.setIsloading(true);
          axios.get("https://codingapple1.github.io/shop/data"+ parseInt(props.cnt) +".json")
          .then((result)=>{ 
            let copy = [...props.shoes];
            let new_shoes = copy.concat(result.data);
            console.log(new_shoes);
            props.setShoes(new_shoes);
            props.setCnt(props.cnt+1);
          })
          .catch(()=>{
            console.log('ajax실패함');
          })
          .finally(()=>{
            props.setIsloading(false);
          })
        }}>더보기</button>
        :null
      }
      {
        props.isloading == true
        ? <Onloading />
        : null
      }
      
    </>
  )
}

function Onloading(props){
  return(
    <div>
      로딩중 입니다.
    </div>
  )
}


export default App;
