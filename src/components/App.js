import { useEffect, useState } from "react"
import Nav from "./Nav"
import Article from "./Article"
import ArticleEntry from "./ArticleEntry"
import { SignIn, SignOut, useAuthentication } from "../services/authService"
import { fetchArticles, createArticle } from "../services/articleService"
import "./App.css"
import { doc, getDoc } from "firebase/firestore";
import { query, where } from "firebase/firestore"; 
import { collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"
import { auth } from "../firebaseConfig"

export default function App() {
  const [articles, setArticles] = useState([])
  const [article, setArticle] = useState(null)
  const [writing, setWriting] = useState(false)
  const user = useAuthentication()
  const TTLogRef = collection(db, "TTLog");


//Initialize Buttons
var button = document.getElementById("clickme");
var upgrade1Button = document.getElementById("click1");
var upgrade2Button = document.getElementById("click2");
var clickerCost = document.getElementById("clickerCost");
var autoCost = document.getElementById("autoCost");
var tpc = document.getElementById("i");
var tps = document.getElementById("j");
var trees = document.getElementById("CurrTrees");

//Initialize Variables
var count = 0;
var i = 1; //amount of trees per click
var j = 0; //amount of trees automatically gained per second
var cCost = 10;
var aCost = 50;
//Initialial Functions
//updateCosts();
//updateTreeCounters();

setInterval(function () {
  count += j;
  updateTreeCounters();
}, 1000);

setInterval(async function () {
  const q = query(TTLogRef, where("user", "==", auth.currentUser.displayName), where("paid", "==", false));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (document) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(document.id, " => ", document.data());
  if (document.exists) {
    donate();
    const toUpdate = doc(db, "TTLog", document.id);
    await updateDoc(toUpdate, {
      paid: true
    })
  }
});
}, 1000);

function donate() {
  i *= 20;
  console.log(i);
  j += 1000;
  updateCosts();
  updateTreeCounters();
}

function stepForward1() {
  if (count >= cCost) {
    i *= 2;
    count -= cCost;
    cCost *= 2;
    updateCosts();
    updateTreeCounters();
  }
}
function stepForward2() {
  if (count >= aCost) {
    j += aCost / 10;
    count -= aCost;
    aCost *= 3;
    updateCosts();
    updateTreeCounters();
  }
}

function updateCosts() {
  if (clickerCost && autoCost) {
    clickerCost.innerHTML = "$" + cCost;
    autoCost.innerHTML = "$" + aCost;
  }
}

function updateTreeCounters() {
  if (button && tpc && tps && trees) {
    button.innerHTML = "Trees Planted: " + count;
    tpc.innerHTML = "Trees per click = " + i;
    tps.innerHTML = "Trees per second = " + j;
    trees.innerHTML = "Current Trees = " + count;
  }
}

if (button) {
button.onclick = function () {
  count += i;
  updateTreeCounters();
};
}

if (upgrade1Button) {
upgrade1Button.onclick = stepForward1;
}

if (upgrade2Button) {
upgrade2Button.onclick = stepForward2;
}


  return (
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Woody Click</title>
    <link rel="stylesheet" href="comp.css" />
    <script src="comp.js" defer></script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
      rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link href="https://fonts.googleapis.com/css2?family=DynaPuff&display=swap" rel="stylesheet"/>

  </head>
  
  <body>
    <h1>Woody Click</h1>{!user ? <SignIn /> : <SignOut />}
    <img id="clickme"
        src="https://static.vecteezy.com/system/resources/previews/019/527/064/original/an-8-bit-retro-styled-pixel-art-illustration-of-an-oak-tree-free-png.png"
        width="150px"
      /> 
      
    <div id="box"> 
      <p id="CurrTrees">Current Trees: 0</p>
      <p id="i">Trees per click = 1</p>
      <p id="j">Trees per second = 0</p>
    </div>
    <img id="cat"
        src="https://i.pinimg.com/originals/85/67/51/856751fd464e7268c1665818e6b7c274.gif"
        width="50px"
      /> 
    <img id="cat1"
        src="https://i.pinimg.com/originals/80/7b/5c/807b5c4b02e765bb4930b7c66662ef4b.gif"
        width="50px"
    /> 
    <img id="cat2"
        src="https://66.media.tumblr.com/bc63289eea46b6a7d03e08ab3d4cb494/tumblr_mhjyzsQfYU1rfjowdo1_500.gif"
        width="92px"
    /> 
    
    <button id="micro1">Buy a real tree to skip 5 levels</button>
    <h5 id="info">(go to teamtrees.com)</h5>
    <table id="table">
      <tr>
        <td><button id="click1">BUY</button></td>
        <td>Clicker Upgrade</td>
        <td id="clickerCost">$10</td>
      </tr>
      <tr>
        <td><button id="click2">BUY</button></td>
        <td>Auto Upgrade</td>
        <td id="autoCost">$50</td>
      </tr>
    </table>
  </body>
</html>

  );
}