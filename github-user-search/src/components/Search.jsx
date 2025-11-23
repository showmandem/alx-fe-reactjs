import React, { useState } from 'react';
// 1. Import the API function we created in Step 2
import { fetchUserData } from '../services/githubService';

// Define the Search component as an arrow function
const Search = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // The asynchronous arrow function that handles form submission and API call
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) return;

    // Reset previous state and start loading
    setUserData(null);
    setError(null);
    setIsLoading(true);

    try {
      // 2. Call the API service function and await the result
      const data = await fetchUserData(searchTerm);
      
      // If successful, set the user data
      setUserData(data);
      
    } catch (err) {
      // 3. Handle the error thrown by githubService.js (e.g., 'User not found')
      setError('Looks like we cant find the user');
      
    } finally {
      // 4. Stop loading regardless of success or failure
      setIsLoading(false);
    }
  };

  // Component Rendering and Conditional Logic
  return (
    <div className="search-container">
      {/* Search Input Form */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter GitHub username (e.g., octocat)"
          value={searchTerm}
          onChange={handleInputChange}
          required
        />
        <button type="submit" disabled={isLoading}>
          Search
        </button>
      </form>

      {/* Results/Status Display Area */}
      <div className="results-area">
        
        {/* 1. Loading State */}
        {isLoading && (
          <p className="status-message">
            **Loading...**
          </p>
        )}

        {/* 2. Error State */}
        {error && !isLoading && (
          <p className="status-message error-message">
            **{error}**
          </p>
        )}

        {/* 3. Success State: Display User Info */}
        {userData && !isLoading && !error && (
          <div className="user-profile">
            <img 
              src={userData.avatar_url} 
              alt={`${userData.login}'s avatar`}
              className="user-avatar"
            />
            <div className="user-details">
              <h2>{userData.name || userData.login}</h2>
              <p>@{userData.login}</p>
              <a 
                href={userData.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View GitHub Profile
              </a>
              {/* Optional details */}
              {userData.bio && <p className="bio">**Bio:** {userData.bio}</p>}
              <p>**Followers:** {userData.followers}</p>
              <p>**Public Repos:** {userData.public_repos}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 

export default Search;