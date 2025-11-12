import { FileCheck, Users, Calendar, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import Banner from "./components/Banner";

const VisaAssistance= ({ data })  =>  {
        const { frontmatter } = data;
  const { title } = frontmatter;
  const services = [
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Document Preparation",
      description: "Complete guidance on all required documentation and paperwork"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Application Filing",
      description: "Expert assistance with accurate and timely application submission"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Dependent Visas",
      description: "Support for family members and dependent visa applications"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Compliance Support",
      description: "Ensure all requirements meet UK immigration standards"
    }
  ];

  const visaCategories = [
    "Skilled Worker Visa",
    "Creative Worker Visa",
    "Dependent Visas",
    "Visa Extensions",
    "Settlement Applications",
    "Priority Processing"
  ];

  return (
    <section className="section pt-0">
     <Banner title={title} />
      <div className="container">
        <div className="section row items-center justify-center">
          <div className="animate lg:col-5">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80" 
                alt="Visa consultation and documentation"
                className="w-full rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Expert Guidance</div>
                    <div className="text-sm text-slate-600">Step-by-step support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate lg:col-5">            
            <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6 section-title bar-left mt-4">
              End-to-End Visa Assistance & Consultancy
            </h2>
            
            <p className="text-md leading-relaxed mb-8 ">
              Understanding UK immigration can be overwhelming. Our visa consultancy experts offer step-by-step support, from document preparation to application filing. We focus on Skilled Worker, Creative Worker, and dependent visa categories, ensuring you receive accurate and timely advice every step of the way.
            </p>

          </div>
        </div>
      </div>

      {/* Services Grid Section */}
      <div className="section container">
        <div className="animate text-center mb-16">
          <p className="text-primary font-medium">Our Expertise</p>
          <h2 className="text-3xl mt-4">Comprehensive Visa Services</h2>
          <p className="text-md  max-w-2xl mx-auto mt-4">
            From initial consultation to successful approval, we handle every aspect of your visa application
          </p>
        </div>

        <div className="row justify-center">
          {services.map((service, index) => (
            <div key={index} className="animate mt-10 md:col-6 lg:col-3">
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

      {/* Visa Categories Section */}
      {/* <div className="section container">
        <div className="row items-center justify-center">
          <div className="animate lg:col-5">
            <p className="text-primary font-medium">Visa Categories</p>
            <h2 className="text-4xl font-bold text-slate-900 mt-4 mb-6">
              We Specialize In
            </h2>
            <p className="text-slate-600 text-lg mb-8">
              Our team has extensive experience across multiple UK visa categories. We provide tailored guidance based on your specific situation and goals.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {visaCategories.map((category, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-slate-700 font-medium">{category}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="animate lg:col-5 mt-10 lg:mt-0">
            <div className="rounded-2xl shadow-xl p-8 lg:p-12 bg-gradient-to-br from-primary to-amber-600 text-white">
              <h3 className="text-3xl font-bold mb-6">Why Choose Our Consultancy?</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-lg flex-shrink-0">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Experienced Team</h4>
                    <p className="text-orange-100">Immigration experts with proven track records</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-lg flex-shrink-0">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Accurate Advice</h4>
                    <p className="text-orange-100">Up-to-date knowledge of immigration policies</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-lg flex-shrink-0">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Timely Support</h4>
                    <p className="text-orange-100">Fast response times and efficient processing</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-lg flex-shrink-0">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Personalized Service</h4>
                    <p className="text-orange-100">Tailored solutions for your unique situation</p>
                  </div>
                </div>
              </div>
              <button className="w-full bg-white text-primary py-4 rounded-lg hover:bg-orange-50 transition font-semibold mt-8 flex items-center justify-center space-x-2">
                <span>Schedule Free Assessment</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
}

export default VisaAssistance;