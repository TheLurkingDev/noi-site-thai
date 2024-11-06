<template>
  <div class="landing-page">
    <nav class="top-nav">
      <div class="nav-brand">
        <h1>Dating Site</h1>
      </div>
      <div class="nav-links">
        <router-link to="/login" class="nav-link login">Log In</router-link>
        <router-link to="/register" class="nav-link signup"
          >Sign Up</router-link
        >
      </div>
    </nav>

    <div class="content">
      <div class="registration-panel">
        <h2>Create an Account</h2>
        <p class="subtitle">
          Registering for this site is easy, just fill in the fields below and
          we will get a new account set up for you in no time.
        </p>
        <form @submit.prevent="handleSubmit" class="registration-form">
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
              type="email"
              v-model="form.email"
              placeholder="Email Address"
              required
              class="form-input"
            />
          </div>

          <div class="form-group password-group">
            <input
              type="password"
              v-model="form.password"
              placeholder="Password"
              required
              class="form-input"
            />
            <input
              type="password"
              v-model="form.confirmPassword"
              placeholder="Confirm Password"
              required
              class="form-input"
            />
          </div>

          <button type="submit" class="signup-btn" :disabled="loading">
            {{ loading ? "Creating Account..." : "Sign Up" }}
          </button>
        </form>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div class="social-signup">
          <span class="or-divider">or sign up with</span>
          <button class="social-btn facebook">
            <i class="fab fa-facebook-f"></i>
          </button>
        </div>

        <div class="recent-members">
          <h3>Latest registered members</h3>
          <div class="member-avatars">
            <!-- Add member avatars here -->
          </div>
        </div>
      </div>

      <div class="tagline">
        <h2>It all starts with a <span class="highlight">Date</span></h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

interface RegistrationForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default defineComponent({
  name: "LandingPage",
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const error = ref("");
    const form = ref<RegistrationForm>({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
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
      handleSubmit,
    };
  },
});
</script>

<style scoped lang="scss">
.landing-page {
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

  .nav-brand h1 {
    color: white;
    margin: 0;
    font-size: 1.5rem;
  }

  .nav-links {
    display: flex;
    gap: 1rem;

    .nav-link {
      text-decoration: none;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: all 0.3s ease;

      &.login {
        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }

      &.signup {
        background: white;
        color: #ff1493;
        font-weight: bold;

        &:hover {
          background: rgba(255, 255, 255, 0.9);
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

.registration-panel {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
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

.registration-form {
  .form-group {
    margin-bottom: 1rem;
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

  .password-group {
    display: grid;
    gap: 1rem;
  }

  .signup-btn {
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

.social-signup {
  margin-top: 2rem;
  text-align: center;

  .or-divider {
    display: block;
    color: #666;
    margin-bottom: 1rem;
    position: relative;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      width: 30%;
      height: 1px;
      background: #ddd;
    }

    &::before {
      left: 0;
    }

    &::after {
      right: 0;
    }
  }

  .social-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: #3b5998;
    color: white;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
}

.recent-members {
  margin-top: 2rem;

  h3 {
    color: #333;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .member-avatars {
    display: flex;
    gap: 0.5rem;
  }
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

  .registration-panel {
    width: 100%;
    max-width: 400px;
  }

  .tagline {
    position: static;
    text-align: center;
    margin-top: 2rem;
  }
}
</style>
