import NotFound from "@layouts/404";
import About from "@layouts/About";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import Contact from "@layouts/Contact";
import Default from "@layouts/Default";
import JobsAndCareers from "@layouts/Jobs-and-Careers";
import Login from "@layouts/Login";
import SeoMeta from "@layouts/partials/SeoMeta";
import Signup from "@layouts/Signup";
import SkilledWorkerRecruitment from "@layouts/skilled-worker-recruitment";
import VisaAssistance from "@layouts/visa-assistance";
import EnglishProficiency from "@layouts/proficiency-support";
import { getRegularPage, getSinglePage } from "@lib/contentParser";
import OsceNmc from "@layouts/osce-nmc-support";
import HealthcareRecruitment from "@layouts/healthcare-recruitment";
import LegalServices from "@layouts/immigration-law-advice";
import StudyAbroad from "@layouts/study-abroad";

// for all regular pages
const RegularPages = async ({ params }) => {
  const { regular } = params;
  const pageData = await getRegularPage(regular);
  const { title, meta_title, description, image, noindex, canonical, layout } =
    pageData.frontmatter;
  const { content } = pageData;

  console.log("layout", layout);

  return (
    <GSAPWrapper>
      <SeoMeta
        title={title}
        description={description ? description : content.slice(0, 120)}
        meta_title={meta_title}
        image={image}
        noindex={noindex}
        canonical={canonical}
      />

      {layout === "404" ? (
        <NotFound data={pageData} />
      ) : layout === "about" ? (
        <About data={pageData} />
      ) : layout === "contact" ? (
        <Contact data={pageData} />
      ) : layout === "jobs-and-careers" ? (
        <JobsAndCareers data={pageData} />
      ) : layout === "login" ? (
        <Login data={pageData} />
      ) : layout === "skilled-worker-recruitment" ? (
        <SkilledWorkerRecruitment data={pageData} />
      ) : layout === "visa-assistance" ? (
        <VisaAssistance data={pageData} />
      ) : layout === "proficiency-support" ? (
        <EnglishProficiency data={pageData} />
      ) : layout === "osce-nmc-support" ? (
        <OsceNmc data={pageData} />
      ): layout === "healthcare-recruitment" ? (
        <HealthcareRecruitment data={pageData} />
      ) : layout === "immigration-law-advice" ? (
        <LegalServices data={pageData} />
      ) : layout === "study-abroad" ? (
        <StudyAbroad data={pageData} />
      
      ) : layout === "signup" ? (
        <Signup data={pageData} />
      ) : (
        <Default data={pageData} />
      )}
    </GSAPWrapper>
  );
};
export default RegularPages;

export async function generateStaticParams() {
  const slugs = getSinglePage("content");
  return slugs.map((item) => ({
    regular: item.slug,
  }));
}
