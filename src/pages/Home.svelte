<script>
  import { useNavigate } from "svelte-navigator";
  import { globalData } from "../../stores.js";
  const navigate = useNavigate();

  const navigateToRating = () => {
    navigate("/rating-page");
    globalData.update((data) => {
      return {
        ...data,
        isRating: true,
      };
    });
  };
</script>

<main>
  <span>Start now!</span>
  <button on:click="{navigateToRating}">Enter</button>
</main>

<style lang="scss">
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 85vh;
    animation: fadeIn 0.7s ease-in-out;

    span {
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
</style>
