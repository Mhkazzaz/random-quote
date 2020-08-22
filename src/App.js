import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';
import './App.css';
import $ from 'jquery';
import { FacebookShareButton, TwitterShareButton } from "react-share"; 

function App() {

  setTimeout(() => $(".quote-box").css("opacity", 1), 500)

  const randomColor = require('randomcolor');
  const randomDark = randomColor({luminosity: "dark"})
  const [color, setColor] = useState(randomDark)
  const [count, setCount] = useState(1)
  const [quote, setQuote] = useState("")
  const [opacity, setOpacity] = useState(1)
  const [author, setAuthor] = useState("")

  const backgroundStyle = { backgroundColor: color, height: "100vh" }
  const quoteBoxStyle = { backgroundColor: "white", width: "500px", height: "auto", padding: 30, border: "2px solid black", opacity: 0}

  

  $("button").click(() => {
    $("p").addClass("quote  ")
  })

  $("p").on(
    "webkitAnimationEnd oanimationend msAnimationEnd animationend",
    function () {
      $(this).removeClass("quote")
      console.log("Class Removed")
    }
  );
  
  const newQuote = () => {
    setCount(count => count + 1)
    }

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 1643)

    fetch('https://type.fit/api/quotes/')
      .then(res => res.json())  
      .then(data => { 
        setQuote(quote => data[randomNum].text)
        data[randomNum].author?
        setAuthor(author => data[randomNum].author)
        : setAuthor(author => "Unknown")
      })

      setColor(color => randomDark)
  }, [count]);

  const url = `https://www.facebook.com`
  return (
    <div style={backgroundStyle} className="App container-fluid d-flex align-items-center">
      <div style={quoteBoxStyle} className="quote-box container d-flex flex-column">

        <p style={{color , opacity: opacity}} class=" text-center mb-4">
          <i class="fas fa-quote-left fa-2x mr-2"></i>{quote}
        </p>
        <p style={{ color }} className="text-right">-{author}</p>
        <div>
          <button style={{ backgroundColor: color }}
            onClick={() => newQuote()}
            type="button"
            class="btn btn-primary float-right">
            New Quote
          </button> 
          <a target="_blank" text={quote} href={`https://twitter.com/intent/tweet?text=${quote}--${author}`}>
            <i class="fab fa-twitter-square fa-3x icons" style={{ color }}></i>
          </a>
          <FacebookShareButton url={url} quote={`${quote} --${author}`}>
            <i class="fab fa-facebook-square fa-3x icons mr-3" style={{ color }}></i>
          </FacebookShareButton>
        </div>   
      </div>
    </div>
  );
} 

export default App;
