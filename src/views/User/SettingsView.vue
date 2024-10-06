<script setup>
import authService from '../../services/authService';
import TabMenu from '../../components/Tabs/TabMenu.vue';
import { ref, onMounted } from 'vue'
import {useUsersStore} from "@/store/users"
import {useDepartmentsStore} from "@/store/departments"
import {useBusinessUnitsStore} from "@/store/businessUnit"
import {useRolesStore} from "@/store/roles"
import AdminLog from '../User/AdminLog.vue'



const store = useUsersStore();
const rolesStore = useRolesStore();
const departmentsStore = useDepartmentsStore();
const businessUnitsStore = useBusinessUnitsStore();

const users = ref([]);
const userData = ref([]);
const departs = ref([]);
// const roleType = rolesStore.roles;
const storeRole = ref([])
const businessUnits = ref([]);

const lastModifiedBy = ref('');
const departmentDescription = ref('');
const shortCode = ref('');

const departments = ref([]);
const departmentId = ref(0);

const userFullName = ref('')
const fullName = ref('')
  // const department = ref('')
  // const manager = ref('')
  const userId  = ref('')
  // const level = ref('')
  // const status = ref('')
  // const role = ref('')
  const roleId = ref(0)
  const phoneNumber = ref('')
  const jobTitle = ref('')
  const address = ref('')
  const businessUnitId = ref(0)
  const createdBy = ref('')
  // const mission = ref('')
  // const vision = ref('')
  const businessUnitDescription = ref('')
  const editingUser = ref(null);
  const editingBusinessUnit = ref(null);
  const editingRole = ref(null);
  const editingDepartment = ref(null);
  const selectedValue = ref('')

  const userType = ref(null);
  const description = ref('')
  const name = ref('')
  const usersType = ref([]);
  const loadingUsers = ref(false);
  console.log(usersType.value);

const fetchUserType = async () => {
  loadingUsers.value = true;
  try {
    const response = await fetch("https://infracreditpdp.azurewebsites.net/api/Administrations/getUserTypes");
    const data = await response.json();
    usersType.value = data;
  } catch (error) {
    console.error("Error fetching user type:", error);
  } finally {
    loadingUsers.value = false;
  }
  
};

  const loadingDepartments = ref(false);
  console.log(departments.value);

const fetchDepartment = async () => {
  loadingDepartments.value = true;
  try {
    const response = await fetch("https://infracreditpdp.azurewebsites.net/api/Settings/getDepartments");
    const data = await response.json();
    departments.value = data;
    console.log('Departments fetched directly:', departments.value);
  } catch (error) {
    console.error("Error fetching user type:", error);
  } finally {
    loadingDepartments.value = false;
  }
  
};

