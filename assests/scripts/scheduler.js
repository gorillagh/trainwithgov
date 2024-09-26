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

const sampleExercises = [
  {
    bodyPart: "lower legs",
    equipment: "body weight",
    gifUrl: "https://v2.exercisedb.io/image/peO4JOGkf-74kf",
    id: "1368",
    name: "ankle circles",
    target: "calves",
    secondaryMuscles: ["ankle stabilizers"],
    instructions: [
      "Sit on the ground with your legs extended in front of you.",
      "Lift one leg off the ground and rotate your ankle in a circular motion.",
      "Perform the desired number of circles in one direction, then switch to the other direction.",
      "Repeat with the other leg.",
    ],
  },
  {
    bodyPart: "lower legs",
    equipment: "assisted",
    gifUrl: "https://v2.exercisedb.io/image/N8pxfxRmrCwfBa",
    id: "1708",
    name: "assisted lying calves stretch",
    target: "calves",
    secondaryMuscles: ["hamstrings"],
    instructions: [
      "Lie on your back with your legs extended.",
      "Bend one knee and place your foot flat on the ground.",
      "Using your hands or a towel, gently pull your toes towards your body, feeling a stretch in your calf.",
      "Hold the stretch for 20-30 seconds.",
      "Release the stretch and repeat on the other leg.",
    ],
  },
  {
    bodyPart: "lower legs",
    equipment: "band",
    gifUrl: "https://v2.exercisedb.io/image/qcBP4OZ0KDMVuQ",
    id: "0999",
    name: "band single leg calf raise",
    target: "calves",
    secondaryMuscles: ["ankles", "feet"],
    instructions: [
      "Stand with your feet hip-width apart and place the band around the ball of your left foot.",
      "Hold onto a stable object for balance if needed.",
      "Slowly raise your left heel off the ground, lifting your body weight onto the ball of your foot.",
      "Pause for a moment at the top, then slowly lower your left heel back down to the starting position.",
      "Repeat for the desired number of repetitions, then switch to the right leg.",
    ],
  },
  {
    bodyPart: "lower legs",
    equipment: "band",
    gifUrl: "https://v2.exercisedb.io/image/nMR6GNr2pdRvY1",
    id: "1000",
    name: "band single leg reverse calf raise",
    target: "calves",
    secondaryMuscles: ["hamstrings", "glutes"],
    instructions: [
      "Stand with your feet hip-width apart and place the band around the ball of your foot.",
      "Hold onto a stable object for balance.",
      "Slowly raise your heel off the ground, lifting your body weight onto the ball of your foot.",
      "Pause for a moment at the top, then slowly lower your heel back down to the starting position.",
      "Repeat for the desired number of repetitions, then switch to the other leg.",
    ],
  },
  {
    bodyPart: "lower legs",
    equipment: "band",
    gifUrl: "https://v2.exercisedb.io/image/yLZZL3l3F0bxaH",
    id: "1369",
    name: "band two legs calf raise - (band under both legs) v. 2",
    target: "calves",
    secondaryMuscles: ["ankles", "feet"],
    instructions: [
      "Stand with your feet shoulder-width apart and place a resistance band under both feet.",
      "Hold the ends of the band with your hands for stability.",
      "Raise your heels off the ground as high as possible, using your calves.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions.",
    ],
  },
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
const getExercisesForBodyPart = async (bodyPart) => {
  const workoutUrl = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`;
  const workoutOptions = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "9add06182cmsh7b7afe3fa9a35a7p12b8aajsn65c82aba9ede",
      "x-rapidapi-host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(workoutUrl, workoutOptions);
    return await response.json();
  } catch (error) {
    return console.error("Error fetching exercises:", error);
  }
};

// Function to populate motivational message
const displayMotivationalMessage = async () => {
  try {
    const response = await fetch(motivationUrl, motivationOptions);
    const data = await response.json();

    const motivationalMessage = document.querySelector(".motivational-message");
    const motivationAuthor = document.querySelector(".motivation-author");
    motivationalMessage.textContent = data.text || "Stay motivated!";
    motivationAuthor.textContent = data.author || "Governor";
  } catch (error) {
    console.error("Error fetching motivational message:", error);
  }
};

// Function to display user details
const displayUserDetails = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  if (!userDetails) {
    window.location.href = "./index.html"; // Redirect if no user data
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
      // const exercises = await getExercisesForBodyPart(part);
      // exercises.slice(0, 5).forEach((exercise) => {
      sampleExercises.forEach((exercise) => {
        const exerciseCard = document.createElement("div");

        const exerciseImage = document.createElement("img");
        exerciseImage.src = exercise.gifUrl;

        const exerciseTextContainer = document.createElement("div");
        const exerciseTitle = document.createElement("h4");
        exerciseTitle.textContent = exercise.name;
        const exerciseBodyPart = document.createElement("p");
        exerciseBodyPart.textContent = exercise.bodyPart;

        exerciseTextContainer.appendChild(exerciseTitle);
        exerciseTextContainer.appendChild(exerciseBodyPart);

        exerciseCard.appendChild(exerciseImage);
        exerciseCard.appendChild(exerciseTextContainer);

        exerciseCard.classList.add("exercise-card");

        exerciseCard.addEventListener("click", () =>
          openExerciseModal(exercise)
        );
        exerciseList.appendChild(exerciseCard);
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

//Sign out function
const signOut = () => {
  localStorage.removeItem("userDetails");
  window.location.href = "./index.html";
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

  document.querySelector("#sign-out").addEventListener("click", signOut);

  document.getElementById("main-content").classList.remove("hidden");
};

// On page load
document.addEventListener("DOMContentLoaded", initializePage);

const completedExercises = document.getElementById("completed-exercises");
const progressBar = document.querySelector(".progress");
const progressPercentage = document.querySelector(".progress-percentage");

const updateProgress = (completed, total) => {
  const progress = (completed / total) * 100;
  progressBar.style.width = `${progress}%`;
  progressPercentage.textContent = `${Math.round(progress)}% Complete`;
};

// Example: 3 exercises completed out of 5
updateProgress(1, 5);
