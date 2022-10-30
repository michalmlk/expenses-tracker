import { useState, useEffect } from 'react'

const useLocalStorage = (key, defaultVal) => {
	const [value, setValue] = useState(() => {
		const storedValue = localStorage.getItem(key)

		if (storedValue !== null) {
			return JSON.parse(storedValue)
		} else if (typeof defaultVal === 'function') {
			return defaultVal()
		} else return defaultVal
	})

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	return [value, setValue]
}

export default useLocalStorage
