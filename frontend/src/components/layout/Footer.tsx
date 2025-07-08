import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-[#023c40] text-[#EEE5BF] py-8 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Clinic Info */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1"
          >
            <div className="flex items-center mb-4">
              <Image
                src="/logo.png"
                alt="Arogya Therapy Wellness Clinic Logo"
                width={48}
                height={64}
                className="h-16 w-12 mr-3"
                style={{ filter: 'brightness(0) saturate(100%) invert(93%) sepia(5%) saturate(1171%) hue-rotate(13deg) brightness(96%) contrast(92%)' }}
                priority
              />
              <div>
                <h3 className="text-lg font-bold text-[#EEE5BF]">
                  Dr. Serena
                </h3>
                <p className="text-sm text-[#EEE5BF]">Arogya Therapy</p>
                <p className="text-sm text-[#EEE5BF]">Wellness Clinic</p>
              </div>
            </div>
            <p className="text-sm text-[#EEE5BF]">
              Professional counseling services to help you grow and heal.
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4 hover:text-[#3bb6b0] transition-colors duration-300">Contact Info</h3>
            <div className="space-y-2">
              <p className="hover:text-white transition-colors duration-300 cursor-pointer">📞 (+323) 555-0192</p>
              <p className="hover:text-white transition-colors duration-300 cursor-pointer">📍 1287 Maplewood Drive, Los Angeles, CA 90026</p>
              <p className="hover:text-white transition-colors duration-300">
                <a href="mailto:serena@blakepsychology.com" className="hover:text-[#3bb6b0] hover:underline transition-all duration-300">
                  ✉️ serena@blakepsychology.com
                </a>
              </p>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 hover:text-[#3bb6b0] transition-colors duration-300">Quick Links</h3>
            <ul className="space-y-2">
              <motion.li whileHover={{ x: 5 }}>
                <Link href="/" className="hover:text-[#3bb6b0] hover:underline transition-all duration-300 hover:pl-2">Home</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link href="/services" className="hover:text-[#3bb6b0] hover:underline transition-all duration-300 hover:pl-2">Services</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link href="/#about" className="hover:text-[#3bb6b0] hover:underline transition-all duration-300 hover:pl-2">About</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link href="/#testimonial" className="hover:text-[#3bb6b0] hover:underline transition-all duration-300 hover:pl-2">Testimonial</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link href="/#faq" className="hover:text-[#3bb6b0] hover:underline transition-all duration-300 hover:pl-2">FAQ & Prices</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link href="/contact" className="hover:text-[#3bb6b0] hover:underline transition-all duration-300 hover:pl-2">Contact</Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Office Hours */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4 hover:text-[#3bb6b0] transition-colors duration-300">Office Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="hover:text-white transition-colors duration-300">
                <strong>In-person:</strong><br/>
                Tue & Thu, 10 AM-6 PM
              </div>
              <div className="hover:text-white transition-colors duration-300">
                <strong>Virtual via Zoom:</strong><br/>
                Mon, Wed & Fri, 1 PM-5 PM
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-[#EEE5BF]/20 mt-8 pt-8 text-center text-sm"
        >
          <p className="hover:text-[#3bb6b0] transition-colors duration-300 cursor-pointer">
            &copy; 2025 <span className="hover:underline transition-all duration-300">Arogya Therapy Wellness Clinic.</span> All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
