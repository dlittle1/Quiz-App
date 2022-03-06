import axios from 'axios'
import { useEffect, useState } from 'react'

function useAxios({ url }) {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`https://opentdb.com/${url}`)
        .then((res) => setResponse(res.data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false))
    }
    fetchData()
  }, [url])

  return { response, error, loading }
}

export default useAxios
