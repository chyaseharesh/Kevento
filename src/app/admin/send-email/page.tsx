
'use client'; 

import { useState } from 'react';

interface EmailData {
  to: string;
  subject: string;
  text: string;
  html: string;
}

const EmailForm = () => {
  const [emailData, setEmailData] = useState<EmailData>({
    to: '',
    subject: '',
    text: '',
    html: '',
  });
  const [status, setStatus] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmailData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendEmail = async () => {
    setStatus('Sending...');
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const result = await res.json();
      if (res.status === 200) {
        setStatus('Email sent successfully!');
      } else {
        setStatus(result.error || 'Error sending email');
      }
    } catch {
      setStatus('Error sending email');
    }
  };

  return (
    <div>
      <h2>Send Email</h2>
      <input
        type="email"
        name="to"
        value={emailData.to}
        onChange={handleChange}
        placeholder="Recipient Email"
      />
      <input
        type="text"
        name="subject"
        value={emailData.subject}
        onChange={handleChange}
        placeholder="Subject"
      />
      <textarea
        name="text"
        value={emailData.text}
        onChange={handleChange}
        placeholder="Message"
      />
      <button onClick={sendEmail}>Send Email</button>
      <p>{status}</p>
    </div>
  );
};

export default EmailForm;
