<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{"CategotyCreate_Title" | localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{ invalid: ($v.title.$dirty && !$v.title.required)}"
          >
          <label for="name">{{"CategotyCreate_Form_Label_Title" | localize}}</label>
          <span
              v-if="$v.title.$dirty && !$v.title.required"
              class="helper-text invalid"
          >
            {{"CategotyCreate_Validation_EnterCategoryName" | localize}}
          </span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{ invalid: (($v.limit.$dirty && !$v.limit.minValue) && ($v.limit.$dirty && !$v.limit.required))}"
          >
          <label for="limit">{{"CategotyCreate_Form_Label_Limit" | localize}}</label>
          <span
              class="helper-text invalid"
              v-if="(($v.limit.$dirty && !$v.limit.minValue) || ($v.limit.$dirty && !$v.limit.required))"
          >
            {{"CategotyCreate_Validation_MinLimit" | localize}} {{$v.limit.$params.minValue.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{"CategotyCreate_Button_Create" | localize}}
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
  name: "CategoryCreate",
  data: () => ({
    title: '',
    limit: 100
  }),
  validations: {
    title: {required},
    limit: {required, minValue: minValue(100)}
  },
  mounted() {
    M.updateTextFields()
  },
  methods: {
   async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
       const category =  await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        this.title = '';
        this.limit = 100;
        this.$v.$reset()
        this.$message(localizeFilter("CategotyCreate_SuccessfullyAdded"))
        this.$emit('created', category)
      } catch (e) {
      }
    }
  }
}
</script>

<style scoped>

</style>
