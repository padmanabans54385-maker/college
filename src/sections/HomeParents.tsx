import { brand } from "../config/brand";
import { AppleIcon, GrowthArrowIcon, LightbulbIcon } from "../components/icons/AcademicIcons";

const HomeParents = () => (
  <section className="bg-white py-16 border-t border-[#E2ECF3]">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#075B63] sm:text-4xl">
            Built for students &amp; parents
          </h2>
          <p className="mt-4 max-w-2xl font-poppins text-base leading-relaxed text-[#5A6E78]">
            Admission decisions involve the whole family. {brand.name} keeps every step clear,
            so students and parents can choose with confidence.
          </p>

          <div className="mt-6 space-y-3">
            {[
              { icon: LightbulbIcon, text: "Verified college profiles with source metadata" },
              { icon: AppleIcon, text: "Free human-first guidance for first-generation learners" },
              { icon: GrowthArrowIcon, text: "Clear labels on historical, estimated, and official data" },
            ].map((feature) => (
              <div key={feature.text} className="flex items-center gap-3 font-poppins text-sm font-medium text-[#172B35]">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0F8FD] text-[#075B63]">
                  <feature.icon size={18} />
                </span>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="academic-card overflow-hidden">
            <div className="aspect-video overflow-hidden bg-[#F5F9FC]">
              <img
                src={brand.images.students}
                alt="Students planning education together"
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-3">
              <div>
                <span className="font-heading text-2xl font-bold text-[#075B63]">2,400+</span>
                <p className="mt-1 font-poppins text-xs text-[#5A6E78]">students guided since 2023</p>
              </div>
              <div>
                <span className="font-heading text-2xl font-bold text-[#075B63]">32</span>
                <p className="mt-1 font-poppins text-xs text-[#5A6E78]">districts covered</p>
              </div>
              <div>
                <span className="font-heading text-2xl font-bold text-[#075B63]">4.8/5</span>
                <p className="mt-1 font-poppins text-xs text-[#5A6E78]">parent satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HomeParents;
