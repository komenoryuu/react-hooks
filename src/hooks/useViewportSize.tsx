import { useState } from 'react'
import { useWindowEvent } from './useWindowEvent'

type UseViewportSize = () => {
	height: number
	width: number
}

const getSize = () => ({
	height: typeof window !== 'undefined' ? window.innerHeight : 0,
	width: typeof window !== 'undefined' ? window.innerWidth : 0,
})

export const useViewportSize: UseViewportSize = () => {
	const [{ height, width }, setSize] = useState(() => getSize())

	const handleViewportChange = () => setSize(getSize())

	useWindowEvent('resize', handleViewportChange, {})

	return { height, width }
}
