let speedTypingTestEl = document.getElementById("speedTypingTest");
let timerEl = document.getElementById("timer");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let resultEl = document.getElementById("result");
let quoteInputEl = document.getElementById("quoteInput");
let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");
let spinnerEl = document.getElementById("spinner");

let counter = 0;
spinnerEl.classList.toggle("d-none");

function startCounting() {
    counter += 1;
    timerEl.textContent = counter;
    console.log(counter);
}
let counterVal = setInterval(startCounting, 1000); //call back function it sets interval to timer
function getQuotation() {
    let options = {
        method: "GET",
    };
    fetch("https://apis.ccbp.in/random-quote", options)
        .then(function(response) {
            return response.json();
        })
        .then(function(JsonData) {
            spinnerEl.classList.add("d-none");
            console.log(JsonData);
            console.log(typeof(JsonData));
            let quote = JsonData.content;
            quoteDisplayEl.textContent = quote;
            console.log(typeof(quote));

        });
}

getQuotation();
startCounting();
resetBtnEl.onclick = function() {
    spinnerEl.classList.remove("d-none");
    getQuotation();
    startCounting();
    counter = 0;
    timerEl.textContent=counter;
    resultEl.textContent = "";
    quoteInputEl.textContent = "";
};
submitBtnEl.onclick = function() {
    if (quoteInputEl.value === quoteDisplayEl.textContent) {
        clearInterval(counterVal); //counter value is unique id of setInterval
        resultEl.textContent = "Congratulations you typed in " + counter + "seconds";
        resultEl.style.color = "green";
        resultEl.style.fontWeight = "500";
    } else if (quoteInputEl.value === "") {
        resultEl.textContent = "enter the text";
        resultEl.style.color = "red";
        resultEl.style.fontWeight = "500";
    } else {
        resultEl.textContent = "  you typed incorrect sentence";
        resultEl.style.color = "red";
        resultEl.style.fontWeight = "500";
    }
};