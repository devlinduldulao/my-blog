import type { Talk } from "./talks";

const conferences: Cfp[] = [
  {
    url: "https://www.adriaticstechsummit.com",
    month: "March",
    location: "Sarajevo, Bosnia and Herzegovina",
  },
  {
    url: "https://futuretech.nl",
    month: "March",
    location: "Utrecht, Netherlands",
  },
  {
    url: "https://jnation.pt",
    month: "May",
    location: "Coimbra, Portugal",
  },
  {
    url: "https://www.gophercon.com",
    month: "August",
    location: "Seattle, USA",
  },
  {
    url: "https://golab.io",
    month: "November",
    location: "Bologna, Italy",
  },
  {
    url: "https://www.containerdays.io",
    month: "May",
    location: "Hamburg, Germany",
  },
  {
    url: "https://www.gophercon.eu",
    month: "June",
    location: "Berlin, Germany",
  },
  {
    url: "https://gophercamp.cz",
    month: "April",
    location: "Prague, Czech Republic",
  },
  {
    url: "https://www.rustikon.dev",
    month: "March",
    location: "Warsaw, Poland",
  },
  {
    url: "https://rustlab.it",
    month: "November",
    location: "Bologna, Italy",
  },
  {
    url: "https://eurorust.eu",
    month: "October",
    location: "Barcelona, Spain",
  },
  {
    url: "https://voxxeddays.ch",
    month: "February",
    location: "Lugano, Switzerland",
  },
  {
    url: "https://www.wearedevelopers.com/world-congress-us",
    month: "September",
    location: "San Jose, USA",
  },
  {
    url: "https://www.programmable.tech",
    month: "March",
    location: "Melbourne & Sydney, Australia",
  },
  {
    url: "https://bigdataconference.eu",
    month: "November",
    location: "Vilnius, Lithuania",
  },
  {
    url: "https://shift.infobip.com/asia",
    month: "November",
    location: "Kuala Lumpur, Malaysia",
  },
  {
    url: "https://nordevcon.com",
    month: "February",
    location: "Norwich, United Kingdom",
  },
  {
    url: "https://frontrunners.tech",
    month: "March",
    location: "Washington, DC, USA",
  },
  {
    url: "https://confitura.pl",
    month: "September",
    location: "Warsaw, Poland",
  },
  {
    url: "https://www.open-conf.gr",
    month: "November",
    location: "Athens, Greece",
  },
  {
    url: "https://deepdishswift.com",
    month: "April",
    location: "Chicago, USA",
  },
  {
    url: "https://swiftcraft.uk",
    month: "April",
    location: "London, UK",
  },
  {
    url: "https://swiftheroes.com",
    month: "May",
    location: "Bergamo, Italy",
  },
  {
    url: "https://swiftconnection.io",
    month: "June",
    location: "Paris, France",
  },
  {
    url: "https://omt-conf.com",
    month: "June",
    location: "Cupertino,CA",
  },
  {
    url: "https://mobilis-in-mobile.io",
    month: "June",
    location: "Nantes, France",
  },
  {
    url: "https://swiftconf.com",
    month: "August",
    location: "Cologne, Germany",
  },
  {
    url: "https://do-ios.com",
    month: "November",
    location: "Amsterdam, Netherlands",
  },
  {
    url: "https://swiftisland.nl",
    month: "September",
    location: "Texel, Netherlands",
  },
  {
    url: "https://tryswift.jp",
    month: "April",
    location: "Tokyo, Japan",
  },
  {
    url: "https://nsspain.com",
    month: "September",
    location: "La Rioja, Spain",
  },
  {
    url: "https://arcticonference.com",
    month: "March",
    location: "Oulu, Finland",
  },
  {
    url: "https://iplayground.io",
    month: "September",
    location: "Taipei, Taiwan",
  },
  {
    url: "https://it.droidcon.com",
    month: "November",
    location: "Turin, Italy",
  },
  {
    url: "https://droidcon.co.ke",
    month: "November",
    location: "Nairobi, Kenya",
  },
  {
    url: "https://london.droidcon.com",
    month: "October",
    location: "London, UK",
  },
  {
    url: "https://berlin.droidcon.com",
    month: "September",
    location: "Berlin, Germany",
  },
  {
    url: "https://www.fluttercon.dev",
    month: "September",
    location: "Berlin, Germany",
  },
  {
    url: "https://www.lisbon.droidcon.com",
    month: "September",
    location: "Lisbon, Portugal",
  },
  {
    url: "https://mdc.md",
    month: "November",
    location: "Moldova",
  },
  {
    url: "https://www.hellostavanger.no",
    month: "October",
    location: "Stavanger, Norway",
  },
  {
    url: "https://ngbaguette.angulardevs.fr",
    month: "May",
    location: "Paris, France",
  },
  {
    url: "https://www.angularconnect.com",
    month: "September",
    location: "London, UK",
  },
  {
    url: "https://crete.voxxeddays.com",
    month: "September",
    location: "Crete, Greece",
  },
  {
    url: "https://ioannina.voxxeddays.com",
    month: "May",
    location: "Ioannina, Greece",
  },
  {
    url: "https://jprime.io",
    month: "May",
    location: "Sofia, Bulgaria",
  },
  {
    url: "https://initconf.org",
    month: "October",
    location: "Bosnia and Herzegovina",
  },
  {
    url: "https://www.ioskonf.mk",
    month: "May",
    location: "Skopje, North Macedonia",
  },
  {
    url: "https://madvue.es",
    month: "May",
    location: "Madrid, Spain",
  },
  {
    url: "https://ng-venice.org",
    month: "March",
    location: "Venice, Italy",
  },
  {
    url: "https://www.jsconf.es",
    month: "March",
    location: "Madrid, Spain",
  },
  {
    url: "https://cloudtechtallinn.com",
    month: "February",
    location: "Tallinn, Estonia",
  },
  {
    url: "https://angular-tlv.com",
    month: "October",
    location: "Tel Aviv",
  },
  {
    url: "https://www.nidevconf.com",
    month: "November",
    location: "Belfast, UK",
  },
  {
    url: "https://jsday.it",
    month: "April",
    location: "Verona, Italy",
  },
  {
    url: "https://ndcmelbourne.com",
    month: "April",
    location: "Melbourne, Australia",
  },
  {
    url: "https://wts.sh",
    month: "September",
    location: "Macedonia",
  },
  {
    url: "https://frontconference.com",
    month: "August",
    location: "Zurich, Switzerland",
  },
  {
    url: "https://phpsrbija.rs",
    month: "October",
    location: "Belgrade, Serbia",
  },
  {
    url: "https://www.lambda.world",
    month: "October",
    location: "Cadiz, Spain",
  },
  {
    url: "https://squiggleconf.com",
    month: "October",
    location: "Boston, USA",
  },
  {
    url: "https://es.pycon.org",
    month: "October",
    location: "Vigo, Spain",
  },
  {
    url: "https://craft-conf.com",
    month: "May",
    location: "Budapest, Hungary",
  },
  {
    url: "https://jsconf.am",
    month: "June",
    location: "Yerevan, Armenia",
  },
  {
    url: "https://www.utahjs.com/conference",
    month: "September",
    location: "Utah, USA",
  },
  {
    url: "https://www.welovespeed.com",
    month: "November",
    location: "Nante, France",
  },
  {
    url: "https://api-platform.com/con",
    month: "September",
    location: "Lille, France",
  },
  {
    url: "https://djangocon.eu",
    month: "June",
    location: "Vigo, Spain",
  },
  {
    url: "https://www.javaland.eu",
    month: "March",
    location: "Nürburg, Germany",
  },
  {
    url: "https://webexpo.net",
    month: "May",
    location: "Prague, Czech Republic",
  },
  {
    url: "https://jonthebeach.com",
    month: "May",
    location: "Málaga, Spain",
  },
  {
    url: "https://www.phpconference.co.uk",
    month: "February",
    location: "London, UK",
  },
  {
    url: "https://www.azurefest.nl",
    month: "September",
    location: "Utrecht, Netherlands",
  },
  {
    url: "https://www.azurelowlands.com",
    month: "June",
    location: "Utrecht, Netherlands",
  },
  {
    url: "https://dotnetdays.ro",
    month: "April",
    location: "Iasi, Romania",
  },
  {
    url: "https://weyweyweb.com",
    month: "November",
    location: "Malaga, Spain",
  },
  {
    url: "https://reactalicante.es",
    month: "September",
    location: "Alicante, Spain",
  },
  {
    url: "https://www.devbcn.com",
    month: "June",
    location: "Barcelona, Spain",
  },
  {
    url: "https://www.codemotion.com",
    month: "May",
    location: "Madrid, Spain",
  },
  {
    url: "https://www.neoscon.io",
    month: "May",
    location: "Dresden, Germany",
  },
  {
    url: "https://www.iglooconf.fi",
    month: "June",
    location: "Helsinki, Finland",
  },
  {
    url: "https://www.swetugg.se",
    month: "February",
    location: "Stockholm, Sweden",
  },
  {
    url: "https://www.devsum.se",
    month: "May",
    location: "Stockholm, Sweden",
  },
  {
    url: "https://mixitconf.org",
    month: "April",
    location: "Lyon, France",
  },
  {
    url: "https://confoo.ca",
    month: "February",
    location: "Montreal, Canada",
  },

  {
    url: "https://ndclondon.com",
    month: "January",
    location: "London, UK",
  },
  {
    url: "https://ndcporto.com",
    month: "October",
    location: "Porto, Portugal",
  },
  {
    url: "https://ndcoslo.com",
    month: "June",
    location: "Oslo, Norway",
  },
  {
    url: "https://ndcsydney.com",
    month: "February",
    location: "Sydney, Australia",
  },
  {
    url: "https://cphdevfest.com",
    month: "October",
    location: "Copenhagen, Denmark",
  },
  {
    url: "https://portotechhub.com",
    month: "October",
    location: "Porto, Portugal",
  },
  {
    url: "https://www.craftcms.com/blog/events",
    month: "July",
    location: "Barcelona, Spain",
  },
  {
    url: "https://websummercamp.com",
    month: "July",
    location: "Opatija, Croatia",
  },
  {
    url: "https://shift.infobip.com",
    month: "September",
    location: "Zadar, Croatia",
  },
  {
    url: "https://trondheimdc.no",
    month: "October",
    location: "Trondheim, Norway",
  },
  {
    url: "https://chainreactconf.com",
    month: "July",
    location: "Portland, Oregon, USA",
  },
  {
    url: "https://allthingsopen.org",
    month: "October",
    location: "Raleigh, North Carolina, USA",
  },
  {
    url: "https://devdays.lt",
    month: "May",
    location: "Vilnius, Lithuania",
  },
  {
    url: "https://www.developer-week.de",
    month: "July",
    location: "Nuremberg, Germany",
  },
  {
    url: "https://enterjs.de",
    month: "May",
    location: "Darmstadt, Germany",
  },
  {
    url: "https://js-poland.pl",
    month: "November",
    location: "Warsaw, Poland",
  },
  {
    url: "https://europe.jcon.one",
    month: "May",
    location: "Cologne, Germany",
  },
  {
    url: "https://www.devtalks.ro",
    month: "May",
    location: "Bucharest, Romania",
  },
  {
    url: "https://www.updateconference.net",
    month: "November",
    location: "Prague, Czech Republic",
  },
  {
    url: "https://armada-js.com",
    month: "October",
    location: "Novi Sad, Serbia",
  },
  {
    url: "https://heapcon.io",
    month: "November",
    location: "Belgrade, Serbia",
  },
  {
    url: "https://4developers.org.pl",
    month: "September",
    location: "Several cities in Poland",
  },
  {
    url: "https://dotnetday.ch",
    month: "August",
    location: "Zurich, Switzerland",
  },
  {
    url: "https://www.devday.be",
    month: "November",
    location: "Mons, Belgium",
  },
  {
    url: "https://oredev.org",
    month: "November",
    location: "Malmö, Sweden",
  },
  {
    url: "https://techorama.nl",
    month: "October",
    location: "Ede, Netherlands",
  },
  {
    url: "https://techorama.be",
    month: "May",
    location: "Antwerp, Belgium",
  },
  {
    url: "https://react.paris",
    month: "March",
    location: "Paris, France",
  },
  {
    url: "https://www.react.brussels",
    month: "October",
    location: "Brussels, Belgium",
  },
  {
    url: "https://www.bejs.io",
    month: "May",
    location: "Brussels, Belgium",
  },
  {
    url: "https://jsheroes.io",
    month: "May",
    location: "Cluj-Napoca, Romania",
  },
  {
    url: "https://revojs.ro",
    month: "October",
    location: "Timisoara, Romania",
  },
  {
    url: "https://jsconfbp.com",
    month: "June",
    location: "Budapest, Hungary",
  },
  {
    url: "https://www.buildstuff.events",
    month: "November",
    location: "Vilnius, Lithuania",
  },
  {
    url: "https://devoxx.be",
    month: "October",
    location: "Antwerp, Belgium",
  },
  {
    url: "https://devoxx.ma",
    month: "October",
    location: "Morocco",
  },
  {
    url: "https://www.devoxx.co.uk",
    month: "May",
    location: "London, UK",
  },
  {
    url: "https://devoxx.gr",
    month: "April",
    location: "Athens, Greece",
  },
  {
    url: "https://www.devoxx.fr",
    month: "April",
    location: "Paris, France",
  },
  {
    url: "https://voxxeddays.com/thessaloniki",
    month: "October",
    location: "Thessaloniki, Greece",
  },
  {
    url: "https://luxembourg.voxxeddays.com",
    month: "June",
    location: "Luxembourg",
  },
  {
    url: "https://voxxeddays.com/trieste",
    month: "May",
    location: "Trieste, Italy",
  },
  {
    url: "https://brussels.voxxeddays.com",
    month: "May",
    location: "Brussels, Belgium",
  },
  {
    url: "https://romania.voxxeddays.com",
    month: "March",
    location: "Bucharest, Romania",
  },
  {
    url: "https://frontend.barcelona",
    month: "December",
    location: "Barcelona, Spain",
  },
  {
    url: "https://nordicjs.com",
    month: "October",
    location: "Stockholm, Sweden",
  },
  {
    url: "https://javascript-conference.com/new-york",
    month: "October",
    location: "New York, USA",
  },
  {
    url: "https://www.jsconf.ie",
    month: "September",
    location: "Dublin, Ireland",
  },
  {
    url: "https://www.wearedevelopers.com/world-congress",
    month: "July",
    location: "Berlin, Germany",
  },
  {
    url: "https://appjs.co",
    month: "May",
    location: "Krakow, Poland",
  },
  {
    url: "https://www.reactmiami.com",
    month: "April",
    location: "Miami, USA",
  },
  {
    url: "https://weblica.hr/en/weblica",
    month: "May",
    location: "Zagreb, Croatia",
  },
  {
    url: "https://laravellive.uk",
    month: "June",
    location: "London, UK",
  },
  {
    url: "https://www.jfokus.se",
    month: "May",
    location: "Stockholm, Sweden",
  },
  {
    url: "https://phpconference.nl",
    month: "March",
    location: "Amsterdam, Netherlands",
  },
  {
    url: "https://webdevcon.nl",
    month: "March",
    location: "Amsterdam, Netherlands",
  },
  {
    url: "https://appdevcon.nl",
    month: "March",
    location: "Amsterdam, Netherlands",
  },
  {
    url: "https://javacro.hr",
    month: "October",
    location: "Rovinj, Croatia",
  },
  {
    url: "https://springio.net",
    month: "May",
    location: "Barcelona, Spain",
  },
  {
    url: "https://geecon.org",
    month: "May",
    location: "Krakow, Poland",
  },
  {
    url: "https://vueday.it",
    month: "November",
    location: "Verona, Italy",
  },
  {
    url: "https://reactjsday.it",
    month: "October",
    location: "Verona, Italy",
  },
  {
    url: "https://angularday.it",
    month: "June",
    location: "Verona, Italy",
  },
  {
    url: "https://ng-de.org",
    month: "October",
    location: "Berlin, Germany",
  },
  {
    url: "https://ngrome.io",
    month: "June",
    location: "Rome, Italy",
  },
  {
    url: "https://codegarden.umbraco.com",
    month: "June",
    location: "Odense, Denmark",
  },
  {
    url: "https://remix.run/conf",
    month: "May",
    location: "Salt Lake City, USA",
  },
  {
    url: "https://jsdaycanarias.com",
    month: "May",
    location: "Tenerife, Spain",
  },
  {
    url: "https://sunny-tech.io",
    month: "July",
    location: "Montpellier, France",
  },
  {
    url: "https://c3fest.com",
    month: "June",
    location: "Amsterdam, Netherlands",
  },
  {
    url: "https://reactconnection.io",
    month: "April",
    location: "Paris, France",
  },
  {
    url: "https://www.reactrally.com",
    month: "August",
    location: "Utah, USA",
  },
  {
    url: "https://laracon.eu",
    month: "February",
    location: "Amsterdam, Netherlands",
  },
  {
    url: "https://laracon.au",
    month: "November",
    location: "Brisbane, Australia",
  },
  {
    url: "https://conference.teqnation.com",
    month: "May",
    location: "The Hague, Netherlands",
  },
  {
    url: "https://jdd.org.pl",
    month: "October",
    location: "Krakow, Poland",
  },
  {
    url: "https://devworldconference.com",
    month: "February",
    location: "Amsterdam, Netherlands",
  },
  {
    url: "https://ng-conf.org",
    month: "April",
    location: "Salt Lake City, USA",
  },
  {
    url: "https://www.kcdc.info",
    month: "June",
    location: "Kansas City, USA",
  },
  {
    url: "https://refresh.rocks",
    month: "April",
    location: "Tallinn, Estonia",
  },
  {
    url: "https://ncrafts.io",
    month: "May",
    location: "Paris, France",
  },
  {
    url: "https://www.dotjs.io",
    month: "June",
    location: "Paris, France",
  },
  {
    url: "https://warszawskiedniinformatyki.pl",
    month: "April",
    location: "Warsaw, Poland",
  },
  {
    url: "https://tek.phparch.com",
    month: "April",
    location: "Chicago, USA",
  },
  {
    url: "https://appel.paris-web.fr",
    month: "September",
    location: "Paris, France",
  },
  {
    url: "https://dddeurope.com",
    month: "May",
    location: "Amsterdam, Netherlands",
  },
  {
    url: "https://www.devconf.co.za",
    month: "May",
    location: "Johannesburg, South Africa",
  },
  {
    url: "https://www.sharepointeurope.com",
    month: "November",
    location: "Stockholm, Sweden",
  },
  {
    url: "https://conference.eurostarsoftwaretesting.com",
    month: "June",
    location: "Stockholm, Sweden",
  },
  {
    url: "https://www.mdevcamp.eu",
    month: "April",
    location: "Prague, Czech Republic",
  },
  {
    url: "https://www.devquest.fr",
    month: "September",
    location: "Niort, France",
  },
  {
    url: "https://frontmania.com",
    month: "October",
    location: "Utrecht, Netherlands",
  },
  {
    url: "https://www.telerik.com/devreach",
    month: "October",
    location: "Sofia, Bulgaria",
  },
  {
    url: "https://devconf.pl",
    month: "October",
    location: "Łódź, Poland",
  },
  {
    url: "https://jdevsummitil.com",
    month: "February",
    location: "Tel Aviv",
  },
  {
    url: "https://datainnovationsummit.com",
    month: "April",
    location: "Stockholm, Sweden",
  },
  {
    url: "https://apac.datainnovationsummit.com",
    month: "March",
    location: "Singapore",
  },
  {
    url: "https://mea.datainnovationsummit.com",
    month: "May",
    location: "Dubai, UAE",
  },
  {
    url: "https://anz.datainnovationsummit.com",
    month: "October",
    location: "Melbourne, Australia",
  },
  {
    url: "https://cfp.internals.tech",
    month: "April",
    location: "Cyprus",
  },
  {
    url: "https://shipitcon.com",
    month: "August",
    location: "Dublin, Ireland",
  },
  {
    url: "https://www.cloudbrew.be",
    month: "December",
    location: "Mechelen, Belgium",
  },
  {
    url: "https://ffconf.org/articles/cfp",
    month: "November",
    location: "Brighton, UK",
  },
  {
    url: "https://dotnet.devnot.com",
    month: "May",
    location: "Istanbul, Turkey",
  },
  {
    url: "https://infoshare.pl/conference/call-for-speakers",
    month: "May",
    location: "Gdansk, Poland",
  },
  {
    url: "https://rustconf.com",
    month: "September",
    location: "Montreal, Canada",
  },
  {
    url: "https://www.nodeconf.eu",
    month: "November",
    location: "Kilkenny, Ireland",
  },
];
export default conferences;

export type Cfp = { month: string } & Pick<Talk, "location" | "url">;
