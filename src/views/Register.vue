<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{ "Login_Title" | localize}}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">{{ "Login_Label_Email" | localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >{{ "Login_Validation_EmptyEmail" | localize}}</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >{{ "Login_Validation_EnterRightEmail" | localize}}</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">{{ "Login_Label_Password" | localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >
          {{ "Login_Validation_EnterPassword" | localize}}
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >
          {{"Login_Validation_PasswordShouldBe" | localize}} {{$v.password.$params.minLength.min}} {{"Login_Validation_SymbolsNowIt" | localize}} {{password.length}}
        </small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{ invalid : ($v.name.$dirty && !$v.name.required)}"
        >
        <label for="name">{{"Name" | localize}}</label>
        <small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">{{"Message_EnterName" | localize}}</small>
      </div>
      <p>
        <label>
          <input
            type="checkbox"
            v-model="agree"
          />
          <span>{{"Register_AgreeWithRules" | localize}}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{"Login_Link_Registration" | localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{"Registration_P_AlreadyHaveAnAccount" | localize}}
        <router-link to="/login">{{"Enter" | localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
    import {email, minLength, required} from "vuelidate/lib/validators";
    export default {
      name: 'register',
      metaInfo() {
        return {
          title: this.$title("Login_Link_Registration")
        }
      },
      data: () => ({
        email: '',
        password: '',
        name: '',
        agree: false
      }),
      validations: {
        email: {email, required},
        password: {required, minLength: minLength(6)},
        agree: { checked: v => v},
        name:  {required}
      },
      methods: {
         async submitHandler() {
              if(this.$v.$invalid) {
                  this.$v.$touch()
                  return
              }
              const formData = {
                  email: this.email,
                  password: this.password,
                  name: this.name
              }
              try {
                  await this.$store.dispatch('register', formData)
                  this.$router.push('/')
              } catch (e) {}

          }
      }
  }
</script>
