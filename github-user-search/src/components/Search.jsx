import React, { useState } from 'react';
// Import the new function from Step 2
import { searchUsers } from '../services/githubService'; 

// Define the Search component as an arrow function
const Search = () => {
  // 1. STATE MANAGEMENT (Expanded for advanced search and pagination)
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [minReposTerm, setMinReposTerm] = useState('');

  // Results State
  const [users, setUsers] = useState([]); // Now an array for multiple results
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination State
  const [pageNumber, setPageNumber] = useState(1);
  const [totalResults, setTotalResults] = useState(0); // For total count
  const [hasMore, setHasMore] = useState(false); // To enable/disable the Load More button

  
  // 2. Main Search Logic (Used for initial search or new criteria)
  const handleSearch = async (e) => {
    e.preventDefault();
    
    // Clear previous results/errors and set initial page
    setUsers([]);
    setPageNumber(1);
    setError(null);

    // Check if at least one search criterion is provided
    if (!searchTerm.trim() && !locationTerm.trim() && !minReposTerm.trim()) {
      setError("Please provide at least one search term.");
      return;
    }

    setIsLoading(true);
    
    // Call the core fetching logic
    await fetchResults(true);
  };
  
  // 3. Load More Logic (Used only to append results)
  const loadMore = async () => {
    // Increment the page number and fetch the next page of results
    const nextPage = pageNumber + 1;
    setPageNumber(nextPage);
    await fetchResults(false, nextPage); // Pass false to indicate appending, not replacing
  };

  // 4. Core API Call Function
  const fetchResults = async (isNewSearch, page = 1) => {
      setIsLoading(true);

      const params = {
          keyword: searchTerm,
          location: locationTerm,
          minRepos: minReposTerm,
      };

      try {
          const data = await searchUsers(params, page);
          
          const newUsers = data.items;
          const totalCount = data.total_count;
          
          setTotalResults(totalCount);

          if (isNewSearch) {
              // For new searches, replace the entire array
              setUsers(newUsers);
          } else {
              // For 'Load More', append new results to existing ones
              setUsers(prevUsers => [...prevUsers, ...newUsers]);
          }

          // Check if there are potentially more pages (GitHub limits searches to ~1000 items)
          const totalFetched = isNewSearch ? newUsers.length : users.length + newUsers.length;
          setHasMore(totalFetched < Math.min(totalCount, 1000));
          
          setError(null);
          
      } catch (err) {
          setError(err.message || 'An unexpected error occurred during search.');
          setUsers([]); // Clear users on error
          setHasMore(false);
          
      } finally {
          setIsLoading(false);
      }
  };

  // 5. Component Rendering and Conditional Logic
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white shadow-xl rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">GitHub User Search</h1>
      
      {/* Search Form (Same as Step 1) */}
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* 1. Username/Keyword */}
          <div>
            <label htmlFor="keyword" className="block text-sm font-medium text-gray-700">Username or Keyword</label>
            <input
              id="keyword"
              type="text"
              placeholder="e.g., react or octocat"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* 2. Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              id="location"
              type="text"
              placeholder="e.g., london, germany"
              value={locationTerm}
              onChange={(e) => setLocationTerm(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* 3. Minimum Repositories */}
          <div>
            <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700">Min. Public Repos</label>
            <input
              id="minRepos"
              type="number"
              placeholder="e.g., 10"
              min="0"
              value={minReposTerm}
              onChange={(e) => setMinReposTerm(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            {isLoading ? 'Searching...' : 'Search GitHub Users'}
          </button>
        </div>
      </form>

      {/* --- RESULTS DISPLAY AREA --- */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        
        {/* Error/Loading Status */}
        {error && (
            <p className="text-center text-red-600 font-medium p-4 bg-red-50 border border-red-200 rounded-md">{error}</p>
        )}
        
        {isLoading && users.length === 0 && (
            <p className="text-center text-blue-600 p-4">Loading initial search results...</p>
        )}
        
        {/* Results Count and List */}
        {users.length > 0 && (
            <>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Found {totalResults.toLocaleString()} Users (Displaying {users.length})
                </h2>
                
                {/* User List Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {users.map((user) => (
                        <div key={user.id} className="flex items-center p-4 bg-gray-50 border rounded-lg shadow-sm">
                            <img 
                                src={user.avatar_url} 
                                alt={`${user.login}'s avatar`}
                                className="w-12 h-12 rounded-full mr-4 border-2 border-blue-500"
                            />
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">
                                    <a 
                                        href={user.html_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        {user.login}
                                    </a>
                                </h3>
                                {/* The search API often doesn't return name/location directly, 
                                    but we can show their score and repos URL (needed for full details) */}
                                <p className="text-sm text-gray-600">Score: {user.score.toFixed(2)}</p>
                                {/* NOTE: To get Location and Repos count for a list, 
                                    you'd need a separate API call per user, which is rate-limit intensive. 
                                    For now, we display what the search API provides. */}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                    <div className="text-center mt-6">
                        <button
                            onClick={loadMore}
                            disabled={isLoading}
                            className="px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {isLoading ? 'Loading More...' : 'Load More Users'}
                        </button>
                    </div>
                )}
            </>
        )}
        
        {/* No Results Message */}
        {users.length === 0 && !isLoading && !error && (
            <p className="text-center text-gray-500 p-4">Start searching for users using keywords, location, or min repositories!</p>
        )}
      </div>
    </div>
  );
};

export default Search;