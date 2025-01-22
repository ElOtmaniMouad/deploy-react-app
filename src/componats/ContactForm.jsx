import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import './ContactFormStyle.css';

// Schéma de validation Zod
const contactSchema = z.object({
  name: z.string().min(1, { message: 'Le nom est requis.' }),
  email: z.string().email({ message: 'Veuillez entrer un email valide.' }),
  subject: z.string().min(1, { message: 'Le sujet est requis.' }),
  message: z.string().min(1, { message: 'Le message est requis.' }),
});

function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(contactSchema),
  });

  // Soumission du formulaire
  const onSubmit = async (values) => {
    try {
      // Simuler l'envoi des données à un serveur
      console.log('Form Data Submitted:', values);
      alert('Message envoyé avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      alert('Erreur lors de l\'envoi du message');
    }
  };

  return (
    <div className="form-container">
      <h1>Send Us a Message</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Name"
          {...register('name')}
          className={errors.name ? 'invalid' : ''}
        />
        {errors.name && <p className="error-message">{errors.name.message}</p>}

        <input
          placeholder="Email"
          {...register('email')}
          className={errors.email ? 'invalid' : ''}
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}

        <input
          placeholder="Subject"
          {...register('subject')}
          className={errors.subject ? 'invalid' : ''}
        />
        {errors.subject && <p className="error-message">{errors.subject.message}</p>}

        <textarea
          placeholder="Message"
          rows="4"
          {...register('message')}
          className={errors.message ? 'invalid' : ''}
        />
        {errors.message && <p className="error-message">{errors.message.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
