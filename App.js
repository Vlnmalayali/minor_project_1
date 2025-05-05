import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Ensure it's imported correctly
import './App.css'; // Importing the CSS for styling
import './SplashScreen.css';

function App() {
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [language, setLanguage] = useState('');
  const [recommendedMovies, setRecommendedMovies] = useState([]); // Initialize as an empty array

  const emojisList = ['🥰','😂','😎','😱','😇','😊','😡','😨'];


  const navigate = useNavigate(); // Using useNavigate hook from React Router

  const handleEmojiClick = (emoji) => {
    if (selectedEmojis.includes(emoji)) {
      setSelectedEmojis(selectedEmojis.filter((e) => e !== emoji));
    } else if (selectedEmojis.length < 3) {
      setSelectedEmojis([...selectedEmojis, emoji]);
    }
  };

  const handleGetRecommendations = async () => {
    if (selectedEmojis.length === 0) {
      alert('Please select at least one emoji');
      return;
    }

    try {
      // Update the URL with the selected query parameters using navigate()
      navigate(`/filter_movies?emotion=${selectedEmojis.join(',')}&language=${language}`);

      const response = await axios.get('http://127.0.0.1:5000/filter_movies', {
        params: {
          emotion: selectedEmojis.join(','),  // Sending emojis as a comma-separated string
          language: language,                  // Sending the selected language
        },
      });

      console.log(recommendedMovies); // Check if all  movies are correctly set in the state

      // Ensure response contains a 'movies' property and it's an array
      console.log("Response from API:", response.data);
      if (response.data && response.data.movies) {
        setRecommendedMovies(response.data.movies);
      } else {
        setRecommendedMovies([]); // Clear any previous results if no movies found
      }
    } catch (error) {
      console.error('Error fetching movie recommendations:', error);
      alert('Failed to get movie recommendations');
    }
  };

  const handleReset = () => {
    setSelectedEmojis([]);
    setLanguage('');
    setRecommendedMovies([]); // Reset the recommendedMovies state
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Movie Recommendations</h1>
      </header>

      <div className="filter-section">
        <div className="language-select">
          <label htmlFor="language">Select Language:</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="">All</option>
            <option value="Punjabi">Punjabi</option>
            <option value="Hindi">Hindi</option>
            <option value="Tamil">Tamil</option>
            <option value="Kannada">Kannada</option>
            <option value="Bengali">Bengali</option>
            <option value="Bhojpuri">Bhojpuri</option>
            <option value="Assamese">Assamese</option>
            <option value="Telugu">Telugu</option>
            <option value="Marathi">Marathi</option>
            <option value="Gujarati">Gujarati</option>
            <option value="Oriya">Oriya</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Urdu">Urdu</option>
            <option value="English">English</option>
            <option value="Tulu">Tulu</option>
            <option value="Beary">Beary</option>
            <option value="Kodava">Kodava</option>
            <option value="Konkani">Konkani</option>
            <option value="French">French</option>
            <option value="Polish">Polish</option>
            <option value="Khortha">Khortha</option>
            <option value="Nepali">Nepali</option>
            <option value="Haryanvi">Haryanvi</option>
            <option value="Malaysian">Malaysian</option>
            <option value="Sindhi">Sindhi</option>
            <option value="Lambadi">Lambadi</option>
          </select>
        </div>

        <div className="emoji-container">
          <h3>Select up to 3 Emojis Which Shows your Current Emotional State</h3>
          <div className="emoji-list">
            {emojisList.map((emoji, index) => (
              <span
                key={index}
                className={`emoji ${selectedEmojis.includes(emoji) ? 'selected' : ''}`}
                onClick={() => handleEmojiClick(emoji)}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>

        <div className="button-group">
          <button className="btn-primary" onClick={handleGetRecommendations}>
            Get Recommendations
          </button>
          <button className="btn-secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      <div className="movies-output">
  {recommendedMovies.length === 0 ? (
    <div className="no-movies">No movies found for the selected filters.</div>
  ) : (
    recommendedMovies.map((movie, index) => {
      // Parsing the string to extract structured details
      const [title, ...details] = movie.split(", ");
      const detailObject = Object.fromEntries(
        details.map((detail) => detail.split(": ").map((item) => item.trim()))
      );

      return (
        <div key={index} className="movie-card">
          <h3 className="movie-title">{title}</h3>
          <p><strong>Genre:</strong> {detailObject.Genre}</p>
          <p><strong>Language:</strong> {detailObject.Language}</p>
          
          <p><strong>Classification:</strong> {detailObject.Classification || "none"}</p>
          <p><strong>Release Date:</strong> {detailObject["Release Date"]}</p>
          <p><strong>Duration:</strong> {detailObject.Duration || "N/A"}</p>
        </div>
      );
    })
  )}
</div>


    </div>
  );
}

export default App;
