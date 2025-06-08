// assetCodeWorker.js

let allCodes = [];

// Listen for messages from the main thread
self.onmessage = function(e) {
    const { type, data } = e.data;

    if (type === 'initCodes') {
        // Initialize the list of all codes
        allCodes = data;
    } else if (type === 'filterCodes') {
        const { typed, MAX_SUGGESTIONS } = data;

        if (!typed) {
            // Send back an empty array if no input
            self.postMessage({ type: 'filteredCodes', codes: [] });
            return;
        }

        const matched = allCodes.filter(code => code.toLowerCase().includes(typed.toLowerCase()));
        const suggestions = matched.slice(0, MAX_SUGGESTIONS);

        // Send the filtered codes back to the main thread
        self.postMessage({ type: 'filteredCodes', codes: suggestions });
    }
};