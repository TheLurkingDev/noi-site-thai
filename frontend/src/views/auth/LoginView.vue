<template>
  <div class="login-page">
    <nav class="top-nav">
      <div class="nav-brand">
        <router-link to="/" class="brand-link">
          <h1>Find Thai Dates</h1>
        </router-link>
      </div>
      <div class="nav-links">
        <router-link to="/register" class="nav-link signup"
          >Sign Up</router-link
        >
      </div>
    </nav>

    <div class="content">
      <div class="login-panel">
        <h2>Welcome Back</h2>
        <p class="subtitle">
          Sign in to your account to continue your journey to finding love.
        </p>

        <form @submit.prevent="handleSubmit" class="login-form">
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
              type="password"
              v-model="form.password"
              placeholder="Password"
              required
              class="form-input"
            />
          </div>

          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox" v-model="form.rememberMe" />
              <span>Remember me</span>
            </label>
            <router-link to="/forgot-password" class="forgot-password">
              Forgot Password?
            </router-link>
          </div>

          <button type="submit" class="login-btn" :disabled="loading">
            {{ loading ? "Signing in..." : "Sign In" }}
          </button>
        </form>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div class="register-section">
          <p>Don't have an account?</p>
          <router-link to="/register" class="register-btn">
            Create Account
          </router-link>
        </div>
      </div>

      <div class="tagline">
        <h2>Welcome Back to Your <span class="highlight">Journey</span></h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default defineComponent({
  name: "LoginView",
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const error = ref("");
    const form = ref<LoginForm>({
      email: "",
      password: "",
      rememberMe: false,
    });

    const handleSubmit = async () => {
      loading.value = true;
      error.value = "";

      try {
        // Here we'll add the login logic later
        await router.push("/profile");
      } catch (err) {
        error.value = err instanceof Error ? err.message : "Login failed";
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
.login-page {
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

.login-panel {
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

.login-form {
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

  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    .remember-me {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #666;
      cursor: pointer;

      input[type="checkbox"] {
        cursor: pointer;
      }
    }

    .forgot-password {
      color: #0066ff;
      text-decoration: none;
      font-size: 0.9rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .login-btn {
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

.register-section {
  margin-top: 2rem;
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid #eee;

  p {
    color: #666;
    margin-bottom: 0.5rem;
  }

  .register-btn {
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

  .login-panel {
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
