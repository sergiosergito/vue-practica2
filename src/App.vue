<template>
  <nav>
    <router-link to="/">Hogar</router-link> |
    <router-link to="/courses">Cursos</router-link> |
    <router-link to="/students">Estudiantes</router-link> |
    <router-link to="/registered">Registrados</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
