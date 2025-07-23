<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Sistema de Cursos</h2>
    <h3>Donde se gestionan alumnos, cursos y sus cursos registrados</h3>
    <p>Desarrollado por: Sergio Rivera Mai</p>
    <p>Desarrollo web fullstack</p>
    <p>Módulo 06 VueJS.</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
