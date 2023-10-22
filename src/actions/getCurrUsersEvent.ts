import prisma from '../lib/prismadb'
import myUser from './getUser'

export default async function getCurrUsersCourse() {
	const user = await myUser()

	const events = await prisma.event.findMany({
		where: {
			userId: user?.id
		}
	})

	const safeEvent = events.map(event => ({
		...event
	}))

	return safeEvent
}
