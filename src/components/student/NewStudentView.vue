<template>
  <form @submit.prevent="submit" novalidate>
    <div>
      <label class="form-label">Primer nombre</label>
      <input
        v-model="student.firstName"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': v$.student.firstName.$error }"
      />
      <div class="invalid-feedback">Primer nombre es obligatorio</div>
    </div>

    <button type="submit" class="btn btn-primary">Guardar</button>
  </form>
</template>

<script>
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minValue, maxValue, url } from "@vuelidate/validators";
export default {
  name: "NewStudentView",
  data() {
    return {
      title: " NuevoAuto",
      auto: reactive({
        firstName: "",
        middleName: "",
        firstLastName: "",
        secondLastName: "",
      }),
      v$: null,
    };
  },
  components: {
    // Registro de componentes que se utilizaran.
  },
  created() {
    const rules = {
      student: {
        firstName: { required },
        middleName: {},
        firstLastName: { required },
        secondLastName: {},
      },
    };
    this.v$ = useVuelidate(rules, { student: this.student });
  },
  methods: {
    // métodos que se pueden llamar desde la plantilla o desde otras partes del componente.
    async submit() {
      const isValid = await this.v$.$validate();
      if (!isValid) {
        alert("Por favor complete correctamente el formulario.");
        return;
      }
      this.$emit("created", { ...this.student });
    },
  },
  computed: {
    // propiedades computadas que dependen de otras propiedades reactivas
  },
  props: {
    // propiedades que el componente puede recibir.
  },
  emits: [], // los eventos personalizados que el componente puede emitir.
};
</script>
