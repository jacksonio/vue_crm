<template>
  <div>
    <div class="page-title">
      <h3>{{"Record_Title" | localize}}</h3>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">{{ "Empty_List" | localize}}
      <router-link to="/categories">{{"Create_New_Record"| localize}}</router-link>
    </p>
    <form v-else class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="c of categories"
                  :key="c.id"
                  :value="c.id"
          >{{c.title}}
          </option>
        </select>
        <label>{{"Record_Label_ChooseCategory" | localize}}</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>{{"Record_Radio_Income" | localize}}</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>{{"Record_Radio_Outcome" | localize}}</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{ invalid : (($v.amount.$dirty && !$v.amount.required) || ($v.amount.$dirty && !$v.amount.minValue))}"
        >
        <label for="amount">{{"Record_Label_Sum" | localize}}</label>
        <span
            v-if="(($v.amount.$dirty && !$v.amount.required) || ($v.amount.$dirty && !$v.amount.minValue))"
            class="helper-text invalid"
        >
          {{"Record_Validation_SumShouldBeMore" | localize}} {{$v.amount.$params.minValue.min}}
        </span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="description"
            :class="{ invalid: ($v.description.$dirty && !$v.description.required)}"
        >
        <label for="description">{{"Record_Label_Description" | localize}}</label>
        <span
            v-if="$v.description.$dirty && !$v.description.required"
            class="helper-text invalid">{{"Record_Validation_AddDescription" | localize}}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{"Record_Button_Submit" | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<script>
import {required, minValue} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'
import localizeFilter from "@/filters/localize.filter";
export default {
  name: 'Record',
  metaInfo() {
    return {
      title: this.$title("Record_Title")
    }
  },
  data: () => ({
    loading: true,
    categories: [],
    select: null,
    category: null,
    description: '',
    amount: 1,
    type: 'outcome'
  }),
  validations: {
    description: {required},
    amount: {required, minValue: minValue(1)}
  },
  computed : {
    ...mapGetters(['info']),
    canCreateRecord() {
      if(this.type === 'income') {
        return true
      }
      return this.info.bill >= this.amount
    }
  },
  methods: {
    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if( this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          const bill = this.type === 'income'
          ? this.info.bill + this.amount
          : this.info.bill - this.amount
          await this.$store.dispatch('updateInfo', {bill})
          this.$message(localizeFilter("Record_Message_SuccessfullyAdded"))
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) {}

      } else {
        this.$message(`${localizeFilter("Record_Message_FailAdding")} (${this.amount - this.info.bill})`)
      }
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    if(this.categories) {
      this.category = this.categories[0].id
    }

    setTimeout(() => {
      M.updateTextFields()
      this.select = M.FormSelect.init(this.$refs.select) // после лоадінга бо не буде видно шаблона і реф не буде существовать
  }, 0)

  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
