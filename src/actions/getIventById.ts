import prisma from '../lib/prismadb'

interface IParams {
	eventId?: string
}

export default async function getEventById(params: IParams) {
	try {
		const { eventId } = params

		const event = await prisma.event.findUnique({
			where: {
				id: eventId
			},
			include: {
				user: true
			}
		})

		if (!eventId) {
			return null
		}

		return {
			...event,
			date: event?.date.toString(),
			user: {
				...event?.user,
				createdAt: event?.user.createdAt.toString(),
				updatedAt: event?.user.updatedAt.toString()
			}
		}
	} catch (error: any) {
		throw new Error(error)
	}
}
