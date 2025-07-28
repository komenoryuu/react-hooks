import { useViewportSize } from './hooks'
import './App.css'

function App() {
	const { height, width } = useViewportSize()

	return (
		<>
			Width: {width}, height: {height}
		</>
	)
}

export default App
