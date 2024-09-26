const sampleData = {
  meals: [
    {
      id: 716432,
      imageType: "jpg",
      title: "Finger Foods: Frittata Muffins",
      readyInMinutes: 45,
      servings: 1,
      sourceUrl: "https://spoonacular.com/finger-foods-frittata-muffins-716432",
    },
    {
      id: 663050,
      imageType: "jpg",
      title: "Tex-Mex Burger",
      readyInMinutes: 15,
      servings: 4,
      sourceUrl: "https://spoonacular.com/tex-mex-burger-663050",
    },
    {
      id: 634882,
      imageType: "jpg",
      title: "Best Breakfast Burrito",
      readyInMinutes: 45,
      servings: 4,
      sourceUrl: "https://spoonacular.com/best-breakfast-burrito-634882",
    },
  ],
  nutrients: {
    calories: 2498.87,
    protein: 131.45,
    fat: 155.8,
    carbohydrates: 143.18,
  },
};

// Function to redirect if no user details are found
function redirectToHome() {
  window.location.href = "./index.htmle ";
}

// Function to fetch and display the user's details
async function loadUserDetails() {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  console.log(userDetails);
  if (!userDetails) {
    redirectToHome();
  } else {
    // Display user details on the page
    document.getElementById("dietary-restrictions").value =
      userDetails.dietRestrictions || "";
    document.getElementById("dietary-omissions").value =
      userDetails.dietOmissions || "";
    document.getElementById("calories-perday").value =
      userDetails.caloriesPerday || "";

    // Display current day of the week
    const dayOfWeek = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    });
    document.getElementById("day-of-week").textContent = dayOfWeek;
    await fetchMealPlan(
      userDetails.caloriesPerday || "",
      userDetails.dietRestrictions || "",
      userDetails.dietOmissions || ""
    );
  }
}

// Function to fetch meal suggestions based on dietary goal and restrictions
const myHeaders = new Headers();
myHeaders.append(
  "x-apihub-key",
  "Pw12mfkjaZdolhFGFnGCG2RjVc-TjGRCq6md7RtxxCRm0ZDZwR"
);
myHeaders.append("x-apihub-host", "Spoonacular-API.allthingsdev.co");
myHeaders.append("x-apihub-endpoint", "27c75713-e0da-4b09-8c17-69dcc1a1692a");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};
async function fetchMealPlan(caloriesPerday, dietRestrictions, dietOmissions) {
  console.log(caloriesPerday, dietRestrictions, dietOmissions);
  const apiUrl = `https://Spoonacular-API.proxy-production.allthingsdev.co/mealplanner/generate?timeFrame=day&targetCalories=${caloriesPerday}&diet=${dietRestrictions}&exclude=${dietOmissions}`;

  try {
    // const response = await fetch(apiUrl, requestOptions);
    // const data = await response.json();
    // console.log("data-->", data);
    // if (data.meals && data.meals.length > 0) {
    //   displayMealPlan(data.meals, data.nutrients);
    // } else {
    //   console.error("No meals found");
    // }

    if (sampleData.meals && sampleData.meals.length > 0) {
      displayMealPlan(sampleData.meals, sampleData.nutrients);
    } else {
      console.error("No meals found");
    }
  } catch (error) {
    console.error("Error fetching meal plan:", error);
  }
}

// Function to display fetched meal plan
function displayMealPlan(meals, nutrients) {
  const mealPlanDiv = document.getElementById("meal-plan");
  mealPlanDiv.innerHTML = ""; // Clear previous meals

  // Loop through meals and display them
  meals.forEach((meal, index) => {
    const mealContainer = document.createElement("div");
    mealContainer.classList.add("meal-item");

    const mealTitle = document.createElement("h4");
    mealTitle.textContent = `${meal.title}`;
    mealContainer.appendChild(mealTitle);

    const detailsLink = document.createElement("a");
    detailsLink.setAttribute("href", meal.sourceUrl);
    detailsLink.setAttribute("target", "_blank");
    detailsLink.textContent = `View details`;
    mealContainer.appendChild(detailsLink);

    const description = document.createElement("p");
    description.textContent = `Ready in ${meal.readyInMinutes} minutes`;
    mealContainer.appendChild(description);

    mealPlanDiv.appendChild(mealContainer);
  });
}

document.getElementById("sign-out").addEventListener("click", () => {
  localStorage.removeItem("userDetails");
  window.location.href = "./index.html";
});

// Event listener for the preferences form submission
document.getElementById("preferences-form").addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission

  // Fetch user preferences from the form
  const dietRestrictions = document.getElementById(
    "dietary-restrictions"
  ).value;
  const dietOmissions = document.getElementById("dietary-omissions").value;
  const caloriesPerday = document.getElementById("calories-perday").value;

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  localStorage.setItem(
    "userDetails",
    JSON.stringify({
      ...userDetails,
      caloriesPerday,
      dietOmissions,
      dietRestrictions,
    })
  );

  // Fetch the meal plan based on the user's preferences
  fetchMealPlan(caloriesPerday, dietRestrictions, dietOmissions);
});


// Load weekly meal plan
document.getElementById("weekly-meal").addEventListener("click", async()=>{
  const userDetails = await JSON.parse(localStorage.getItem("userDetails"));
  console.log(await userDetails);
  const response = await fetch(`https://Spoonacular-API.proxy-production.allthingsdev.co/mealplanner/generate?timeFrame=week&targetCalories=${await userDetails.caloriesPerday||""}&diet=${await userDetails.dietRestrictions||""}&exclude=${await userDetails.dietOmissions||""}`,
     requestOptions)
  const result = await response.json()
  console.log(result);
  // const weekMealPlan = await
})

// Load user details on page load
document.addEventListener("DOMContentLoaded", loadUserDetails);
