import { Scale, Shield, Users, FileText, CheckCircle, Lock, Gavel } from 'lucide-react';
import Banner from "./components/Banner";

const LegalServices = ({ data }) => {
  const { frontmatter } = data;
  const { title } = frontmatter;

  const legalServices = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Child Custody Matters",
      description: "Expert legal guidance for custody arrangements and parental rights protection with experienced family law specialists"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Family Reunification Under Immigration Law",
      description: "Comprehensive support for bringing family members to the UK, navigating complex immigration procedures"
    },
    {
      icon: <Gavel className="w-6 h-6" />,
      title: "Workplace Rights & Contract Negotiations",
      description: "Professional representation for employment contracts and workplace disputes to protect your rights"
    }
  ];

  const guarantees = [
    "Strict confidentiality protocols",
    "Experienced immigration lawyers",
    "Professional legal representation",
    "Transparent fee structures",
    "Personalized legal strategies",
    "Ongoing case management"
  ];

  return (
    <section className="section pt-0">
      <Banner title={title} />
      
      {/* Main Content Section */}
      <div className="container">
        <div className="section row items-center justify-center">
          <div className="animate lg:col-5">
            <div className="relative">
              <img 
                src="https://thecolumnofcurae.wordpress.com/wp-content/uploads/2021/09/justice-photo.jpg" 
                alt="Legal consultation and documentation"
                className="w-full rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Confidential</div>
                    <div className="text-sm text-slate-600">Professional legal support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate lg:col-5">
            <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6 section-title bar-left mt-4">
              Comprehensive Legal Services
            </h2>
            
            <p className="text-md leading-relaxed mb-8">
              Our global recruitment services go beyond employment. Through our partnerships with experienced immigration lawyers and legal professionals, we provide confidential, premium legal support, particularly for:
            </p>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-slate-700">Child custody matters</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-slate-700">Family reunification under immigration law</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-slate-700">Workplace rights and contract negotiations</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Services Grid */}
      <div className="section container">
        <div className="animate text-center mb-16">
          <p className="text-primary font-medium">Legal Support</p>
          <h2 className="text-3xl mt-4">Specialized Legal Services</h2>
          <p className="text-md max-w-2xl mx-auto mt-4">
            Expert legal counsel for critical matters affecting you and your family
          </p>
        </div>

        <div className="row justify-center">
          {legalServices.map((service, index) => (
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

      {/* Guarantees Section */}
      <div className="section container">
        <div className="row items-center justify-center">
          <div className="animate lg:col-5">
            <p className="text-primary font-medium">Our Commitment</p>
            <h2 className="text-3xl mt-4 mb-6">
              Professional Legal Standards
            </h2>
            <p className="text-md mb-8">
              We maintain the highest standards of legal practice through our partnerships with qualified immigration lawyers and legal professionals.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {guarantees.map((guarantee, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-slate-700 font-medium">{guarantee}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="animate lg:col-5 mt-10 lg:mt-0">
            <div className="rounded-2xl shadow-xl p-8 lg:p-10 bg-white border border-slate-200">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Confidential Consultations</h3>
              </div>
              
              <p className="text-slate-600 mb-6">
                All legal consultations are conducted under strict attorney-client privilege and handled with the utmost discretion by qualified legal professionals.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <Scale className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Legal Expertise</h4>
                    <p className="text-sm text-slate-600">Connected with top-tier immigration and family law specialists</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Privacy Protected</h4>
                    <p className="text-sm text-slate-600">Your information remains completely confidential throughout the process</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Proven Results</h4>
                    <p className="text-sm text-slate-600">Track record of successful outcomes for our clients</p>
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

export default LegalServices;