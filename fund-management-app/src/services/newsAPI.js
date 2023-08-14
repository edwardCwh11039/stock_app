import axios from "axios";

export const fetchNews = async () => {
  let res = await axios
    .get(
      "https://api.nytimes.com/svc/topstories/v2/business.json?api-key=pKDzZjnahcEPMXQlVkEvGT5zVDXXdqjc"
    )
    .then((res) => res.data.results)
    .catch((err) => console.log(err));

  return res;
};
