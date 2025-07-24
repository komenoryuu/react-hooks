import { useEffect, useRef, useState } from 'react'

type UseHover = <T extends HTMLElement>() => {
	hovered: boolean
	ref: React.RefObject<T | null>
}

export const useHover: UseHover = <T extends HTMLElement>() => {
	const [hovered, setHovered] = useState(false)
	const ref = useRef<T | null>(null)

	useEffect(() => {
		const node = ref.current
		if (!node) return

		const handleMouseEnter = () => setHovered(true)
		const handleMouseLeave = () => setHovered(false)

		node.addEventListener('mouseenter', handleMouseEnter)
		node.addEventListener('mouseleave', handleMouseLeave)

		return () => {
			node.removeEventListener('mouseenter', handleMouseEnter)
			node.removeEventListener('mouseleave', handleMouseLeave)
		}
	}, [])

	return { hovered, ref }
}
