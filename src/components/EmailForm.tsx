import { useState } from 'react'

export default function EmailForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      setStatus('success')
      setMessage(data.message)
      setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'An unexpected error occurred')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap rounded-lg mt-4 backdrop-blur-md bg-white/30 py-4 px-8"
    >
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Tu correo electrónico"
        className="flex-grow px-4 py-2 rounded-full text-black bg-white/20 backdrop-blur-md"
        required
        disabled={status === 'loading'}
      />
      <button
        type="submit"
        className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300 disabled:opacity-50"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Enviando...' : 'Notificarme'}
      </button>
      {status === 'success' && <p className="text-green-500">{message}</p>}
      {status === 'error' && <p className="text-red-500">{message}</p>}
    </form>
  )
}
