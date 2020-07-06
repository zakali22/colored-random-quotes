const body = document.querySelector('body')
const section = document.querySelector('.slide-content')
const footerBtns = document.querySelectorAll('footer img')
const authorEl = document.querySelector('.slide-content__author')
const quoteEl = document.querySelector('.slide-content__quote')

// Quote variables
let quotes;
let currQuotePos = 0;
let currQuote;

// Fetch quotes
const fetchQuotes = () => {
    return fetch('https://type.fit/api/quotes')
        .then(response => {
            return response.json();
        })
        .then(data => {
            const dataArr = data.splice(0, 50)
            quotes = dataArr
        })
}

// Adding click handler on the buttons
footerBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        const direction = event.target.dataset.direction;
        if(direction === 'prev'){
            if(currQuotePos > 0){
                currQuotePos--;
                currQuote = quotes[currQuotePos]
                updateSlideContent()
                console.log(currQuote)
            }
        } else if(direction === 'next'){
            if(currQuotePos <= quotes.length-1){
                currQuotePos++;
                currQuote = quotes[currQuotePos]
                updateSlideContent()
                console.log(currQuote)
            }
        } else {
            const randomPos = randomNum(0, 50)
            currQuote = quotes[randomPos]
            updateSlideContent()
            console.log(currQuote)
            console.log("Pos: " + randomPos)
        }
    })
})

// Randomise helper function
const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Update content helper function
const updateSlideContent = () => {
    authorEl.innerHTML = currQuote.author ? currQuote.author : 'Someone wise';
    quoteEl.innerHTML = currQuote.text;
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM is loaded')
    fetchQuotes().then(response => {
        console.log(quotes)
    });
})