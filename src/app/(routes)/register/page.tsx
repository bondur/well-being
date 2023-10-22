'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react'
import Input from '@/components/Input'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/Button'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'

interface InitialStateProps {
	userName: string
	email: string
	password: string
	isOk: boolean
	isAdmin: boolean
}

const initialState: InitialStateProps = {
	userName: '',
	email: '',
	password: '',
	isOk: false,
	isAdmin: false
}

export default function Create() {
	const [state, setState] = useState(initialState)
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	const { toast } = useToast()

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		setState({ ...state, [event.target.name]: event.target.value })
	}

	function onSubmit(event: FormEvent) {
		setLoading(true)
		event.preventDefault()

		axios
			.post('/api/register', state)
			.then(() => {
				toast({
					title: 'Registered'
				})
				router.refresh()
			})
			.then(() => {
				setTimeout(() => {
					router.push('/login')
				}, 2500)
			})

			.catch((error: any) => {
				throw new Error(error)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return (
		<form onSubmit={onSubmit} className="text-center">
			<div className="flex justify-center items-center h-screen mx-auto gap-2">
				<div className="flex flex-col justify-center items-center w-[750px] h-[850px] shadow-2xl  rounded-[50px] px-30">
					<Image src={'/logo.svg'} width={500} height={500} alt="logo" />
					<h1 className="text-4xl text-black mb-10">Добро пожаловать!</h1>
					<div className="flex flex-col justify-center items-center gap-6 w-full mb-4 px-24">
						<Input
							placeholder="Фамилия & Имя"
							id="userName"
							type="text"
							name="userName"
							onChange={handleChange}
							value={state.userName}
						/>
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

						<Button
							type="submit"
							label="Зарегистрироваться"
							disabled={loading}
						></Button>
					</div>
					<h1 className="text-lg text-black">
						Уже есть аккаунт?{' '}
						<Link href="/login" className="text-[#FD0] hover:text-[#ffed00]">
							Войти
						</Link>
					</h1>
				</div>
			</div>
		</form>
	)
}
