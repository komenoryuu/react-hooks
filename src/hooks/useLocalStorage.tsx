import { useState } from 'react'

type LocalStorageSetValue = string
type LocalStorageReturnValue = LocalStorageSetValue | null

type UseLocalStorage = (key: string) => [
	value: LocalStorageReturnValue,
	{
		setItem: (value: LocalStorageSetValue) => void
		removeItem: () => void
	},
]

const getStorageValue = (key: string): LocalStorageReturnValue => {
	return localStorage.getItem(key)
}

export const useLocalStorage: UseLocalStorage = key => {
	const [value, setValue] = useState<LocalStorageReturnValue>(() => getStorageValue(key))

	const setItem = (value: LocalStorageSetValue) => {
		localStorage.setItem(key, value)
		setValue(value)
	}

	const removeItem = () => {
		localStorage.removeItem(key)
		setValue(null)
	}

	return [
		value,
		{
			setItem,
			removeItem,
		},
	]
}
