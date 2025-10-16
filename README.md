# Healthcare Symptom Checker 🩺

![Disclaimer](https://img.shields.io/badge/Disclaimer-Educational%20Purpose%20Only-yellow.svg)

This educational web app, a **Healthcare Symptom Checker**, uses a Python/Flask backend to query the Google (Gemini) LLM. Users input symptoms and receive a structured 3-part analysis:

1.  **Severity Assessment**
2.  **Probable Conditions**
3.  **Precautions & Next Steps**

The app's modern UI prominently features a medical disclaimer, emphasizing its educational-only purpose.


## Features

-   **Simple UI:** Accepts symptom descriptions via a clean web interface.
-   **Python Backend:** Uses a Flask API to process requests.
-   **LLM-Powered:** Leverages the Google Gemini API to analyze symptoms.
-   **Structured Analysis:** Displays a 3-part AI-generated response:
    -   Severity Assessment
    -   Probable Conditions
    -   Precautions & Next Steps
-   **Safety First:** Prominently displays a medical disclaimer with every analysis.

---

## Tech Stack

-   **Frontend:** HTML, CSS, Vanilla JavaScript
-   **Backend:** Python, Flask
-   **API:** Google Gemini (via `google-generativeai`)

---

## Setup and Installation

Follow these steps to run the project locally.

### 1. Prerequisites

-   Python 3.8+
-   A Google Gemini API Key.
-   VS Code with the **Live Server** extension.

### 2. Backend Setup

1.  Clone the repository and move into the `backend` folder:
    ```bash
    git clone [https://github.com/YOUR_USERNAME/Symptom-checker.git](https://github.com/YOUR_USERNAME/Symptom-checker.git)
    cd Symptom-checker/backend
    ```

2.  Create and activate a virtual environment:
    ```bash
    # Create the environment
    python -m venv venv
    
    # Activate on Windows
    .\venv\Scripts\activate
    ```

3.  Install the required packages:
    ```bash
    pip install Flask flask-cors google-generativeai python-dotenv
    ```

4.  Create a `.env` file in the `backend` folder and add your API key:
    ```
    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```

5.  Run the backend server:
    ```bash
    flask run
    ```
    The server will be running at `http://127.0.0.1:5000`. **Leave this terminal running.**

### 3. Frontend Setup

1.  In a **new** VS Code terminal, or in the VS Code explorer, navigate to the `frontend` folder.
2.  Right-click on `index.html`.
3.  Select **"Open with Live Server"**.

Your browser will open, and the application will be fully functional.
