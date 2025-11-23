import axios from 'axios';


export const fetchUserData = async (username) => {
    // Define the GitHub API endpoint structure
    const GITHUB_API_BASE_URL = 'https://api.github.com/users/';
    const url = `${GITHUB_API_BASE_URL}${username}`;

    try {
        // Use Axios to make the GET request
        const response = await axios.get(url);

        // Return the 'data' part of the response, which contains the user's profile information
        return response.data;

    } catch (error) {
        // Handle API errors, specifically a 404 (Not Found)
        if (error.response && error.response.status === 404) {
            // Throw a specific error for the Search component to catch
            throw new Error('User not found');
        }
        // Throw a generic error for other network/server issues
        throw new Error('Failed to fetch user data');
    }
};