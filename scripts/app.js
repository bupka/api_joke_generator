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

  const api_url = `https://v2.jokeapi.dev/joke/${category}?${params.join("&")}`;

  displayLoading();

  axios
    .get(api_url)
    .then((response) => {
      setTimeout(() => {
        hideLoading();
        displayData(response.data);
      }, 150);
    })
    .catch((error) => {
      hideLoading();
      handleError(error);
    });
});

function getSelectedValue() {
  let selectElement = document.getElementById("joke-select");
  category = selectElement.value;
  console.log("Selected value: " + category);
  return category;
}

function displayData(data) {
  const joke = data.joke;
  const label = data.category;

  jokeSection.style.display = "block";

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
}

function displayLoading() {
  entryText.style.display = "none";
  jokeSection.style.display = "block";
  jokeSection.innerHTML = "<p>Loading...</p>";
}

function hideLoading() {
  jokeSection.innerHTML = "";
}

function handleError(error) {
  console.log("There was an error!", error);
  jokeSection.innerHTML =
    "<p><span>🚫</span> Failed to fetch joke.Please try again.</p>";
}
