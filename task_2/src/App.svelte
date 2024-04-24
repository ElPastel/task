<script>
  import Converter from "./lib/Converter.svelte";
</script>


<style>
  main {
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-template-rows: repeat(2, auto);
    gap: 10px;
    align-items: center;
    grid-template-areas: 
      "title1 . title2"
      "amount1 arrow amount2";
  }

  header {
    width: 100%;
    height: 100px;
    color: #0286de;
    text-align: center;
  }
</style>

  <header>
    <h1>💱 Currency Converter 💱</h1>
  </header>

  <main>
    <Converter/>
  </main>
