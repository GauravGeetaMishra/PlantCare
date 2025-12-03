import React, { useState } from "react";
import axios from "axios";

function Ask() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [showResponse, setShowResponse] = useState(false);

  const handleSubmit = async () => {
    if (!question.trim()) return;

    try {
      const res = await axios.post("http://localhost:8080/api/qna/ask", {
        question: question
      });

      // Handle different response formats
      let answer;
      if (typeof res.data === 'string') {
        answer = res.data;
      } else if (res.data?.candidates) {
        answer = res.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response text found";
      } else {
        // Fallback for other object structures to prevent crash
        answer = JSON.stringify(res.data);
      }
      
      setResponse(answer);
      setShowResponse(true);
    } catch (error) {
      setResponse("Error fetching response from server");
      setShowResponse(true);
    }
  };

  return (
    <div className="container mt-5 p-4 border rounded shadow-sm" style={{ maxWidth: "600px" }}>
      <h4 className="mb-3">Ask AI</h4>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Ask your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSubmit}>
          Ask
        </button>
      </div>

      {showResponse && (
        <div className="alert alert-info mt-3">
          <strong>Response:</strong>
          <p className="mt-2 mb-0">{response}</p>
        </div>
      )}
    </div>
  );
}

export default Ask;
