import { writable } from "svelte/store";

export const globalData = writable({
  isRating: false,
  movies: [
    {
      id: 1,
      title: "Parasite",
      release: "30/05/2019",
      trailer: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
      image:
        "https://img.hulu.com/user/v3/artwork/2fd691a0-f66b-467f-8635-00d7f151f3d4?base_image_bucket_name=image_manager&base_image=8e90d27c-6e51-46f1-8ab6-c81e2fc0c2ec&size=1200x630&format=jpeg",
    },
    {
      id: 2,
      title: "JoJo Rabbit",
      release: "06/02/2020",
      trailer: "https://www.youtube.com/watch?v=tL4McUzXfFI",
      image:
        "https://prod-ripcut-delivery.disney-plus.net/v1/variant/star/9C273986DAD507977AC4C5AE9CFD7D6458679B5B3860E6B69191E2376E102C07/scale?width=1200&aspectRatio=1.78&format=jpeg",
    },
    {
      id: 3,
      title: "Ex Machina",
      release: "21/01/2015",
      trailer: "https://www.youtube.com/watch?v=EoQuVnKhxaM",
      image:
        "https://medienkompetenz.katholisch.de/files/2020/08/Ex_Machina_zugeschnitten-1.png",
    },
    {
      id: 4,
      title: "White chicks",
      release: "27/08/2004",
      trailer: "https://www.youtube.com/watch?v=aeVkbNka9HM",
      image:
        "https://i.insider.com/5b21887d1ae6621f008b4daa?width=750&format=jpeg&auto=webp",
    },
    {
      id: 5,
      title: "Morbius",
      release: "21/03/2022",
      trailer: "https://www.youtube.com/watch?v=oZ6iiRrz1SY",
      image:
        "https://marvelucm.com/wp-content/uploads/2022/03/Morbius-Jared-Leto-1.jpg",
    },
  ],
  movieRatings: [],
});
