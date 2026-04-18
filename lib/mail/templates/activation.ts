export function activationTemplate({
  name,
  code,
}: {
  name: string;
  code: string;
}) {
  return {
    subject: `Aktywacja konta`,
    html: `
      <h2>Cześć ${name}</h2>
      <p>Dziękujemy za rejestracje.</p>
      <p>Twój kod aktywacyjny to: <b>${code}</b></p>
      <p>Jeśli to nie ty próbujesz aktywowac konto, zignoruj tę waidomość.</p>
    `,
  };
}
