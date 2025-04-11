import { useState } from "react";


function RandomQuiz({printQuestion}) {
   const [error, setError] = useState(null);
   const [selectValue, setSelectValue] = useState('');
   const [result, setResult] = useState('');

   const handleInputChange = (event) => {
      setSelectValue(event.target.value);
   };

   const validateForm = () => {
      if (!selectValue) {
         setError('You must select the answer')
         return false;
      }
      setError('');
      return true;
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      try {
         if (!validateForm()) {
            return;
         }
      } catch (e) {
         console.error(e.message);
      }
      const correctAnswer = printQuestion.questionData.map((element) => (
         element.correct_answer));

      if (selectValue == correctAnswer) {
         setResult(`Congratulations, ${printQuestion.inputData.userName}  your answer is correct`);
      } else {
         setResult(`Sorry, ${printQuestion.inputData.userName},  your answer is incorrect ,the correct answer is "${correctAnswer[0]}"`);
      }
   }

   const handleRefresh = () => {
      window.location.reload();
   };

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <div>
               <h2>Answer the Question</h2>

               {printQuestion.questionData.map((element, id) => (
                  <div key={id}>
                     <p >{element.question}</p>
                     <div >
                        <p> <input type="radio" id="option" name="group1" value={element.correct_answer} onChange={handleInputChange} />
                            <label htmlFor="correct">{element.correct_answer}</label></p>
                     </div>
                     <div >
                        {element.incorrect_answers.map((options, index) => {
                           return (<p key={index}><input type="radio" id="options" name="group1" value={options}
                              onChange={handleInputChange} /><label htmlFor="inCorrect">{options}</label></p>);
                        })}
                     </div>
                  </div>
               )
               )}
               <button>Submit</button>

               {error && <div style={{ color: 'red' }}>{error}</div>}

            </div>
            {result && result.startsWith("Congratulations") && <div style={{ color: 'green' }}><h1>{result} </h1></div>}
            {result && !result.startsWith("Congratulations") && <div style={{ color: 'red' }}><h1>{result}  </h1></div>}

            {<button onClick={handleRefresh}> Next Question </button>}

         </form>
      </div>
   );
}

export default RandomQuiz;