import { Briefcase, Sparkles, Users, CheckCircle, ArrowRight } from 'lucide-react';
import Banner from "./components/Banner";

const SkilledWorkerRecruitment = ({ data })  =>  {
    const { frontmatter } = data;
  const { title } = frontmatter;
  const features = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Licensed Employers",
      description: "Connect with verified companies authorized to sponsor work visas"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Tailored Matching",
      description: "Get matched with roles that align with your skills and career goals"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert Support",
      description: "Dedicated team guiding you through every step of the process"
    }
  ];

  const benefits = [
    "Access to exclusive job opportunities",
    "Visa sponsorship guidance",
    "Resume and interview preparation",
    "Ongoing career support",
    "Fast-track application process",
    "Multi-sector placement options"
  ];

  return (
    <section className="section pt-0">
      <Banner title={title} />
      {/* Hero Section */}
      <div className="container">
        <div className="section row items-center justify-center">
          <div className="animate lg:col-5">
            <div className="relative p-[60px]">
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80" 
                alt="Professional team meeting"
                className="relative w-full rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Visa Approved!</div>
                    <div className="text-sm text-slate-600">Join 500+ success stories</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="animate lg:col-5">
            
            <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6 section-title bar-left mt-4">
              Skilled Worker & Creative Worker Job Placements
            </h2>
            
            <p className="text-md text-slate-600 leading-relaxed mb-8">
              We connect qualified individuals with employers across sectors who are licensed to sponsor Skilled Worker and Creative Worker visas. Whether you're a seasoned professional or entering the UK job market for the first time, our team ensures you're matched with roles that suit your experience and goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="btn btn-primary block">
                <span>Start Your Journey</span>

              </button>
              <button className="btn btn-outline-primary">
                Learn More
              </button>
            </div>

            <div className="flex items-center space-x-8">
              <div>
                <div className="text-3xl text-primary">500+</div>
                <div className="text-sm">Successful Placements</div>
              </div>
              <div className="h-12 w-px bg-slate-300"></div>
              <div>
                <div className="text-3xl text-primary">200+</div>
                <div className="text-sm">Partner Employers</div>
              </div>
              <div className="h-12 w-px bg-slate-300"></div>
              <div>
                <div className="text-3xl text-primary">95%</div>
                <div className="text-sm">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="section container">
        <div className="animate text-center mb-16">
          <p className="text-primary font-medium">Our Services</p>
          <h2 className="text-3xl font-bold mt-4">Why Choose Us</h2>
          <p className="text-md max-w-2xl mx-auto mt-4">
            We provide comprehensive support to ensure your smooth transition into the job market
          </p>
        </div>

        <div className="row justify-center">
          {features.map((feature, index) => (
            <div key={index} className="animate mt-10 md:col-6 lg:col-4">
              <div className="group bg-gradient-to-br from-slate-50 to-orange-50 rounded-2xl p-8 hover:shadow-xl transition duration-300 border border-slate-200 hover:border-orange-300 h-full">
                <div className="bg-primary text-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  {feature.icon}
                </div>
                <h3 className="text-xl mb-3">{feature.title}</h3>
                <p className="leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      {/* <div className="section container">
        <div className="">
          <div className="animate lg:col-5">
            <p className="text-primary font-medium">Your Success</p>
            <h2 className="text-4xl font-bold text-slate-900 mt-4 mb-6">
              Your Path to UK Employment
            </h2>
            <p className="text-slate-600 text-lg mb-8">
              From initial consultation to successful placement, we're with you every step of the way. Our comprehensive service includes everything you need to secure your dream role in the UK.
            </p>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-slate-700 text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default SkilledWorkerRecruitment;