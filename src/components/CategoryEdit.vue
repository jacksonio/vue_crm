<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{"CategoryEdit_Title" | localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
                v-for="c of categories"
                :key="c.id"
                :value="c.id"
            >{{ c.title }}
            </option>
          </select>
          <label>{{"CategoryEdit_Form_Label_ChooseCategory" | localize}}</label>
        </div>

        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{ invalid: ($v.title.$dirty && !$v.title.required)}"
          >
          <label for="name">{{"CategoryEdit_Form_Label_Name" | localize}}</label>
          <span
              v-if="$v.title.$dirty && !$v.title.required"
              class="helper-text invalid"
          >
            {{"CategoryEdit_Form_Label_EnterCategoryName" | localize}}
          </span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{ invalid: (($v.limit.$dirty && !$v.limit.minValue) && ($v.limit.$dirty && !$v.limit.required))}"
          >
          <label for="limit">{{"CategoryEdit_Form_Label_Limit" | localize}}</label>
          <span
              class="helper-text invalid"
              v-if="(($v.limit.$dirty && !$v.limit.minValue) || ($v.limit.$dirty && !$v.limit.required))"
          >
            {{"CategoryEdit_Form_Validation_MinLimit" | localize}} {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{"CategoryEdit_Form_Button_Refresh" | localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
import localizeFilter from "@/filters/localize.filter";
export default {
  name: "CategoryEdit",
  data: () => ({
    title: '',
    limit: 100,
    select: null,
    current: null
  }),
  validations: {
    title: {required},
    limit: {required, minValue: minValue(100)}
  },
  methods: {
    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
       const categoryData = {
            id: this.current,
            title: this.title,
            limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message(localizeFilter("CategoryEdit_Message_SuccessfullyRefreshed"))
        this.$emit('updated', categoryData)
      } catch (e) {}
    }
  },
  watch: {
    current(catId) {
      const { title, limit} = this.categories.find(c => c.id === catId)
      this.title = title
      this.limit = limit
    },
    title(titleText) {
      if(titleText) {
        setTimeout(() => {
          M.updateTextFields()
        }, 0)
      }
    }
  },
  created() {
    const {id, limit, title} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted() {
    M.updateTextFields()
    this.select = M.FormSelect.init(this.$refs.select)
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>

<style scoped>

</style>
