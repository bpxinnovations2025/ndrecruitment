import { Heart, UserCheck, Users, Briefcase, CheckCircle, Building2, TrendingUp } from 'lucide-react';
import Banner from "./components/Banner";

const HealthcareRecruitment = ({ data }) => {
  const { frontmatter } = data;
  const { title } = frontmatter;

  const roles = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Registered Nurses",
      description: "RN positions across specialties including ICU, Emergency, Surgical, and Medical wards"
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Healthcare Assistants",
      description: "Support roles in hospitals, clinics, and care facilities nationwide"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Nursing Auxiliaries",
      description: "Essential care positions in acute and community healthcare settings"
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Support Workers",
      description: "Vital support roles in residential care, nursing homes, and community care"
    }
  ];

  const benefits = [
    "Direct placements with private medical institutions",
    "Long-term employment contracts",
    "Competitive salary packages",
    "Professional development opportunities",
    "Visa sponsorship support",
    "Relocation assistance"
  ];

  const stats = [
    { number: "150+", label: "Partner Institutions" },
    { number: "1000+", label: "Successful Placements" },
    { number: "98%", label: "Retention Rate" },
    { number: "24/7", label: "Candidate Support" }
  ];

  return (
    <section className="section pt-0">
      <Banner title={title} />
      
      {/* Main Content Section */}
      <div className="container">
        <div className="section row items-center justify-center">
          <div className="animate lg:col-5 lg:order-2">
            <div className="relative p-8">
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80" 
                alt="Healthcare professionals in hospital setting"
                className="w-full rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-6 max-w-sm">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Career Growth</div>
                    <div className="text-sm text-slate-600">Long-term opportunities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate lg:col-5 lg:order-1">
            <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6 section-title bar-left mt-4">
              Healthcare Sector Recruitment
            </h2>
            
            <p className="text-md leading-relaxed mb-8">
              We work closely with private medical institutions to place nurses, healthcare assistants, nursing auxiliaries, and support workers. Our strong relationships in the UK healthcare system help us offer our candidates a reliable path into long-term roles.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                  <div className="text-3xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-slate-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Roles Section */}
      <div className="section container">
        <div className="animate text-center mb-16">
          <p className="text-primary font-medium">Available Positions</p>
          <h2 className="text-3xl mt-4">Healthcare Roles We Recruit For</h2>
          <p className="text-md max-w-2xl mx-auto mt-4">
            Find your perfect role in the UK healthcare sector with our expert placement services
          </p>
        </div>

        <div className="row justify-center">
          {roles.map((role, index) => (
            <div key={index} className="animate mt-10 md:col-6 lg:col-3">
              <div className="group relative overflow-hidden bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-slate-200 h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-orange-200 rounded-bl-full opacity-20 group-hover:opacity-30 transition"></div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {role.icon}
                  </div>
                  <h2 className="text-xl text-slate-900 mb-3 font-bold">{role.title}</h2>
                  <p className="text-slate-600 leading-relaxed">{role.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="section container">
        <div className="row items-center justify-center">
          <div className="animate lg:col-5">
            <div className="rounded-3xl shadow-2xl p-10 lg:p-12 bg-white border-2 border-slate-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-primary p-3 rounded-xl">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Why Join Our Network?</h3>
              </div>
              
              <p className="text-slate-600 mb-8">
                We provide comprehensive support beyond just placement. Our commitment is to ensure your success and growth in the UK healthcare sector.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-orange-50 transition">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="animate lg:col-5 mt-10 lg:mt-0">
            <p className="text-primary font-medium mb-4">Our Advantage</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Strong Healthcare Partnerships
            </h2>
            <p className="text-md text-slate-600 mb-8">
              Our established relationships with leading private medical institutions across the UK ensure that we can offer you genuine career opportunities with excellent prospects for growth and development.
            </p>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
                <div className="flex items-start space-x-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Private Hospitals</h4>
                    <p className="text-sm text-slate-600">Premier healthcare facilities offering cutting-edge medical services and excellent working conditions</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
                <div className="flex items-start space-x-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Care Facilities</h4>
                    <p className="text-sm text-slate-600">Residential and nursing homes providing specialized care with supportive team environments</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
                <div className="flex items-start space-x-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Community Services</h4>
                    <p className="text-sm text-slate-600">Home care providers and community health organizations delivering personalized care</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthcareRecruitment;