import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function LeadsPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleAddLead = async () => {
    const { data, error } = await supabase
      .from('leads')
      .insert([{ name, email }])
    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage('Lead added with ID: ' + data[0].id)
      setName('')
      setEmail('')
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
