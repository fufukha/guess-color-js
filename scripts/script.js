document.addEventListener("DOMContentLoaded", function (event) {
	initGame();
	
	function initGame () {
		var colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
		var colorsObj = toObject(colors);
		var num = randomInteger(colors.length);

		String.prototype.capitalize = function() {
    	return this.charAt(0).toUpperCase() + this.slice(1);
		}
		var computer = {
			index: num, 
			color: colorsObj[num],  
			winMsg: "You guessed right! Well done! The color was " + colorsObj[num].capitalize(), 
			intro: "I'm thinking of a color from Red to Violet. What's the color?",
      hint: ''
		}
		var target = document.querySelector("h1");
		setInnerHTML(target, computer.intro);
		console.log("Computer: " + computer.index); 
    
    var spanHint = document.getElementById('helpBlock');
		setInnerHTML(spanHint, computer.hint);
    
    selectElement = document.getElementById('select');
    selectElement.selectedIndex = 0;

		function resetGame () {
			selBtnSwap();
			toElement("button").removeEventListener('click', resetGame, false);
			toElement("body").classList.remove("" + computer.color);
			initGame();
		}

		document.querySelector("select")
			.addEventListener('change', function (event) {
				var userInput = event.target.value;
				compareToCom(computer, userInput);
		}); 

		document.querySelector("button")
			.addEventListener('click', resetGame, false);
	}

	function randomInteger (lessThanNum) {
		return Math.floor(Math.random() * lessThanNum);
	}
	
	function toObject (array) {
			var obj = array.reduce(function(acc, cur, i) {
				acc[i] = cur;
				return acc;
			}, {});
			return obj;
	}
	
	function compareToCom (com, user) {
		// clear the span
		clearInnerHTML(toElement("span"));		

		//display the right message in the span
		if (com.index == user) {
			toElement("body").classList.add(com.color);
			playAgain(com.winMsg);
		} else {
			var hint = (com.index > user) ? "Hint: The color has a shorter wavelength" : "Hint: The color has a longer wavelength"
			setInnerHTML(toElement("span"), hint);
		}
	}

	function playAgain (str) {
		selBtnSwap();
		setInnerHTML(toElement("h1"), str);
	}

	function toElement (str) {
		return document.querySelector(str);
	}

	function toggleHidden (element) {
		element.classList.toggle("hidden"); 
	}

	function clearInnerHTML (element) {
		if (element.innerHTML) {
			element.innerHTML = "";
		}
	}

	function setInnerHTML (element, str) {
		element.innerHTML = str;
	}

	function selBtnSwap () {
		toggleHidden( toElement("select") ); 
		toggleHidden( toElement("button") );
	}
});
