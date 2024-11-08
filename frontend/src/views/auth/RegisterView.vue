<template>
  <div class="register-page">
    <nav class="top-nav">
      <div class="nav-brand">
        <router-link to="/" class="brand-link">
          <h1>Find Thai Dates</h1>
        </router-link>
      </div>
      <div class="nav-links">
        <router-link to="/login" class="nav-link login">Log In</router-link>
      </div>
    </nav>

    <div class="content">
      <div class="register-panel">
        <h2>Create Your Account</h2>
        <p class="subtitle">
          Join our community and start your journey to finding love.
        </p>

        <form @submit.prevent="handleSubmit" class="register-form">
          <div class="form-row">
            <div class="form-group half">
              <input
                type="text"
                v-model="form.firstName"
                placeholder="First Name"
                required
                class="form-input"
              />
            </div>
            <div class="form-group half">
              <input
                type="text"
                v-model="form.lastName"
                placeholder="Last Name"
                required
                class="form-input"
              />
            </div>
          </div>

          <div class="form-group">
            <input
              type="email"
              v-model="form.email"
              placeholder="Email Address"
              required
              class="form-input"
            />
          </div>

          <div class="form-group">
            <input
              type="text"
              v-model="form.username"
              placeholder="Username"
              required
              class="form-input"
            />
          </div>

          <div class="form-group">
            <input
              type="password"
              v-model="form.password"
              placeholder="Password"
              required
              class="form-input"
            />
          </div>

          <div class="form-group">
            <input
              type="password"
              v-model="form.confirmPassword"
              placeholder="Confirm Password"
              required
              class="form-input"
            />
          </div>

          <div class="form-group">
            <input
              type="date"
              v-model="form.birthDate"
              required
              class="form-input"
              :max="maxDate"
            />
            <label class="input-label">Birth Date</label>
          </div>

          <div class="form-row">
            <div class="form-group half">
              <select v-model="form.gender" required class="form-input">
                <option value="" disabled selected>I am a...</option>
                <option value="male">Man</option>
                <option value="female">Woman</option>
                <option value="other">Non-binary</option>
              </select>
            </div>
            <div class="form-group half">
              <select v-model="form.seekingGender" required class="form-input">
                <option value="" disabled selected>Looking for...</option>
                <option value="male">Men</option>
                <option value="female">Women</option>
                <option value="any">Anyone</option>
              </select>
            </div>
          </div>

          <div class="form-group terms">
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.agreeToTerms" required />
              <span>
                I agree to the
                <router-link to="/terms" class="terms-link"
                  >Terms of Service</router-link
                >
                and
                <router-link to="/privacy" class="terms-link"
                  >Privacy Policy</router-link
                >
              </span>
            </label>
          </div>

          <button type="submit" class="register-btn" :disabled="loading">
            {{ loading ? "Creating Account..." : "Create Account" }}
          </button>
        </form>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div class="login-section">
          <p>Already have an account?</p>
          <router-link to="/login" class="login-btn"> Sign In </router-link>
        </div>
      </div>

      <div class="tagline">
        <h2>Begin Your <span class="highlight">Journey</span></h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  gender: string;
  seekingGender: string;
  agreeToTerms: boolean;
}

export default defineComponent({
  name: "RegisterView",
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const error = ref("");
    const form = ref<RegisterForm>({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      birthDate: "",
      gender: "",
      seekingGender: "",
      agreeToTerms: false,
    });

    const maxDate = computed(() => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 18);
      return date.toISOString().split("T")[0];
    });

    const handleSubmit = async () => {
      if (form.value.password !== form.value.confirmPassword) {
        error.value = "Passwords do not match";
        return;
      }

      loading.value = true;
      error.value = "";

      try {
        // Here we'll add the registration logic later
        await router.push("/profile-setup");
      } catch (err) {
        error.value =
          err instanceof Error ? err.message : "Registration failed";
      } finally {
        loading.value = false;
      }
    };

    return {
      form,
      loading,
      error,
      maxDate,
      handleSubmit,
    };
  },
});
</script>

<style scoped lang="scss">
.register-page {
  min-height: 100vh;
  background: url("@/assets/images/site-background.png") no-repeat center center
    fixed;
  background-size: cover;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 0, 127, 0.8) 0%,
      rgba(0, 0, 255, 0.8) 100%
    );
    z-index: 1;
  }
}

.top-nav {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.2);

  .brand-link {
    text-decoration: none;

    h1 {
      color: white;
      margin: 0;
      font-size: 1.5rem;
    }
  }

  .nav-links {
    display: flex;
    gap: 1rem;

    .nav-link {
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: all 0.3s ease;

      &.login {
        color: white;
        border: 1px solid white;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }
}

.content {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 80px);
}

.register-panel {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    color: #333;
    margin-bottom: 1rem;
  }

  .subtitle {
    color: #666;
    margin-bottom: 2rem;
    font-size: 0.9rem;
  }
}

.register-form {
  .form-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;

    .half {
      flex: 1;
    }
  }

  .form-group {
    margin-bottom: 1rem;
    position: relative;

    .input-label {
      position: absolute;
      top: -0.5rem;
      left: 0.75rem;
      background: white;
      padding: 0 0.25rem;
      color: #666;
      font-size: 0.8rem;
    }
  }

  .form-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #ff1493;
      box-shadow: 0 0 0 2px rgba(255, 20, 147, 0.1);
    }
  }

  .terms {
    margin: 1.5rem 0;

    .checkbox-label {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      color: #666;
      font-size: 0.9rem;

      input[type="checkbox"] {
        margin-top: 0.2rem;
      }
    }

    .terms-link {
      color: #0066ff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .register-btn {
    width: 100%;
    padding: 0.75rem;
    background: #ff1493;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: darken(#ff1493, 10%);
    }

    &:disabled {
      background: #ccc;
    }
  }
}

.login-section {
  margin-top: 2rem;
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid #eee;

  p {
    color: #666;
    margin-bottom: 0.5rem;
  }

  .login-btn {
    display: inline-block;
    padding: 0.5rem 2rem;
    background: #0066ff;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-weight: 500;
    transition: background 0.3s ease;

    &:hover {
      background: darken(#0066ff, 10%);
    }
  }
}

.error-message {
  color: #dc3545;
  text-align: center;
  margin-top: 1rem;
}

.tagline {
  position: absolute;
  bottom: 4rem;
  right: 2rem;
  color: white;
  text-align: right;

  h2 {
    font-size: 2.5rem;
    margin: 0;

    .highlight {
      color: #ff1493;
    }
  }
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }

  .register-panel {
    width: 100%;
    max-width: 500px;
  }

  .form-row {
    flex-direction: column;
    gap: 0;

    .half {
      width: 100%;
    }
  }

  .tagline {
    position: static;
    text-align: center;
    margin-top: 2rem;
  }
}
</style>
