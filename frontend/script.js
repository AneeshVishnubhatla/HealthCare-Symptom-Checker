document.getElementById('symptom-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const symptoms = document.getElementById('symptoms-input').value;
    const submitBtn = document.getElementById('submit-btn');
    const resultsContainer = document.getElementById('results-container');
    const loader = document.getElementById('loader');

    // Hide previous results and show loader
    resultsContainer.classList.add('hidden');
    loader.classList.remove('hidden');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Analyzing...';

    // Get content divs
    const disclaimerContent = document.getElementById('disclaimer-content');
    const severityContent = document.getElementById('severity-content');
    const conditionsContent = document.getElementById('conditions-content');
    const precautionsContent = document.getElementById('precautions-content');

    // Clear old content
    disclaimerContent.innerHTML = '';
    severityContent.innerHTML = '';
    conditionsContent.innerHTML = '';
    precautionsContent.innerHTML = '';

    try {
        const response = await fetch('https://symptom-checker-api.onrender.com/api/symptom_check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ symptoms: symptoms }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const rawText = data.result;

        // --- NEW PARSING LOGIC ---

        // 1. Extract Disclaimer (it's always first)
        const disclaimerMatch = rawText.match(/^(DISCLAIMER:.*?)\n\n/is);
        let remainingText = rawText;
        if (disclaimerMatch) {
            disclaimerContent.innerHTML = disclaimerMatch[1];
            remainingText = rawText.replace(disclaimerMatch[0], ''); // Remove disclaimer
        }

        // 2. Split the rest by our '###' delimiter
        const parts = remainingText.split('###').map(part => part.trim());

        if (parts.length >= 4) {
            // We strip the title (like "Severity\n") from the content
            // and replace newlines with <br> for HTML rendering
            severityContent.innerHTML = parts[1].replace('Severity', '').trim().replace(/\n/g, '<br>');
            conditionsContent.innerHTML = parts[2].replace('Probable Conditions', '').trim().replace(/\n/g, '<br>');
            precautionsContent.innerHTML = parts[3].replace('Precautions & Next Steps', '').trim().replace(/\n/g, '<br>');
        } else {
            // Fallback in case the LLM doesn't follow instructions
            console.error("Failed to parse LLM response:", parts);
            conditionsContent.innerHTML = '<p class="error">Could not parse the response from the server.</p>';
        }

        resultsContainer.classList.remove('hidden');

    } catch (error) {
        console.error('Error:', error);
        // Show error in the main card if parsing fails
        conditionsContent.innerHTML = `<p class="error">Sorry, something went wrong. Please try again later. (${error.message})</p>`;
        resultsContainer.classList.remove('hidden');
    } finally {
        // Hide loader and restore button
        loader.classList.add('hidden');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Analyze Symptoms';
    }
});
