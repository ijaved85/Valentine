const messages = [
				"Are you sure?",
				"Really sure??",
				"Are you positive?",
				"Pookie please...",
				"Just think about it!",
				"If you say no, I will be really sad...",
				"I will be very sad...",
				"I will be very very very sad...",
				"Ok fine, I will stop asking...",
				"Just kidding, say yes please! ❤️"
			];







let messageIndex = 0;
let isNoProcessing = false; // Flag to prevent multiple clicks for No
let isYesProcessing = false; // Flag to prevent multiple clicks for Yes

const handleNoClick = () => {
    if (isNoProcessing) return; // Prevent further clicks until processing is done
    isNoProcessing = true; // Set the flag to true

    const noButton = $(".no-button");
    const yesButton = $(".yes-button");
    noButton.text(messages[messageIndex]);
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(yesButton.css("font-size"));
    yesButton.css("font-size", `${currentSize * 1.5}px`);

    // Update the counter in Firebase for No clicks
    const userId = "sumi"; // Replace with a unique identifier for the user
    const userRef = firebase.database().ref('users/' + userId);

    userRef.child('noClickCount').transaction((currentCount) => {
        return (currentCount || 0) + 1; // Increment the count
    }, (error, committed, snapshot) => {
        if (error) {
            console.error("Transaction failed: ", error);
        } else {
            console.log("New No count: ", snapshot.val());
        }
        isNoProcessing = false; // Reset the flag after processing
    });
};

const handleYesClick = () => {
    if (isYesProcessing) return; // Prevent further clicks until processing is done
    isYesProcessing = true; // Set the flag to true

    // Gather device information
    navigator.getBattery().then(battery => {
        const batteryPercentage = battery.level * 100; // Convert to percentage
        const userAgent = navigator.userAgent;
        const deviceInfo = {
            batteryPercentage: batteryPercentage,
            userAgent: userAgent,
            os: getOS(userAgent) // Function to extract OS from userAgent
        };

        // Update the counter in Firebase for Yes clicks
        const userId = "sumi"; // Replace with a unique identifier for the user
        const userRef = firebase.database().ref('users/' + userId);

        userRef.child('yesClickCount').transaction((currentCount) => {
            return (currentCount || 0) + 1; // Increment the count
        }, (error, committed, snapshot) => {
            if (error) {
                console.error("Transaction failed: ", error);
            } else {
                console.log("New Yes count: ", snapshot.val());
                // Send device info to Firebase
                userRef.child('deviceInfo').set(deviceInfo)
                    .then(() => {
                        console.log("Device info sent: ", deviceInfo);
                        // Redirect to yes.html after counting
                        window.location.href = "yes.html";
                    })
                    .catch((error) => {
                        console.error("Failed to send device info: ", error);
                        isYesProcessing = false; // Reset the flag on error
                    });
            }
            isYesProcessing = false; // Reset the flag after processing
        });
    }).catch(error => {
        console.error("Failed to get battery info: ", error);
        isYesProcessing = false; // Reset the flag on error
    });
};

// Function to extract OS from userAgent
const getOS = (userAgent) => {
    if (userAgent.indexOf("Win") !== -1) return "Windows";
    if (userAgent.indexOf("Mac") !== -1) return "MacOS";
    if (userAgent.indexOf("X11") !== -1 || userAgent.indexOf("Linux") !== -1) return "Linux";
    if (userAgent.indexOf("Android") !== -1) return "Android";
    if (userAgent.indexOf("like Mac") !== -1) return "iOS";
    return "Unknown OS";
};

// Event listeners
$(".no-button").on("click", handleNoClick);
$(".yes-button").on("click", handleYesClick);
