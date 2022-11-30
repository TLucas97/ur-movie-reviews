<script>
  import RatingPage from "./pages/RatingPage.svelte";
  import Home from "./pages/Home.svelte";
  import Historic from "./pages/Historic.svelte";
  import Header from "./lib/Header.svelte";
  import { Router, Route } from "svelte-navigator";
  import { SvelteToast } from "@zerodevx/svelte-toast";

  const options = {};
</script>

<Router>
  <SvelteToast options="{options}" />
  <Header />
  <Route path="/" component="{Home}" />
  <Route path="/rating-page" component="{RatingPage}" />
  <Route path="/historic" component="{Historic}" />
</Router>

<style>
  :root {
    --toastContainerTop: 1rem;
    --toastContainerRight: auto;
    --toastContainerLeft: calc(50vw - 8rem);
  }
</style>
