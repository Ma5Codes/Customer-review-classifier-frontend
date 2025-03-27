"use client";
import { useState } from "react";
import axios from "axios";

export default function ReviewClassifier() {
    const [review, setReview] = useState("");
    const [result, setResult] = useState(null);

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/predict/", { review });
            setResult(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-900 to-green-700">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold mb-4 text-center text-green-800">NLP Chat</h1>
                <textarea
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows="4"
                    placeholder="Enter your review..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
                <button
                    onClick={handleSubmit}
                    className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
                >
                    Analyze Review
                </button>

                {result && (
                    <div className="mt-4 p-4 border rounded-md bg-gray-50">
                        <p><strong>Sentiment:</strong> {result.sentiment}</p>
                        <p><strong>Urgency:</strong> {result.urgency}</p>
                        <p><strong>Accuracy:</strong> {result.accuracy * 100}%</p>
                        <p><strong>Precision:</strong> {result.precision * 100}%</p>
                        <p><strong>Recall:</strong> {result.recall * 100}%</p>
                    </div>
                )}
            </div>
        </div>
    );
}