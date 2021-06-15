import { useState, useCallback } from 'react'
// оборачиваем в useCallback, чтобы React не уходил в рекурсию

export const useHttp = () => {
  const [loading, setLoading] = useState(false) // флаг
  const [error, setError] = useState(null)
  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true) // загрузка началась, потом включим индикатор

      try {
        if (body) {
          body = JSON.stringify(body)
          headers['Content-Type'] = 'application/json'
        }

        const response = await fetch(url, { method, body, headers })
        const data = await response.json()
        // console.log(response)
        if (!response.ok) {
          throw new Error(data.message || 'Что-то пошло не так')
        }
        setLoading(false) // загрузка закочилась, потом выключим индикатор
        return data
      } catch (error) {
        setLoading(false)
        setError(error.message)
        throw error
      }
    },
    []
  )

  //чистим ошибки

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return { loading, request, error, clearError }
}
