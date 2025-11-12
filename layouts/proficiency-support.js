import { BookOpen, Award, Users, Target, CheckCircle, ArrowRight } from 'lucide-react';
import Banner from "./components/Banner";

const EnglishProficiency = ({ data }) => {
  const { frontmatter } = data;
  const { title } = frontmatter;

  const testingPartners = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "IELTS Preparation",
      description: "Comprehensive prep for IELTS Academic & General Training through British Council"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "PTE Academic",
      description: "Streamlined access to Pearson PTE testing with expert guidance"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Other Accepted Exams",
      description: "Support for alternative English proficiency assessments"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Benchmark Guidance",
      description: "Personalized coaching to meet required proficiency levels"
    }
  ];

  const examSupport = [
    "IELTS Academic & General Training",
    "PTE Academic",
    "Cambridge English Qualifications",
    "TOEFL iBT",
    "LanguageCert International ESOL",
    "Trinity College London ISE"
  ];

  const benefits = [
    {
      title: "Partner Access",
      description: "Direct connections with British Council and Pearson PTE for simplified registration"
    },
    {
      title: "Expert Guidance",
      description: "Experienced tutors who understand UK visa language requirements"
    },
    {
      title: "Flexible Schedule",
      description: "Test preparation sessions tailored to your availability and learning pace"
    },
    {
      title: "Score Guarantee",
      description: "Focused training to help you achieve the benchmark scores needed for your visa"
    }
  ];

  return (
    <section className="section pt-0">
      <Banner title={title} />
      
      {/* Main Content Section */}
      <div className="container">
        <div className="section row items-center justify-center">
          <div className="animate lg:col-5 lg:order-2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80" 
                alt="English language learning and testing"
                className="w-full rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Approved Partners</div>
                    <div className="text-sm text-slate-600">British Council & Pearson</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate lg:col-5 lg:order-1">
            <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6 section-title bar-left mt-4">
              English Language Proficiency Support
            </h2>
            
            <p className="text-md leading-relaxed mb-8">
              As most visa categories require proof of English proficiency, we've partnered with British Council and Pearson PTE to provide streamlined access to standardised testing. We guide our clients through IELTS, PTE Academic, and other accepted exams, making sure they meet the required benchmarks.
            </p>
          </div>
        </div>
      </div>

      {/* Testing Partners Section */}
      <div className="section container">
        <div className="animate text-center mb-16">
          <p className="text-primary font-medium">Test Preparation</p>
          <h2 className="text-3xl mt-4">Comprehensive Exam Support</h2>
          <p className="text-md max-w-2xl mx-auto mt-4">
            Expert guidance and direct access to approved English proficiency testing
          </p>
        </div>

        <div className="row justify-center">
          {testingPartners.map((partner, index) => (
            <div key={index} className="animate mt-10 md:col-6 lg:col-3">
              <div className="group bg-gradient-to-br from-slate-50 to-orange-50 rounded-2xl p-8 hover:shadow-xl transition duration-300 border border-slate-200 hover:border-orange-300 h-full">
                <div className="bg-primary text-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  {partner.icon}
                </div>
                <h2 className="text-xl text-slate-900 mb-3">{partner.title}</h2>
                <p className="text-slate-600 leading-relaxed">{partner.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accepted Exams & Benefits Section */}
      <div className="section container">
        <div className="row items-center justify-center">
          <div className="animate lg:col-5">
            <p className="text-primary font-medium">Accepted Qualifications</p>
            <h2 className="text-3xl mt-4 mb-6">
              We Support All UK-Approved Tests
            </h2>
            <p className="text-md mb-8">
              Our team helps you choose and prepare for the right English proficiency exam based on your visa category and current language level.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {examSupport.map((exam, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-slate-700 font-medium">{exam}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="animate lg:col-5 mt-10 lg:mt-0">
            <div className="rounded-2xl shadow-xl p-8 lg:p-10 bg-white border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Why Choose Our Program?</h3>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1 text-slate-900">{benefit.title}</h4>
                      <p className="text-slate-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Logos Section */}
      <div className="section container">
        <div className="animate text-center mb-12">
          <p className="text-primary font-medium">Our Partners</p>
          <h2 className="text-3xl mt-4">Trusted Testing Providers</h2>
        </div>
        <div className="row justify-center items-center">
          <div className="animate md:col-4 lg:col-3">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center border border-slate-200 hover:shadow-xl transition duration-300">
              <div className="flex items-center justify-center mb-4">
                <img 
                  src="/images/BritishCouncil.png"
                  alt="British Council Logo"
                  className="h-16 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-4">British Council</h3>
              <p className="text-sm text-slate-600 mt-2">IELTS Official Provider</p>
            </div>
          </div>
          <div className="animate md:col-4 lg:col-3 mt-6 md:mt-0">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center border border-slate-200 hover:shadow-xl transition duration-300">
              <div className="flex items-center justify-center mb-4">
                <img 
                  src="/images/Pearson-master.png"
                  alt="Pearson PTE Logo"
                  className="h-12 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-4">Pearson PTE</h3>
              <p className="text-sm text-slate-600 mt-2">PTE Academic Provider</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnglishProficiency;