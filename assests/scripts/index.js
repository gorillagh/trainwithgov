// Array of motivational quotes (or you can fetch from an API if preferred)
const motivationalQuotes = [
  "Push yourself, because no one else is going to do it for you.",
  "Success doesn’t come from what you do occasionally, it comes from what you do consistently.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "It’s not about having time, it’s about making time.",
];

// Function to fetch a random motivational quote
function fetchDailyMotivation() {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
}

// Display the daily motivation in the header (or anywhere you'd like)
function displayDailyMotivation() {
  const motivationElement = document.querySelector(".motivational-message");
  const todayMotivation = fetchDailyMotivation();
  motivationElement.textContent = `"${todayMotivation}"`;
}

// Check if user data exists in localStorage
function checkUserInLocalStorage() {
  const userInfo = localStorage.getItem("userDetails");

  if (userInfo && userInfo !== "null") {
    // If user info exists, redirect to scheduler page
    window.location.href = "./scheduler.html";
  } else {
    // If no user info, display the form (no action needed because the form is already visible by default)
    console.log("No user information found. Form remains visible.");
  }
}

// Function to validate form fields
function validateFormData(formData) {
  const { name, email, age, gender, fitnessGoal, dietaryGoal } = formData;

  // Basic validation
  if (!name || !email || !age || !gender || !fitnessGoal || !dietaryGoal) {
    alert("All fields are required!");
    return false;
  }
  return true;
}

// Function to store user data in localStorage and redirect
function handleFormSubmission(event) {
  event.preventDefault();
  document.getElementById("loading-ui").classList.add("loading");

  // Grab user data from form
  const userDetails = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
    dietaryGoal: document.getElementById("dietary-goals").value,
    fitnessGoal: document.getElementById("fitness-goals").value,
  };

  // Validate form data
  if (validateFormData(userDetails)) {
    // Save user data in localStorage
    localStorage.setItem(
      "userDetails",
      JSON.stringify({
        ...userDetails,
        caloriesPerday:
          userDetails.dietaryGoal === "weight-loss"
            ? 1500
            : userDetails.dietaryGoal === "weight-gain"
            ? 2500
            : 2000,
        dietOmissions: "",
        dietRestrictions: "",
      })
    );
    document.getElementById("loading-ui").classList.remove("loading");

    // Redirect to scheduler page
    window.location.href = "./scheduler.html";
  }
}

// Event listeners to initialize functionality
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loading-ui").classList.add("loading");
  // Check if user is already stored
  checkUserInLocalStorage();

  // Display daily motivation
  displayDailyMotivation();

  // Add event listener for form submission
  const form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubmission);

  document.getElementById("main-content").classList.remove("hidden");
  document.getElementById("loading-ui").classList.remove("loading");
});
