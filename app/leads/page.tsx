'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import type { Database } from '../../types/supabase'

type LeadRow = Database['public']['Tables']['leads']['Row']
type LeadInsert = Database['public']['Tables']['leads']['Insert']

export default function LeadsPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleAddLead = async () => {
    try {
      const { data, error } = await supabase
        .from<LeadRow, LeadInsert>('leads')
        .insert([{ name, email }])
        .select()
      if (error) throw error
      if (data && data.length > 0) {
        setMessage('Lead added with ID: ' + data[0].id)
        setName('')
        setEmail('')
      }
    } catch (err: any) {
      setMessage('Error: ' + err.message)
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Add Lead</h1>
      <input
        type='text'
        placeholder='Business Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br/><br/>
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br/><br/>
      <button onClick={handleAddLead}>Add Lead</button>
      <p>{message}</p>
    </div>
  )
}
