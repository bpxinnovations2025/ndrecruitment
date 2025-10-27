"use client";

import Banner from "./components/Banner";
import JobOpenings from "./components/JobOpenings";

import { useAuth } from "context/AuthContext";

const JobsAndCareers = ({ data }) => {
  const { frontmatter } = data;
  const { title } = frontmatter;

  const { isLoggedIn, user } = useAuth();

  return (
    <>
      <section className="section pt-0 ">
        <Banner title={title} />
        <JobOpenings />
      </section>
    </>
  );
};

export default JobsAndCareers;
