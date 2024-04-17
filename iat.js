document.addEventListener('DOMContentLoaded', function() {
    let currentQuestionIndex = 0;
    let startTime;
    const questions = [
        {
            prompt: "As an investor, which surnames do you most associate with the world of finance and money?",
            options: ["Johnson", "Rosenthal", "Applebaum", "Robson", "Smith", "Schwartz", "Franklin", "Madoff", "Kaufman", "Brown"],
            responses: [],
            instruction: "Press E if you associate this surname with finance, I if not."
        },
        {
            prompt: "Which surnames do you associate with prioritizing their own profits, possibly at the expense of clients?",
            options: ["Johnson", "Rosenthal", "Applebaum", "Robson", "Smith", "Schwartz", "Franklin", "Madoff", "Kaufman", "Brown"],
            responses: [],
            instruction: "Press E if you associate this surname with prioritizing profits, I if not."
        },
        {
            prompt: "Select “E” if you consider the surname Jewish and “I” otherwise.",
            options: ["Madoff", "Robson", "Eckstein", "Smith", "Rosenthal", "Johnson", "Applebaum", "Franklin", "Roth", "Brown", "Kaufman", "Reed", "Schwartz", "Wiley", "Solomon", "Davis", "Wildstein", "Thomas", "Hoffman", "Whitaker"],
            responses: [],
            instruction: "Press E if Jewish, I otherwise."
        }
    ];

    function displayInitialPrompt() {
        const question = questions[currentQuestionIndex];
        document.getElementById('question').textContent = question.prompt;
        document.getElementById('stimulus').textContent = "XXX";
        document.getElementById('instructions').textContent = "Press E or I to start the test.";
    }

    function displayQuestion() {
        const question = questions[currentQuestionIndex];
        document.getElementById('question').textContent = question.prompt;
        document.getElementById('instructions').textContent = question.instruction;
        question.currentOptionIndex = 0; // Reset the index for the current question
        displayStimulus();
    }

    function displayStimulus() {
        const question = questions[currentQuestionIndex];
        if (question.currentOptionIndex < question.options.length) {
            document.getElementById('stimulus').textContent = question.options[question.currentOptionIndex];
            startTime = new Date();
        } else {
            displayTransition();
        }
    }

    function displayTransition() {
        document.getElementById('stimulus').textContent = "Preparing next question...";
        document.getElementById('instructions').textContent = "";
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                displayInitialPrompt(); // Display the initial prompt for the next question
            } else {
                endTest();
            }
        }, 3000); // Delay for 3 seconds before moving to the next question
    }

    function endTest() {
        document.getElementById('question').textContent = "Test completed. Thank you!";
        document.getElementById('stimulus').textContent = '';
        document.getElementById('instructions').textContent = '';
        console.log('All responses:', questions.map(q => q.responses));
    }

    function startTest() {
        displayQuestion(); // Starts the current question's surnames sequence
    }

    document.addEventListener('keydown', function(event) {
        if (event.key.toLowerCase() === "e" || event.key.toLowerCase() === "i") {
            if (document.getElementById('instructions').textContent.includes("Press E or I to start")) {
                startTest();
            } else {
                const response = event.key.toUpperCase();
                recordResponse(response);
            }
        }
    });

    function recordResponse(response) {
        const endTime = new Date();
        const reactionTime = endTime - startTime;
        const question = questions[currentQuestionIndex];
        const option = question.options[question.currentOptionIndex];
        question.responses.push({ option, response, reactionTime });
        console.log(`Recorded: ${option} - ${response} - Reaction Time: ${reactionTime} ms`);
        question.currentOptionIndex++;
        displayStimulus();
    }

    displayInitialPrompt(); // Initial call to display the first prompt
});
