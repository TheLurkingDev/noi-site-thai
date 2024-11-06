<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style lang="scss">
// Import Font Awesome
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css");

// Import Google Fonts
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

// Reset and base styles
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #f5f5f5;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
}

// Common utility classes
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

// Common form styles
input,
select,
textarea {
  font-family: inherit;
}

button {
  cursor: pointer;
  font-family: inherit;
}

// Common animation classes
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// Responsive breakpoints
$breakpoints: (
  "sm": 576px,
  "md": 768px,
  "lg": 992px,
  "xl": 1200px,
);

@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  } @else {
    @warn "Invalid breakpoint: #{$breakpoint}.";
  }
}

// Common color variables
:root {
  --primary-color: #ff1493;
  --primary-dark: #cc1077;
  --secondary-color: #0066ff;
  --text-color: #333333;
  --text-light: #666666;
  --background-color: #f5f5f5;
  --white: #ffffff;
  --error-color: #dc3545;
  --success-color: #28a745;
  --warning-color: #ffc107;
  --info-color: #17a2b8;
}

// Common shadow styles
.shadow-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.shadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

// Common button styles
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &-primary {
    background-color: var(--primary-color);
    color: var(--white);

    &:hover:not(:disabled) {
      background-color: var(--primary-dark);
    }
  }

  &-outline {
    background-color: transparent;
    border: 1px solid var(--primary-color);
    color: var(--primary-color);

    &:hover:not(:disabled) {
      background-color: var(--primary-color);
      color: var(--white);
    }
  }
}

// Form styles
.form-group {
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--text-color);
  }
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(255, 20, 147, 0.1);
  }
}

// Alert styles
.alert {
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;

  &-error {
    background-color: rgba(220, 53, 69, 0.1);
    color: var(--error-color);
    border: 1px solid var(--error-color);
  }

  &-success {
    background-color: rgba(40, 167, 69, 0.1);
    color: var(--success-color);
    border: 1px solid var(--success-color);
  }
}
</style>
