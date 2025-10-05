export function ConfirmationEmail() {
  return (
    <div className="bg-gray-50 p-6 font-sans text-gray-800">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-purple-600">¡Holaaaaaaa!</h1>

        <p className="mb-4 text-gray-700">
          Estamos muy emocionados porque los <strong>XV años de Arantza</strong> están a la vuelta
          de la esquina 🎉
        </p>

        <p className="mb-4 text-gray-700">
          Solo queremos recordarte que la fiesta será el{' '}
          <strong>20 de Diciembre a las 18:00 hrs</strong>, en{' '}
          <strong>Salón Exhda. el Coecillo</strong>.
        </p>

        <p className="mb-4 text-gray-700">
          Prepárate para una noche llena de música, baile y momentos inolvidables 💕
        </p>

        <p className="mb-6 text-gray-700">¡Nos encantará verte ahí!</p>

        <p className="text-gray-700">
          Con cariño,
          <br />
          <strong>Familia Toledo</strong>
        </p>

        <div className="text-center">
          <img
            src="https://dl1fn8emzdzuebjv.public.blob.vercel-storage.com/15%20recostada%202.jpg"
            className="mx-auto rounded-lg w-full max-w-sm"
          />
        </div>
      </div>
    </div>
  )
}
