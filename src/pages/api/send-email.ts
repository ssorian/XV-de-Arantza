import { ConfirmationEmail } from '@/components/ConfirmationEmail'
import type { APIRoute } from 'astro'
import { Resend } from 'resend'

const resend = new Resend(import.meta.env.RESEND_API_KEY)

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json()
  console.log(data)
  const { email } = data

  if (!email) {
    return new Response(JSON.stringify({ message: 'Email is required' }), { status: 400 })
  }

  try {
    await resend.contacts.create({
      email: email,
      unsubscribed: false,
      audienceId: '53cf30ce-4a6f-4254-bd4d-e20156dc1415',
    })
  } catch (error) {
    console.error('Error creating contact:', error)
    // It's possible the contact already exists, so we can continue.
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Familia Toledo <familiatoledo@soriandev.online>',
      to: [email],
      subject: '<Right>✨ Recordatorio: ¡Acompáñanos a celebrar los XV años de Arantza!',
      react: ConfirmationEmail(),
    })

    if (error) {
      console.error('Error sending email:', error)
      return Response.json({ message: 'Error sending email', error }, { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    console.error('Generic error:', error)
    return Response.json({ message: 'An unexpected error occurred.', error }, { status: 500 })
  }
}