const fetchData = async () => {
  try {
    await rolesStore.fetchRoles();
    await store.fetchUsers();
    await departmentsStore.fetchDepartments();
    await businessUnitsStore.fetchBusinessUnits();

    departs.value = departmentsStore.departments;
    storeRole.value = rolesStore.roles;
    businessUnits.value = businessUnitsStore.businessUnits
    users.value = store.users
    userData.value = store.users


    console.log('Roles:', storeRole.value);
    console.log('Users:', users.value);
    console.log('UserData:', userData.value);
    console.log('Departments:', departs.value);
    console.log('Business Units:', businessUnits.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(async () => {
  await fetchDepartment();
  console.log('Departments fetched directly:', departments.value);
  await fetchData();
  const userData = store.users.data;
  console.log(userData);
  await fetchUserType();
  try {
    await authService.initialize();
    const msalInstance = authService.getMsalInstance();
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length) {
      createdBy.value = accounts[0].username; 
      lastModifiedBy.value = accounts[0].username; 
    }
  } catch (error) {
    console.error('Error during MSAL initialization:', error);
  }
});

const addUser = async () => {
  if (
    userId.value.trim() !== '' || fullName.value.trim() !== '' || roleId.value.trim() !== '' || jobTitle.value.trim() !== '' || phoneNumber.value.trim() !== '' || address.value.trim() !== '' || departmentId.value.trim() !== '' || businessUnitId.value.trim() !== ''  || createdBy.value.trim() !== '' 
  ) {
    await store.addUser(
      userId.value.trim(), fullName.value.trim(), roleId.value.trim(), jobTitle.value.trim(), phoneNumber.value.trim(), address.value.trim(), departmentId.value.trim(), businessUnitId.value.trim(), createdBy.value.trim()
    );
    userId.value = '',
    userFullName.value = '';
    roleId.value = '';
    jobTitle.value = '';
    phoneNumber.value = '';
    address.value = '';
    departmentId.value = '';
    businessUnitId.value = '';
    createdBy.value = '';

    console.log("User added");
  }
};

const addDepartment = async () => {
  if (
    shortCode.value.trim() !== '' || departmentDescription.value.trim() !== '' || lastModifiedBy.value.trim() !== ''
  ) {
    await departmentsStore.addDepartment(
      shortCode.value.trim(), departmentDescription.value.trim(), lastModifiedBy.value.trim()
    );

    shortCode.value = '';
    departmentDescription.value = '';
    lastModifiedBy.value = '';
    console.log("Department added");
  }
};

const addBusinessUnit = async () => {
  if (
    shortCode.value.trim() !== '' || businessUnitDescription.value.trim() !== '' || lastModifiedBy.value.trim() !== ''
  ) {
    await businessUnitsStore.addBusinessUnit(
      shortCode.value.trim(), businessUnitDescription.value.trim(), lastModifiedBy.value.trim()
    );

    shortCode.value = '';
    businessUnitDescription.value = '';
    lastModifiedBy.value = '';
    console.log("Business unit added");
  }
};

const addRole = async () => {

  if (name.value && description.value && userType.value) {
    if (name.value.trim() !== '' && description.value.trim() !== '' && userType.value.trim() !== '') {
      await rolesStore.addRole(
        name.value.trim(),
        description.value.trim(),
        userType.value.trim()
      );

      name.value = '';
      description.value = '';
      usersType.value = '';

      console.log("Role added");
    } else {
      console.error("One or more fields are empty");
    }
  } else {
    console.error("One or more fields are undefined");
  }
};


const handleSubmit = () => {
  addUser();
  console.log("User added")
  
};

const handleAddDepartment = () => {
    addDepartment();
    console.log("Department added");
    console.log(departs);
  };

const handleAddBusinessUnit = () => {
    addBusinessUnit();
    console.log("Business unit added");
    
  };

const handleAddRole = () => {
  addRole();
  console.log("Role added")
};


 const onSelectChange = () => {
  // eslint-disable-next-line no-self-assign
  selectedValue.value = selectedValue.value
  console.log("Selected department ID:", departmentId.value);
}

const editUser = (user) => {
  editingUser.value = { ...user };
  
  fullName.value = user.fullName;
  createdBy.value = user.createdBy;
  roleId.value = user.roleId;
  departmentId.value = user.departmentId;
  jobTitle.value = user.jobTitle;
  phoneNumber.value = user.phoneNumber;
  address.value = user.address;
  businessUnitId.value = user.businessUnitId;
  
  document.getElementById('myModal').style.display = 'block';
};

const updateUser = async () => {
  if (editingUser.value) {
    editingUser.value.fullName = fullName.value;
    editingUser.value.createdBy = createdBy.value;
    editingUser.value.roleId = roleId.value;
    editingUser.value.departmentId = departmentId.value;
    editingUser.value.jobTitle = jobTitle.value;
    editingUser.value.phoneNumber = phoneNumber.value;
    editingUser.value.address = address.value;
    editingUser.value.businessUnitId = businessUnitId.value;
    await store.updateUser(editingUser.value);
    editingUser.value = null;

    document.getElementById('myModal').style.display = 'none';
  }
};

const deleteUser = async (userId) => {
  if (confirm('Are you sure you want to delete this user?')) {
    await store.deleteUser(userId);
  }
};

const editBusinessUnit = (biz) => {
  editingBusinessUnit.value = { ...biz };
  
  shortCode.value = biz.shortCode;
  businessUnitDescription.value = biz.businessUnitDescription;
  lastModifiedBy.value = biz.lastModifiedBy;
  
  document.getElementById('myModal3').style.display = 'block';
};

const updateBusinessUnit = async () => {
  if (editingBusinessUnit.value) {
    editingBusinessUnit.value.shortCode = shortCode.value;
    editingBusinessUnit.value.businessUnitDescription = businessUnitDescription.value;
    editingBusinessUnit.value.lastModifiedBy = lastModifiedBy.value;
    await businessUnitsStore.updateBusinessUnit(editingBusinessUnit.value);
    editingBusinessUnit.value = null;

    document.getElementById('myModal3').style.display = 'none';
  }
};

const deleteBusinessUnit = async (businessUnitId) => {
  if (confirm('Are you sure you want to delete this business unit?')) {
    await businessUnitsStore.deleteBusinessUnit(businessUnitId);
  }
};

const editRole = (role) => {
  editingRole.value = { ...role };
  
  name.value = role.name;
  description.value = role.description;
  userType.value = role.userType;
  
  document.getElementById('myModal2').style.display = 'block';
};

const updateRole = async () => {
  if (editingRole.value) {
    editingRole.value.name = name.value;
    editingRole.value.description = description.value;
    editingRole.value.userType = userType.value;
    await rolesStore.updateRole(editingRole.value);
    editingRole.value = null;

    document.getElementById('myModal2').style.display = 'none';
  }
};

const deleteRole = async (roleId) => {
  if (confirm('Are you sure you want to delete this role?')) {
    await rolesStore.deleteRole(roleId);
  }
};

const editDepartment = (department) => {
  editingDepartment.value = { ...department };
  
  shortCode.value = department.shortCode;
  departmentDescription.value = department.departmentDescription;
  lastModifiedBy.value = department.lastModifiedBy;
  
  document.getElementById('myModal1').style.display = 'block';
};

const updateDepartment = async () => {
  if (editingDepartment.value) {
    editingDepartment.value.shortCode = shortCode.value;
    editingDepartment.value.departmentDescription = departmentDescription.value;
    editingDepartment.value.lastModifiedBy = lastModifiedBy.value;
    await departmentsStore.updateDepartment(editingDepartment.value);
    editingDepartment.value = null;

    document.getElementById('myModal1').style.display = 'none';
  }
};

const deleteDepartment = async (departmentId) => {
  if (confirm('Are you sure you want to delete this department?')) {
    await departmentsStore.deleteDepartment(departmentId);
  }
};

const tab = ref(1);
</script>
<template>
  <main class="wrapper">
    <TabMenu />
    <form method="post" action="" @submit.prevent="editingUser ? updateUser() : handleSubmit">
      <div class="modal" id="myModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add User Form</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">

              <div class="goal">
                <div class="left">
                  <h4>Name</h4>
                  <textarea name="Name" placeholder="Name" id="" cols="30" rows="10" v-model="fullName"></textarea>
                </div>
                <div class="right">
                  <h4>Created By</h4>
                  <input type="text" v-model="createdBy" placeholder="Created By" disabled>
                </div>
              </div>
              <div class="goal">
                <div class="left">
                  <h4>Role</h4>
                  <select v-if="storeRole.length > 0" class="form-select" aria-label="Default select example" v-model="roleId">
                    <option v-for="role in storeRole" :key="role.id">{{ role.name }}</option>
                  </select>
                  <!-- <select class="form-select" aria-label="Default select example" v-on:change="onSelectChange(e)" v-model="roleId">

                    <option class="opt" value="1">Admin</option>
                    <option class="opt" value="2">Manager</option>
                    <option class="opt" value="3">HOD</option>
                    <option class="opt" value="4">IT</option>
                    <option class="opt" value="6">test</option>
                  </select> -->
                </div>
                <div class="right">
                  <h4 class="">Department</h4>
                  <select class="form-select" aria-label="Default select example" v-on:change="onSelectChange(e)" v-model="departmentId">

                    <option class="opt" value="1">Administration</option>
                    <option class="opt" value="2">Procurement</option>
                    <option class="opt" value="3">Knowledge Management</option>
                    <option class="opt" value="4">Credit Risk Management</option>
                    <option class="opt" value="5">Information Technology</option>
                  </select>
                </div>
              </div>
              <div class="goal">
                <div class="left">
                  <h4>Job Title</h4>
                  <textarea name="Job Title" placeholder="Job Title" id="" cols="30" rows="10" v-model="jobTitle"></textarea>
                </div>
                <div class="right">
                  <h4 class="">Phone Number</h4>
                  <textarea name="Phone Number" placeholder="Phone Number" id="" cols="30" rows="10" v-model="phoneNumber"></textarea>
                </div>
              </div>
              <div class="goal">
                <div class="left">
                  <h4>Address</h4>
                  <textarea name="Address" placeholder="Address" id="" cols="30" rows="10" v-model="address"></textarea>
                </div>
                <div class="right">
                  <h4>Business Unit</h4>
                  <textarea name="Business Unit" placeholder="Business Unit" id="" cols="30" rows="10" v-model="businessUnitId"></textarea>
                </div>
              </div>
              <div class="goal">
                <div class="left">

                </div>
                <!-- <div class="right">
                  <h4>Business Unit</h4>
                  <textarea name="Business Unit" placeholder="Business Unit" id="" cols="30" rows="10" v-model="businessUnit"></textarea>
                </div> -->
              </div>

            </div>
            <div class="modal-footer">

              <button type="submit" class="btn btn-success" data-bs-dismiss="modal" @click="$router.push('/settings')">{{ editingUser ? 'Update' : 'Submit' }}</button>
            </div>

          </div>
        </div>
      </div>
    </form>
    <!-- <form method="post" action="" @submit.prevent="handleSubmit">
      <div class="modal" id="myModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add User Form</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">

              <div class="goal">
                <div class="left">
                  <h4 class="">Email</h4>
                  <textarea name="Email" placeholder="Email" id="" cols="30" rows="10" v-model="userId"></textarea>
                </div>
                <div class="right">
                  <h4>Name</h4>
                  <textarea name="Name" placeholder="Name" id="" cols="30" rows="10" v-model="userFullName"></textarea>

                </div>
              </div>
              <div class="goal">
                <div class="left">
                  <h4>Role</h4>
                  <select class="form-select" aria-label="Default select example" v-on:change="onSelectChange(e)" v-model="roless">
                    <option v-for="role in roles" :key="role" :value="role">{{ role }}</option> 
                    <option class="opt" value="User">User</option>
                    <option class="opt" value="Supervisor">Supervisor</option>
                    <option class="opt" value="Auditor">Auditor</option>
                    <option class="opt" value="IT Admin">IT Admin</option>
                    <option class="opt" value="Knowledge Manager">Knowledge Manager</option>
                    <option class="opt" value="Management">Management</option>
                  </select>

                </div>
                <div class="right">
                  <h4 class="">Department</h4>
                  <select class="form-select" aria-label="Default select example" v-on:change="onSelectChange(e)" v-model="department">

                    <option class="opt" value="Knowledge Management">Knowledge Management</option>
                    <option class="opt" value="Credit Risk Management">Credit Risk Management</option>
                  </select>
                </div>
              </div>
              <div class="goal">
                <div class="left">
                  <h4>Level</h4>
                  <select class="form-select" aria-label="Default select example" v-on:change="onSelectChange(e)" v-model="level">

                    <option class="opt" value="Associates">Associates</option>
                    <option class="opt" value="Senior Associates">Senior Associates</option>
                    <option class="opt" value="AVP">AVP</option>
                  </select>
                </div>
                <div class="right">
                  <h4 class="">Status</h4>
                  <select class="form-select" aria-label="Default select example" v-on:change="onSelectChange(e)" v-model="status">

                    <option class="opt" value="Active">Active</option>
                    <option class="opt" value="In-Active">In-Active</option>
                  </select>
                </div>
              </div>
              <div class="goal">
                <div class="left">
                  <h4>Manager</h4>
                  <select class="form-select" aria-label="Default select example" v-on:change="onSelectChange(e)" v-model="manager">

                    <option class="opt" value="Tope">Tope</option>
                    <option class="opt" value="Stephen">Stephen</option>
                    <option class="opt" value="Victory">Victory</option>
                  </select>
                </div>

              </div>
              <div class="goal">
                <div class="left">
                  <h4>Mission</h4>
                  <textarea name="Name" placeholder="Name" id="" cols="30" rows="10" v-model="mission"></textarea>
                </div>
                <div class="right">
                  <h4 class="">Vision</h4>
                  <textarea name="Email" placeholder="Email" id="" cols="30" rows="10" v-model="vision"></textarea>

                </div>
              </div>
            </div>
            <div class="modal-footer">

              <button type="submit" class="btn btn-success" data-bs-dismiss="modal" @click="$router.push('/settings')">Submit Request</button>
            </div>

          </div>
        </div>
      </div>
    </form> -->
    <form method="post" action="" @submit.prevent="editingDepartment ? updateDepartment() : handleAddDepartment()">
      <div class="modal" id="myModal1" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Department Form</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">

              <div class="goal">
                <div class="left">
                  <h4 class="">Short Code</h4>
                  <textarea name="shortCode" placeholder="Short Code" id="shortCode" cols="30" rows="10" v-model="shortCode"></textarea>

                </div>
                <div class="right">
                  <h4>Department</h4>
                  <textarea name="Department" placeholder="Department" v-model="departmentDescription" id="" cols="30" rows="10"></textarea>
                </div>

              </div>
              <div class="goal">
                <div class="left">
                  <h4 class="">Modified By</h4>
                  <input type="text" v-model="lastModifiedBy" placeholder="Created By" disabled>

                </div>

              </div>
            </div>
            <div class="modal-footer">

              <button type="submit" class="btn btn-success" data-bs-dismiss="modal">{{ editingDepartment ? 'Update' : 'Submit' }}</button>
            </div>

          </div>
        </div>
      </div>
    </form>
    <form method="post" action="" @submit.prevent="editingRole ? updateRole() : handleAddRole()">
      <div class="modal" id="myModal2" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Role Form</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">

              <div class="goal">
                <div class="leftt">
                  <h4>Role</h4>
                  <textarea name="Name" placeholder="Name" v-model="name" id="" cols="30" rows="10"></textarea>
                </div>
                <div class="right">
                  <h4>Description</h4>
                  <textarea name="Description" placeholder="Description" v-model="description" id="" cols="30" rows="10"></textarea>
                </div>
              </div>
              <div class="goal">

                <div class="left">
                  <h4>User Type</h4>
                  <select class="form-select" aria-label="Default select example" v-model="userType">
                    <option v-if="loadingUsers" disabled>Loading Users...</option>
                    <option v-for="userType in usersType" :key="userType.id" :value="userType.id">{{ userType.descriptions }}</option>
                    <option v-if="!loadingUsers && usersType.length === 0" disabled>No Users Found</option>
                  </select>
                </div>

              </div>

            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-success" data-bs-dismiss="modal">{{ editingRole ? 'Update' : 'Submit' }}</button>

            </div>

          </div>
        </div>
      </div>
    </form>

    <form method="post" action="" @submit.prevent="editingBusinessUnit ? updateBusinessUnit() : handleAddBusinessUnit()">
      <div class="modal" id="myModal3" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Business Unit Form</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="editingBusinessUnit = null"></button>
            </div>
            <div class="modal-body">
              <div class="goal">
                <div class="left">
                  <h4 class="">Short Code</h4>
                  <textarea name="shortCode" placeholder="Short Code" id="shortCode" cols="30" rows="10" v-model="shortCode"></textarea>
                </div>
                <div class="right">
                  <h4>Business Unit</h4>
                  <textarea name="Business Unit" placeholder="Business Unit Description" v-model="businessUnitDescription" id="" cols="30" rows="10"></textarea>
                </div>
              </div>
              <div class="goal">
                <div class="left">
                  <h4 class="">Modified By</h4>
                  <input type="text" v-model="lastModifiedBy" placeholder="Created By" disabled>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-success" data-bs-dismiss="modal">{{ editingBusinessUnit ? 'Update' : 'Submit' }}</button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="container-fluid mt-3 justify-content-start">
      <h3 style="color: var(--black, #000);font-size: 24px;font-family: 'Inter', sans-serif;font-style: normal;font-weight: 500;line-height: 28.8px;">Settings</h3>
      <p style="color: var(--grey-dark, #808080);font-size: 16px;font-family: 'Inter', sans-serif;font-style: normal;font-weight: 400;line-height: 19.2px;">System Configuration</p>

      <div class="list-group">
        <div class="list-group-item" style="background:#F7F7F7;color: var(--black, #000);font-size: 20px;font-family: 'Inter', sans-serif;font-style: normal;font-weight: 600;line-height: 24px;">

          <v-card>
            <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
              <v-tab :value="1">Users/Roles</v-tab>
              <v-tab :value="2">Department and Levels</v-tab>
              <v-tab :value="3">Log</v-tab>
              <v-tab :value="4">Role</v-tab>
              <v-tab :value="5">Business Unit</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <!-- Users Tab -->
              <v-tab-item :value="1">
                <v-container fluid v-if="tab === 1">
                  <div class="dev">
                    <h3>Users</h3>
                    <button data-bs-toggle="modal" data-bs-target="#myModal" type="button">Add User</button>
                  </div>
                  <v-table>
                    <thead>
                      <tr>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> S/N </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Name </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Role </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Title </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Phone Number </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Address </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Department </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Business Unit </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span>Created By </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="user in userData" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.fullName }}</td>
                        <td>{{ user.roleId }}</td>
                        <td>{{ user.jobTitle }}</td>
                        <td>{{ user.phoneNumber }}</td>
                        <td>{{ user.address }}</td>
                        <td>{{ user.departmentId }}</td>
                        <td>{{ user.businessUnitId }}</td>
                        <td>{{ user.createdBy }}</td>
                        <td>
                          <v-icon icon="mdi-pencil" class="icon-warning" @click="editUser(user)"></v-icon>
                          <v-icon icon="mdi-delete" class="icon-danger" @click="deleteUser(user.id)"></v-icon>
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-container>
              </v-tab-item>

              <!-- Department and Levels Tab -->
              <v-tab-item :value="2">
                <v-container fluid v-if="tab === 2">
                  <div class="dev">
                    <h3>Department</h3>
                    <button data-bs-toggle="modal" data-bs-target="#myModal1" type="button">Add Department</button>
                  </div>
                  <v-table>
                    <thead>
                      <tr>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> S/N </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Short Code</span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Department </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="department in departs" :key="department.id">
                        <td>{{ department.id }}</td>
                        <td>{{ department.shortCode }}</td>
                        <td>{{ department.departmentDescription }}</td>
                        <td>
                          <v-icon icon="mdi-pencil" class="icon-warning" @click="editDepartment(department)"></v-icon>
                          <v-icon icon="mdi-delete" class="icon-danger" @click="deleteDepartment(department.id)"></v-icon>
                        </td>
                      </tr>

                    </tbody>
                  </v-table>
                </v-container>
              </v-tab-item>

              <!-- Log Tab -->
              <v-tab-item :value="3">
                <v-container fluid v-if="tab === 3">
                  <AdminLog />
                </v-container>
              </v-tab-item>

              <v-tab-item :value="4">
                <v-container fluid v-if="tab === 4">
                  <div class="dev">
                    <h3>Role</h3>
                    <button data-bs-toggle="modal" data-bs-target="#myModal2" type="button">Add Role</button>
                  </div>
                  <v-table>
                    <thead>
                      <tr>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> S/N </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Role </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Description </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> User type </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="role in storeRole" :key="role.id" @dblclick="$router.push({name: 'Role Detail', params: {id: role.id}})">
                        <td>{{ role.id }}</td>
                        <td>{{ role.name }}</td>
                        <td>{{ role.description }}</td>
                        <td>{{ role.userType }}</td>
                        <td>
                          <v-icon icon="mdi-pencil" class="icon-warning" @click="editRole(role)"></v-icon>
                          <v-icon icon="mdi-delete" class="icon-danger" @click="deleteRole(role.id)"></v-icon>
                        </td>
                      </tr>
                    </tbody>
                  </v-table>

                </v-container>
              </v-tab-item>
              <v-tab-item :value="5">
                <v-container fluid v-if="tab === 5">
                  <div class="dev">
                    <h3>Business Unit</h3>
                    <button data-bs-toggle="modal" data-bs-target="#myModal3" type="button">Add Business Unit</button>
                  </div>
                  <v-table>
                    <thead>
                      <tr>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> S/N </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span>Business Unit </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="biz in businessUnits" :key="biz.id">
                        <td>{{ biz.id }}</td>
                        <td>{{ biz.businessUnitDescription }}</td>
                        <td>
                          <v-icon icon="mdi-pencil" class="icon-warning" @click="editBusinessUnit(biz)"></v-icon>
                          <v-icon icon="mdi-delete" class="icon-danger" @click="deleteBusinessUnit(biz.id)"></v-icon>
                        </td>
                      </tr>
                    </tbody>
                  </v-table>

                </v-container>
              </v-tab-item>
            </v-tabs-items>
          </v-card>

        </div>

      </div>

    </div>
  </main>
