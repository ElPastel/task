<script lang="ts">
  import { onMount } from 'svelte';
  import type { CurrencyData } from './types'
  import ArrowIcon from '../assets/arrowIcon.svelte'

  const API_KEY = '80f367ae31ddccf009b2e8fe'

  let currencies: string[] = [];
  let fromCurrency = 'USD';
  let toCurrency = 'EUR';
  let amount1 = 0;
  let amount2 = 0;
  let exchangeRate = 0

  async function getCurrencies() {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`);
    const data: {conversion_rates: CurrencyData} = await response.json();
    currencies = Object.keys(data.conversion_rates);
    exchangeRate = data.conversion_rates[toCurrency];
  }

  onMount(getCurrencies);

  async function convertCurrency(isFromCurrency: boolean = true, isChangeCurrency: boolean = false) {
    if (isChangeCurrency) {
      await getCurrencies()
    }

    if (isFromCurrency) {
      amount2 = Number((amount1 * exchangeRate).toFixed(2))
    } else {
      amount1 = Number((amount2 / exchangeRate).toFixed(2))
    }
  }

</script>


<label for="amount1">From Currency:</label>
<div class="converter_input-container">
  <input type="number" id="amount1" bind:value={amount1} on:input={() => convertCurrency()} />
  <select id="select1" bind:value={fromCurrency} on:change={() => convertCurrency(true, true)}>
    {#each currencies as currency}
      <option value={currency}>{currency}</option>
    {/each}
  </select>
</div>


<svelte:component this={ArrowIcon} />

<label for="amount2">To Currency:</label>
<div class="converter_input-container">
  <input type="number" id="amount2" bind:value={amount2} on:input={() => convertCurrency(false)} />
  <select id="select2" bind:value={toCurrency} on:change={() => convertCurrency(false, true)}>
    {#each currencies as currency}
      <option value={currency}>{currency}</option>
    {/each}
  </select>
</div>

<style>

  .converter_input-container {
    padding: 10px 20px;
    border: solid 1px #d6d9e0;

    &:nth-child(2) {
      grid-area: amount1;
    }

    &:last-child {
      grid-area: amount2;
    }
    
    &:hover {
      border-color: #a4a9b5;
    }
  }

  input, select {
    background-color: #fff;
    color: #2c2c2c;
    font-family: inherit;
    font-size: 16px;
    border: none;
    height: 40px;
    box-shadow: none;
    border-radius: 3px;
     
    &:first-child {
      margin-right: 10px;
    }
    
    &:focus {
      outline: 0;
    }

  }

  input {
    border-right: solid 1px #d6d9e0;
  }

  label {
    &:first-child {
      grid-area: title1;
    }

    &:nth-child(4) {
      grid-area: title2;
    }
  }

</style>
