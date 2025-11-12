import { GraduationCap, Globe, FileText, Home, Plane, Headphones, CheckCircle, BookOpen, Users, Award } from 'lucide-react';
import Banner from "./components/Banner";

const StudyAbroad = ({ data }) => {
  const { frontmatter } = data;
  const { title } = frontmatter;

  const services = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Personalized Counseling",
      description: "We help you choose the right course and destination that matches your career goals and budget"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Application Support",
      description: "From completing application forms to preparing strong personal statements and resumes"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Visa Guidance",
      description: "Expert support in securing your student visa with proper documentation and advice"
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Accommodation Assistance",
      description: "Finding safe, affordable housing near your institution"
    },
    {
      icon: <Plane className="w-6 h-6" />,
      title: "Pre-Departure Orientation",
      description: "Preparing you for life abroad, from cultural integration to academic expectations"
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Ongoing Support",
      description: "Our team remains available to support you throughout your academic journey"
    }
  ];

  const benefits = [
    "Strategic partnerships with top-tier universities",
    "Wide array of academic disciplines",
    "Dynamic learning environments",
    "Access to esteemed faculty",
    "Global network of peers",
    "Career advancement opportunities"
  ];

  const partnerSchools = [
    {
      name: "AIB Management and Business School",
      location: "Lyon, France",
      logo: "/images/AAIB.png"
    },
    {
      name: "Mesoyios College",
      location: "Cyprus",
      logo: "/images/mesoyios-logo.png"
    },
    {
      name: "CIMT College",
      location: "United Kingdom",
      logo: "/images/cimt-logo.png"
    },
    {
      name: "Newton's Grove School",
      location: "United Kingdom",
      logo: "/images/newtons-logo.png"
    }
  ];

  return (
    <section className="section pt-0">
      <Banner title={title} />
      
      {/* Hero Section */}
      <div className="container">
        <div className="section row items-center justify-center">
          <div className="animate lg:col-5">
            <div className="relative">
              <img 
                src="https://www.shutterstock.com/image-photo/diversity-students-walking-on-university-600nw-2247481601.jpg" 
                alt="Students studying abroad"
                className="w-full rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Global Education</div>
                    <div className="text-sm text-slate-600">Your journey starts here</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate lg:col-5">
            <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6 section-title bar-left mt-4">
              Do You Need to Study Abroad?
            </h2>
            
            <p className="text-md leading-relaxed mb-6">
              At North Devon Recruitment, we go beyond recruitment and healthcare services — we are committed to empowering your future through global education. Our Study Abroad Service is designed to guide students, professionals, and families through every step of the journey to international education.
            </p>

            <p className="text-md leading-relaxed mb-6">
              Whether you are seeking undergraduate, postgraduate, or professional programs, we partner with leading universities and colleges worldwide to provide you with a clear path to success.
            </p>

            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
              <p className="text-slate-700 font-medium">
                With our strong network, experience, and dedication, we ensure that studying abroad is no longer a dream but an achievable reality. <span className="text-primary font-semibold">We believe education is the key to opportunity — and the world is waiting for you.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What We Offer Section */}
      <div className="section container">
        <div className="animate text-center mb-16">
          <p className="text-primary font-medium">Our Services</p>
          <h2 className="text-3xl mt-4">What We Offer</h2>
          <p className="text-md max-w-2xl mx-auto mt-4">
            Comprehensive support from application to graduation — we're with you every step of the way
          </p>
        </div>

        <div className="row justify-center">
          {services.map((service, index) => (
            <div key={index} className="animate mt-10 md:col-6 lg:col-4">
              <div className="group bg-gradient-to-br from-slate-50 to-orange-50 rounded-2xl p-8 hover:shadow-xl transition duration-300 border border-slate-200 hover:border-orange-300 h-full">
                <div className="bg-primary text-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  {service.icon}
                </div>
                <h2 className="text-xl text-slate-900 mb-3">{service.title}</h2>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Study Abroad Experience Section */}
      <div className="section container">
        <div className="row items-center justify-center">
          <div className="animate lg:col-5 lg:order-2">
            <div className="relative p-8">
              <img 
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80" 
                alt="University campus"
                className="w-full rounded-3xl shadow-2xl"
              />
            </div>
          </div>

          <div className="animate lg:col-5 lg:order-1">
            <p className="text-primary font-medium">Transform Your Future</p>
            <h2 className="text-3xl mt-4 mb-6">
              Study Abroad Excellence
            </h2>
            <p className="text-md text-slate-600 mb-6">
              Embark on a transformative journey with our distinguished study abroad programs, meticulously crafted to provide students with unparalleled educational experiences worldwide.
            </p>
            <p className="text-md text-slate-600 mb-8">
              Whether you aim to elevate your academic credentials, immerse yourself in diverse cultures, or gain a competitive edge in your career, our strategic partnerships with top-tier universities and institutions offer the ideal platform for success.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-slate-700 font-medium text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Partner Schools Section */}
      <div className="section container">
        <div className="animate text-center mb-16">
          <p className="text-primary font-medium">Our Partners</p>
          <h2 className="text-3xl mt-4">Partner Universities & Colleges</h2>
          <p className="text-md max-w-2xl mx-auto mt-4">
            We collaborate with prestigious institutions worldwide to provide you with quality education
          </p>
        </div>

        <div className="row justify-center">
          {partnerSchools.map((school, index) => (
            <div key={index} className="animate md:col-6 lg:col-3 mt-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center border-2 border-slate-100 hover:border-primary hover:shadow-xl transition duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-center mb-6 h-24">
                    <img 
                      src={school.logo}
                      alt={`${school.name} Logo`}
                      className="max-h-20 max-w-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{school.name}</h3>
                  <p className="text-sm text-slate-600 mb-4">{school.location}</p>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-center space-x-2 text-primary text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    <span>Partner Institution</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


    </section>
  );
};

export default StudyAbroad;