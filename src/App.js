import { useState, useEffect} from "react";
import './App.css';

export const App = () => {
  const toBeHidden = document.querySelectorAll("#toHide");
  const firstButton = document.querySelector("#button1");
  let springbootSection = document.querySelector("#springboot");
  const alphaEntry = document.querySelector("#alphaEntry");

  const [classification, setClassification] = useState("Emerging Target");
  const [targetNum, setTargetNum] = useState(1);
  const [isETarget, setETarget] = useState(true);

  const alphaRegex = new RegExp(/^[a-zA-Z]$/);
  const [alpha, setAlpha] = useState('');
  const [alphaColor, setAlphaColor] = useState("White");
  const [shapeColor, setShapeColor] = useState("White");
  const [shape, setShape] = useState("Circle");

  const [colors] = useState([{value:"White"}, {value:"Black"}, {value:"Gray"}, {value:"Red"}, {value:"Blue"}, 
  {value:"Green"}, {value:"Yellow"}, {value:"Purple"}, {value:"Brown"}, {value:"Orange"}]);
  
  const [shapes] = useState([{value:"Circle"}, {value:"Semicircle"}, {value:"QuarterCircle"}, {value:"Triangle"}, {value:"Trapezoid"}, 
  {value:"Rectangle"}, {value:"Circle"}, {value:"Pentagon"}, {value:"Hexagon"}, {value:"Heptagon"}, {value:"Octagon"}, {value:"Star"}, {value:"Cross"}]);

  const [target1, setTarget1] = useState("N/A");
  const [target2, setTarget2] = useState("N/A");
  const [target3, setTarget3] = useState("N/A");
  const [target4, setTarget4] = useState("N/A");
  const [target5, setTarget5] = useState("N/A");

  useEffect (() => { refreshTargets(); }, []);

  const refreshTargets = () => {
    fetch('http://localhost:8080/target/1')
    .then(res => { return res.text(); })
    .then(data => { setTarget1(data); })
    .catch(err => { console.log(err.message); });

    fetch('http://localhost:8080/target/2')
    .then(res => { return res.text(); })
    .then(data => { setTarget2(data); })
    .catch(err => { console.log(err.message); });

    fetch('http://localhost:8080/target/3')
    .then(res => { return res.text(); })
    .then(data => { setTarget3(data); })
    .catch(err => { console.log(err.message); });
    
    fetch('http://localhost:8080/target/4')
    .then(res => { return res.text(); })
    .then(data => { setTarget4(data); })
    .catch(err => { console.log(err.message); });

    fetch('http://localhost:8080/target/5')
    .then(res => { return res.text(); })
    .then(data => { setTarget5(data); })
    .catch(err => { console.log(err.message); });
  }

  const sendPost = () => {
    console.log(message);
    fetch('http://localhost:8080/', {
      method: 'POST',
      body: message,
    })
    .then(res => { return res.text(); })
    .then(data => { 
      console.log(data); 
      refreshTargets();
    })
    .catch(err => {console.log(err.message);});
  };
  
  const selectTarget = (tN) => {
    hideSpringboot();
    setTargetNum(tN.target.value);
  };
  const selectClassification = (event) => {
    hideSpringboot();
    setClassification(event.target.value);
    if (event.target.value === "Emerging Target")
      setETarget(true);
  };

  // first submit button
  const submitButton1 = (event) => {
    event.preventDefault();
    if (classification === "Alphanumeric") {
      setETarget(false);
      toBeHidden.forEach((element) => {
        element.classList.remove("hidden");
      });
      firstButton.classList.add("purpleColor");
      hideSpringboot();
    } else {
      eTargetSubmitted();
    }
  };

  const alphaChoice = (event) => {
    hideSpringboot();
    setAlpha(event.target.value);
  };

  const checkEnterKey = (event) => {
    if (event.code === 'Enter') {
      if (alpha.length === 1 && alphaRegex.test(alpha)) {
        console.log(alpha + " is a valid letter");
        if (alphaEntry !== null) {
          alphaEntry.classList.remove("red-text");
        }
        alphaEntry.classList.add("green-text");
      } else {
        setAlpha("error");
        console.log("error");
        if (alphaEntry !== null) {
          alphaEntry.classList.remove("green-text");
        }
        alphaEntry.classList.add("red-text");
      }
    }
  }

  const colorChoice = (type, color) => {
    hideSpringboot();
    if (type === 'alpha')
      setAlphaColor(color);
    else
      setShapeColor(color);
  };

  const shapeChoice = (shape) => { setShape(shape); };
  
  //final submit button -> link to springboot
  const submitButton = () => {
    if (isETarget)
      eTargetSubmitted();
    else if (alpha.length === 1 && alphaRegex.test(alpha)) 
      showSpringboot();
    else {
      hideSpringboot();
      console.log("check entries for errors!");
    }
  };

  const eTargetSubmitted = () => {
    setETarget(true);
    toBeHidden.forEach((element) => {
      element.classList.add("hidden");
    });
    if (firstButton !== null)
      firstButton.classList.remove("purpleColor");
    showSpringboot();
  }

  const showSpringboot = () => {
    if (springbootSection === null)
      springbootSection = document.querySelector("#springboot");
    springbootSection.classList.remove("hidden");
    sendPost();
  }

  const hideSpringboot = () => {
    if (springbootSection !== null) 
      springbootSection.classList.add("hidden");
  }

  const toSend = () => {
    const t = `Target ${targetNum}:`;
    if (isETarget === true)
      return t + " Emerging Target";
    return t + ` ${alphaColor} ${alpha} on a ${shapeColor} ${shape}`;
  }
  const message = toSend();
  const classChoices = ["Emerging Target", "Alphanumeric"];

  return (
    <div className="App">
      <header className="App-header">
        Challenge 2: User Input!
      </header>
      
      {/* Displaying Classifications */}
      <h4>Current Classifications:</h4>
      <div className="classifications">
        <div>{target1}</div>
        <div>{target2}</div>
        <div>{target3}</div>
        <div>{target4}</div>
        <div>{target5}</div>
      </div>

      {/* Targets: */}
      <div className="padding-ten">
        <label>Choose target: </label>
        <select name="selectList" id="selectList" class="dropdown" onChange={selectTarget} value = {targetNum}>
          <option value="1">Target 1</option>
          <option value="2">Target 2</option>
          <option value="3">Target 3</option>
          <option value="4">Target 4</option>
          <option value="5">Target 5</option>
        </select>
      </div>

      {/* Emerging-Target or Alphanumeric */}
      <form onSubmit={submitButton1}>
        {classChoices.map((choice) => {
          return (
            <div className="padding-ten">
              <label>
                <input type="radio" value={choice} checked={classification === choice} onChange={selectClassification}/>
                {choice}
              </label>
            </div>
        );})}
        <div className="padding-ten" style={{padding:10}}>
          <button id="button1" type="submit" class="styleButton">Submit</button>
        </div>
      </form>

      {/* Alphanumeric Section */}
      <div id="toHide" className = "hidden">
        <div className="spacing">
          {/* Alpha: */}
          <div className="padding-ten" style={{paddingRight:15}}>
            <label id="alphaEntry">Enter an alpha A-Z: 
              <input type="text" onChange={alphaChoice} onKeyDown = {checkEnterKey}/>
            </label>
          </div>
          {/* Alpha Color: */}
          <div className="padding-ten" style={{paddingLeft:15}}>
            <label>Choose the alpha color: </label>
            <select name="selectList" id="selectList" class="dropdown" onChange={(event) => colorChoice("alpha", event.target.value)}>
              {colors.map((color) => {
                return (
                  <option value={color.value}>{color.value}</option>
              );})}
            </select>
          </div>
        </div>
        <div className="spacing">
          {/* Shape: */}
          <div className="padding-ten" style={{paddingRight:15}}>
            <label>Choose a shape: </label>
            <select name="selectList" id="selectList" class="dropdown" onChange={(event) => shapeChoice(event.target.value)}>
              {shapes.map((shape) => {
                return (
                  <option value={shape.value}>{shape.value}</option>
              );})}
            </select>
          </div>
          {/* Shape Color */}
          <div className="padding-ten" style={{paddingLeft:15}}>
            <label>Choose the shape color: </label>
            <select name="selectList" id="selectList" class="dropdown" onChange={(event) => colorChoice("shape", event.target.value)}>
              {colors.map((color) => {
                return (
                  <option value={color.value}>{color.value}</option>
              );})}
            </select>
          </div>
        </div>
        {/* Submit Info */}
        <div className="padding-ten" style={{padding:10}}>
          <input class="styleButton" type="submit" value="Submit" onClick={submitButton}/>
        </div>
      </div>
      {/* Springboot: */}
      <div id="springboot" class="hidden">
        sending... {message}
      </div>
      {/* <h1 style={{color: "#247BA0", fontSize:17 }}>a fun picture here :)</h1> */}
      <img src = "gorgorgorl.png" width="15%" height="15%"></img>
    </div>
  );
};

export default App;