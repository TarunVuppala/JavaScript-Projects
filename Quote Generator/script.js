const url = "https://api.quotable.io/quotes/random";
const input = document.querySelector("#tag");
const quote = document.querySelector("#quote-box #quote");
const author = document.querySelector("#quote-box #author");
const btn = document.querySelector(".next");

btn.addEventListener("click", () => {
    getQuote();
});

const getQuote = async () => {
    let tag = "";
    if (input.value !== "") {
        tag = `?tags=${input.value}`;
    }
    input.value = "";
    console.log(url + tag);

    const response = await fetch(url + tag);
    const data = await response.json();
    
    quote.innerText = data[0].content;
    author.innerText = `~${data[0].author}`;
};

getQuote();