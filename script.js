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

			const handleNoClick = () => {
				const noButton = $(".no-button");
				const yesButton = $(".yes-button");
				noButton.text(messages[messageIndex]);
				messageIndex = (messageIndex + 1) % messages.length;
				const currentSize = parseFloat(yesButton.css("font-size"));
				yesButton.css("font-size", `${currentSize * 1.5}px`);
			};

			const handleYesClick = () => {
				window.location.href = "yes.html";
			};

			$(".no-button").on("click", handleNoClick);
			$(".yes-button").on("click", handleYesClick);