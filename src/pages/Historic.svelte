<script>
  import { globalData } from "../../stores";
  import { useNavigate } from "svelte-navigator";
  import Star from "../assets/Star.svelte";

  const navigate = useNavigate();

  let modalContent = "";
  let isOpen = false;
  let removalModalView = false;
  let currentDeletionId = 0;

  $: removalModalClass = removalModalView ? "removal-modal" : "";
  $: removalModalContent = removalModalView
    ? "removal-modal-content"
    : "display-none";
  $: modalClass = isOpen ? "modal" : "";
  $: modalContentClass = isOpen ? "modal-content" : "display-none";

  const openModalBasedOnIndex = (/** @type {number} */ index) => {
    const result = $globalData.movieRatings.find(
      (movie) => movie.selectedMovie.id === index
    );
    modalContent = result?.review;
    isOpen = true;
  };
  const closeModal = () => {
    isOpen = false;
    modalContent = "";
  };

  const getReviewId = (/** @type {number} */ index) => {
    removalModalView = true;
    currentDeletionId = index;
  };

  const deleteReview = () => {
    globalData.update((data) => {
      return {
        ...data,
        movieRatings: data.movieRatings.filter(
          (movie) => movie.selectedMovie.id !== currentDeletionId
        ),
      };
    });
    removalModalView = false;
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${modalContent}`;
    window.open(url, "_blank");
  };
</script>

<main>
  <div class="review-card">
    {#if $globalData.movieRatings.length === 0}
      <div class="empty-data">
        <p>No reviews yet</p>
        <button on:click="{() => navigate('/rating-page')}"
          >Start your review now!</button>
      </div>
    {/if}
    {#each $globalData.movieRatings as movie (movie?.selectedMovie?.id)}
      <div class="review">
        <h2>{movie.selectedMovie?.title}</h2>
        <img
          src="{movie?.selectedMovie?.image}"
          alt="{movie?.selectedMovie?.title}" />
        <div class="stars-flex">
          <p class="star">
            {#each Array(movie.rating) as star}
              <Star color="yellow" />
            {/each}
          </p>
        </div>
        <button
          on:click="{() => openModalBasedOnIndex(movie?.selectedMovie?.id)}"
          >Check Review</button>
        <button on:click="{() => getReviewId(movie?.selectedMovie?.id)}"
          >Delete Review</button>
        <div class="{removalModalClass}">
          <div class="{removalModalContent}">
            <p>Are you sure about that?</p>
            <div class="modal-buttons">
              <button on:click="{() => (removalModalView = false)}"
                >Cancel</button>
              <button class="close" on:click="{() => deleteReview()}"
                >Delete</button>
            </div>
          </div>
        </div>
        <div class="{modalClass}">
          <div class="{modalContentClass}">
            <p>
              {modalContent}
            </p>
            <div class="modal-buttons">
              <button on:click="{closeModal}" class="close">Close</button>
              <button on:click="{shareOnTwitter}" class="share">Share</button>
            </div>
          </div>
        </div>
        <p>Author: <span>{movie?.name}</span></p>
      </div>
    {/each}
  </div>
</main>

<style lang="scss">
  .review-card {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80vh;
    animation: fadeIn 0.7s ease-in-out;

    .empty-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      p {
        font-size: 1.5em;
        font-weight: bold;
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

    .review {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 1rem;
      border: 1px solid #0000001f;
      border-radius: 8px;
      padding: 0.5em;
      width: 300px;

      img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        margin-bottom: 0.3em;
      }

      button {
        margin: 0.5em 0;
        padding: 0.5em 1em;
        border: none;
        border-radius: 8px;
        background: #0000001f;
        color: #000000;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s ease-in-out;

        &:hover {
          background: #0000004f;
        }
      }

      .display-none {
        display: none;
      }

      .modal {
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
        animation: fadeIn 0.2s ease-in-out;

        .modal-content {
          background-color: #fefefe;
          margin: 15% auto;
          padding: 20px;
          border: 1px solid #888;
          width: 30%;
          border-radius: 10px;

          p {
            margin-bottom: 0.5em;
            padding: 1em;
            background: #0000001f;
            border-radius: 8px;
            font-weight: 400;
          }

          .modal-buttons {
            display: flex;
            justify-content: flex-end;

            button {
              margin: 0.5em 0.5em;
            }

            .close {
              background: #8807071f;
              color: #000000;
              font-weight: bold;
              cursor: pointer;
              transition: all 0.2s ease-in-out;

              &:hover {
                background: #e712124f;
              }
            }

            .share {
              background: #082dd51f;
              color: #000000;
              font-weight: bold;
              cursor: pointer;
              transition: all 0.2s ease-in-out;

              &:hover {
                background: #083aef4f;
              }
            }
          }
        }
      }

      .removal-modal {
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
        animation: fadeIn 0.2s ease-in-out;

        .removal-modal-content {
          background-color: #fefefe;
          margin: 15% auto;
          padding: 20px;
          border: 1px solid #888;
          width: 30%;
          border-radius: 10px;

          p {
            margin-bottom: 0.5em;
            padding: 1em;
            background: #0000001f;
            border-radius: 8px;
            font-weight: bold;
          }

          .modal-buttons {
            display: flex;
            justify-content: flex-end;

            button {
              margin: 0.5em 0.5em;
            }

            .close {
              background: #8807071f;
              color: #000000;
              font-weight: bold;
              cursor: pointer;
              transition: all 0.2s ease-in-out;

              &:hover {
                background: #e712124f;
              }
            }

            .share {
              background: #082dd51f;
              color: #000000;
              font-weight: bold;
              cursor: pointer;
              transition: all 0.2s ease-in-out;

              &:hover {
                background: #083aef4f;
              }
            }
          }
        }
      }

      .stars-flex {
        display: flex;
      }

      .star {
        display: flex;
      }

      p {
        font-weight: bold;

        span {
          font-weight: normal;
        }
      }
    }
  }
</style>
