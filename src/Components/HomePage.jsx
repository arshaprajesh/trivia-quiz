import { useState } from "react";
import RandomQuiz from "./RandomQuiz";

function HomePage(){
const [printQuestion, setPrintQuestion] = useState('');
 
const [quizData, setQuizData] = useState({userName: '', category: '', difficulty: '',});
 
 const [error, setError] = useState('');
 const [success,setSuccess] = useState('');

 
 

// Handle input change(name)
 const handleInputChange = (event) => {
  const { name, value } = event.target;
  setQuizData((prevState) => ({
      ...prevState, 
      [name]: value,
  }));
 };
 

 // Form validation
 const validateForm = () => {
  const { userName, category, difficulty } = quizData;
  
   if (userName.trim() === ''||category=== ''||difficulty=== '') {
  
     setError(' name ,category and difficulty level are required');
     return false;
   }
   setError('');
   return true;
 };


// Handle form submission
 const handleSubmit = async (event) => {
   event.preventDefault(); // Prevent default form submission

   if (!validateForm()) {
     return; // If validation fails, exit
   }

   try {
     
     const response = await fetch('https://opentdb.com/api.php?amount=1')
     if (!response.ok) {
       throw new Error('Failed to create post');
     }

     const data = await response.json();

     console.log("data fetch :",data);

     console.log("data fetch :",data.results.category);
     
     setSuccess(
     
     <div>
           <p>submited details</p>
       </div>
    
     );
     setPrintQuestion({ inputData: quizData, questionData: data.results });
     

     console.log("data fetch :",data);

   } catch (e) {
     setError(e.message);
   }
 };


return (
   <div>
     <h1>Welcome to Trivia Quiz</h1>
     <form onSubmit={handleSubmit}>
       <div>
         <label htmlFor="name">Enter your first name, select a question category, and choose a difficulty level.</label><br/>
         <input
           type="text"
           id="name"
           name="userName"
           value={quizData.userName}
           onChange={handleInputChange}
           placeholder="Enter first name"
         />
       </div>
       <br/>
     {/* Category Dropdown */}
     <div>
                    <label>Select Category:</label>
                    <select name="category" onChange={handleInputChange}>
                        
                        <option value="9">General Knowledge</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="21">Sports</option>
                        <option value="18">Science: Computers</option>
                        <option value="25">Art</option>
                    </select>
                </div>
     {/* Difficulty Dropdown */}
     <div>
                    <label>Select Difficulty:</label>
                    <select name="difficulty" onChange={handleInputChange}>
                      
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
     <br/>
       <button type="submit">submit</button>
     </form>

     {
     /* Display validation error or success message */}
     {error && <div style={{ color: 'red' }}>{error}</div>}
     {success && <div style={{ color: 'green' }}>{success}</div>}

    {printQuestion && <RandomQuiz printQuestion={printQuestion}/> }
   </div>
 );

}

export default HomePage;