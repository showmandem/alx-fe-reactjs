import axios from 'axios';

// GitHub API endpoint for searching users (not individual user lookup)
const GITHUB_SEARCH_API_URL = 'https://api.github.com/search/users';

/**
 * Searches for GitHub users based on advanced criteria (keyword, location, repos).
 * @param {object} params - An object containing search criteria (keyword, location, minRepos).
 * @param {number} page - The page number to fetch (for pagination).
 * @returns {Promise<object>} The search results object, including items (users) and total_count.
 * @throws {Error} If the API call fails or rate limit is hit.
 */
export const searchUsers = async ({ keyword, location, minRepos }, page = 1) => {
    // 1. Build the GitHub Search API query string (the 'q' parameter)
    let queryParts = [];

    // Add keyword/username search
    if (keyword) {
        // GitHub's search syntax requires the keyword to be the first element
        queryParts.push(keyword.trim());
    }

    // Add location filter
    if (location) {
        // Syntax: location:locationName
        queryParts.push(`location:${location.trim()}`);
    }

    // Add minimum repositories filter
    if (minRepos && parseInt(minRepos) >= 0) {
        // Syntax: repos:>=count
        queryParts.push(`repos:>=${parseInt(minRepos)}`);
    }

    // Combine all parts with '+' (required by GitHub Search API)
    const qString = queryParts.join('+');

    // If the query is empty, we cannot search
    if (!qString) {
        throw new Error('Search query is empty. Please provide criteria.');
    }

    // 2. Construct the full API URL
    // We append the constructed 'q' string, pagination parameters, and sort order
    const url = `${GITHUB_SEARCH_API_URL}?q=${qString}&page=${page}&per_page=100&sort=followers&order=desc`;

    try {
        // 3. Make the API request
        const response = await axios.get(url);

        // 4. Return the full response data (includes 'items' array and 'total_count')
        return response.data;

    } catch (error) {
        // Handle common API errors (e.g., rate limiting, bad request)
        if (error.response) {
            if (error.response.status === 403) {
                throw new Error('API Rate Limit Exceeded. Please try again later.');
            }
            if (error.response.status === 422) {
                // Unprocessable Entity - usually an invalid search term format
                throw new Error('Invalid search criteria format.');
            }
        }
        // Re-throw generic errors
        throw new Error('A network error occurred while searching.');
    }
};

// NOTE: We no longer need fetchUserData from the previous task, 
// so we only export the new searchUsers function.
// export const searchUsers = ... (as above)