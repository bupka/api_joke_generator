const entryText = document.getElementById("entry-text");
const jokeSection = document.getElementById("joke");

const params = [
  "blacklistFlags=nsfw,religious,racist,sexist,explicit",
  "type=single",
];

document.getElementById("load-joke").addEventListener("click", () => {
  const category = getSelectedValue();
  if (!category) {
    alert("Please select a category.");
    return;
  }

  const api_url = `https://v2.jokeapi.dev/joke/${category}/`;

  axios
    .get(api_url + params.join("&"))
    .then((response) => {
      const joke = response.data.joke;
      const label = response.data.category;
      entryText.style.display = "none";

      if (joke && joke.toLowerCase() !== "undefined") {
        jokeSection.style.display = "block";
        jokeSection.innerHTML = `
        <h3>Category: <label>${label}</label></h3>
        <p>${joke}</p>
        `;
      } else {
        jokeSection.style.display = "block";

        jokeSection.innerHTML = "<p class='emoji'>🙂</p>";
      }
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
});

function getSelectedValue() {
  let selectElement = document.getElementById("joke-select");
  category = selectElement.value;
  console.log("Selected value: " + category);
  return category;
}
