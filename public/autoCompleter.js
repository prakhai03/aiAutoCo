const OPENROUTER_API_KEY = '';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
async function getAutoComplete(context) {
    try {
        const response = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'HTTP-Referer': window.location.origin,
                'X-Title': 'aiAutoCo',
            },
            body: JSON.stringify({
                model: 'google/gemini-2.0-flash-lite-preview-02-05:free',
                messages: [
                    {
                        role: 'system',
                        content: "You are an autocomplete suggester. Your sole purpose is to provide a single, concise character or a couple of words that completes the user's input.  You MUST only provide the completion; do not include any introductory phrases, explanations, or extraneous characters. Consider the context provided by the user and suggest the most likely or reasonable completion, prioritizing punctuation when applicable (e.g., '?', '!').  If the user's input is already complete, return nothing "

                    },
                    {
                        role: 'user',
                        content: `Given this context, provide a completion: ${context}`
                    }
                ],
                temperature: 0.7,
                max_tokens: 100,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text(); // Get error details from the server
            throw new Error(`API call failed: ${response.status} - ${response.statusText} - ${errorText}`); // Include more details
        }

        const data = await response.json();
        console.log("API Response:", data.choices[0].message.content); // Log the response

        if (data && data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
            return data.choices[0].message.content;
        } else {
            console.error("Unexpected API response format:", data); // Log the unexpected format
            return null; // Or return a default value, or throw an error
        }

    } catch (error) {
        console.error('Error getting autocomplete:', error);
        throw error; // Re-throw the error so it can be handled in the calling function
    }
}