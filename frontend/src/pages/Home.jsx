import React from "react";
import heroImage01 from "../assets/images/hero-img01.png";
import heroImage02 from "../assets/images/hero-img02.png";
import heroImage03 from "../assets/images/hero-img03.png";
import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import featureimg from "../assets/images/feature-img.png";
import faqImg from "../assets/images/faq-img.png";
import videoIcon from "../assets/images/video-icon.png";
import avatarIcon from "../assets/images/avatar-icon.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { FaUserMd, FaRobot, FaHeartbeat, FaCalendarCheck, FaVideo, FaPills, FaSearch, FaShieldAlt } from "react-icons/fa";
import { MdHealthAndSafety, MdOutlineEmergency } from "react-icons/md";
import About from "../components/About/About";
import DoctorList from "../components/Doctors/DoctorList";
import FaqList from "../components/Faq/FaqList";
import Testimonial from "../components/Testimonial/Testimonial";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate(); // Get the navigate function from useNavigate
  const bookAppointment = async () => {
    toast.success("Find your Doctor");
    navigate("/doctors"); // Redirect to the /doctors route
  };
  return (
    <>
      {/* ========== Hero Section ========== */}
      <section className="hero__section pt-[60px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            {/* ========== Hero Content ========== */}
            <div>
              <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[45px] md:leading-[70px]">
                  Your Complete Digital Healthcare Platform - Book Doctors & Get AI-Powered Health Insights
                </h1>
                <p className="text__para">
                  <strong>Health-O-Plus</strong> brings healthcare to your fingertips. Book doctor appointments instantly, chat with our AI doctor for disease identification, predict health conditions using advanced AI models, and manage your complete health journey - all in one platform.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <button onClick={bookAppointment} className="btn">
                    Book Appointment Now
                  </button>
                  <Link to="/ai-consult" className="btn bg-purpleColor hover:bg-purple-700">
                    Chat with AI Doctor
                  </Link>
                </div>
              </div>
              {/* ========== Hero Counter */}
              <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    500+
                  </h2>
                  <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span>
                  <p className="text__para">Expert Doctors</p>
                </div>

                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    15+
                  </h2>
                  <span className="w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]"></span>
                  <p className="text__para">AI Disease Models</p>
                </div>

                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    100%
                  </h2>
                  <span className="w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]"></span>
                  <p className="text__para">Patient Satisfaction</p>
                </div>
              </div>
            </div>
            {/* ========== Hero Content ========== */}

            <div className="flex gap-[30px] justify-end">
              <div>
                <img src={heroImage01} className="w-full" alt="" />
              </div>
              <div className="mt-[30px]">
                <img src={heroImage02} className="w-full mb-[30px]" alt="" />
                <img src={heroImage03} className="w-full" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ========== Hero Section End ========== */}

      {/* ========== What We Offer Section ========== */}
      <section className="py-[75px]">
        <div className="container">
          <div className="lg:w-[600px] mx-auto">
            <h2 className="heading text-center">
              What We Offer - Your Complete Healthcare Solution
            </h2>
            <p className="text__para text-center">
              Health-O-Plus is your one-stop digital healthcare platform. From booking doctor appointments to AI-powered disease detection - we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            {/* Feature 1: Find & Book Doctors */}
            <div className="py-[30px] px-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
              <div className="flex items-center justify-center">
                <div className="w-[70px] h-[70px] rounded-full bg-[#CCF0F3] flex items-center justify-center">
                  <FaUserMd className="text-[32px] text-primaryColor" />
                </div>
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[22px] leading-9 text-headingColor font-[700] text-center">
                  Find & Book Doctors
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  Search from 500+ verified doctors across specialties. Book appointments with just a few clicks - no waiting, no hassle!
                </p>
                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>

            {/* Feature 2: AI Doctor Consultation */}
            <div className="py-[30px] px-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
              <div className="flex items-center justify-center">
                <div className="w-[70px] h-[70px] rounded-full bg-[#FFF9EA] flex items-center justify-center">
                  <FaRobot className="text-[32px] text-yellowColor" />
                </div>
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[22px] leading-9 text-headingColor font-[700] text-center">
                  AI Doctor Chat
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  Chat with our intelligent AI doctor 24/7. Get instant health advice, symptom analysis, and understand your conditions better.
                </p>
                <Link
                  to="/ai-consult"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>

            {/* Feature 3: Disease Prediction */}
            <div className="py-[30px] px-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
              <div className="flex items-center justify-center">
                <div className="w-[70px] h-[70px] rounded-full bg-[#FEF1F1] flex items-center justify-center">
                  <FaHeartbeat className="text-[32px] text-red-500" />
                </div>
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[22px] leading-9 text-headingColor font-[700] text-center">
                  AI Disease Prediction
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  Advanced AI models to predict Heart Disease, Kidney Disease, Liver Disease, Diabetes, Pneumonia, Malaria & more!
                </p>
                <Link
                  to="/disease"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>

            {/* Feature 4: Video Consultation */}
            <div className="py-[30px] px-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
              <div className="flex items-center justify-center">
                <div className="w-[70px] h-[70px] rounded-full bg-[#E8F5E9] flex items-center justify-center">
                  <FaVideo className="text-[32px] text-green-600" />
                </div>
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[22px] leading-9 text-headingColor font-[700] text-center">
                  Video Consultation
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  Connect face-to-face with doctors via secure video calls. Get diagnosed and treated from the comfort of your home.
                </p>
                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>

            {/* Feature 5: Health Records */}
            <div className="py-[30px] px-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
              <div className="flex items-center justify-center">
                <div className="w-[70px] h-[70px] rounded-full bg-[#F3E5F5] flex items-center justify-center">
                  <MdHealthAndSafety className="text-[32px] text-purple-600" />
                </div>
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[22px] leading-9 text-headingColor font-[700] text-center">
                  Medical Records
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  Store and access your complete medical history, prescriptions, test reports securely. Share with doctors instantly.
                </p>
                <Link
                  to="/users/profile/me"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>

            {/* Feature 6: Medication Reminders */}
            <div className="py-[30px] px-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
              <div className="flex items-center justify-center">
                <div className="w-[70px] h-[70px] rounded-full bg-[#E3F2FD] flex items-center justify-center">
                  <FaPills className="text-[32px] text-blue-600" />
                </div>
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[22px] leading-9 text-headingColor font-[700] text-center">
                  Medication Reminders
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  Never miss a dose! Set up smart medication reminders and track your health vitals regularly for better health management.
                </p>
                <Link
                  to="/users/profile/me"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== About Section ========== */}
      <About />
      {/* ========== About Section end ========== */}

      {/* ========== How It Works Section ========== */}
      <section className="bg-[#f7f8fa] py-[75px]">
        <div className="container">
          <div className="lg:w-[600px] mx-auto mb-[50px]">
            <h2 className="heading text-center">
              How Health-O-Plus Works
            </h2>
            <p className="text__para text-center">
              Get started with your digital healthcare journey in 3 simple steps
            </p>
          </div>

          <div className="flex items-center justify-between flex-col lg:flex-row gap-10">
            {/* ========== Steps Content ========== */}
            <div className="xl:w-[670px]">
              <div className="flex items-start gap-5 mb-8">
                <div className="w-[50px] h-[50px] rounded-full bg-primaryColor flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-[20px] font-[700] text-headingColor mb-2">Create Your Account</h3>
                  <p className="text__para !mt-0">Sign up in seconds with your email. Set up your health profile and preferences for a personalized experience.</p>
                </div>
              </div>

              <div className="flex items-start gap-5 mb-8">
                <div className="w-[50px] h-[50px] rounded-full bg-yellowColor flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-[20px] font-[700] text-headingColor mb-2">Find Doctors or Use AI Features</h3>
                  <p className="text__para !mt-0">Search for specialists, chat with AI doctor for instant advice, or use our disease prediction tools to understand your health better.</p>
                </div>
              </div>

              <div className="flex items-start gap-5 mb-8">
                <div className="w-[50px] h-[50px] rounded-full bg-irisBlueColor flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-[20px] font-[700] text-headingColor mb-2">Book & Consult</h3>
                  <p className="text__para !mt-0">Book appointments instantly, have video consultations, receive digital prescriptions, and manage all your health records in one place.</p>
                </div>
              </div>

              <Link to="/register">
                <button className="btn">Get Started Free</button>
              </Link>
            </div>

            {/* ========== Feature Image ========== */}
            <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0">
              <img src={featureimg} className="w-3/4" alt="" />

              <div className="w-[150px] lg:w-[248px] bg-white absolute bottom-[50px] left-0 md:bottom-[100px] md:left-5 z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px] shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[6px] lg:gap-3">
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-[600]">
                      Today
                    </p>
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-textColor font-[400]">
                      10:00AM
                    </p>
                  </div>
                  <span className="w-5 h-5 lg:w-[34px] lg:h-[34px] flex items-center justify-center bg-yellowColor rounded py-1 px-[6px] lg:py-3 lg:px-[9px]">
                    <img src={videoIcon} alt="" />
                  </span>
                </div>

                <div className="w-[80px] lg:w-[120px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-[8px] leading-[8px] lg:text-[12px] lg:leading-4 text-irisBlueColor font-[500] mt-2 lg:mt-4 rounded-full">
                  Video Consult
                </div>
                <div className="flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]">
                  <img src={avatarIcon} alt="" />
                  <h4 className="text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700] text-headingColor">
                    Dr. Expert
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ========== How It Works Section end ========== */}

      {/* ========== AI Features Highlight Section ========== */}
      <section className="py-[75px]">
        <div className="container">
          <div className="lg:w-[600px] mx-auto mb-[50px]">
            <h2 className="heading text-center">
              Powered by Advanced AI Technology
            </h2>
            <p className="text__para text-center">
              Our AI-powered tools help you understand and manage your health better than ever before
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/disease" className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] block">
              <FaHeartbeat className="text-[40px] text-red-500 mb-4" />
              <h3 className="text-[18px] font-[700] text-headingColor mb-2">Heart Disease</h3>
              <p className="text-[14px] text-textColor">Predict heart disease risk based on your health parameters</p>
            </Link>

            <Link to="/disease" className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] block">
              <MdHealthAndSafety className="text-[40px] text-blue-500 mb-4" />
              <h3 className="text-[18px] font-[700] text-headingColor mb-2">Kidney Disease</h3>
              <p className="text-[14px] text-textColor">Early detection of kidney issues with AI analysis</p>
            </Link>

            <Link to="/disease" className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] block">
              <FaShieldAlt className="text-[40px] text-green-500 mb-4" />
              <h3 className="text-[18px] font-[700] text-headingColor mb-2">Liver Disease</h3>
              <p className="text-[14px] text-textColor">Liver health assessment through smart predictions</p>
            </Link>

            <Link to="/disease" className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] block">
              <FaSearch className="text-[40px] text-purple-500 mb-4" />
              <h3 className="text-[18px] font-[700] text-headingColor mb-2">Symptom Checker</h3>
              <p className="text-[14px] text-textColor">Identify diseases by entering your symptoms</p>
            </Link>
          </div>

          <div className="text-center mt-10">
            <Link to="/disease">
              <button className="btn">Explore All AI Tools</button>
            </Link>
          </div>
        </div>
      </section>
      {/* ========== AI Features Highlight Section end ========== */}

      {/* ========== Our Great Doctors Section ========== */}
      <section className="py-[75px] bg-[#f7f8fa]">
        <div className="container">
          <div className="xl:w-[600px] mx-auto">
            <h2 className="heading text-center">Meet Our Expert Doctors</h2>
            <p className="text__para text-center">
              Verified and experienced healthcare professionals ready to help you. Book appointments with specialists across all medical fields.
            </p>
          </div>
          <DoctorList />
          <div className="text-center mt-10">
            <Link to="/doctors">
              <button className="btn">View All Doctors</button>
            </Link>
          </div>
        </div>
      </section>
      {/* ========== Our Great Doctors Section end ========== */}

      {/* ========== Faqs Section ========== */}
      <section>
        <div className="container">
          <div className="flex justify-between gap-[50px] lg:gap-0">
            <div className="w-1/2 hidden md:block">
              <img src={faqImg} alt="" />
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="heading">
                Most questions asked by our beloved customers !
              </h2>
              <FaqList />
            </div>
          </div>
        </div>
      </section>
      {/* ========== Faqs Section end ========== */}

      {/* ========== Testimonial Section ========== */}
      <section className="py-[75px]">
        <div className="container">
          <div className="xl:w-[600px] mx-auto">
            <h2 className="heading text-center">What Our Patients Say</h2>
            <p className="text__para text-center">
              Join thousands of satisfied patients who trust Health-O-Plus for their healthcare needs.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
      {/* ========== Testimonial Section end ========== */}

      {/* ========== CTA Section ========== */}
      <section className="py-[75px] bg-primaryColor">
        <div className="container">
          <div className="text-center">
            <h2 className="text-[32px] md:text-[40px] font-[800] text-white mb-4">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-[18px] text-white opacity-90 mb-8 max-w-[600px] mx-auto">
              Join Health-O-Plus today and experience healthcare like never before. Book doctors, chat with AI, and predict diseases - all at your fingertips!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/register">
                <button className="bg-white text-primaryColor px-8 py-4 rounded-[50px] font-[600] hover:bg-gray-100 transition-all duration-300">
                  Create Free Account
                </button>
              </Link>
              <Link to="/doctors">
                <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-[50px] font-[600] hover:bg-white hover:text-primaryColor transition-all duration-300">
                  Find a Doctor
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* ========== CTA Section end ========== */}
    </>
  );
};

export default Home;
