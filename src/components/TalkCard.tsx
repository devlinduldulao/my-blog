import shorterDomain from "@/utils/shorterDomain";

type TalkCardProps = {
  event: string;
  date: string;
  location: string;
  title: string;
  url: string;
};

const TalkCard = ({ event, date, location, title, url }: TalkCardProps) => (
  <div className="mb-5 rounded-lg bg-white p-5 shadow-lg dark:bg-gray-800">
    <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400">
      {event}
    </h3>
    <p className="text-sm text-gray-600 dark:text-gray-300">{date}</p>
    <p className="text-sm text-gray-600 dark:text-gray-300">{location}</p>
    <h4 className="text-md mt-2 font-semibold">{title}</h4>
    <a
      href={url}
      target="_blank"
      className="text-cyan-600 hover:underline dark:text-cyan-400"
    >
      {shorterDomain(url)}
    </a>
  </div>
);

export default TalkCard;
