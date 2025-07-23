import { useFetch } from './hooks'
import './App.css'
interface Data {
	userId: number
	id: number
	title: string
	body: string
}

function App() {
	const { data, isLoading, error, refetch } = useFetch<Data>('https://jsonplaceholder.typicode.com/posts')

	return (
		<div>
			<div>
				<button
					onClick={() =>
						refetch({
							params: {
								_limit: 3,
							},
						})
					}>
					Перезапросить
				</button>
			</div>
			{isLoading && 'Загрузка...'}
			{error && 'Произошла ошибка'}
			{data && !isLoading && data.map(item => <div key={item.id}>{item.title}</div>)}
		</div>
	)
}

export default App
