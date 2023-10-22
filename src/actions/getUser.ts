import { getServerSession } from 'next-auth'
import prisma from '../lib/prismadb'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function getSession() {
	return await getServerSession(authOptions)
}

export default async function myUser() {
	try {
		const session = await getSession()

		if (!session?.user?.email) {
			return null
		}

		const currentUser = await prisma.user.findUnique({
			where: {
				email: session.user.email as string
			}
		})

		if (!currentUser) {
			return null
		}

		return {
			...currentUser,
			createdAt: currentUser.createdAt.toISOString(),
			updatedAt: currentUser.updatedAt.toISOString()
		}
	} catch (error: any) {
		throw new Error(error)
	}
}
