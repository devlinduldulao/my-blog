import cfps from "@/data/cfps";
import getMonthsFromNow from "@/utils/getMonthsFromNow";
import { cn } from "@/utils/style";
import shorterDomain from "@/utils/shorterDomain";
import { useState } from "react";

const fourthMonth = getMonthsFromNow(4);
const fifthMonth = getMonthsFromNow(5);
const sixthMonth = getMonthsFromNow(6);
const seventhMonth = getMonthsFromNow(7);

export default function CfpList() {
  const [list, setList] = useState(cfps);

  const handleFilter = () => {
    const filteredList = cfps.filter(
      cfp =>
        cfp.month === fourthMonth ||
        cfp.month === fifthMonth ||
        cfp.month === sixthMonth ||
        cfp.month === seventhMonth
    );
    setList(filteredList);
  };

  const handleNoFilter = () => {
    setList(cfps);
  };

  return (
    <>
      <section className="my-4 flex flex-wrap gap-2">
        <button
          className="hover:bg-skin-accent w-full rounded-md py-2 font-medium transition-colors duration-300 ease-in-out hover:text-white"
          onClick={handleFilter}
        >
          Show possible open CFPs
        </button>
        <button
          className="hover:bg-skin-accent w-full rounded-md py-2 font-medium transition-colors duration-300 ease-in-out hover:text-white"
          onClick={handleNoFilter}
        >
          Show all conferences
        </button>
      </section>
      {list
        .sort((a, b) => a.location.localeCompare(b.location))
        .sort((a, b) => {
          const monthOrder = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
        })
        .map(cfp => {
          return (
            <div
              key={cfp.url}
              className={cn(
                (cfp.month === fourthMonth ||
                  cfp.month === fifthMonth ||
                  cfp.month === sixthMonth ||
                  cfp.month === seventhMonth) &&
                  "animate-pulse",
                "mb-5 rounded-lg bg-white p-5 shadow-lg dark:bg-gray-800"
              )}
            >
              <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400">
                {cfp.location}
              </h3>
              <p
                className={cn(
                  (cfp.month === fourthMonth ||
                    cfp.month === fifthMonth ||
                    cfp.month === sixthMonth ||
                    cfp.month === seventhMonth) &&
                    "text-skin-accent",
                  "text-lg font-medium decoration-dashed underline-offset-4"
                )}
              >
                {cfp.month}
              </p>
              <a
                href={cfp.url}
                target="_blank"
                className="hover:text-skin-accent text-gray-600 transition-colors duration-300 ease-in-out dark:text-gray-300"
              >
                <p className="text-sm sm:text-lg">{shorterDomain(cfp.url)}</p>
                <div>
                  {(cfp.month === fourthMonth ||
                    cfp.month === fifthMonth ||
                    cfp.month === sixthMonth ||
                    cfp.month === seventhMonth) && (
                    <>
                      <span className="text-skin-accent"> ✔︎</span> see CFP info
                    </>
                  )}
                </div>
              </a>
            </div>
          );
        })}
    </>
  );
}
