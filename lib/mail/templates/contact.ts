export function contactTemplate({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  return {
    subject: `Formularz kontaktowy - od ${name}`,
    html: `
      <h2>Nowa wiadomość</h2>
      <p><b>Imię:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Wiadomość:</b></p>
      <p>${message}</p>
    `,
    text: message,
  };
}
