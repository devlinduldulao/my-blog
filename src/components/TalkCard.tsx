import shorterDomain from "@/utils/shorterDomain";

type TalkCardProps = {
  event: string;
  date: string;
  location: string;
  title: string;
  url: string;
};

const TalkCard = ({ event, date, location, title, url }: TalkCardProps) => (
  <div className="mb-5 rounded-lg border border-border bg-surface p-5 shadow-sm">
    <h3 className="text-lg font-semibold text-accent">{event}</h3>
    <p className="text-sm text-muted">{date}</p>
    <p className="text-sm text-muted">{location}</p>
    <h4 className="mt-2 text-base font-semibold text-foreground">{title}</h4>
    <a
      href={url}
      target="_blank"
      className="text-accent underline decoration-dashed underline-offset-4 hover:text-brand"
    >
      {shorterDomain(url)}
    </a>
  </div>
);

export default TalkCard;
