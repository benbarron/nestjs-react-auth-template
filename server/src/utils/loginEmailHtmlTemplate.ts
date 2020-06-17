export const loginEmailHtmlTemplate = (
  city: string,
  region: string,
  userAgent: string,
) => {
  return `
      <p>Someone to loggon to your account from a device that we didn't recognize.</p>
      <ul>
          <li>City: ${city}</li>
          <li>Region: ${region}</li>
          <li>Device: ${userAgent}</li> 
      <ul/>
      <p>If this was you then you can ignore this email. If not please login to your account and change your password.</p>
  `;
};
