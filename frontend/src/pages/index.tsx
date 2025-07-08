import CounterButton from "../components/CounterButton";
import MapboxMap from "../components/MapBox";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useAnimationFrame } from "framer-motion";
import { testimonials } from "../data/testimonials";
import Image from "next/image";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showServicesPopup, setShowServicesPopup] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  const rollingTexts = useMemo(
    () => [
      "I want to work with you for Greater Purpose in Your Life Direction",
      "Testimonials from 500+ satisfied clients",
      "Media Mentions and Professional Recognition",
      "Start Healing Today with Evidence-Based Therapy",
    ],
    []
  );

  useEffect(() => {
    // Simple text rotation effect
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rollingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [rollingTexts.length]);

  useEffect(() => {
    // Update the displayed text when currentTextIndex changes
    setDisplayText(rollingTexts[currentTextIndex]);
  }, [currentTextIndex, rollingTexts]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "Do you accept insurance?",
      answer: "No, but a superbill is provided for self-submission.",
    },
    {
      question: "Are online sessions available?",
      answer: "Yes—all virtual sessions via Zoom.",
    },
    {
      question: "What is your cancellation policy?",
      answer: "24-hour notice required.",
    },
    {
      question: "What are your session fees?",
      answer: () => (
        <div className="text-[#2a2e4b]">
          <strong>Session Fees:</strong>
          <ul className="ml-5 mt-1 list-disc">
            <li>$200 / individual session</li>
            <li>$240 / couples session</li>
          </ul>
        </div>
      ),
    },
    {
      question: "How long are therapy sessions?",
      answer:
        "Individual sessions are typically 50 minutes, and couples sessions are 80 minutes.",
    },
    {
      question: "How often should I attend therapy?",
      answer:
        "Most clients benefit from weekly sessions initially, though frequency can be adjusted based on your needs and progress.",
    },
    {
      question: "What should I expect in my first session?",
      answer:
        "Your first session will focus on understanding your concerns, discussing your goals, and creating a treatment plan tailored to your needs.",
    },
    {
      question: "Do you offer emergency support?",
      answer:
        "For mental health emergencies, please contact 988 (Suicide & Crisis Lifeline) or go to your nearest emergency room. I am not available for crisis intervention outside of scheduled sessions.",
    },
    {
      question: "How do I know if therapy is working?",
      answer:
        "Progress varies for each person. We'll regularly discuss your goals and assess improvements in your symptoms, relationships, and overall well-being.",
    },
    {
      question: "What therapy approaches do you use?",
      answer:
        "I primarily use cognitive-behavioral therapy (CBT), mindfulness-based interventions, and trauma-informed care, tailored to each client's unique needs.",
    },
    {
      question: "Is therapy confidential?",
      answer:
        "Yes, therapy is confidential with limited exceptions required by law, such as imminent risk of harm to self or others, or suspected child/elder abuse.",
    },
    {
      question: "Can I contact you between sessions?",
      answer:
        "Brief check-ins via email are welcome for scheduling or urgent matters. For clinical concerns, we'll address them in our next scheduled session.",
    },
  ];

  // B-roll animation configuration
  const [pauseAnimation, setPauseAnimation] = useState(false);

  // --- Smooth, frame-based animation for b-roll ---
  // Settings
  const CARD_WIDTH = 336; // px (card width + gap)
  const ROW1_SPEED = 40; // px/sec
  const ROW2_SPEED = 30; // px/sec

  // Motion values for each row
  const row1X = useMotionValue(0);
  const row2X = useMotionValue(0);

  // Store lastX in refs to avoid animation freeze on pause/resume
  const row1LastX = useRef(0);
  const row2LastX = useRef(0);

  // Animation frame for row 1
  useAnimationFrame((t, delta) => {
    if (!pauseAnimation) {
      row1LastX.current -= (ROW1_SPEED * delta) / 1000;
      const totalWidth = CARD_WIDTH * testimonials.length * 2;
      if (row1LastX.current <= -totalWidth / 2) row1LastX.current += totalWidth / 2;
      row1X.set(row1LastX.current);
    }
  });

  // Animation frame for row 2 (reverse direction)
  useAnimationFrame((t, delta) => {
    if (!pauseAnimation) {
      row2LastX.current += (ROW2_SPEED * delta) / 1000;
      const totalWidth = CARD_WIDTH * testimonials.length * 2;
      if (row2LastX.current >= 0) row2LastX.current -= totalWidth / 2;
      row2X.set(row2LastX.current);
    }
  });

  // Reset motion values when pauseAnimation toggles
  useEffect(() => {
    row1X.set(row1LastX.current);
    row2X.set(row2LastX.current);
  }, [pauseAnimation, row1X, row2X]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#f7f7fa] min-h-screen py-8 text-justify"
    >
      {/* Hero Section with Video */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative flex items-center justify-center min-h-[400px] md:min-h-[500px] rounded-3xl overflow-hidden mb-8 mx-4 md:mx-7"
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="../../scenery.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 bg-[#023c40] p-4 md:p-8 rounded-2xl text-center max-w-xs sm:max-w-md md:max-w-2xl w-full mx-4 backdrop-blur-sm"
        >
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-2"
          >
            Dr. Serena Blake, PsyD
          </motion.h1>
          <p className="text-[#3bb6b0] text-sm sm:text-base md:text-lg font-semibold mb-3">
            Professional Counseling for Healing and Growth
          </p>
          <p className="text-white/90 text-xs sm:text-sm md:text-base mb-4">
            Begin your journey today towards spiritual growth, deeper
            relationships, and lasting inner peace.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 text-white">
            <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
              <div className="text-[#3bb6b0] text-xs md:text-sm font-semibold">
                Top Rated
              </div>
              <div className="text-xs">⭐⭐⭐⭐⭐</div>
            </div>
            <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
              <div className="text-[#3bb6b0] text-xs md:text-sm font-semibold">
                8+ Years
              </div>
              <div className="text-xs">Experience</div>
            </div>
            <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
              <div className="text-[#3bb6b0] text-xs md:text-sm font-semibold">
                500+
              </div>
              <div className="text-xs">Sessions</div>
            </div>
            <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
              <div className="text-[#3bb6b0] text-xs md:text-sm font-semibold">
                Purpose
              </div>
              <div className="text-xs">Life Direction</div>
            </div>
          </div>

          {/* simple text display */}
          <div className="h-8 md:h-10 flex items-center justify-center mb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTextIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-white text-sm md:text-base font-medium text-center"
              >
                {displayText}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#3bb6b0] text-white rounded-lg px-6 md:px-8 py-2 md:py-3 text-sm md:text-base font-medium border-none cursor-pointer w-full sm:w-auto relative overflow-hidden shadow-[0_0_20px_rgba(255,0,150,0.6),0_0_40px_rgba(0,255,255,0.4),0_0_60px_rgba(255,255,0,0.3)] hover:shadow-[0_0_30px_rgba(255,0,150,0.8),0_0_60px_rgba(0,255,255,0.6),0_0_90px_rgba(255,255,0,0.5)] transition-shadow duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500 before:via-pink-500 before:to-cyan-500 before:opacity-20 before:blur-xl before:-z-10"
          >
            Book Your First Session
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Enhanced Counter Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-[#023c40] py-12 mb-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#EEE5BF] mb-4">
            Proven Experience You Can Trust
          </h2>
          <p className="text-[#EEE5BF] max-w-2xl mx-auto text-lg">
            With years of dedicated practice and hundreds of successful therapy
            sessions, Dr. Blake brings expertise and compassion to every client
            relationship.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4 flex-wrap z-100 w-full px-4">
          <div className="flex flex-col items-center text-center">
            <CounterButton
              value={8}
              suffix="+"
              label="Years Experience"
              className="bg-[#EEE5BF] text-[#023c40] shadow-[0_4px_12px_rgba(59,182,176,0.3)] hover:shadow-[0_6px_16px_rgba(59,182,176,0.4)] transition-all duration-300"
            />
            <p className="text-[#EEE5BF] text-sm mt-3 max-w-xs">
              Extensive experience in clinical psychology and evidence-based
              therapy approaches
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <CounterButton
              value={500}
              suffix="+"
              label="Sessions Taken"
              className="bg-[#EEE5BF] text-[#023c40] shadow-[0_4px_12px_rgba(59,182,176,0.3)] hover:shadow-[0_6px_16px_rgba(59,182,176,0.4)] transition-all duration-300"
            />
            <p className="text-[#EEE5BF] text-sm mt-3 max-w-xs">
              Helping individuals and families achieve their mental health goals
              through personalized care
            </p>
          </div>
        </div>
      </motion.div>

      {/* How I Help - Services Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-8"
      >
        <div className="bg-white hover:shadow-[0_2px_8px_rgba(42,46,75,0.08)] rounded-2xl p-8 mx-7 w-full">
          <h2 className="text-2xl mb-4 text-[#3bb6b0] font-semibold">
            How I Help
          </h2>
          <ul className="list-none p-0 m-0">
            <li className="text-base mb-2">
              <strong>Anxiety &amp; Stress Management</strong>
            </li>
            <li className="text-base mb-2">
              <strong>Relationship Counseling</strong>
            </li>
            <li className="text-base mb-4">
              <strong>Trauma Recovery</strong>
            </li>
          </ul>
          <button
            onClick={() => setShowServicesPopup(true)}
            className="bg-[#3bb6b0] text-white rounded-lg px-6 py-2 text-sm font-medium border-none cursor-pointer hover:bg-[#2a9d96] transition-colors"
          >
            View Services
          </button>
        </div>
      </motion.div>

      {/* Services Popup */}
      <AnimatePresence>
        {showServicesPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full relative"
            >
              <button
                onClick={() => setShowServicesPopup(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
              <h3 className="text-2xl mb-6 text-[#3bb6b0] font-semibold">
                Our Services
              </h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="text-lg font-semibold text-[#2a2e4b] mb-2">
                    Individual Counseling
                  </h4>
                  <p className="text-[#2a2e4b]">
                    One-on-one therapy sessions focused on your personal growth,
                    mental health, and well-being. Perfect for addressing
                    anxiety, depression, trauma, and personal challenges.
                  </p>
                  <p className="text-[#3bb6b0] font-medium mt-2">
                    $200 per session
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#2a2e4b] mb-2">
                    Family Counseling
                  </h4>
                  <p className="text-[#2a2e4b]">
                    Therapy sessions designed to improve family dynamics,
                    communication, and relationships. Ideal for resolving
                    conflicts and strengthening family bonds.
                  </p>
                  <p className="text-[#3bb6b0] font-medium mt-2">
                    $240 per session
                  </p>
                </div>
              </div>
              <div className="mt-6 text-center"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schedule an Appointment Card */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="flex justify-center"
      >
        <div className="bg-[#e6f6f5] rounded-2xl p-8 w-full text-center">
          <h3 className="text-xl mb-4 text-[#3bb6b0] font-semibold">
            Ready to Begin Your Journey?
          </h3>
          <p className="mb-6 text-[#2a2e4b]">
            Schedule an appointment with Dr. Serena Blake today.
          </p>
          <button className="bg-[#3bb6b0] text-white rounded-lg px-8 py-3 text-base font-medium border-none cursor-pointer">
            Schedule Appointment
          </button>
        </div>
      </motion.div>

      {/* About Section */}
      <div className="flex justify-center" id="about">
        <div className="bg-[#023c40] shadow-[0_2px_8px_rgba(42,46,75,0.08)] p-8 w-full">
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            <Image
              src="/dr_serena.jpg"
              alt="Dr. Serena Blake"
              width={400}
              height={500}
              className="w-full lg:w-[25rem] h-[30rem] object-cover rounded-2xl flex-shrink-0"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl mb-2 text-[#EEE5BF] font-semibold">
                  Dr. Serena Blake, PsyD
                </h2>
                <p className="m-0 text-[#EEE5BF] font-medium">
                  Clinical Psychologist
                </p>
                <p className="my-4 text-[#EEE5BF]">
                  Dr. Serena Blake is a licensed clinical psychologist (PsyD)
                  based in Los Angeles, CA, with eight years of experience and
                  over 500 client sessions. She blends evidence-based
                  approaches&mdash;like cognitive-behavioral therapy and
                  mindfulness&mdash;with compassionate, personalized care to help
                  you overcome anxiety, strengthen relationships, and heal from
                  trauma. Whether you meet in her Maplewood Drive office or
                  connect virtually via Zoom, Dr. Blake is committed to creating
                  a safe, supportive space for you to thrive.
                </p>
              </div>
              <div>
                <div className="mb-2 text-[#EEE5BF]">
                  <strong>Location:</strong> 1287 Maplewood Drive, Los Angeles,
                  CA 90026
                </div>
                <div className="mb-2 text-[#EEE5BF]">
                  <strong>Contact:</strong> (+323) 555-0192 |{" "}
                  <a
                    href="mailto:serena@blakepsychology.com"
                    className="text-[#3bb6b0] underline"
                  >
                    serena@blakepsychology.com
                  </a>
                </div>
                <div className="mb-2 text-[#EEE5BF]">
                  <strong>Office Hours:</strong>
                  <ul className="ml-5 mt-1 list-disc">
                    <li>In-person: Tue &amp; Thu, 10 AM-6 PM</li>
                    <li>Virtual via Zoom: Mon, Wed &amp; Fri, 1 PM-5 PM</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Mapbox Section - Enhanced and Mobile Optimized */}
          <div
            className="w-full bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100"
            id="location"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-[#3bb6b0] mb-2">
                Find Our Office
              </h3>
              <p className="text-[#2a2e4b] text-sm md:text-base">
                Conveniently located in the heart of Los Angeles
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-stretch">
              <div className="flex-1 min-h-[250px] md:min-h-[300px]">
                <MapboxMap
                  address="1287 Maplewood Drive, Los Angeles, CA 90026"
                  className="h-full"
                />
              </div>

              <div className="lg:w-80 bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#3bb6b0] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#2a2e4b] mb-1">
                        Address
                      </h4>
                      <p className="text-[#2a2e4b] text-sm leading-relaxed">
                        1287 Maplewood Drive
                        <br />
                        Los Angeles, CA 90026
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#3bb6b0] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#2a2e4b] mb-1">
                        Phone
                      </h4>
                      <p className="text-[#2a2e4b] text-sm">(+323) 555-0192</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#3bb6b0] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15V9h4v6H8z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#2a2e4b] mb-1">
                        Parking
                      </h4>
                      <p className="text-[#2a2e4b] text-sm">
                        Free street parking available
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <button className="w-full bg-[#3bb6b0] hover:bg-[#2a9d96] text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section - Continuous B-Roll Effect */}
      <div className="py-16 overflow-hidden" id="testimonial">
        <h2 className="text-3xl mb-10 text-[#3bb6b0] font-semibold text-center">
          What Our Clients Say
        </h2>
        <div
          className="relative w-full"
          onMouseEnter={() => setPauseAnimation(true)}
          onMouseLeave={() => setPauseAnimation(false)}
        >
          <div className="relative pb-10">
            {/* First row of testimonials (smooth b-roll) */}
            <motion.div
              className="flex gap-6"
              style={{ x: row1X }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div
                  key={`first-row-${index}`}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="flex-shrink-0 w-[320px] bg-white shadow-lg rounded-xl overflow-hidden relative ticket-card"
                >
                  {/* Ticket holes */}
                  <div className="absolute top-[85px] -left-2 w-4 h-8 bg-[#f7f7fa] rounded-r-full"></div>
                  <div className="absolute top-[85px] -right-2 w-4 h-8 bg-[#f7f7fa] rounded-l-full"></div>
                  
                  {/* Ticket top section */}
                  <div className="relative p-5 bg-gradient-to-r from-[#023c40]/90 to-[#3bb6b0]/90">
                    <div className="flex items-center gap-3">
                      <Image
                        src={testimonial.photo}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full border-2 border-white shadow-md object-cover"
                        priority={index < 2}
                      />
                      <div className="text-white">
                        <h3 className="font-medium text-lg">
                          {testimonial.name}
                        </h3>
                        <div className="text-yellow-300 text-sm flex">★★★★★</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dashed line separator */}
                  <div className="border-dashed border-t-2 border-[#023c40]/20 relative">
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 px-3 bg-white text-[#3bb6b0] text-xs font-bold">
                      TESTIMONIAL
                    </div>
                  </div>
                  
                  {/* Ticket bottom section */}
                  <div className="p-5 pt-6">
                    <div className="text-gray-700 italic text-sm mb-3">
                      &quot;{testimonial.text}&quot;
                    </div>
                    <div className="text-xs text-gray-500 flex justify-between items-center">
                      <span>Client since 2023</span>
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded">#DR-BLAKE</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            {/* Second row of testimonials (reverse, smooth b-roll) */}
            <motion.div
              className="flex gap-6 mt-8"
              style={{ x: row2X }}
            >
              {[...testimonials, ...testimonials].reverse().map((testimonial, index) => (
                <motion.div
                  key={`second-row-${index}`}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="flex-shrink-0 w-[320px] bg-white shadow-lg rounded-xl overflow-hidden relative ticket-card"
                >
                  {/* Ticket holes */}
                  <div className="absolute top-[85px] -left-2 w-4 h-8 bg-[#f7f7fa] rounded-r-full"></div>
                  <div className="absolute top-[85px] -right-2 w-4 h-8 bg-[#f7f7fa] rounded-l-full"></div>
                  
                  {/* Ticket top section */}
                  <div className="relative p-5 bg-gradient-to-r from-[#3bb6b0]/90 to-[#023c40]/90">
                    <div className="flex items-center gap-3">
                      <Image
                        src={testimonial.photo}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full border-2 border-white shadow-md object-cover"
                        priority={index < 2}
                      />
                      <div className="text-white">
                        <h3 className="font-medium text-lg">
                          {testimonial.name}
                        </h3>
                        <div className="text-yellow-300 text-sm flex">★★★★★</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dashed line separator */}
                  <div className="border-dashed border-t-2 border-[#023c40]/20 relative">
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 px-3 bg-white text-[#3bb6b0] text-xs font-bold">
                      TESTIMONIAL
                    </div>
                  </div>
                  
                  {/* Ticket bottom section */}
                  <div className="p-5 pt-6">
                    <div className="text-gray-700 italic text-sm mb-3">
                      &quot;{testimonial.text}&quot;
                    </div>
                    <div className="text-xs text-gray-500 flex justify-between items-center">
                      <span>Client since 2022</span>
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded">#DR-BLAKE</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Gradient overlay to suggest more content */}
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-[#f7f7fa] to-transparent z-10"></div>
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-[#f7f7fa] to-transparent z-10"></div>
          
          {/* Play/pause indicator */}
          <div className={`absolute bottom-0 right-0 mr-4 mb-4 bg-white/80 backdrop-blur-sm rounded-full p-2 transition-opacity ${pauseAnimation ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-[#023c40] text-xs font-medium px-3 py-1">
              {pauseAnimation ? 'Paused ■' : 'Playing ▶'}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="flex justify-center mb-8">
        <div className="bg-white shadow-[0_2px_8px_rgba(42,46,75,0.08)] rounded-2xl p-8 max-w-5xl w-full">
          <h2 className="text-2xl mb-6 text-[#3bb6b0] font-semibold">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-200 pb-4"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex justify-between items-center w-full text-left py-2 text-[#2a2e4b] hover:text-[#3bb6b0] transition-colors"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="font-medium">{faq.question}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ▼
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        key={`answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        id={`faq-answer-${index}`}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 text-[#2a2e4b] pl-4">
                          {typeof faq.answer === "function"
                            ? faq.answer()
                            : faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}