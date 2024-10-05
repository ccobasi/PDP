<template>
  <div class="container">
    <div class="table-wrapper">
      <div class="table-title">
        <div class="row">
          <div class="col-sm-6">
            <h2>Manage <b>Employees</b></h2>
          </div>
          <div class="col-sm-6">
            <button class="btn btn-success" @click="openModal('add')">
              <i class="material-icons">&#xE147;</i> <span>Add New Employee</span>
            </button>
            <button class="btn btn-danger" @click="openModal('delete')">
              <i class="material-icons">&#xE15C;</i> <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>
              <span class="custom-checkbox">
                <input type="checkbox" id="selectAll" @change="selectAll">
                <label for="selectAll"></label>
              </span>
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(employee, index) in employees" :key="index">
            <td>
              <span class="custom-checkbox">
                <input type="checkbox" :id="'checkbox' + index" v-model="employee.selected">
                <label :for="'checkbox' + index"></label>
              </span>
            </td>
            <td>{{ employee.name }}</td>
            <td>{{ employee.email }}</td>
            <td>{{ employee.address }}</td>
            <td>{{ employee.phone }}</td>
            <td>
              <a href="#editEmployeeModal" class="edit" @click.prevent="openModal('edit', index)">
                <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
              </a>
              <a href="#deleteEmployeeModal" class="delete" @click.prevent="openModal('delete', index)">
                <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="clearfix">
        <div class="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
        <ul class="pagination">
          <li class="page-item disabled"><a href="#">Previous</a></li>
          <li class="page-item" v-for="page in totalPages" :key="page">
            <a href="#" class="page-link" @click.prevent="goToPage(page)">{{ page }}</a>
          </li>
          <li class="page-item"><a href="#" class="page-link">Next</a></li>
        </ul>
      </div>
    </div>

    <div v-if="modalType === 'add' || modalType === 'edit'" class="modal fade" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="handleSubmit">
            <div class="modal-header">
              <h4 class="modal-title">{{ modalType === 'add' ? 'Add' : 'Edit' }} Employee</h4>
              <button type="button" class="close" @click="closeModal">&times;</button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" v-model="currentEmployee.name" required>
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" v-model="currentEmployee.email" required>
              </div>
              <div class="form-group">
                <label>Address</label>
                <textarea class="form-control" v-model="currentEmployee.address" required></textarea>
              </div>
              <div class="form-group">
                <label>Phone</label>
                <input type="text" class="form-control" v-model="currentEmployee.phone" required>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" @click="closeModal">Cancel</button>
              <button type="submit" class="btn btn-success">{{ modalType === 'add' ? 'Add' : 'Save' }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-if="modalType === 'delete'" class="modal fade" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="handleDelete">
            <div class="modal-header">
              <h4 class="modal-title">Delete Employee</h4>
              <button type="button" class="close" @click="closeModal">&times;</button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete these Records?</p>
              <p class="text-warning"><small>This action cannot be undone.</small></p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" @click="closeModal">Cancel</button>
              <button type="submit" class="btn btn-danger">Delete</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template> 

<script setup>
import { ref } from 'vue';

const employees = ref([
  { name: "Thomas Hardy", email: "thomashardy@mail.com", address: "89 Chiaroscuro Rd, Portland, USA", phone: "(171) 555-2222", selected: false },
  { name: "Dominique Perrier", email: "dominiqueperrier@mail.com", address: "Obere Str. 57, Berlin, Germany", phone: "(313) 555-5735", selected: false },
  { name: "Maria Anders", email: "mariaanders@mail.com", address: "25, rue Lauriston, Paris, France", phone: "(503) 555-9931", selected: false },
  { name: "Fran Wilson", email: "franwilson@mail.com", address: "C/ Araquil, 67, Madrid, Spain", phone: "(204) 619-5731", selected: false },
  { name: "Martin Blank", email: "martinblank@mail.com", address: "Via Monte Bianco 34, Turin, Italy", phone: "(480) 631-2097", selected: false }
]);

const modalType = ref(null);
const currentEmployee = ref({});
const totalPages = ref(5);

const openModal = (type, index = null) => {
  modalType.value = type;
  if (type === 'edit' && index !== null) {
    currentEmployee.value = { ...employees.value[index], index };
  } else if (type === 'add') {
    currentEmployee.value = { name: '', email: '', address: '', phone: '' };
  } else if (type === 'delete' && index !== null) {
    currentEmployee.value = { index };
  }
};

const closeModal = () => {
  modalType.value = null;
};

const handleSubmit = () => {
  if (modalType.value === 'add') {
    employees.value.push(currentEmployee.value);
  } else if (modalType.value === 'edit') {
    const index = currentEmployee.value.index;
    if (index !== -1) {
      employees.value[index] = { ...currentEmployee.value };
    }
  }
  closeModal();
};

const handleDelete = () => {
  employees.value = employees.value.filter(emp => !emp.selected);
  closeModal();
};

const selectAll = (event) => {
  const isChecked = event.target.checked;
  employees.value.forEach(employee => {
    employee.selected = isChecked;
  });
};

const goToPage = (page) => {
 
};
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto|Varela+Round');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
@import url('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');

body {
  color: #566787;
  background: #f5f5f5;
  font-family: 'Varela Round', sans-serif;
  font-size: 13px;
}
.table-wrapper {
  background: #fff;
  padding: 20px 25px;
  margin: 30px 0;
  border-radius: 3px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
.table-title {
  padding-bottom: 15px;
  background: #435d7d;
  color: #fff;
  padding: 16px 30px;
  margin: -20px -25px 10px;
  border-radius: 3px 3px 0 0;
}
.table-title h2 {
  margin: 5px 0 0;
  font-size: 24px;
}
.table-title .btn-group {
  float: right;
}
.table-title .btn {
  color: #fff;
  float: right;
  font-size: 13px;
  border: none;
  min-width: 50px;
  border-radius: 2px;
  border: none;
  outline: none !important;
  margin-left: 10px;
}
.table-title .btn i {
  float: left;
  font-size: 21px;
  margin-right: 5px;
}
.table-title .btn span {
  float: left;
  margin-top: 2px;
}
table.table tr th,
table.table tr td {
  border-color: #e9e9e9;
  padding: 12px 15px;
  vertical-align: middle;
}
table.table tr th:first-child {
  width: 60px;
}
table.table tr th:last-child {
  width: 100px;
}
table.table-striped tbody tr:nth-of-type(odd) {
  background-color: #fcfcfc;
}
table.table-striped.table-hover tbody tr:hover {
  background: #f5f5f5;
}
table.table th i {
  font-size: 13px;
  margin: 0 5px;
  cursor: pointer;
}
table.table td:last-child i {
  opacity: 0.9;
  font-size: 22px;
  margin: 0 5px;
}
table.table td a {
  font-weight: bold;
  color: #566787;
  display: inline-block;
  text-decoration: none;
  outline: none !important;
}
table.table td a:hover {
  color: #2196f3;
}
table.table td a.edit {
  color: #ffc107;
}
table.table td a.delete {
  color: #f44336;
}
table.table td i {
  font-size: 19px;
}
table.table .avatar {
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 10px;
}
.pagination {
  float: right;
  margin: 0 0 5px;
}
.pagination li a {
  border: none;
  font-size: 13px;
  min-width: 30px;
  min-height: 30px;
  color: #999;
  margin: 0 2px;
  line-height: 30px;
  border-radius: 2px !important;
  text-align: center;
  padding: 0 6px;
}
.pagination li a:hover {
  color: #666;
}
.pagination li.active a,
.pagination li.active a.page-link {
  background: #03a9f4;
}
.pagination li.active a:hover {
  background: #0397d6;
}
.pagination li.disabled i {
  color: #ccc;
}
.pagination li i {
  font-size: 16px;
  padding-top: 6px;
}
.hint-text {
  float: left;
  margin-top: 10px;
  font-size: 13px;
}
/* Custom checkbox */
.custom-checkbox {
  position: relative;
}
.custom-checkbox input[type='checkbox'] {
  opacity: 0;
  position: absolute;
  margin: 5px 0 0 3px;
  z-index: 9;
}
.custom-checkbox label:before {
  width: 18px;
  height: 18px;
}
.custom-checkbox label:before {
  content: '';
  margin-right: 10px;
  display: inline-block;
  vertical-align: text-top;
  background: white;
  border: 1px solid #bbb;
  border-radius: 2px;
  box-sizing: border-box;
  z-index: 2;
}
.custom-checkbox input[type='checkbox']:checked + label:after {
  content: '';
  position: absolute;
  left: 6px;
  top: 3px;
  width: 6px;
  height: 11px;
  border: solid #000;
  border-width: 0 3px 3px 0;
  transform: inherit;
  z-index: 3;
  transform: rotateZ(45deg);
}
.custom-checkbox input[type='checkbox']:checked + label:before {
  border-color: #03a9f4;
  background: #03a9f4;
}
.custom-checkbox input[type='checkbox']:checked + label:after {
  border-color: #fff;
}
.custom-checkbox input[type='checkbox']:disabled + label:before {
  color: #b8b8b8;
  cursor: auto;
  box-shadow: none;
  background: #ddd;
}
/* Modal styles */
.modal .modal-dialog {
  max-width: 400px;
}
.modal .modal-header,
.modal .modal-body,
.modal .modal-footer {
  padding: 20px 30px;
}
.modal .modal-content {
  border-radius: 3px;
}
.modal .modal-footer {
  background: #ecf0f1;
  border-radius: 0 0 3px 3px;
}
.modal .modal-title {
  display: inline-block;
}
.modal .form-control {
  border-radius: 2px;
  box-shadow: none;
  border-color: #dddddd;
}
.modal textarea.form-control {
  resize: vertical;
}
.modal .btn {
  border-radius: 2px;
  min-width: 100px;
}
.modal form label {
  font-weight: normal;
}
</style>
