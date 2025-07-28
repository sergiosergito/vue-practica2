<template>
  <div class="registered">
    <h1>Registrados</h1>
    <p>Filtrar</p>
    <input
      type="text"
      v-model="filterName"
      class="form-control mb-3"
      placeholder="Filtrar"
    />
    <table class="table table-bordered border-primary">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nombre completo</th>
          <th scope="col">Nombre curso</th>
          <th scope="col">Notas curso</th>
        </tr>
        <tr>
          <th scope="col">
            <button type="button" class="btn btn-primary" @click="addItem()">
              Guardar
            </button>
          </th>
          <th scope="col">
            <select v-model="newStudent" class="form-select">
              <option disabled value="">Selecciona estudiante</option>
              <option
                v-for="newStudent in students"
                :key="newStudent"
                :value="newStudent"
              >
                {{ newStudent.id }} {{ newStudent.firstName }}
                {{ newStudent.firstLastName }}
                {{ newStudent.secondLastName }}
              </option>
            </select>
          </th>
          <th scope="col">
            <select v-model="newLevelName" class="form-select">
              <option disabled value="">Selecciona curso</option>
              <option v-for="level in courses" :key="level" :value="level">
                {{ level.name }} {{ level.level }} {{ level.month }}/{{
                  level.year
                }}
              </option>
            </select>
          </th>
        </tr>
        <tr>
          <th scope="col">
            <button
              type="button"
              class="btn btn-primary"
              @click="validateEdit()"
            >
              Editar
            </button>
          </th>
          <th scope="col">
            <input
              type="text"
              v-model="editName"
              class="form-control"
              placeholder="nombre estudiante"
            />
          </th>
          <th scope="col">
            <select v-model="editLevelName" class="form-select">
              <option disabled value="">editar Curso</option>
              <option v-for="level in levels" :key="level" :value="level">
                {{ level }}
              </option>
            </select>
          </th>
          <th scope="col">
            <input
              type="number"
              v-model="newVersion"
              class="form-control"
              placeholder="Ingresar notas"
              @input="validateVersion()"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in itemsFiltrados" :key="item.id">
          <th scope="row">{{ item.id }}</th>
          <td>
            {{ item.student.firstName }} {{ item.student.firstLastName }}
            {{ item.student.secondLastName }}
          </td>
          <td>{{ item.course.name }} {{ item.course.description }}</td>
          <td>{{ item.grades }}</td>
          <td>
            <button
              type="button"
              class="btn btn-primary"
              @click="startEditing(item)"
            >
              Editar
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="eliminar(item.id)"
            >
              eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { CEFRLevels, levels } from "@/shared/constants";
import Course from "@/features/Course.model";
import axios from "axios";
import Registered from "@/features/Registered.model";

export default {
  name: "CoursesList",
  data() {
    return {
      title: "Cursos",
      items: [],
      students: [],
      courses: [],
      modalBootstrapInstance: null,
      modalMode: "crear",
      selectedItem: null,
      CEFRLevels,
      levels,
      newID: 0,
      newStudent: null,
      newName: "",
      newLevelName: "",
      newCEFR: "",
      newDescription: "",
      newMonth: "",
      newYear: "",
      newVersion: 0,
      newItem: null,
      editItem: null,
      editName: "",
      editLevelName: "",
      editCEFR: "",
      editDescription: "",
      editMonth: "",
      editYear: "",
      editVersion: 0,
      filterName: "",
    };
  },
  components: {
    // Registro de componentes que se utilizaran.
    //UsuariosCrear,
    //UsuariosEditar,
  },
  created() {
    // Componente creado
  },
  mounted() {
    // Componente montado
    this.$nextTick(() => {
      if (this.$refs.modalRef) {
        this.modalBootstrapInstance = new bootstrap.Modal(this.$refs.modalRef);
      } else {
        console.error("No se encontró el ref modalRef");
      }
    });
    this.obtenerLista();
    this.getStudents();
    this.getCourses();
  },
  updated() {
    // Componente actualizado
  },
  destroyed() {
    // Componente destruido
  },
  methods: {
    obtenerLista() {
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/registered?_expand=student&_expand=course"
        )
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getStudents() {
      axios
        .get(process.env.VUE_APP_API_URL + "/students")
        .then((response) => {
          this.students = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getCourses() {
      axios
        .get(process.env.VUE_APP_API_URL + "/courses")
        .then((response) => {
          this.courses = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    assignID() {
      if (this.items.length === 0) return 1;
      const maxId = Math.max(...this.items.map((c) => c.id));
      return maxId + 1;
    },

    addItem() {
      if (this.newStudent != null && this.newLevelName != null) {
        this.newItem = new Registered(
          this.assignID(),
          this.newLevelName.id,
          this.newStudent.id,
          0,
          "No aprobado"
        );
        this.saveItem(this.newItem);
      }
    },

    startEditing(item) {
      this.editID = item.id;
      this.editName = item.name;
      this.editLevelName = item.level;
      this.editCEFR = item.CEFR;
      this.editDescription = item.description;
      this.editMonth = item.month;
      this.editYear = item.year;
      this.editVersion = item.version;
    },

    validateEdit() {
      if (
        this.editID != 0 &&
        this.editName != "" &&
        this.editLevelName != "" &&
        this.editCEFR != "" &&
        this.editDescription != "" &&
        this.editMonth != "" &&
        this.editYear != "" &&
        this.editVersion != null
      ) {
        this.editItem = new Course(
          this.editID,
          this.editName,
          this.editLevelName,
          this.editCEFR,
          this.editDescription,
          this.editMonth,
          this.editYear,
          this.editVersion
        );
        this.updateItem(this.editItem);
      }
    },
    updateItem(value) {
      axios
        .put(process.env.VUE_APP_API_URL + "/courses/" + value.id, value)
        .then((response) => {
          this.obtenerLista();
          this.cleanFields();
          this.editItem = null;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    saveItem(value) {
      console.log(value);
      axios
        .post(process.env.VUE_APP_API_URL + "/registered", value)
        .then((response) => {
          this.obtenerLista();
          this.new = null;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    validateVersion() {
      if (this.newVersion < 0) {
        this.newVersion = 0;
      }
    },
    validateEditVersion() {
      if (this.editVersion < 0) {
        this.editVersion = 0;
      }
    },
    cleanFields() {
      this.editID = 0;
      this.editName = "";
      this.editLevelName = "";
      this.editCEFR = "";
      this.editDescription = "";
      this.editMonth = "";
      this.editYear = "";
      this.editVersion = "";
    },
  },
  computed: {
    itemsFiltrados() {
      if (!this.filterName.trim()) return this.items;
      return this.items.filter((item) =>
        item.student.firstName
          .toLowerCase()
          .includes(this.filterName.toLowerCase())
      );
    },
  },
  props: {
    // propiedades que el componente puede recibir.
  },
  emits: [], // los eventos personalizados que el componente puede emitir.
};
</script>
