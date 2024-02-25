// Function to handle profile form submission
function updateProfile() {
  const form = document.getElementById("profileForm");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const location = formData.get("location");

    // Send POST request to backend for profile update
    try {
      const response = await fetch("/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, location }),
      });

      if (response.ok) {
        alert("Profile updated successfully");
        // You can optionally reload the page or update the UI with the new profile information
      } else {
        const errorMessage = await response.text();
        alert(errorMessage); // Display error message
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred. Please try again later."); // Display generic error message
    }
  });
}

// Function to handle posting comments
function postComment() {
  const form = document.getElementById("commentForm");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const comment = formData.get("comment");

    // Send POST request to backend for posting comment
    try {
      const response = await fetch("/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment }),
      });

      if (response.ok) {
        alert("Comment posted successfully");
        // You can optionally reload the page or update the UI to display the new comment
      } else {
        const errorMessage = await response.text();
        alert(errorMessage); // Display error message
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("An error occurred. Please try again later."); // Display generic error message
    }
  });
}

// Function to initialize JavaScript functionality
function init() {
  updateProfile(); // Handle profile form
  postComment(); // Handle comment form
}

// Initialize JavaScript functionality when the DOM is loaded
document.addEventListener("DOMContentLoaded", init);
