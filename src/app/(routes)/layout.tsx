import { MainLayout } from '@/components/MainLayout'
import { cn } from '@/lib/utils'

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className="dark">
			<body className={cn('min-h-screen font-sans antialiased bg-white')}>
				{/* <Background /> */}
				<MainLayout>{children}</MainLayout>
			</body>
		</html>
	)
}
