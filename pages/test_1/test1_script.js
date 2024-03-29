// Define a variable to keep track of the current email index
var currentEmail = 1;
console.log("line3");

// Define an array to keep track of the user's answers
var answers = [];

// Define a function to embed the next email
function nextEmail() {

    // Get the value of the selected radio button
    var selectedValue = document.querySelector('input[name="phishing"]:checked');

    if (!selectedValue) {
        alert("Please select an option");
        return;
    }

    selectedValue = selectedValue.value;
    // Calculate the time spent on the question
    var timeSpent = Date.now() - questionStart;

    // Check if the selected value matches the answer for the current email
    if ((selectedValue === "phishing" && currentEmail === 1) || // email_60
        (selectedValue === "phishing" && currentEmail === 2) || // email_73
        (selectedValue === "non-phishing" && currentEmail === 3) || // email_35
        (selectedValue === "phishing" && currentEmail === 4) || // email_51
        (selectedValue === "non-phishing" && currentEmail === 5) || // email_48
        (selectedValue === "phishing" && currentEmail === 6) || // email_58
        (selectedValue === "phishing" && currentEmail === 7) || // email 63
        (selectedValue === "non-phishing" && currentEmail === 8) // email_67
    ) {
        answers.push(currentEmail + " -> Correct -> Time: " + timeSpent / 1000 + " seconds");

    } else {
        answers.push(currentEmail + " -> Wrong -> Time: " + timeSpent / 1000 + " seconds");

    }

    // Clear radio button values
    var ele = document.querySelectorAll("input[type=radio]");
    for (var i = 0; i < ele.length; i++) {
        ele[i].checked = false;
    }

    if (currentEmail == 8) {
        console.log("heree! line 46");
        // Display the user's results when they reach the end of the emails
        testTimeSpent = Date.now() - testStart;
        answers.push("Quiz Complete. Total time spent: " + testTimeSpent / 1000 + " seconds");
        alert(answers.join("\n"));

        //send the result to database
        jsonString = JSON.stringify(answers.join("\n"));
        let xhr = new XMLHttpRequest();

        xhr.open('POST', "/Back-end/save_test1_res.php", true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(jsonString);

    } else {
        currentEmail++;
    }

    // Find the email container element
    var container = document.getElementById("email-container");

    // Remove the previous iframe element from the container, if any
    container.innerHTML = "";

    // Create an iframe element to embed the email HTML file
    var iframe = document.createElement("iframe");
    iframe.src = "email_test1/email_" + currentEmail + ".html";

    // Add the iframe element to the container
    container.appendChild(iframe);

    // Record the start time for the next question
    questionStart = Date.now();
}

// Embed the first email on page load
// Find the email container element
var container = document.getElementById("email-container");

// Remove the previous iframe element from the container, if any
container.innerHTML = "";

// Create an iframe element to embed the email HTML file
var iframe = document.createElement("iframe");
iframe.src = "email_test1/email_1.html";

// Add the iframe element to the container
container.appendChild(iframe);

// Record the start time for the first question
var questionStart = Date.now();

// Record the start time for the test
var testStart = Date.now();