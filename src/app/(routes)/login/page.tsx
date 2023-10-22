'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import { useToast } from '@/components/ui/use-toast'
import { signIn } from 'next-auth/react'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

const monserat = Montserrat({ subsets: ['latin'] })

interface InitialStateProps {
	email: string
	password: string
}

const initialState: InitialStateProps = {
	email: '',
	password: ''
}

export default function RegisterPage() {
	const [state, setState] = useState(initialState)
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	const { toast } = useToast()

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		setState({ ...state, [event.target.name]: event.target.value })
	}

	function onSubmit(event: FormEvent) {
		event.preventDefault()

		setLoading(true)

		signIn('credentials', {
			...state,
			redirect: false
		})
			.then(callback => {
				if (callback?.ok) {
					toast({
						title: 'Logged In'
					})
					router.push('/')
					router.refresh()
				}

				if (callback?.error) {
					throw new Error('Wrong Credentials')
				}
			})
			.catch(err => {
				throw new Error(err)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return (
		<form onSubmit={onSubmit} className="text-center">
			<div className="flex justify-center items-center h-screen mx-auto gap-2 ">
				<div className="flex flex-col justify-center items-center w-[750px] h-[850px] shadow-2xl  rounded-[50px] px-30">
					<Image src={'/logo.svg'} width={500} height={500} alt="logo" />
					<h1 className="text-4xl text-black mb-10">Добро пожаловать!</h1>
					<div className="flex flex-col justify-center items-center gap-6 w-full mb-4 px-24">
						<Input
							placeholder="Email"
							id="email"
							type="email"
							name="email"
							onChange={handleChange}
							value={state.email}
						/>
						<Input
							placeholder="Password"
							id="password"
							type="password"
							name="password"
							onChange={handleChange}
							value={state.password}
						/>

						<Button type="submit" label="Вход" disabled={loading}></Button>
					</div>
					<h1 className="text-lg text-black">
						Нет аккаунта?{' '}
						<Link href="/register" className="text-[#FD0] hover:text-[#ffed00]">
							Создать
						</Link>
					</h1>
				</div>
			</div>
		</form>
	)
}
