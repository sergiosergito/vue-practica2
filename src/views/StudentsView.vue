<template>
  <div class="students">
    <h1>Estudiantes</h1>

    <NewStudentView
      v-if="modalMode == 'crear'"
      @created="saveItem($event)"
    ></NewStudentView>

    <table class="table table-bordered border-primary">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Primer Nombre</th>
          <th scope="col">Segundo Nombre</th>
          <th scope="col">Primer Apellido</th>
          <th scope="col">Segundo Apellido</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item.id">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.firstName }}</td>
          <td>{{ item.middleName }}</td>
          <td>{{ item.firstLastName }}</td>
          <td>{{ item.secondLastName }}</td>
          <td>
            <button type="button" class="btn btn-primary">Editar</button>
            <button type="button" class="btn btn-danger">eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Modal Bootstrap -->
  <div
    class="modal fade"
    id="modalAutoEditar"
    tabindex="-1"
    aria-labelledby="modalAutoEditarLabel"
    aria-hidden="true"
    ref="modalRef"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalAutoEditarLabel">Editar Auto</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Cerrar"
          ></button>
        </div>
        <div class="modal-body">
          <!-- Componente AutoEditar -->
          <AutoEditar
            v-if="modalMode == 'editar' && autoSeleccionado"
            :auto="autoSeleccionado"
            @update="guardarEdicion"
            @cancelar="cerrarModal"
          />
          <NuevoAutoView
            v-if="modalMode == 'crear'"
            @created="agregarNuevo($event)"
          ></NuevoAutoView>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewStudentView from "@/components/student/NewStudentView.vue";
import axios from "axios";
import * as bootstrap from "bootstrap";

export default {
  name: "StudentsList",
  data() {
    return {
      title: "estudiantes",
      items: [],
      modalBootstrapInstance: null,
      modalMode: "crear",
      selectedItem: null,
      newID: 0,
      newFirstName: "",
      newMiddleName: "",
      newFirstLastName: "",
      newSecondLastName: "",
      newItem: null,
      editItem: null,
      editFirstName: "",
      editMiddleName: "",
      editFirstLastName: "",
      editSecondLastName: "",
    };
  },
  components: {
    // Registro de componentes que se utilizaran.
    //EstudiantesCrear,
    NewStudentView,
  },
  created() {
    // Componente creado
  },
  mounted() {
    this.obtenerLista();
    this.$nextTick(() => {
      if (this.$refs.modalRef) {
        this.modalBootstrapInstance = new bootstrap.Modal(this.$refs.modalRef);
      } else {
        console.error("No se encontró el ref modalRef");
      }
    });
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
        .get(process.env.VUE_APP_API_URL + "/student")
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    goToNew() {
      this.modalMode = "crear";
      if (this.modalBootstrapInstance) {
        this.modalBootstrapInstance.show();
      } else {
        console.error("modalBootstrapInstance no está inicializado");
      }
    },
    abrirModal(index) {
      this.autoSeleccionado = null;
      this.indiceSeleccionado = index;
      this.modalMode = "editar";
      setTimeout(() => {
        if (this.modalBootstrapInstance) {
          this.modalBootstrapInstance.show();
          this.autoSeleccionado = { ...this.items[index] };
        } else {
          console.error("modalBootstrapInstance no está inicializado");
        }
      });
    },
    cerrarModal() {
      if (this.modalBootstrapInstance) {
        this.modalBootstrapInstance.hide();
      }
    },

    assignID() {
      if (this.items.length === 0) return 1;
      const maxId = Math.max(...this.items.map((c) => c.id));
      return maxId + 1;
    },

    addItem() {
      if (
        this.newFirstName != "" &&
        this.newMiddleName != "" &&
        this.newFirstLastName != "" &&
        this.newSecondLastName != ""
      ) {
        //this.saveItem(this.newItem);
      }
    },
    /*
    abrirModalParaEditar(item) {
      this.itemSeleccionado = { ...item };
      this.modalMode = "none";
      setTimeout(() => {
        if (this.modalBootstrapInstance) {
          this.modalBootstrapInstance.show();
          this.modalMode = "editar";
        } else {
          console.error("modalBootstrapInstance no está inicializado");
        }
      });
    },
    */
    startEditing(item) {
      this.editID = item.id;
    },
    /*
    validateEdit() {
      if (
        this.editID != 0 &&
        this.editFirstLastName != "" &&
        this.editMiddleName != "" &&
        this.editFirstLastName != "" &&
        this.editSecondLastName != ""
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
    },*/
    /*
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
    },*/
    /*
    eliminar(value) {
      if (confirm("¿Está seguro de eliminar este ítem?")) {
        this.axios
          .delete(process.env.VUE_APP_API_URL + "/usuarios/" + value.id, value)
          .then((response) => {
            this.obtenerLista();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    */
    saveItem(value) {
      axios
        .post(process.env.VUE_APP_API_URL + "/student", value)
        .then((response) => {
          this.obtenerLista();
          this.new = null;
        })
        .catch((error) => {
          console.error(error);
        });
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
