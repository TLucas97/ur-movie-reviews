<script>
  import { useNavigate } from "svelte-navigator";
  import { globalData } from "../../stores.js";

  const navigate = useNavigate();

  $: isRatingTitle = $globalData.isRating ? "Return" : "Your Movie Reviews";
  $: iconVision = $globalData.isRating ? "❌" : "⭐";

  const handleNavigation = () => {
    if ($globalData.isRating) {
      navigate("/");
      globalData.update((data) => {
        return {
          ...data,
          isRating: false,
        };
      });
    } else {
      navigate("/historic");
      globalData.update((data) => {
        return {
          ...data,
          isRating: true,
        };
      });
    }
  };
</script>

<main>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <span class="title" on:click="{handleNavigation}"
    >{iconVision} {isRatingTitle}</span>
  <span class="repo">
    <a
      href="https://github.com/TLucas97/ur-movie-reviews"
      target="_blank"
      rel="noopener noreferrer">
      Repository
      <img src="./src/assets/github.svg" alt="" />
    </a>
  </span>
</main>

<style lang="scss">
  main {
    display: flex;
    justify-content: space-between;

    span {
      margin: 0.3em 0.7em;
    }

    .title {
      cursor: pointer;
    }

    .repo {
      cursor: pointer;

      a {
        display: flex;
        align-items: center;
      }
      
      img {
        width: 1.5em;
        margin-left: 0.5em;
      }
    }
  }
</style>
