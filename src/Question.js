import React from 'react';

function Question({ data, selectedOption, handleOptionClick, isSubmitted }) {
  const getButtonClassName = (option) => {
    let className = 'option-button';
    if (isSubmitted) {
      if (option === data.answer) {
        className += ' correct'; // Class for the correct answer
      } else if (option === selectedOption) {
        className += ' incorrect'; // Class for the incorrect selected option
      }
    } else if (selectedOption === option) {
      className += ' selected'; // Class for the selected option
    }
    return className;
  };

  return (
    <div>
      <h2>{data.question}</h2>
      <img src={data.image} alt={data.question} />
      <div className="options-container"> {/* Make sure this class is defined in your CSS */}
        {data.options.map((option, index) => (
          <button
            key={index}
            className={getButtonClassName(option)}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
