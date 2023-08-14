<template>
  <a-card class="trending-stocks">
    <h2>Breaking News</h2>
    <div v-if="loading" class="loading"><a-spin size="large" /></div>
    <div v-else class="news-list-container">
      <a-row :gutter="50">
        <a-col
          :span="24"
          v-for="(article, index) in news.slice(0, 15)"
          :key="index"
          :style="{ height: '100%' }"
        >
          <a-card
            class="news-card"
            :style="{
              backgroundImage:
                article.multimedia === null
                  ? 'rgba(0, 0, 0, 0.15)'
                  : `url(${article.multimedia[0].url})`,
            }"
            :body-style="{
              padding: '0px',
            }"
          >
            <a
              href="newsItem.short_url"
              target="_blank"
              :style="{ width: '100%' }"
            >
              <div class="news-item">
                <h3 class="news-title">{{ article.title }}</h3>
              </div>
            </a>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </a-card>
</template>

<script>
import { fetchNews } from "@/services/newsAPI";

export default {
  data() {
    return {
      loading: false,
      error: null,
      news: null,
    };
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData();
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },
  methods: {
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      fetchNews().then((res) => {
        this.news = res;
        this.loading = false;
      });
    },
  },

  //   setup() {
  //     const test = [
  //       {
  //         section: "business",
  //         subsection: "media",
  //         title:
  //           "The Dream Was Universal Access to Knowledge. The Result Was a Fiasco.",
  //         abstract:
  //           "In the pandemic emergency, Brewster Kahle’s Internet Archive freely lent out digital scans of its library. Publishers sued. Owning a book means something different now.",
  //         url: "https://www.nytimes.com/2023/08/13/business/media/internet-archive-emergency-lending-library.html",
  //         uri: "nyt://article/c06ef31b-f44e-5757-9cac-911739febbf7",
  //         byline: "By David Streitfeld",
  //         item_type: "Article",
  //         updated_date: "2023-08-13T10:11:34-04:00",
  //         created_date: "2023-08-13T05:00:54-04:00",
  //         published_date: "2023-08-13T05:00:54-04:00",
  //         material_type_facet: "",
  //         kicker: "",
  //         des_facet: [
  //           "E-Books and Readers",
  //           "Copyrights and Copyright Violations",
  //           "Book Trade and Publishing",
  //           "Libraries and Librarians",
  //         ],
  //         org_facet: [
  //           "Internet Archive",
  //           "Authors Guild",
  //           "Assn of American Publishers",
  //         ],
  //         per_facet: ["Kahle, Brewster"],
  //         geo_facet: [],
  //         multimedia: [
  //           {
  //             url: "https://static01.nyt.com/images/2023/08/13/multimedia/00internet-archive-scan-whzp/00internet-archive-scan-whzp-superJumbo.jpg",
  //             format: "Super Jumbo",
  //             height: 1365,
  //             width: 2048,
  //             type: "image",
  //             subtype: "photo",
  //             caption:
  //               "The Internet Archive’s lending program has long involved scanning books and offering them to readers under a practice called controlled digital lending.",
  //             copyright: "Ann Johansson for The New York Times",
  //           },
  //           {
  //             url: "https://static01.nyt.com/images/2023/08/13/multimedia/00internet-archive-scan-whzp/00internet-archive-scan-whzp-threeByTwoSmallAt2X.jpg",
  //             format: "threeByTwoSmallAt2X",
  //             height: 400,
  //             width: 600,
  //             type: "image",
  //             subtype: "photo",
  //             caption:
  //               "The Internet Archive’s lending program has long involved scanning books and offering them to readers under a practice called controlled digital lending.",
  //             copyright: "Ann Johansson for The New York Times",
  //           },
  //           {
  //             url: "https://static01.nyt.com/images/2023/08/13/multimedia/00internet-archive-scan-whzp/00internet-archive-scan-whzp-thumbLarge.jpg",
  //             format: "Large Thumbnail",
  //             height: 150,
  //             width: 150,
  //             type: "image",
  //             subtype: "photo",
  //             caption:
  //               "The Internet Archive’s lending program has long involved scanning books and offering them to readers under a practice called controlled digital lending.",
  //             copyright: "Ann Johansson for The New York Times",
  //           },
  //         ],
  //         short_url: "https://nyti.ms/3qtIyu5",
  //       },
  //       {
  //         section: "climate",
  //         subsection: "",
  //         title: "The Clean Energy Future Is Arriving Faster Than You Think",
  //         abstract:
  //           "The United States is pivoting away from fossil fuels and toward wind, solar and other renewable energy, even in areas dominated by the oil and gas industries.",
  //         url: "https://www.nytimes.com/interactive/2023/08/12/climate/clean-energy-us-fossil-fuels.html",
  //         uri: "nyt://interactive/effed262-b2dc-59c9-894a-960b275f85f7",
  //         byline:
  //           "By David Gelles, Brad Plumer, Jim Tankersley, Jack Ewing, Leo Dominguez and Nadja Popovich",
  //         item_type: "Interactive",
  //         updated_date: "2023-08-13T10:23:18-04:00",
  //         created_date: "2023-08-12T20:08:03-04:00",
  //         published_date: "2023-08-12T20:08:03-04:00",
  //         material_type_facet: "",
  //         kicker: "",
  //         des_facet: [
  //           "Solar Energy",
  //           "Alternative and Renewable Energy",
  //           "Wind Power",
  //           "Electric and Hybrid Vehicles",
  //           "Greenhouse Gas Emissions",
  //           "Inflation Reduction Act of 2022",
  //           "Global Warming",
  //           "United States Politics and Government",
  //         ],
  //         org_facet: [],
  //         per_facet: [],
  //         geo_facet: ["United States"],
  //         multimedia: [
  //           {
  //             url: "https://static01.nyt.com/images/2023/08/12/climate/clean-energy-us-fossil-fuels-1691861770019/clean-energy-us-fossil-fuels-1691861770019-superJumbo.jpg",
  //             format: "Super Jumbo",
  //             height: 1365,
  //             width: 2048,
  //             type: "image",
  //             subtype: "photo",
  //             caption: "",
  //             copyright: "",
  //           },
  //           {
  //             url: "https://static01.nyt.com/images/2023/08/12/climate/clean-energy-us-fossil-fuels-1691861770019/clean-energy-us-fossil-fuels-1691861770019-threeByTwoSmallAt2X.jpg",
  //             format: "threeByTwoSmallAt2X",
  //             height: 400,
  //             width: 600,
  //             type: "image",
  //             subtype: "photo",
  //             caption: "",
  //             copyright: "",
  //           },
  //           {
  //             url: "https://static01.nyt.com/images/2023/08/12/climate/clean-energy-us-fossil-fuels-1691861770019/clean-energy-us-fossil-fuels-1691861770019-thumbLarge.jpg",
  //             format: "Large Thumbnail",
  //             height: 150,
  //             width: 150,
  //             type: "image",
  //             subtype: "photo",
  //             caption: "",
  //             copyright: "",
  //           },
  //         ],
  //         short_url: "https://nyti.ms/3QCYoNF",
  //       },
  //       {
  //         section: "business",
  //         subsection: "media",
  //         title: "Raid of Small Kansas Newspaper Raises Free Press Concerns",
  //         abstract:
  //           "The search of Marion County Record’s office led to the seizure of computers, servers and cellphones of reporters and editors.",
  //         url: "https://www.nytimes.com/2023/08/13/business/media/kansas-marion-newspaper-police-raid.html",
  //         uri: "nyt://article/f09fe65e-f292-5a0e-a871-a88c6073a54a",
  //         byline: "By Steven Lee Myers and Benjamin Mullin",
  //         item_type: "Article",
  //         updated_date: "2023-08-13T23:27:52-04:00",
  //         created_date: "2023-08-13T12:44:42-04:00",
  //         published_date: "2023-08-13T12:44:42-04:00",
  //         material_type_facet: "",
  //         kicker: "",
  //         des_facet: [
  //           "News and News Media",
  //           "Ethics and Official Misconduct",
  //           "Freedom of the Press",
  //           "Search and Seizure",
  //           "News Sources, Confidential Status of",
  //           "Police",
  //           "City Councils",
  //           "Drunken and Reckless Driving",
  //           "Local Government",
  //         ],
  //         org_facet: ["Freedom of the Press Foundation"],
  //         per_facet: [],
  //         geo_facet: ["Kansas"],
  //         multimedia: [
  //           {
  //             url: "https://static01.nyt.com/images/2023/08/12/multimedia/00kansas-press-2-fpkt/00kansas-press-2-fpkt-superJumbo.jpg",
  //             format: "Super Jumbo",
  //             height: 1366,
  //             width: 2048,
  //             type: "image",
  //             subtype: "photo",
  //             caption:
  //               "Marion County Record’s office in Marion, Kan. The town’s police raided the office on Friday morning.",
  //             copyright: "Chase Castor for The New York Times",
  //           },
  //           {
  //             url: "https://static01.nyt.com/images/2023/08/12/multimedia/00kansas-press-2-fpkt/00kansas-press-2-fpkt-threeByTwoSmallAt2X.jpg",
  //             format: "threeByTwoSmallAt2X",
  //             height: 400,
  //             width: 600,
  //             type: "image",
  //             subtype: "photo",
  //             caption:
  //               "Marion County Record’s office in Marion, Kan. The town’s police raided the office on Friday morning.",
  //             copyright: "Chase Castor for The New York Times",
  //           },
  //           {
  //             url: "https://static01.nyt.com/images/2023/08/12/multimedia/00kansas-press-2-fpkt/00kansas-press-2-fpkt-thumbLarge.jpg",
  //             format: "Large Thumbnail",
  //             height: 150,
  //             width: 150,
  //             type: "image",
  //             subtype: "photo",
  //             caption:
  //               "Marion County Record’s office in Marion, Kan. The town’s police raided the office on Friday morning.",
  //             copyright: "Chase Castor for The New York Times",
  //           },
  //         ],
  //         short_url: "https://nyti.ms/448FWiU",
  //       },
  //       {
  //         section: "business",
  //         subsection: "",
  //         title:
  //           "Zuckerberg Says It’s ‘Time to Move On’ From ‘Cage Fight’ With Musk",
  //         abstract:
  //           "Mark Zuckerberg, the chief executive of Meta, wrote on his Threads platform that Elon Musk did not seem “serious” about the much-ballyhooed match.",
  //         url: "https://www.nytimes.com/2023/08/13/business/zuckerberg-musk-cage-fight.html",
  //         uri: "nyt://article/c082c310-fde1-526d-80f9-c8700daffb35",
  //         byline: "By Rob Copeland",
  //         item_type: "Article",
  //         updated_date: "2023-08-13T23:28:54-04:00",
  //         created_date: "2023-08-13T14:40:29-04:00",
  //         published_date: "2023-08-13T14:40:29-04:00",
  //         material_type_facet: "",
  //         kicker: "",
  //         des_facet: [],
  //         org_facet: ["Facebook Inc", "Twitter"],
  //         per_facet: ["Musk, Elon", "Zuckerberg, Mark E"],
  //         geo_facet: ["Italy"],
  //         multimedia: [
  //           {
  //             url: "https://static01.nyt.com/images/2023/08/13/multimedia/13zuck-musk-1-fczk/13zuck-musk-1-fczk-superJumbo.jpg",
  //             format: "Super Jumbo",
  //             height: 1403,
  //             width: 2000,
  //             type: "image",
  //             subtype: "photo",
  //             caption:
  //               "In a post on his Threads platform, Mark Zuckerberg said of his cage fight with Elon Musk, “I think we can all agree Elon isn’t serious and it’s time to move on.”",
  //             copyright: "Uncredited/Associated Press",
  //           },
  //           {
  //             url: "https://static01.nyt.com/images/2023/08/13/multimedia/13zuck-musk-1-fczk/13zuck-musk-1-fczk-threeByTwoSmallAt2X.jpg",
  //             format: "threeByTwoSmallAt2X",
  //             height: 400,
  //             width: 600,
  //             type: "image",
  //             subtype: "photo",
  //             caption:
  //               "In a post on his Threads platform, Mark Zuckerberg said of his cage fight with Elon Musk, “I think we can all agree Elon isn’t serious and it’s time to move on.”",
  //             copyright: "Uncredited/Associated Press",
  //           },
  //           {
  //             url: "https://static01.nyt.com/images/2023/08/13/multimedia/13zuck-musk-1-fczk/13zuck-musk-1-fczk-thumbLarge.jpg",
  //             format: "Large Thumbnail",
  //             height: 150,
  //             width: 150,
  //             type: "image",
  //             subtype: "photo",
  //             caption:
  //               "In a post on his Threads platform, Mark Zuckerberg said of his cage fight with Elon Musk, “I think we can all agree Elon isn’t serious and it’s time to move on.”",
  //             copyright: "Uncredited/Associated Press",
  //           },
  //         ],
  //         short_url: "https://nyti.ms/442l3pP",
  //       },
  //       {
  //         section: "business",
  //         subsection: "",
  //         title:
  //           "Move or Quit: Grindr Dictates New Office Rules Amid Union Drive",
  //         abstract:
  //           "Two weeks after employees filed to organize, the company told some they had to change cities or would lose their jobs. It said the plan had long been in the works.",
  //         url: "https://www.nytimes.com/2023/08/12/business/grindr-rto-union.html",
  //         uri: "nyt://article/de3834d9-0a9d-5cb0-a549-1d371ad93046",
  //         byline: "By Emma Goldberg",
  //         item_type: "Article",
  //         updated_date: "2023-08-13T12:37:13-04:00",
  //         created_date: "2023-08-12T05:00:17-04:00",
  //         published_date: "2023-08-12T05:00:17-04:00",
  //         material_type_facet: "",
  //         kicker: "",
  //         des_facet: [
  //           "Telecommuting",
  //           "Workplace Hazards and Violations",
  //           "Coronavirus Return to Office",
  //           "Mobile Applications",
  //           "Organized Labor",
  //         ],
  //         org_facet: ["Grindr.com"],
  //         per_facet: [],
  //         geo_facet: [],
  //         multimedia: [
  //           {
  //             url: "https://static01.nyt.com/images/2023/08/11/multimedia/11Grindr-01-kvjz/11Grindr-01-kvjz-superJumbo.jpg",
  //             format: "Super Jumbo",
  //             height: 2048,
  //             width: 1366,
  //             type: "image",
  //             subtype: "photo",
  //             caption:
  //               "Quinn McGee, who has worked for Grindr remotely from New York since 2021, has until October to move to California or leave the company.",
  //             copyright: "Sara Naomi Lewkowicz for The New York Times",
  //           },
  //           {
  //             url: "https://static01.nyt.com/images/2023/08/11/multimedia/11Grindr-01-kvjz/11Grindr-01-kvjz-threeByTwoSmallAt2X.jpg",
  //             format: "threeByTwoSmallAt2X",
  //             height: 400,
  //             width: 600,
  //             type: "image",
  //             subtype: "photo",
  //             caption:
  //               "Quinn McGee, who has worked for Grindr remotely from New York since 2021, has until October to move to California or leave the company.",
  //             copyright: "Sara Naomi Lewkowicz for The New York Times",
  //           },
  //           {
  //             url: "https://static01.nyt.com/images/2023/08/11/multimedia/11Grindr-01-kvjz/11Grindr-01-kvjz-thumbLarge.jpg",
  //             format: "Large Thumbnail",
  //             height: 150,
  //             width: 150,
  //             type: "image",
  //             subtype: "photo",
  //             caption:
  //               "Quinn McGee, who has worked for Grindr remotely from New York since 2021, has until October to move to California or leave the company.",
  //             copyright: "Sara Naomi Lewkowicz for The New York Times",
  //           },
  //         ],
  //         short_url: "https://nyti.ms/45mgZ4H",
  //       },
  //       {
  //         section: "business",
  //         subsection: "media",
  //         title:
  //           "As Hollywood Strikes Roll On, Viewers Have a Chance to Catch Up",
  //         abstract:
  //           "After years of being inundated with new shows, some are using a pause in production to finally watch all the stuff they missed when it came out.",
  //         url: "https://www.nytimes.com/2023/08/12/business/media/hollywood-strikes-old-shows.html",
  //         uri: "nyt://article/ec93effa-a232-5076-9ef5-33649975810c",
  //         byline: "By John Koblin",
  //         item_type: "Article",
  //         updated_date: "2023-08-13T14:05:42-04:00",
  //         created_date: "2023-08-12T05:00:47-04:00",
  //         published_date: "2023-08-12T05:00:47-04:00",
  //         material_type_facet: "",
  //         kicker: "",
  //         des_facet: [
  //           "Television",
  //           "Video Recordings, Downloads and Streaming",
  //           "Strikes",
  //           "Actors and Actresses",
  //           "Writing and Writers",
  //         ],
  //         org_facet: ["HBO Max", "Netflix Inc", "Hulu.com"],
  //         per_facet: [],
  //         geo_facet: [],
  //         multimedia: [
  //           {
  //             url: "https://static01.nyt.com/images/2023/08/09/multimedia/00Strike-Glut-01-gtch/00Strike-Glut-01-gtch-superJumbo.jpg",
  //             format: "Super Jumbo",
  //             height: 2048,
  //             width: 1639,
  //             type: "image",
  //             subtype: "photo",
  //             caption:
  //               "Zain Habboo with her husband, Neil Stormer. Worried about what would become of new episodes of her favorite shows, she started thinking about movies she hadn’t seen.",
  //             copyright: "Samuel Corum for The New York Times",
  //           },
  //           {
  //             url: "https://static01.nyt.com/images/2023/08/09/multimedia/00Strike-Glut-01-gtch/00Strike-Glut-01-gtch-threeByTwoSmallAt2X.jpg",
  //             format: "threeByTwoSmallAt2X",
  //             height: 400,
  //             width: 600,
  //             type: "image",
  //             subtype: "photo",
  //             caption:
  //               "Zain Habboo with her husband, Neil Stormer. Worried about what would become of new episodes of her favorite shows, she started thinking about movies she hadn’t seen.",
  //             copyright: "Samuel Corum for The New York Times",
  //           },
  //           {
  //             url: "https://static01.nyt.com/images/2023/08/09/multimedia/00Strike-Glut-01-gtch/00Strike-Glut-01-gtch-thumbLarge-v2.jpg",
  //             format: "Large Thumbnail",
  //             height: 150,
  //             width: 150,
  //             type: "image",
  //             subtype: "photo",
  //             caption:
  //               "Zain Habboo with her husband, Neil Stormer. Worried about what would become of new episodes of her favorite shows, she started thinking about movies she hadn’t seen.",
  //             copyright: "Samuel Corum for The New York Times",
  //           },
  //         ],
  //         short_url: "https://nyti.ms/3ORcp9g",
  //       },
  //       {
  //         section: "your-money",
  //         subsection: "",
  //         title: "Letter to a Young Crypto Enthusiast (or the Merely Curious)",
  //         abstract:
  //           "An ever-growing number of young people, males in particular, have bought cryptocurrencies. Here’s some advice, without the finger-wagging.",
  //         url: "https://www.nytimes.com/2023/08/13/your-money/cryptocurency-personal-finance-bitcoin.html",
  //         uri: "nyt://article/8346be65-0023-54fb-a356-a2771b0cd2d7",
  //         byline: "By Ron Lieber",
  //         item_type: "Article",
  //         updated_date: "2023-08-13T05:00:40-04:00",
  //         created_date: "2023-08-13T05:00:40-04:00",
  //         published_date: "2023-08-13T05:00:40-04:00",
  //         material_type_facet: "",
  //         kicker: "YOUR Money",
  //         des_facet: [
  //           "Personal Finances",
  //           "Bitcoin (Currency)",
  //           "Virtual Currency",
  //           "Content Type: Service",
  //         ],
  //         org_facet: [],
  //         per_facet: [],
  //         geo_facet: [],
  //         multimedia: [
  //           {
  //             url: "https://static01.nyt.com/images/2023/08/12/business/11money-print/11money-print-superJumbo.jpg",
  //             format: "Super Jumbo",
  //             height: 1907,
  //             width: 2048,
  //             type: "image",
  //             subtype: "photo",
  //             caption: "",
  //             copyright: "Robert Neubecker",
  //           },
  //           {
  //             url: "https://static01.nyt.com/images/2023/08/12/business/11money-print/11money-print-threeByTwoSmallAt2X.jpg",
  //             format: "threeByTwoSmallAt2X",
  //             height: 400,
  //             width: 600,
  //             type: "image",
  //             subtype: "photo",
  //             caption: "",
  //             copyright: "Robert Neubecker",
  //           },
  //           {
  //             url: "https://static01.nyt.com/images/2023/08/12/business/11money-print/11money-print-thumbLarge.jpg",
  //             format: "Large Thumbnail",
  //             height: 150,
  //             width: 150,
  //             type: "image",
  //             subtype: "photo",
  //             caption: "",
  //             copyright: "Robert Neubecker",
  //           },
  //         ],
  //         short_url: "https://nyti.ms/3KCXbCc",
  //       },
  //     ];
  //     const news = ref({});
  //     const getNews = async () => {
  //       const res = await fetchNews();
  //       return res;
  //     };

  //     onBeforeMount(() => {
  //       news.value = getNews();
  //     });

  //     return {
  //       news,
  //       test,
  //     };
  //   },
};
</script>

<style scoped>
.ant-card-body {
  padding: 0;
}
.news-item {
  width: 100%;
  height: 150px;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 8px;
}

.news-title {
  color: #fff;
  margin: 0;
}

.news-card {
  height: 150px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 8;
  padding: 0;
}
.news-list-container {
  max-height: 75vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

.loading {
  text-align: center;
}
</style>
