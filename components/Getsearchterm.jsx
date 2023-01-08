

async function Getsearchterm() {
    // Perform async operation to get search term
    const response = await fetch('/api/Location', {
        method: 'POST',
        body: JSON.stringify({
          searchTerm:''
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    const data = await response.json()
    return data.searchTerm
}

export default Getsearchterm
