import React, { useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import Image from 'next/image';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  phone: Yup.string()
    .matches(/^[0-9+\-()\s]+$/, 'Invalid phone number')
    .required('Phone is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  reason: Yup.string().required('This field is required'),
  preferredTime: Yup.string().required('Preferred time is required'),
  agree: Yup.boolean().oneOf([true], 'You must agree to be contacted'),
  recaptcha: Yup.string().required('Please complete the reCAPTCHA verification'),
});

function Contact() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      reason: '',
      preferredTime: '',
      agree: false,
      recaptcha: '',
    },
    validationSchema,
    onSubmit: values => {
      console.log(values);
      setShowSuccessModal(true);
      // Reset form and reCAPTCHA after submission
      formik.resetForm();
      recaptchaRef.current?.reset();
    },
  });

  const handleRecaptchaChange = (value: string | null) => {
    formik.setFieldValue('recaptcha', value || '');
  };

  return (
    <>
      <div className="bg-[#3bb6b0] min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left Side - Dr. Profile */}
            <div className="bg-[#EEE5BF] rounded-2xl shadow-lg p-8">
              <div className="text-center mb-6">
                <Image
                  src="/dr_serena.jpg"
                  alt="Dr. Serena Blake"
                  width={192}
                  height={192}
                  className="w-48 h-48 mx-auto object-cover rounded-full border-4 border-[#3bb6b0] mb-4"
                  priority
                />
                <h2 className="text-2xl font-bold text-[#023c40] mb-2">
                  Dr. Serena Blake, PsyD
                </h2>
                <p className="text-[#023c40] font-medium">Clinical Psychologist</p>
              </div>
              
              <div className="space-y-4 text-[#023c40]">
                <div>
                  <h3 className="text-lg font-semibold text-[#3bb6b0] mb-2">About Dr. Blake</h3>
                  <p className="text-sm leading-relaxed">
                    Dr. Serena Blake is a licensed clinical psychologist with eight years of experience 
                    and over 500 client sessions. She specializes in anxiety, relationship counseling, 
                    and trauma recovery using evidence-based approaches.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-[#3bb6b0] mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Phone:</strong> (+323) 555-0192
                    </div>
                    <div>
                      <strong>Email:</strong> <a href="mailto:serena@blakepsychology.com" className="text-[#3bb6b0] underline">serena@blakepsychology.com</a>
                    </div>
                    <div>
                      <strong>Office:</strong> 1287 Maplewood Drive, Los Angeles, CA 90026
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-[#3bb6b0] mb-2">Office Hours</h4>
                  <ul className="text-sm space-y-1">
                    <li>• In-person: Tuesday & Thursday, 10 AM-6 PM</li>
                    <li>• Virtual via Zoom: Monday, Wednesday & Friday, 1 PM-5 PM</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-[#3bb6b0] mb-2">Services & Rates</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Individual Counseling: $200/session (50 min)</li>
                    <li>• Family Counseling: $240/session (80 min)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="border-7 border-dashted border-[#EEE5BF] bg-white rounded-2xl shadow-lg p-8">
              <h1 className="text-3xl font-bold text-[#3bb6b0] mb-2 text-center">Contact Us</h1>
              <p className="text-[#2a2e4b] text-center mb-8">
                Ready to start your journey? Fill out the form below and we'll get back to you within 24 hours.
              </p>
              
              <form onSubmit={formik.handleSubmit} noValidate className="space-y-6">
                <div>
                  <label className="block text-[#2a2e4b] font-medium mb-2">
                    Full Name *
                    <input
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3bb6b0] focus:border-[#3bb6b0]"
                      placeholder="Enter your full name"
                    />
                  </label>
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                  )}
                </div>

                <div>
                  <label className="block text-[#2a2e4b] font-medium mb-2">
                    Phone Number *
                    <input
                      type="text"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3bb6b0] focus:border-[#3bb6b0]"
                      placeholder="(123) 456-7890"
                    />
                  </label>
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
                  )}
                </div>

                <div>
                  <label className="block text-[#2a2e4b] font-medium mb-2">
                    Email Address *
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3bb6b0] focus:border-[#3bb6b0]"
                      placeholder="your.email@example.com"
                    />
                  </label>
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                  )}
                </div>

                <div>
                  <label className="block text-[#2a2e4b] font-medium mb-2">
                    What brings you here? *
                    <textarea
                      name="reason"
                      value={formik.values.reason}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3bb6b0] focus:border-[#3bb6b0]"
                      rows={4}
                      placeholder="Tell us about your needs and what you're hoping to achieve..."
                    />
                  </label>
                  {formik.touched.reason && formik.errors.reason && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.reason}</div>
                  )}
                </div>

                <div>
                  <label className="block text-[#2a2e4b] font-medium mb-2">
                    Preferred time to reach you *
                    <input
                      type="text"
                      name="preferredTime"
                      value={formik.values.preferredTime}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3bb6b0] focus:border-[#3bb6b0]"
                      placeholder="e.g., Weekdays 9AM-5PM, Evenings after 6PM"
                    />
                  </label>
                  {formik.touched.preferredTime && formik.errors.preferredTime && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.preferredTime}</div>
                  )}
                </div>

                {/* Consent Checkbox - Simplified with better spacing and clearer label */}
                <div className="mb-4">
                  <label className="flex items-start space-x-3 cursor-pointer group">
                    <div className="flex h-5 items-center">
                      <input
                        type="checkbox"
                        name="agree"
                        checked={formik.values.agree}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="h-4 w-4 rounded border-gray-300 text-[#3bb6b0] focus:ring-[#3bb6b0] transition-colors group-hover:border-[#3bb6b0]"
                        aria-describedby="agree-description"
                      />
                    </div>
                    <span id="agree-description" className="text-[#2a2e4b] text-sm">
                      I agree to be contacted by Dr. Serena Blake&apos;s office regarding my inquiry. 
                      I understand that this form is not for emergency situations.
                    </span>
                  </label>
                  {formik.touched.agree && formik.errors.agree && (
                    <div className="text-red-500 text-sm mt-1 ml-7">{formik.errors.agree}</div>
                  )}
                </div>

                <div className="mb-6">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Test site key, replace with your actual site key
                    onChange={handleRecaptchaChange}
                    onExpired={() => formik.setFieldValue('recaptcha', '')}
                    onError={() => formik.setFieldValue('recaptcha', '')}
                  />
                  {formik.touched.recaptcha && formik.errors.recaptcha && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.recaptcha}</div>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#3bb6b0] hover:bg-[#2a9d96] text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#3bb6b0] focus:ring-offset-2"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full relative text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#3bb6b0] mb-2">Message Sent Successfully!</h3>
                <p className="text-[#2a2e4b]">
                  Thank you for reaching out. Dr. Serena Blake will get back to you within 24 hours.
                </p>
              </div>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-[#3bb6b0] hover:bg-[#2a9d96] text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Contact;