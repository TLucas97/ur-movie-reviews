<script>
  // @ts-nocheck
  import StarIcon from "../assets/Star.svelte";
  import { toast } from "@zerodevx/svelte-toast";
  import { globalData } from "../../stores";
  import { useNavigate } from "svelte-navigator";

  const navigate = useNavigate();

  let step = 1;
  let rating = 0;
  let selectedMovie = {};
  const movies = $globalData.movies;
  $: ratingTitle = {
    1: "Choose a movie to review",
    2: "Rate from 1 to 5 stars",
    3: "Give a short review about the movie",
    4: "Thank you for submitting your review!",
  }[step];

  const newReviewer = {
    name: "",
    review: "",
  };

  const selectMovie = (id) => {
    const movie = movies.find((movie) => movie.id === id);
    selectedMovie = movie;
    step = 2;
  };

  const confirmRating = () => {
    if (rating > 0) {
      step = 3;
    } else {
      toast.push("Please select a rating", {
        theme: {
          "--toastColor": "mintcream",
          "--toastBackground": "#B33A3A",
          "--toastBarBackground": "#ffff",
        },
      });
    }
  };
  const confirmReview = () => {
    if (newReviewer.name && newReviewer.review) {
      step = 4;
      const newReview = {
        id: Math.floor(Math.random() * 100000),
        selectedMovie,
        rating,
        ...newReviewer,
      };
      globalData.update((data) => {
        return {
          ...data,
          movieRatings: [...data.movieRatings, newReview],
        };
      });
    } else {
      toast.push("Please fill in all fields", {
        theme: {
          "--toastColor": "mintcream",
          "--toastBackground": "#B33A3A",
          "--toastBarBackground": "#ffff",
        },
      });
    }
  };
  const shareReviewOnSocialMedia = () => {
    const url = "https://www.google.com";
    const text = `I just reviewed ${selectedMovie.title} on YourMovieRatings app and gave it ${rating} stars!, heres my review: ${newReviewer.review}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    window.open(twitterUrl, "_blank");
  };
</script>

<main>
  <span class="title">{ratingTitle}</span>
  {#if step === 1}
    <div class="cards">
      {#each movies as movie (movie.id)}
        <div class="movie-card">
          <img src="{movie.image}" alt="movie" />
          <div class="details">
            <small>Movie: {movie.title}</small>
            <small>Release: {movie.release}</small>
            <small class="trailer">
              <a
                href="{movie.trailer}"
                target="_blank"
                rel="noopener noreferrer">
                ▶ <span>Trailer</span>
              </a>
            </small>
            <button on:click="{() => selectMovie(movie.id)}"
              >Rate this movie</button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
  {#if step === 2}
    <div class="selected-movie">
      <span>{selectedMovie?.title}</span>
      <img src="{selectedMovie?.image}" alt="" />
    </div>
    <div class="stars">
      <button class="star-btn" on:mouseenter="{() => (rating = 1)}">
        <StarIcon size="35" color="{rating > 0 && 'yellow'}" />
      </button>
      <button class="star-btn" on:mouseenter="{() => (rating = 2)}">
        <StarIcon size="35" color="{rating > 1 && 'yellow'}" />
      </button>
      <button class="star-btn" on:mouseenter="{() => (rating = 3)}">
        <StarIcon size="35" color="{rating > 2 && 'yellow'}" />
      </button>
      <button class="star-btn" on:mouseenter="{() => (rating = 4)}">
        <StarIcon size="35" color="{rating > 3 && 'yellow'}" />
      </button>
      <button class="star-btn" on:mouseenter="{() => (rating = 5)}">
        <StarIcon size="35" color="{rating > 4 && 'yellow'}" />
      </button>
    </div>
    <button class="confirm-btn" on:click="{confirmRating}">Confirm</button>
  {/if}
  {#if step === 3}
    <div class="review-area">
      <input
        type="text"
        placeholder="Insert your name"
        bind:value="{newReviewer.name}" />
      <textarea
        name="review"
        id="review"
        cols="30"
        rows="10"
        bind:value="{newReviewer.review}"
        placeholder="Write your review here"></textarea>
      <button class="confirm-btn" on:click="{confirmReview}"
        >Submit Review</button>
    </div>
  {/if}
  {#if step === 4}
    <div class="review-area">
      <img
        src="https://media2.giphy.com/media/eHRwLGsS6QDViZhp2P/giphy.gif?cid=790b7611c6974fe14df4042155e7b21912ec10f3798ba7ee&rid=giphy.gif&ct=g"
        alt="joker-dancing" />
      <button class="share-review-btn" on:click="{shareReviewOnSocialMedia}"
        >Share your review!</button>
      <hr />
      <button class="old-reviews-btn" on:click="{() => navigate('/historic')}"
        >Check old reviews</button>
    </div>
  {/if}
</main>

<style lang="scss">
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 85vh;

    .title {
      font-weight: bold;
      font-size: 1.2em;
    }

    .cards {
      display: flex;

      .movie-card {
        width: 270px;
        border: 1px solid #0000001f;
        border-radius: 8px;
        padding: 0.5em;
        margin: 1em 1em;
        transition: all 0.2s ease-in-out;
        animation: fadeIn 0.7s ease-in-out;

        img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 8px;
        }

        &:hover {
          border: 1px solid #0000004f;
          background: #0000000c;
        }

        .details {
          display: flex;
          flex-direction: column;
          margin-top: 1em;

          small {
            margin: 0.3em 0;
          }

          .trailer {
            color: rgb(156, 29, 156);
            font-weight: bold;

            span {
              transition: all 0.2s ease-in-out;

              &:hover {
                color: rgb(156, 29, 156);
                text-decoration: underline;
              }
            }
          }

          button {
            margin-top: 1em;
            padding: 0.5em 1.5em;
            border: none;
            border-radius: 0.5em;
            background-color: #16151521;
            color: #333;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            &:hover {
              background-color: #333;
              color: #f5f5f5;
            }
          }
        }
      }
    }

    .selected-movie {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-bottom: 1em;
      margin-top: 1em;

      span {
        font-size: 1.2em;
        margin-bottom: 0.3em;
      }

      img {
        width: 370px;
        border: 1px solid #0000001f;
        border-radius: 8px;
        padding: 0.5em;
        animation: fadeIn 0.7s ease-in-out;
      }
    }

    .stars {
      display: flex;
      cursor: pointer;

      .star-btn {
        background: none;
        border: none;
        cursor: pointer;
      }
    }

    .confirm-btn {
      margin-top: 1em;
      padding: 0.5em 1.5em;
      border: none;
      border-radius: 0.5em;
      background-color: #16151521;
      color: #333;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      &:hover {
        background-color: #333;
        color: #f5f5f5;
      }
    }

    .review-area {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 1em;
      animation: fadeIn 0.7s ease-in-out;

      input {
        width: 100%;
        padding: 0.5em;
        border: 1px solid #0000001f;
        border-radius: 0.5em;
        margin-bottom: 1em;

        &:focus {
          outline: none;
        }
      }

      textarea {
        width: 100%;
        height: 200px;
        border: 1px solid #0000001f;
        border-radius: 8px;
        padding: 0.5em;
        margin-bottom: 1em;
        resize: none;

        &:focus {
          outline: none;
        }
      }

      img {
        width: 100%;
        height: 380px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 1em;
      }

      .share-review-btn {
        margin-top: 1em;
        padding: 0.5em 1.5em;
        border: none;
        border-radius: 0.5em;
        background-color: #16151521;
        color: #333;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        &:hover {
          background-color: #333;
          color: #f5f5f5;
        }
      }

      hr {
        width: 100%;
        margin: 1em 0;
        padding: 0.1em;
      }

      .old-reviews-btn {
        margin-top: 1em;
        padding: 0.5em 1.5em;
        border: none;
        border-radius: 0.5em;
        background-color: #16151521;
        color: #333;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        &:hover {
          background-color: #333;
          color: #f5f5f5;
        }
      }
    }
  }
</style>
