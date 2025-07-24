import { useHover } from './hooks'
import './App.css'

function App() {
	const { hovered, ref } = useHover<HTMLDivElement>()

	return <div ref={ref}>{hovered ? 'На меня навели мышку' : 'Наведи мышкой на меня'}</div>
}

export default App
