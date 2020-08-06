<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{"Login_Title" | localize}}</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">{{"Login_Label_Email" | localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >{{"Login_Validation_EmptyEmail" | localize}}</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >{{"Login_Validation_EnterRightEmail" | localize}}</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">{{"Login_Label_Password" | localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >
          {{"Login_Validation_EnterPassword" | localize}}
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >
          {{"Login_Validation_PasswordShouldBe" | localize}} {{$v.password.$params.minLength.min}} {{"Login_Validation_SymbolsNowIt" | localize}} {{password.length}}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{"Enter" | localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{"Login_P_DontHaveAccount" | localize}}
        <router-link to="/register">{{"Login_Link_Registration" | localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import messages from "../utils/messages";

export default {
  name: 'login',
  metaInfo() {
    return {
      title: this.$title("Login_Meta_Title")
    }
  },
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)}
  },
    mounted() {
      if(messages[this.$route.query.message]) {
          this.$message(messages[this.$route.query.message])
      }
    },

    methods: {
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        const formData = {
          email: this.email,
          password: this.password
        }
        try {
            await this.$store.dispatch('login', formData)
            this.$router.push('/')
        } catch (e) {}
      }
  }
}
</script>
