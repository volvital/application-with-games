<template>
  <div class="form-demo">
    <div class="flex justify-content-center">
      <div class="card">
        <h1 class="text-center">Welcome</h1>
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
          <div class="field">
            <div class="p-float-label p-input-icon-right">
              <i class="pi pi-envelope" />
              <pInputText
                id="email"
                v-model="v$.email.$model"
                :class="{ 'p-invalid': v$.email.$invalid && submitted }"
                aria-describedby="email-error"
              />
              <label :class="{ 'p-error': v$.email.$invalid && submitted }">
                Email*
              </label>
            </div>
            <span v-if="v$.email.$error && submitted">
              <span
                id="email-error"
                v-for="(error, index) of v$.email.$errors"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small
              v-else-if="
                (v$.email.$invalid && submitted) || v$.email.$pending.$response
              "
              class="p-error"
              >{{ v$.email.required.$message.replace("Value", "Email") }}</small
            >
          </div>
          <div class="field">
            <div class="p-float-label">
              <pPassword
                id="password"
                v-model="v$.password.$model"
                :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                toggleMask
              >
                <template #header>
                  <h6>Pick a password</h6>
                </template>
                <template #footer="sp">
                  {{ sp.level }}
                  <pDivider />
                  <p class="mt-2">Suggestions</p>
                  <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                    <li>At least one lowercase</li>
                    <li>At least one uppercase</li>
                    <li>At least one numeric</li>
                    <li>Minimum 8 characters</li>
                  </ul>
                </template>
              </pPassword>
              <label :class="{ 'p-error': v$.password.$invalid && submitted }"
                >Password*</label
              >
            </div>
            <small
              v-if="
                (v$.password.$invalid && submitted) ||
                v$.password.$pending.$response
              "
              class="p-error"
              >{{
                v$.password.required.$message.replace("Value", "Password")
              }}</small
            >
          </div>
          <pButton type="submit" label="Submit" class="mt-2" />
          <pButton
            label="Registration"
            class="p-button-text"
            @click="this.$router.push('/register')"
          />
        </form>
        <h1>{{ error }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import service from "../service/SignService";

export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      email: "",
      password: "",
      accept: null,
      submitted: false,
      showMessage: false,
      error: "",
    };
  },
  countryService: null,
  validations() {
    return {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    };
  },

  methods: {
    async handleSubmit(isFormValid) {
      this.submitted = true;

      if (!isFormValid) {
        return;
      }

      this.toggleDialog();

      await service
        .loginUser({
          password: this.password,
          email: this.email,
        })
        .then((res) => {
          if (String(res).split(" ")[0] === "Error:") {
            this.error = res;
          } else {
            let redirectURL = `/profile/${res.data.name}`;
            this.$router.push(redirectURL);
          }
        });
    },
    toggleDialog() {
      this.showMessage = !this.showMessage;

      if (!this.showMessage) {
        this.resetForm();
      }
    },
    resetForm() {
      this.email = "";
      this.password = "";
      this.accept = null;
      this.submitted = false;
    },
  },
  watch: {
    email(value) {
      this.email = value;
    },
    name(value) {
      this.name = value;
    },
    password(value) {
      this.password = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.form-demo {
  .card {
    min-width: 450px;

    form {
      margin-top: 2rem;
    }

    .field {
      margin-bottom: 1.5rem;
    }
  }

  @media screen and (max-width: 960px) {
    .card {
      width: 80%;
    }
  }
}
</style>
