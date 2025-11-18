"use client"
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Linkedin } from "lucide-react";
import { DiWebplatform } from "react-icons/di";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-4 md:px-10">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold text-center mb-10 text-gray-800"
      >
        Contact <span className="text-green-600">MamarHat</span>
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-3xl shadow-xl h-fit"
        >
          <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <Mail className="text-green-600" />
              <a className="text-blue-600 underline" href="https://mail.google.com/mail/u/0/#sent?compose=new">ashikkhan314167@gmail.com</a>
            </div>
            <div className="flex gap-4">
              <Phone className="text-green-600" />
              <p className="text-gray-700">+880 10817553134</p>
            </div>
            <div className="flex gap-4">
              <MapPin className="text-green-600" />
              <p className="text-gray-700">Pabna, Bangladesh</p>
            </div>
          </div>

          {/* Social Links */}
          <h3 className="text-xl mt-8 mb-4 font-semibold">Follow Us</h3>
          <div className="flex items-center gap-3 text-xl">
                        <a
                          className="hover:text-blue-500 "
                          target="_blank"
                          href="https://www.facebook.com/story.php/?id=61553457934754&story_fbid=876864877476668"
                        >
                          <Facebook />
                        </a>
                        <a
                          className="hover:text-green-500"
                          target="_blank"
                          href="https://web.whatsapp.com/"
                        >
                          <FaWhatsapp />
                        </a>
                        <a
                          className="hover:text-blue-500"
                          target="_blank"
                          href="https://www.linkedin.com/in/dev-ashikkhan/"
                        >
                          <FaLinkedin />
                        </a>
                        <a target="_blank" href="https://p-ashikkhan.vercel.app/">
                          <DiWebplatform />
                        </a>
                      </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-xl"
        >
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="px-4 py-3 border rounded-xl w-full focus:outline-green-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="px-4 py-3 border rounded-xl w-full focus:outline-green-500"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="px-4 py-3 border rounded-xl w-full focus:outline-green-500 md:col-span-2"
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="px-4 py-3 border rounded-xl w-full focus:outline-green-500 md:col-span-2"
            ></textarea>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-700 transition md:col-span-2 justify-center text-lg"
            >
              <Send /> Send Message
            </button>
          </form>
        </motion.div>
      </div>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-16"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">Our Location</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.898322509179!2d89.2372!3d24.0132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fb6b48c76f43fd%3A0x8b41f633f6292b72!2sPabna!5e0!3m2!1sen!2sbd!4v123456789"
          width="100%"
          height="400"
          className="rounded-3xl shadow-xl border"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </motion.div>
    </div>
  );
}
