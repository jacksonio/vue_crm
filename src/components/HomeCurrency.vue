<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ "HomeCurrency_Table_Title" | localize }}</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>{{ "HomeCurrency_Table_Currency" | localize}}</th>
            <th>{{ "HomeCurrency_Table_Rate" | localize}}</th>
            <th>{{ "HomeCurrency_Table_Date" | localize}}</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="cur of currencies" :key="cur">
            <td>{{cur}}</td>
            <td>{{ rates[cur].toFixed(3) }}</td>
            <td>{{date | date('date')}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      name: 'HomeCurrency',
    props: ['rates', 'date'],
    data: () => ({
      currencies: ['UAH', 'RUB', 'USD']
    })
  }
</script>