</template>
<style scoped>
main {
  height: 1450px;
}
.dev h3 {
  color: var(--Black, #000);
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28.8px;
  width: 900px;
}
.dev {
  display: flex;
  padding: 10px 30px;
  align-items: center;
  gap: 10px;
}
.dev button {
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  width: 180px;
  height: 40px;
  color: #fff;
  font-size: 18px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  height: 30px !important;
}
.modal-body {
  gap: 20px;
  background: #fff;
  margin-top: 0px !important;
}
.modal-dialog {
  width: 900px;
  height: auto;
  margin-left: 20%;
  display: inline-flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--Grey-Light, #eee);
}
.modal-content {
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
  background: #fff;
}
.type {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}
.type h3 {
  color: var(--Black, #000);
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.form-select {
  display: flex;
  width: 320px;
  height: 40px;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--White, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.goal {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  margin-top: 20px;
}
.left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}
.right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}
.left h4,
.right h4 {
  color: var(--Black, #000);
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.goal textarea {
  display: flex;
  width: 320px;
  height: 70px;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border: 1px solid #808080;
  border-radius: 5px;
}
.type input {
  display: flex;
  width: 320px;
  height: 40px;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--White, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.modal-footer {
  display: flex;
  height: 40px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
}
.modal-footer .btn {
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: #fff;
}
.wright textarea {
  width: 320px;
  height: 70px;
}
.lefts input {
  width: 320px;
  height: 40px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--White, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.form-selects {
  display: flex;
  width: 320px;
  height: 40px;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--White, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.types button {
  display: flex;
  padding: 10px 50px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: #fff;
  margin-top: 10px;
}
.leftt {
  width: 320px;
}
.leftt input {
  width: 100%;
  height: 40px;
  border: 1px solid #ddd;
}
#myModal1 .modal-dialog {
  height: 500px;
}
tr th {
  color: var(--Black, #000);
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 14.4px;
}
tr td {
  color: var(--Grey-Dark, #808080);
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
#app {
  text-align: center;
  margin-top: 20px;
}
.theme--light.v-data-table.v-data-table--fixed-header thead th {
  background: #555;
  color: #fff;
}
.w-100 {
  width: 100%;
}
.icon-warning {
  color: orange;
}

.icon-danger {
  color: red;
}
</style>