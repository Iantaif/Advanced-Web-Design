import React, { useState, useEffect } from 'react';
import './App.css';

// AccordionContainer for Requirement 1
const AccordionContainer1 = ({ data }) => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const handleItemClick = (index) => {
    const isItemOpen = openIndexes.includes(index);
    if (isItemOpen) {
      setOpenIndexes(openIndexes.filter((item) => item !== index)); // Đóng nếu đã mở
    } else {
      setOpenIndexes([...openIndexes, index]); // Mở nếu chưa mở
    }
  };

  return (
    <div className="accordion-container">
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndexes.includes(index)}
          onClick={() => handleItemClick(index)}
        />
      ))}
    </div>
  );
};


// AccordionContainer for Requirement 2
const AccordionContainer2 = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleItemClick = (index) => {
    setOpenIndex(index);
  };

  return (
    <div className="accordion-container">
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={index === openIndex}
          onClick={() => handleItemClick(index)}
        />
      ))}
    </div>
  );
};

// AccordionItem component
const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={onClick}>
        {title}
      </div>
      {isOpen && <div className="accordion-content">{content}</div>}
    </div>
  );
};

// App component
const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://awd-2023.azurewebsites.net/Accordions', {
        headers: {
          'student-name': 'John Doe' // Set the student name here
        }
      });
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <div>
        <h2>AccordionContainer 1</h2>
        <AccordionContainer1 data={data} />
      </div>
      <div>
        <h2>AccordionContainer 2</h2>
        <AccordionContainer2 data={data} />
      </div>
    </div>
  );
};

export default App;
