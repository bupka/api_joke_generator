const entryText = document.getElementById("entry-text");
const jokeSection = document.getElementById("joke");

const api_url = "https://v2.jokeapi.dev/joke/Programming/";

const params = [
  "blacklistFlags=nsfw,religious,racist",
  "type=single",
  "idRange=0-100",
];

document.getElementById("load-joke").addEventListener("click", () => {
  axios
    .get(api_url + params.join("&"))
    .then((response) => {
      const joke = response.data.joke;
      entryText.style.display = "none";

      let jokeText = jokeSection.querySelector("p");
      if (!jokeText) {
        jokeText = document.createElement("p");
        jokeSection.appendChild(jokeText);
      }

      if (joke && joke.toLowerCase() !== "undefined") {
        jokeText.innerHTML = joke;
      } else {
        jokeText.innerHTML = "🙂";
      }
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
});
