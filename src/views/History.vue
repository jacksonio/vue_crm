<template>
  <div>
    <div class="page-title">
      <h3>{{"History_Title" | localize}}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading"/>
    <p class="center" v-else-if="!records.length">
      {{"Empty_List" | localize}}
      <router-link to="/record">{{"Create_New_Record" | localize}}</router-link>
    </p>
    <section v-else>
      <HistoryTable :records="items"/>
      <Paginate
          v-model="page"
          :page-count="pageCount"
          :click-handler="pageChangeHandler"
          :prev-text="prev"
          :next-text="next"
          :container-class="'pagination'"
          :page-class="'waves-effect'"
      />

    </section>
  </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
import HistoryTable from "@/components/HistoryTable";
import {Pie} from 'vue-chartjs'
import localizeFilter from "@/filters/localize.filter";

export default {
  name: 'History',
  metaInfo() {
    return {
      title: this.$title("History_Title")
    }
  },
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
    prev: localizeFilter('HistoryPagination_Prev'),
    next: localizeFilter('HistoryPagination_Next')
  }),
  methods: {
    setup(categories) {
      this.setupPagination(this.records.map(r => {
        return {
          ...r,
          categoryName: categories.find(c => c.id === r.categoryId).title,
          typeClass: r.type === 'income' ? 'green' : 'red',
          typeText: r.type === 'income' ? localizeFilter("Record_Radio_Income") : localizeFilter("Record_Radio_Outcome")
        }
      }))

      this.renderChart({
        labels: categories.map(c => c.title),
        datasets: [{
          label: 'Расходы по категориям',
          data: categories.map(c => {
            return this.records.reduce((total, record) => {
              if (record.categoryId === c.id && record.type === 'outcome') {
                total += +record.amount
              }
              return total
            }, 0)
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      })
    }
  },
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');

    this.setup(categories)

    this.loading = false
  },
  components: {
    HistoryTable
  },
  computed: {}
}
</script>
