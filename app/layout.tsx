import './globals.css'
import React from 'react'

export const metadata = {
  title: 'AI Fitness Coach',
  description: 'Personalized workout & diet plans powered by AI',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white shadow-sm">
            <div className="max-w-5xl mx-auto px-4 py-4">
              <h1 className="text-xl font-semibold">AI Fitness Coach</h1>
            </div>
          </header>
          <main className="flex-1 max-w-5xl mx-auto px-4 py-6 w-full">{children}</main>
          <footer className="text-center py-4 text-sm text-gray-500">Project build by Rupesh Mali </footer>
        </div>
      </body>
    </html>
  )
}
