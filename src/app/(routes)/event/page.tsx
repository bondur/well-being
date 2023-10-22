import CardList from '@/components/CardList'
import Sidebar from '@/components/Sidebar'

export default function Home() {
	return (
		<div className="flex">
			<Sidebar />
			<CardList />
		</div>
	)
}
