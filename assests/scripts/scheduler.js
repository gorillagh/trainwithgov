// Body Parts for each day
const bodyParts = [
  { day: "Sunday", dayNo: 0, bodyParts: ["chest", "lower arms"] },
  { day: "Monday", dayNo: 1, bodyParts: ["back", "upper legs"] },
  { day: "Tuesday", dayNo: 2, bodyParts: ["cardio", "shoulders"] },
  { day: "Wednesday", dayNo: 3, bodyParts: ["lower legs", "upper arms"] },
  { day: "Thursday", dayNo: 4, bodyParts: ["waist", "neck"] },
  { day: "Friday", dayNo: 5, bodyParts: ["upper legs", "lower arms"] },
  { day: "Saturday", dayNo: 6, bodyParts: ["chest", "cardio"] },
];

// Use this to fetch the day's motivational message
const motivationUrl =
  "https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?token=ipworld.info";
const motivationOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "9add06182cmsh7b7afe3fa9a35a7p12b8aajsn65c82aba9ede",
    "x-rapidapi-host":
      "quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com",
  },
};

// Fetch exercises for the day
const getExercisesForBodyPart = (bodyPart) => {
  const workoutUrl = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`;
  const workoutOptions = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "9add06182cmsh7b7afe3fa9a35a7p12b8aajsn65c82aba9ede",
      "x-rapidapi-host": "exercisedb.p.rapidapi.com",
    },
  };

  return fetch(workoutUrl, workoutOptions)
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching exercises:", error));
};

// Function to populate motivational message
const displayMotivationalMessage = () => {
  fetch(motivationUrl, motivationOptions)
    .then((response) => response.json())
    .then((data) => {
      const motivationalMessage = document.querySelector(
        ".motivational-message"
      );
      const motivationAuthor = document.querySelector(".motivation-author");
      motivationalMessage.textContent = data.text || "Stay motivated!";
      motivationAuthor.textContent = data.author || "Governor";
    })
    .catch((error) =>
      console.error("Error fetching motivational message:", error)
    );
};

// Function to display user details
const displayUserDetails = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  if (!userDetails) {
    window.location.href = "index.html"; // Redirect if no user data
    return;
  }

  const userDetailsElement = document.getElementById("user-details");
  userDetailsElement.textContent = `${userDetails.name}, your goal is ${userDetails.fitnessGoal}`;
};

// Function to load workouts for today
const loadWorkoutForToday = (selectedDayNo) => {
  const todayBodyParts = bodyParts.find(
    (dayObj) => dayObj.dayNo === selectedDayNo
  ).bodyParts;
  const exerciseList = document.getElementById("exercise-list");
  exerciseList.innerHTML = ""; // Clear the current exercise list

  todayBodyParts.forEach(async (part) => {
    document.getElementById("loading-ui").classList.add("loading");

    try {
      const exercises = await getExercisesForBodyPart(part);
      exercises.slice(0, 5).forEach((exercise) => {
        const exerciseElement = document.createElement("p");
        exerciseElement.textContent = exercise.name;
        exerciseElement.addEventListener("click", () =>
          openExerciseModal(exercise)
        );
        exerciseList.appendChild(exerciseElement);
      });
    } catch (error) {
      console.log(error);
    } finally {
      document.getElementById("loading-ui").classList.remove("loading");
    }
  });
};

// Function to update workouts on dropdown change
const handleDayChange = (event) => {
  const selectedDayNo = parseInt(event.target.value, 10);
  loadWorkoutForToday(selectedDayNo);
};

// Open modal with exercise details
const openExerciseModal = (exercise) => {
  const modal = document.getElementById("exercise-modal");
  document.getElementById("modal-exercise-name").textContent = exercise.name;
  document.getElementById("modal-exercise-image").src =
    exercise.gifUrl || "placeholder-image.jpg";
  document.getElementById("modal-exercise-description").textContent =
    exercise.description || "No description available";
  document.getElementById("modal-exercise-steps").innerHTML =
    exercise.instructions
      ? exercise.instructions.map((step) => `<li>${step}</li>`).join("")
      : "<li>No steps available</li>";

  modal.style.display = "block"; // Show modal
};

// Close the exercise modal
const closeExerciseModal = () => {
  const modal = document.getElementById("exercise-modal");
  modal.style.display = "none"; // Hide modal
};

// Initialize the workout page
const initializePage = () => {
  displayUserDetails(); // Display user details
  displayMotivationalMessage(); // Display motivational message

  // Set today's date and load workouts
  const today = new Date();
  const todayDayNo = today.getDay();
  document.getElementById("day-of-week").textContent = bodyParts.find(
    (dayObj) => dayObj.dayNo === todayDayNo
  ).day;
  loadWorkoutForToday(todayDayNo);

  // Set event listener for dropdown change
  const daySelector = document.getElementById("workout-day");
  daySelector.value = todayDayNo; // Set dropdown to today
  daySelector.addEventListener("change", handleDayChange);

  // Close modal on click
  document
    .querySelector(".close")
    .addEventListener("click", closeExerciseModal);

  document.getElementById("main-content").classList.remove("hidden");
};

// On page load
document.addEventListener("DOMContentLoaded", initializePage);
