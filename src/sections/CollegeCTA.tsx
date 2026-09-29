import { Link } from "react-router-dom";
import { brand } from "../config/brand";
import { GrowthArrowIcon } from "../components/icons/AcademicIcons";

const CollegeCTA = () => {
  return (
    <section className="bg-[#F5F9FC] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl dark-teal-gradient p-8 text-white shadow-lg sm:p-12 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8 lg:p-16 lg:text-left">
          <div className="lg:col-span-7">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to elevate your academic journey?
            </h2>
            <p className="mt-4 max-w-2xl font-poppins text-base text-[#BBE1F5] sm:text-lg">
              Create a free account to save colleges, build choice lists, and submit applications with expert guidance.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/register"
                className="inline-flex w-full items-center justify-center gap-2 rounded-[0.625rem] bg-[#168FD0] px-6 py-3 font-poppins text-sm font-semibold text-white sm:w-auto"
              >
                Get started
                <GrowthArrowIcon size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center rounded-[0.625rem] border border-[#4DB3E8] px-6 py-3 font-poppins text-sm font-semibold text-white sm:w-auto"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 hidden overflow-hidden rounded-2xl bg-white/10 p-3 lg:col-span-5 lg:mt-0 lg:block">
            <img
              src={brand.images.campus}
              alt="College campus"
              className="h-48 w-full rounded-xl object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollegeCTA;
