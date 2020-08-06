<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{ "HistoryTable_Table_Sum" | localize }}</th>
      <th>{{ "HistoryTable_Table_Date"| localize }}</th>
      <th>{{ "HistoryTable_Table_Category"| localize }}</th>
      <th>{{ "HistoryTable_Table_Type"| localize }}</th>
      <th>{{ "HistoryTable_Table_OpenLink"| localize }}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, index) of records">
      <td>{{ index + 1 }}</td>
      <td>{{ record.amount | currency }}</td>
      <td>{{ record.date | date('datetime') }}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span
            class="white-text badge"
            :class="[record.typeClass]"
        >{{ record.typeText }}</span>
      </td>
      <td>
        <button
            class="btn-small btn"
            v-tooltip="buttonInfo"
            @click="$router.push('/detail/' + record.id)"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "HistoryTable",
  data: () => ({
    buttonInfo: localizeFilter('HistoryTable_Button_Tooltip')
  }),
  props: {
    records: {
      required: true,
      type: Array
    }
  }
}
</script>

<style scoped>

</style>
