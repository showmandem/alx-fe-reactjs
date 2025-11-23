import React from 'react'
import { useState } from 'react'


const Search = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleInputChange = () => {
        setSearchTerm(error.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (!searchTerm.trim())
            return
    
    setUserData(null)
    setError()
    setIsLoading(true)

    console.log('Searching for:',searchTerm)
}
  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text"
        placeholder='Enter Github username'
        value={searchTerm}
        onChange={handleInputChange} 
        required/>

        <button type='submit' disabled={isLoading}>Search</button>
      </form>
      <div>
        
      </div>
    </div>
  )
}

export default Search
