const gameContainer = document.getElementById("game");
let countFlip = 0;
let points = 0;
let firstCard = document.createElement("img");
let secondCard = document.createElement("img");
let lowScore = 0;
let cardCount = 0;
 //image array creation
 let Images = [
  { imgSrc: "../images/dune.jpg", name:"dune" },
  { imgSrc: "../images/berserker.jpg", name:"berserker" },
  { imgSrc: "../images/heretics_of_dune.jpg", name:"heritics_of_dune" },
  { imgSrc: "../images/foundation.jpg", name:"foundation" },
  { imgSrc: "../images/make_room_make_room.jpg", name:"make_room_make_room" },
  { imgSrc: "../images/rendezvous_with_rama.jpg", name:"rendezvous_with_rama" },
  { imgSrc: "../images/second_foundation.jpg", name:"second_foundation" },
  { imgSrc: "../images/the_door_into_summer.jpg", name:"the_door_into_summer" },
  { imgSrc: "../images/the_moon_is_a_harsh_mistress.jpg", name:"the_moon_is_a_harsh_mistress" },
  { imgSrc: "../images/berserker.jpg", name:"berserker" },
  { imgSrc: "../images/the_star_beast.jpg", name:"the_star_beast" },
  { imgSrc: "../images/dune.jpg", name:"dune" },
  { imgSrc: "../images/foundation.jpg", name:"foundation" },
  { imgSrc: "../images/heretics_of_dune.jpg", name:"heritics_of_dune" }, 
  { imgSrc: "../images/make_room_make_room.jpg", name:"make_room_make_room" },
  { imgSrc: "../images/rendezvous_with_rama.jpg", name:"rendezvous_with_rama" },
  { imgSrc: "../images/second_foundation.jpg", name:"second_foundation" },
  { imgSrc: "../images/the_door_into_summer.jpg", name:"the_door_into_summer" },
  { imgSrc: "../images/the_moon_is_a_harsh_mistress.jpg", name:"the_moon_is_a_harsh_mistress" },
  { imgSrc: "../images/the_star_beast.jpg", name:"the_star_beast" }
];

//function to randomize image array
function shuffle(array) {
  let counter = array.length;
  
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let imageArray = shuffle(Images);


function createImageCards(imageArray) {
  for (let image of imageArray) {
    //create elements
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("img");
    
    //add initial classes
    card.classList.add("card");
    face.classList.add("face");
    back.classList.add("back");

    //set images and "imgName" attribute
    face.setAttribute("imgName",`${image.name}`)
    face.src = `${image.imgSrc}`;
    back.src = "../images/back_of_playing_card.png"
    
    
    
    gameContainer.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", function(event){
      //ensure that currentTarget is "img" and that card is not flipped
      if(event.currentTarget.classList != "card toggleCard" && event.target.tagName === "IMG"){
      //lock out clicks if 2 cards are in the process of transitioning to face down
      if(countFlip >= 2) {

      } else {
      //flip card and add 1 to points total
      card.classList.toggle("toggleCard");
      points += 1;
      //set firstCard if no cards are flipped
      if(countFlip === 0) {
        firstCard = event.target.previousSibling;
        countFlip ++;
        //check second card for a match if one card is flipped
      } else if(countFlip === 1) {
        //check for match and win condition
        if(event.target.previousSibling.getAttribute("imgName") === firstCard.getAttribute("imgName")){
          countFlip = 0;
          cardCount += 2;
          setTimeout(winCondition, 1600);
        } else {
          //transition non-match to facedown
          countFlip ++;
          secondCard = event.target.previousSibling;
          setTimeout(function () {
            firstCard.parentElement.classList = "card";
            secondCard.parentElement.classList = "card";
            countFlip = 0;
          }, 1600);
          
        }
      
      }
      }
       
    }
    });


  }
}
//check for win condition and set low score in local storage
function winCondition() {
  if(cardCount === 20) {
    gameContainer.innerHTML=`<p>Your Score: ${points}</p><input type='button' value='Play Again?'>`;
    gameContainer.classList = "gameOver";
    if(lowScore === null || lowScore > points) {
    localStorage.setItem("lowScore", `${points}`);
    }
    document.querySelector("input").addEventListener('click', () => {location.reload()});
  }
}
//retrieve low score from local storage
function getLowScore() {
  lowScore = localStorage.getItem("lowScore");
  let scoreBoard = document.createElement("h2");
  if(lowScore != null){
  scoreBoard.innerText = `Low Score: ${lowScore}`
  } else {
    scoreBoard.innerText = 'Try for the lowest score!'
  }
  document.querySelector("h1").insertAdjacentElement("afterend", scoreBoard);
}


// when the DOM loads
createImageCards(imageArray);
getLowScore();

