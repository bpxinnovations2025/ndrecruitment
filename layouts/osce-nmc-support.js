import { Stethoscope, ClipboardCheck, GraduationCap, FileText, CheckCircle, Heart } from 'lucide-react';
import Banner from "./components/Banner";

const OsceNmc = ({ data }) => {
  const { frontmatter } = data;
  const { title } = frontmatter;

  const services = [
    {
      icon: <ClipboardCheck className="w-6 h-6" />,
      title: "OSCE Exam Booking",
      description: "Streamlined booking process and scheduling assistance for OSCE examinations"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Preparation Guidance",
      description: "Comprehensive prep materials and expert tutoring for exam success"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "NMC Registration",
      description: "Complete support through the Nursing and Midwifery Council registration process"
    },
    {
      icon: <Stethoscope className="w-6 h-6" />,
      title: "NHS Alignment",
      description: "Ensure your qualifications meet NHS and private sector standards"
    }
  ];

  const nmcRequirements = [
    "OSCE Exam Registration & Booking",
    "CBT Test Preparation",
    "English Language Evidence",
    "Character Reference Support",
    "Application Documentation",
    "Post-Registration Guidance"
  ];

  const whyChooseUs = [
    {
      title: "Healthcare Specialists",
      description: "Our team has extensive experience with international nurse recruitment and UK healthcare requirements",
      icon: <Heart className="w-5 h-5" />
    },
    {
      title: "NMC Expertise",
      description: "In-depth knowledge of current NMC policies, procedures, and registration pathways",
      icon: <FileText className="w-5 h-5" />
    },
    {
      title: "OSCE Success Rate",
      description: "Proven track record of helping nurses pass their OSCE exams on first attempt",
      icon: <CheckCircle className="w-5 h-5" />
    }
  ];

  return (
    <section className="section pt-0">
      <Banner title={title} />
      
      {/* Main Content Section - Reversed Layout */}
      <div className="container">
        <div className="section row items-center justify-center">
          <div className="animate lg:col-5">
            <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6 section-title bar-left mt-4">
              OSCE Exam & NMC Consultation for Healthcare Workers
            </h2>
            
            <p className="text-md leading-relaxed mb-6">
              For internationally trained nurses aiming to practice in the UK, we offer tailored assistance with OSCE exam bookings, preparation guidance, and NMC registration consultations. Our healthcare recruitment specialists ensure you're aligned with NHS and private sector requirements.
            </p>

            <div className="space-y-3">
              {whyChooseUs.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <div className="bg-primary text-white p-2 rounded-lg flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="animate lg:col-5 mt-10 lg:mt-0">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80" 
                alt="Healthcare professional consultation"
                className="w-full rounded-2xl shadow-lg"
              />
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Stethoscope className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">NHS Ready</div>
                    <div className="text-sm text-slate-600">Full NMC Registration</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid Section - Different Card Style */}
      <div className="section container">
        <div className="animate text-center mb-16">
          <p className="text-primary font-medium">Healthcare Services</p>
          <h2 className="text-3xl mt-4">Complete OSCE & NMC Support</h2>
          <p className="text-md max-w-2xl mx-auto mt-4">
            From exam preparation to full registration, we guide you through every step
          </p>
        </div>

        <div className="row justify-center">
          {services.map((service, index) => (
            <div key={index} className="animate mt-10 md:col-6 lg:col-3">
              <div className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition duration-300 border-2 border-slate-100 hover:border-primary h-full">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {service.icon}
                </div>
                <h2 className="text-xl text-slate-900 mb-3 font-bold">{service.title}</h2>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NMC Requirements Section - Horizontal Layout */}
      {/* <div className="section container">
        <div className="row items-center justify-center">
          <div className="animate lg:col-10">
            <div className="bg-gradient-to-br from-primary to-orange-600 rounded-3xl p-10 lg:p-14 text-white shadow-2xl">
              <div className="text-center mb-10">
                <p className="text-orange-100 font-medium">Complete Pathway</p>
                <h2 className="text-3xl lg:text-4xl font-bold mt-3">NMC Registration Services</h2>
                <p className="text-orange-100 text-lg mt-4 max-w-3xl mx-auto">
                  We provide comprehensive support for every requirement of your NMC registration journey
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nmcRequirements.map((requirement, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition">
                    <CheckCircle className="w-5 h-5 text-orange-200 flex-shrink-0" />
                    <span className="font-medium">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Partner Organizations */}
      {/* <div className="section container">
        <div className="animate text-center mb-12">
          <p className="text-primary font-medium">Recognized By</p>
          <h2 className="text-3xl mt-4">Healthcare Regulatory Bodies</h2>
        </div>
        <div className="row justify-center items-center">
          <div className="animate md:col-5 lg:col-4">
            <div className="bg-white rounded-2xl p-10 shadow-lg text-center border-2 border-slate-100 hover:border-primary hover:shadow-xl transition duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                  <Stethoscope className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-4">Nursing and Midwifery Council</h3>
              <p className="text-sm text-slate-600 mt-2">Official UK Healthcare Regulator</p>
            </div>
          </div>
          <div className="animate md:col-5 lg:col-4 mt-6 md:mt-0">
            <div className="bg-white rounded-2xl p-10 shadow-lg text-center border-2 border-slate-100 hover:border-primary hover:shadow-xl transition duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                  <Heart className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-4">National Health Service</h3>
              <p className="text-sm text-slate-600 mt-2">UK's Public Healthcare System</p>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default OsceNmc;