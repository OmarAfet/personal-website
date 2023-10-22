import ToastError from "@components/ToastError";
import ToastSuccess from "@components/ToastSuccess";

export default async function sendContact(title: string, description: string) {
	const webhookURL = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL as string;

	if (!webhookURL) {
		console.error("Webhook URL is not defined. Please check your environment variables.");
		return;
	}

	if (!title || !description) {
		return ToastError("Please fill in all the fields");
	}

	const payload = {
		embeds: [
			{
				title: title,
				description: description,
			},
		],
	};

	try {
		const response = await fetch(webhookURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			ToastError("HTTP error!");
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		ToastSuccess("Message sent successfully!");
	} catch (error) {
		ToastError("Error sending the message");
		console.error("Error sending the message:", error);
	}
}
