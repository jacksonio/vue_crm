<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{ "Menu_History" | localize }}</router-link>
        <a @click.prevent class="breadcrumb">
          {{

            record.type === 'income' ? income  : outcome
          }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
              class="card"
              :class="{
                'red' : record.type === 'outcome',
                'green' : record.type === 'income'
              }"
          >
            <div class="card-content white-text">
              <p>{{ "Record_Label_Description" | localize }}: {{ record.description }}</p>
              <p>{{ "Record_Label_Sum" | localize }}: {{ record.amount | currency }}</p>
              <p>{{ "HistoryTable_Table_Category" | localize }}: {{ record.categoryName }}</p>

              <small>{{ record.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Запись с не найдена : id={{ $route.params.id }}</p>
  </div>
</template>
<script>
import localizeFilter from "@/filters/localize.filter";

export default {
  name: 'Detail',
  metaInfo() {
    return {
      title: this.$title("Detail_Title")
    }
  },
  data: () => ({
    record: null,
    loading: true,
    income: localizeFilter("Record_Radio_Income"),
    outcome: localizeFilter("Record_Radio_Outcome")
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

    this.record = {
      ...record,
      categoryName: category.title
    }
    this.loading = false
  }
}

</script>
