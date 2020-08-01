import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  var [funcShow, setFuncShow]=useState(true);
  var [classShow, setClassShow]=useState(true);
  return (
    <div className="container">
      <h1>Hello world!</h1>
      <input type="button" value='remove func' onClick={function(){
        setFuncShow(false);
      }}></input>
      <input type="button" value='remove comp' onClick={function(){
        setClassShow(false);
      }}></input>
      {funcShow? <FunComp initNumber={2}></FunComp> : null}
      {classShow? <ClassComp initNumber={2}></ClassComp> : null}
    </div>
  );
}

//componentWillUnmount() : CLEAN UP, 컴포넌트가 퇴장할 때 뒤처리 작업을 위해서 사용한다.

var funcStyle='color :blue';
var funcId=0;
function FunComp(props){ //함수 스타일에서 props를 사용하는 방법
  var numberState=useState(props.initNumber); //useState를 사용할 경우 배열이 리턴되고 배열은 2개 값으로 이루어져 있다.
  var number=numberState[0]; //상태값
  var setNumber=numberState[1]; //상태값을 바꿀 수 있는 함수

  var [_date, setDate]=useState((new Date()).toString());

  useEffect(function(){ 
    console.log('%cfunc=> useEffect number (componentDidMount)'+(++funcId), funcStyle);  
    document.title=number;
    return function(){
      console.log('%cfunc=> useEffect number return (componentDidMount)'+(++funcId), funcStyle);  
    }
  },[]); //componentDidMount만 실행할 수 있다, 컴포넌트가 최초로 생성될 때 딱 한번만 실행된다.

  //side effect, 여러개 설치 가능하다
  useEffect(function(){ //componentDidupdate & componentDidMount : 컴포넌트가 처음으로 돔에 나타나는 순간에 해야할 초기 작업들을 구현
    console.log('%cfunc=> useEffect number (componentDidupdate & componentDidMount)'+(++funcId), funcStyle);  
    document.title=number;
    return function(){ //CLEAN UP : 컴포넌트가 퇴장할 때 뒤처리 작업(정리 작업)을 위해서 사용한다. 
      console.log('%cfunc=> useEffect number return (componentDidupdate & componentDidMount)'+(++funcId), funcStyle);  
    }
  },[number]); //배열안에 있는 원소의 상태가 바뀌었을 때 만 첫번째 인자인 콜백함수가 호출된다.

  useEffect(function(){ 
    console.log('%cfunc=> useEffect _date (componentDidupdate & componentDidMount)'+(++funcId), funcStyle);  
    document.title=_date;
    return function(){ //CLEAN UP : 컴포넌트가 퇴장할 때 뒤처리 작업(정리 작업)을 위해서 사용한다. 
      console.log('%cfunc=> useEffect _date return (componentDidupdate & componentDidMount)'+(++funcId), funcStyle);  
    }
  },[_date]); //배열안에 있는 원소의 상태가 바뀌었을 때 만 첫번째 인자인 콜백함수가 호출된다.

  console.log('%cfunc=> render'+(++funcId), funcStyle);
  return(
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {number}</p>
      <p>Date : {_date}</p>
      <input type='button' value="random" onClick={
          function(){
            setNumber(Math.random());
          }}></input>
      <input type='button' value="date" onClick={
          function(){
            setDate((new Date()).toString());
          }}></input>
    </div>
  )
}
var classStyle='color:red';
class ClassComp extends React.Component{
  state={
    number:this.props.initNumber,
    date : (new Date()).toString(),
  }

  //라이프 사이클
  componentWillMount(){// render 이전
    console.log('%cclass => componentWillMount', classStyle);
  }
  componentDidMount(){ // redner 이후
    console.log('%cclass => componentDidMount', classStyle);
  }
  shouldComponentUpdate(nextProps, nextState){
    console.log('%cclass => shouldComponentUpdate', classStyle);
    return true;
  }
  componentWillUpdate(nextProps, nextState){
    console.log('%cclass => componentWillUpdate', classStyle);
  }
  componentWillUnmount(nextProps, nextState){
    console.log('%cclass => componentWillUpnmount', classStyle);
  }

  render(){
    console.log('%cclass => render', classStyle);
    return(
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.state.number}</p>
        <p>Date : {this.state.date}</p>
        <input type='button' value="random" onClick={
          function(){
            this.setState({
              number : Math.random(),
            })
          }.bind(this)}></input>
          <input type='button' value="date" onClick={
          function(){
            this.setState({
              date : (new Date()).toString(),
            })
          }.bind(this)}></input>
      </div>
    )
  }
}

export default App;
