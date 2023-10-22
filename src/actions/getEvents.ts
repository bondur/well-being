import prisma from '../lib/prismadb'
//если вдруг нужен будет параметр для запроса
export default async function getAllEvents(/*params: any*/) {
	try {
		// const { result } = params

		// let query: any = {}

		// if (result) {
		// 	query.title = {
		// 		contains: result
		// 	}
		// }

		const events = await prisma.event.findMany({
			// where: query,
			// orderBy: {
			// 	date: 'desc'
			// }
		})

		const safeEvents = events.map(event => ({
			...event,
			date: event.date
		}))

		return safeEvents
	} catch (error: any) {
		throw new Error(error)
	}
}
