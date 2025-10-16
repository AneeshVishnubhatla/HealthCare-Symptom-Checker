import os
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# --- Configuration ---
load_dotenv() 

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY environment variable not set.")

genai.configure(api_key=api_key)

# --- Use the standard, stable model name ---
# (Corrected from 'gemini-2.5-pro' to 'gemini-pro')
model = genai.GenerativeModel('gemini-2.5-pro')

# --- Flask App Initialization ---
app = Flask(__name__)
CORS(app) 

# --- LLM Prompt Template ---
# THIS SECTION IS NOW UPDATED
def create_prompt(symptoms):
    """Creates a structured prompt for the LLM."""
    prompt = f"""
    Analyze the following user-reported symptoms and provide a three-part analysis.

    **IMPORTANT SAFETY DISCLAIMER:**
    Start the response with this exact disclaimer, enclosed in a separate paragraph:
    "DISCLAIMER: This is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition."

    **User Symptoms:**
    "{symptoms}"

    **Instructions for Output:**
    Provide the response in three distinct sections, separated by '###'.

    ### Severity
    (Provide a single severity level: Low, Medium, or High. Add a 1-sentence explanation.)

    ### Probable Conditions
    (List up to three possible conditions. For each, provide a brief, 1-2 sentence easy-to-understand explanation.)

    ### Precautions & Next Steps
    (Provide a clear, scannable list of recommended precautions and next steps. This should include lifestyle advice, when to see a doctor, etc.)
    """
    return prompt

# --- API Endpoint ---
@app.route('/api/symptom_check', methods=['POST'])
def symptom_check():
    """API endpoint to process symptom checks."""
    try:
        data = request.get_json()
        symptoms = data.get('symptoms')

        if not symptoms or not isinstance(symptoms, str) or len(symptoms.strip()) == 0:
            return jsonify({"error": "Symptom input is missing or invalid."}), 400

        prompt = create_prompt(symptoms)
        response = model.generate_content(prompt)
        
        return jsonify({"result": response.text})

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An internal server error occurred."}), 500

# --- Main Entry Point ---
if __name__ == '__main__':
    app.run(debug=True, port=5000)