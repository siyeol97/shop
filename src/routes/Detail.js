import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { orderShoes } from "../store.js";

import { Context1 } from './../App.js'
import { useDispatch, useSelector } from "react-redux";


let YellowBtn = styled.button`
  background : ${ props => props.bg };
  color : ${ props => props.bg == 'blue' ? 'white' : 'black' };
  padding : 10px;
`

function Detail(props){

  let cart = useSelector((state)=>{return state.cart});
  let dispatch = useDispatch();
  let { inven, shoes } = useContext(Context1);

  let [count, setCount] = useState(2);
  let {id} = useParams();

  useEffect(()=>{
    let watched = localStorage.getItem('watched');
    watched = JSON.parse(watched) || []; //JSON.parse(watched)가 undefined or null 이면 [] 반환
    if(!watched.includes(id)){
      watched.push(id);
      localStorage.setItem('watched', JSON.stringify(watched));
    }
    
    
  }, [])

  let find_content = props.shoes.find((x)=>{
    return x.id == id;
  });
  let [event_alert, setEvent_alert] = useState(true);
  let [input_text, setInput_text] = useState('');
  let [tab, setTab] = useState(0);
  let [pgfade, setPgfade] = useState('');

  useEffect(()=>{
    let a = setTimeout(()=>{
      setCount(count-1);
      if(count == 0){
        setEvent_alert(false);
      }
    return ()=>{
      clearTimeout(a);
    }
    }, 1000)
  })

  useEffect(()=>{
    if(isNaN(input_text) == true){
      alert('숫자만 입력하세요');
    }
  }, [input_text])

  useEffect(()=>{
    setPgfade('end');
    return ()=>{
      setPgfade('');
    }
  }, [])


    return(
      <div className={`container start ${pgfade}`}>
        {
          event_alert == true
          ? <div className="alert alert-warning">
              {count}초이내 구매시 할인
            </div>
          :null

        }
        
        <YellowBtn bg="blue">버튼</YellowBtn>
        <YellowBtn bg="orange">버튼</YellowBtn>
        
        <div className="row">
          <div className="col-md-6">
            <img src={"https://codingapple1.github.io/shop/shoes"+ (parseInt(id)+1) +".jpg"} width="100%" alt="" />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{find_content.title}</h4>
            <p>{find_content.content}</p>
            <p>{find_content.price}원</p>
            <button className="btn btn-danger" onClick={()=>{dispatch(orderShoes({ id : id, name : find_content.title, count : 1 }))}}>주문하기</button> 
            <input onChange={(e)=>{ setInput_text(e.target.value) }}/>
          </div>
        </div>

        <Nav variant="tabs"  defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link onClick={()=>{ setTab(0) }} eventKey="link0">버튼0</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={()=>{ setTab(1) }} eventKey="link1">버튼1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={()=>{ setTab(2) }} eventKey="link2">버튼2</Nav.Link>
          </Nav.Item>
        </Nav>
        
        <TabContent tab={tab} shoes={props.shoes}/>
        
        


      </div> 
    )
  }

function TabContent(props){

  let { inven, shoes } = useContext(Context1);

  let [fade, setFade] = useState("");

  useEffect(()=>{
    let a = setTimeout(()=>{ setFade('end') }, 10);
    return ()=>{
      clearTimeout(a);
      setFade('');
    }
  }, [props.tab])

return (<div className={`start ${fade}`}>
    { [<div>{props.shoes[0].title}</div>, <div>{inven}</div>, <div>내용2</div>][props.tab] }
  </div>)
}



export default Detail;