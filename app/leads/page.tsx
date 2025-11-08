'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// 🔹 Initialize Supabase client (replace with your own keys)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://krmxqmfsmypsfvsgpitw.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtybXhxbWZzbXlwc2Z2c2dwaXR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MTc3MDMsImV4cCI6MjA3Nzk5MzcwM30.Ff3EWNdzcIWdPFtYkVkEH45lMdd5qPn4gqWAEjRl6ZM'
)

export default function LeadsPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('Adding lead...')

    // 🔹 Insert into 'leads' table
    const { data, error } = await supabase
      .from('leads')
      .insert([{ name, email } as any]) // <-- fixes TypeScript error
      .select()

    if (error) {
      console.error('Insert error:', error)
      setMessage('❌ Error adding lead: ' + error.message)
    } else if (data && data.length > 0) {
      setMessage('✅ Lead added with ID: ' + data[0].id)
    } else {
      setMessage('⚠️ Lead added but no data returned.')
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h1>Add a Lead</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Add Lead
        </button>
      </form>
      <p style={{ marginTop: '15px', color: '#555' }}>{message}</p>
    </div>
  )
}
