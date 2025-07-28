<template>
  <form @submit.prevent="submit" novalidate>
    <div class="mb-3">
      <label class="form-label">Agregar estudiante</label>
      <input
        v-model="student.firstName"
        type="text"
        class="form-control"
        placeholder="Ingresar Primer nombre"
        :class="{ 'is-invalid': v$.student.firstName.$error }"
      />
      <div class="invalid-feedback">Ingrese Primer Nombre</div>
    </div>
    <div class="mb-3">
      <input
        v-model="student.middleName"
        type="text"
        class="form-control"
        placeholder="Segundo nombre (opcional)"
        :class="{ 'is-invalid': v$.student.middleName.$error }"
      />
    </div>
    <div class="mb-3">
      <input
        v-model="student.firstLastName"
        type="text"
        class="form-control"
        placeholder="Ingresar Primer Apellido"
        :class="{ 'is-invalid': v$.student.firstLastName.$error }"
      />
      <div class="invalid-feedback">Ingrese Primer Primer Apellido</div>
    </div>
    <div class="mb-3">
      <input
        v-model="student.secondLastName"
        type="text"
        class="form-control"
        placeholder="Segundo Apellido (opcional)"
        :class="{ 'is-invalid': v$.student.secondLastName.$error }"
      />
      <div class="invalid-feedback">Primer nombre es obligatorio</div>
    </div>

    <button type="submit" class="btn btn-primary">Guardar</button>
  </form>
</template>

<script>
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "NewStudentView",
  data() {
    return {
      title: " NuevoAuto",
      student: reactive({
        firstName: "",
        middleName: "",
        firstLastName: "",
        secondLastName: "",
        isCreate: false,
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
