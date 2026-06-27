import { useState } from 'react';
import emailjs from '@emailjs/browser';

import mrFrancis from './img/mrfrancis.png'
import lcca from './img/IMG_20260625_232751_998.png'

const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const validationErrors = {};
    if (!formData.name.trim()) {
      validationErrors.name = 'Name is required.';
    }
    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = 'Enter a valid email address.';
    }
    if (!formData.subject.trim()) {
      validationErrors.subject = 'Subject is required.';
    }
    if (!formData.message.trim()) {
      validationErrors.message = 'Message is required.';
    }
    return validationErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('Please fix the fields below before sending.');
      return;
    }

    if (!serviceId || !templateId || !publicKey) {
      setStatus('Email service is not configured. Please set EMAILJS environment variables.');
      return;
    }

    setLoading(true);
    setErrors({});
    setStatus('');

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        publicKey
      )
      .then(() => {
        setStatus('Your message was sent successfully.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch(() => {
        setStatus('There was an error sending your message. Please try again later.');
      })
      .finally(() => setLoading(false));
  };

  const inputClass = (field) =>
    `mt-2 w-full rounded-2xl border px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 ${
      errors[field] ? 'border-rose-500 bg-slate-900/80' : 'border-slate-800 bg-slate-900/90'
    }`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#hero" className="text-lg font-semibold text-white">
            Idakwo Vincent
          </a>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#hero" className="transition hover:text-white">
              Home
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#skills" className="transition hover:text-white">
              Skills
            </a>
            <a href="#projects" className="transition hover:text-white">
              Projects
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section id="hero" className="scroll-mt-24 bg-slate-950 py-20">
          <div className="mx-auto max-w-6xl px-6 text-center md:text-left">
            <div className="inline-flex rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-sky-300">
              Fronteend Developer | React JS 
            </div>
            <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Crafting modern digital experiences with clean design and reliable development.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg md:mx-0">
              I build polished websites and web apps using modern frontend tooling, strong
              design systems, and clear communication. Explore my portfolio to see projects,
              skills, and ways to get in touch.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row md:items-start">
              <a
                href="#projects"
                className="inline-flex rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex rounded-full border border-slate-700 bg-slate-900/80 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:text-white"
              >
                Contact Me
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 border-t border-slate-800 bg-slate-900/80 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-400">
                  About Me
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  A thoughtful developer with a focus on usability and performance.
                </h2>
                <p className="mt-6 text-base leading-8 text-slate-300">
                  I'm a Frontend developer, with keen interest on the frontend. My drive for software development is rising to the climax after completing the Frontend with Ziffcode, and completed four (4) frontend projects Projects that received excellent remarks from the reviewers.

                </p>
                
                <p className="mt-4 text-base leading-8 text-slate-300">
                  My approach combines strong frontend and  with a professional eye for
                  detail, ensuring every project is built to perform well across devices and
                  screen sizes.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-8 shadow-xl shadow-slate-950/40">
                <h3 className="text-xl font-semibold text-white">What I Offer</h3>
                <ul className="mt-6 space-y-4 text-slate-300">
                  <li className="flex gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-sky-400"></span>
                    I'd love to combine my qualifications, skills and drive for frontend development in building educational, financial and business products.

                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-sky-400"></span>
                    Fast, maintainable code using React, Tailwind, and modern tooling.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-sky-400"></span>
                    Thoughtful collaboration based on deadlines and product goals.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="scroll-mt-24 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-400">
                  Skills
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  Core tools and technologies.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-slate-400">
                A balanced set of modern frontend skills, optimized for fast delivery and
                consistent results.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {['React','JavaScript','Bootstrap','Tailwind CSS', 'Responsive Design', 'Accessibility', 'API Integration', 'Git & CI/CD'].map((skill) => (
                <div key={skill} className="rounded-3xl border border-slate-800 bg-slate-900/80 px-6 py-5 text-slate-200 shadow-sm shadow-slate-950/20">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 border-t border-slate-800 bg-slate-900/80 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-400">
                  Projects
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  Selected work.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-slate-400">
                Projects that demonstrate strong product thinking, polished UI, and reliable code.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/90 shadow-xl shadow-slate-950/40 transition hover:-translate-y-1 hover:shadow-sky-500/20">
                <div className="h-44 overflow-hidden bg-slate-800">
                  <img
                    src={mrFrancis}
                    alt="Mr Francis website preview"
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.3em] text-sky-400">Brand Site</span>
                    <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">React</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-white">Mr Francis Website</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    A polished business website with a clear structure, modern visual hierarchy, and content sections built to present a professional brand.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-400">
                    <span className="rounded-full bg-slate-800 px-3 py-1">Branding</span>
                    <span className="rounded-full bg-slate-800 px-3 py-1">UI</span>
                  </div>
                </div>
              </article>

              <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/90 shadow-xl shadow-slate-950/40 transition hover:-translate-y-1 hover:shadow-sky-500/20">
                <div className="h-44 overflow-hidden bg-slate-800">
                  <img
                    src={lcca}
                    alt="LCCA landing page preview"
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.3em] text-sky-400">Landing Page</span>
                    <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">Tailwind</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-white">LCCA Landing Experience</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    A welcoming landing page crafted with clear messaging, thoughtful spacing, and a strong visual flow for easy navigation.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-400">
                    <span className="rounded-full bg-slate-800 px-3 py-1">Landing</span>
                    <span className="rounded-full bg-slate-800 px-3 py-1">UX</span>
                  </div>
                </div>
              </article>

              <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/90 shadow-xl shadow-slate-950/40 transition hover:-translate-y-1 hover:shadow-sky-500/20">
                <div className="h-44 overflow-hidden bg-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
                    alt="Portfolio showcase preview"
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.3em] text-sky-400">Showcase</span>
                    <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">Design</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-white">Portfolio Showcase</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    A modern project presentation layout focused on visual storytelling, clean cards, and a smooth browsing experience.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-400">
                    <span className="rounded-full bg-slate-800 px-3 py-1">Presentation</span>
                    <span className="rounded-full bg-slate-800 px-3 py-1">Layout</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-10 shadow-2xl shadow-slate-950/40">
              <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-400">
                    Contact
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                    Let’s work together to solve your next challenge.
                  </h2>
                  <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
                    I’m available for freelance and full-time opportunities. Send a short message and I’ll get back to you promptly.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 text-slate-300">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-medium text-slate-300">Name</span>
                      <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={inputClass('name')}
                      />
                      {errors.name && <p className="mt-2 text-sm text-rose-300">{errors.name}</p>}
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-slate-300">Email</span>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={inputClass('email')}
                      />
                      {errors.email && <p className="mt-2 text-sm text-rose-300">{errors.email}</p>}
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-300">Subject</span>
                    <input
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project inquiry"
                      className={inputClass('subject')}
                    />
                    {errors.subject && <p className="mt-2 text-sm text-rose-300">{errors.subject}</p>}
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-300">Message</span>
                    <textarea
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project"
                      className={
                        `mt-2 w-full rounded-3xl border px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 ${
                          errors.message ? 'border-rose-500 bg-slate-900/80' : 'border-slate-800 bg-slate-900/90'
                        }`
                      }
                    />
                    {errors.message && <p className="mt-2 text-sm text-rose-300">{errors.message}</p>}
                  </label>
                  {status && (
                    <p className={`text-sm ${status.includes('successfully') ? 'text-sky-300' : 'text-rose-300'}`}>
                      {status}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="fixed right-4 bottom-8 z-50 flex flex-col gap-3 rounded-full bg-slate-950/80 p-2 shadow-2xl shadow-slate-950/40 backdrop-blur-lg">
        <a
href="https://wa.me/+2349150841782++"
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-sky-300 transition hover:bg-sky-500 hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
            <path d="M20.52 3.48A11.92 11.92 0 0012 0C5.373 0 0 5.373 0 12c0 2.115.559 4.096 1.53 5.817L0 24l6.398-1.548A11.922 11.922 0 0012 24c6.627 0 12-5.373 12-12 0-3.206-1.242-6.159-3.48-8.52zM12 21.5a9.48 9.48 0 01-4.88-1.34l-.35-.21-3.8.92.96-3.7-.22-.38A9.44 9.44 0 012.5 12c0-5.247 4.253-9.5 9.5-9.5S21.5 6.753 21.5 12 17.247 21.5 12 21.5zm5.18-6.78c-.25-.12-1.48-.73-1.71-.82-.23-.09-.4-.12-.57.12-.18.25-.7.82-.86.99-.16.18-.31.2-.58.06-.27-.13-1.14-.42-2.17-1.33-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.42.12-.55.12-.12.27-.31.41-.47.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.13-.57-1.37-.78-1.88-.2-.49-.4-.43-.57-.44h-.48c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2 0 1.18.86 2.33.98 2.49.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.57.18 1.09.15 1.5.09.46-.07 1.48-.6 1.69-1.18.21-.59.21-1.1.15-1.2-.06-.1-.23-.16-.48-.28z" />
          </svg>
        </a>
        <a
          href="https://github.com/Chinaka-Fortune?tab=repositories"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-slate-100 transition hover:bg-slate-700"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
            <path d="M12 0a12 12 0 00-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.35-1.77-1.35-1.77-1.1-.75.09-.73.09-.73 1.21.09 1.85 1.24 1.85 1.24 1.08 1.85 2.83 1.32 3.52 1.01.11-.78.42-1.32.76-1.62-2.66-.3-5.45-1.33-5.45-5.92 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.5.12-3.12 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.67 1.62.25 2.82.12 3.12.77.84 1.24 1.9 1.24 3.22 0 4.6-2.8 5.61-5.47 5.91.43.37.82 1.11.82 2.24v3.32c0 .32.22.69.82.57A12 12 0 0012 0z" />
          </svg>
        </a>
        <a
          href="https://linkedin.com/in/fortune-chimezie-chinaka"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-sky-400 transition hover:bg-sky-600 hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
            <path d="M19 0h-14a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5v-14a5 5 0 00-5-5zm-11.5 20h-3v-11h3v11zm-1.5-12.25a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zm13 12.25h-3v-5.5c0-1.3-.03-2.98-1.82-2.98-1.82 0-2.1 1.43-2.1 2.9v5.58h-3v-11h2.88v1.5h.04c.4-.75 1.37-1.54 2.82-1.54 3.02 0 3.58 1.99 3.58 4.57v6.47z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default App;
