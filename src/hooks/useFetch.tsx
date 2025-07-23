import { useCallback, useEffect, useState } from 'react'

interface RefetchParams {
	params?: Record<string, string | number>
}
const getQueryString = (params: RefetchParams['params']) =>
	new URLSearchParams(params as Record<string, string>).toString()

export const useFetch = <T,>(url: string) => {
	const [data, setData] = useState<T[]>([])
	const [error, setError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const fetchData = useCallback(
		async (params?: RefetchParams['params']) => {
			setIsLoading(true)
			setError(false)

			try {
				const query = getQueryString(params)
				const fullUrl = query ? `${url}?${query}` : url

				const response = await fetch(fullUrl)

				if (!response.ok) {
					throw new Error(`Fetch failed with status code ${response.status}`)
				}

				const data: T[] = await response.json()
				setData(data)
			} catch (error) {
				if (error instanceof Error) {
					console.error(error.message)
				} else {
					console.error('Unexpected error')
				}

				setError(true)
			} finally {
				setIsLoading(false)
			}
		},
		[url],
	)

	useEffect(() => {
		fetchData()
	}, [fetchData])

	const refetch = (obj: RefetchParams) => fetchData(obj?.params)

	return { data, isLoading, error, refetch }
}
