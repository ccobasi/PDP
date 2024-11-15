<script setup>
import authService from '../../services/authService';
import TabMenu from '../../components/Tabs/TabMenu.vue';
import { ref, onMounted, computed, nextTick } from 'vue'
import {useUsersStore} from "@/store/users"
import {useDepartmentsStore} from "@/store/departments"
import {useBusinessUnitsStore} from "@/store/businessUnit"
import {useRolesStore} from "@/store/roles"
import AdminLog from '../User/AdminLog.vue'


const store = useUsersStore();
const rolesStore = useRolesStore();
const departmentsStore = useDepartmentsStore();
const businessUnitsStore = useBusinessUnitsStore();
const loading = ref(true); 
const loadingDepartments = ref(true);
const users = ref([]);
const userData = ref([]);
const departs = ref([]);
// const roleType = rolesStore.roles;
const roles = ref([])

const businessUnits = computed(() => businessUnitsStore.businessUnits || []);
const lastModifiedBy = ref('');
const departmentDescription = ref('');
const option = ref('');
const departments = computed(() => departmentsStore.departments || []);

const userFullName = ref('')
  const email = ref('')
  const phoneNumber = ref('')
  const jobTitle = ref('')
  const address = ref('')

  const createdBy = ref(null)
  const businessUnitDescription = ref('')
  const editingUser = ref(null);
  const editingBusinessUnit = ref(null);
  const editingRole = ref(null);
  const editingDepartment = ref(null);
  // const selectedValue = ref('')
  const businessUnit = ref(null)
  const department = ref(null)
  const role = ref(null)

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

  // const loadingDepartments = ref(false);
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
    roles.value = rolesStore.roles;
    businessUnits.value = businessUnitsStore.businessUnits
    users.value = store.users
    userData.value = store.users


    console.log('Roles:', roles.value);
    console.log('Users:', users.value);
    console.log('UserData:', userData.value);
    console.log('Departments:', departs.value);
    console.log('Business Units:', businessUnits.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(async () => {
  await rolesStore.fetchRoles(); 
  console.log("Roles Loaded", rolesStore.roles);
  await departmentsStore.fetchDepartments();
  loadingDepartments.value = false;
  await businessUnitsStore.fetchBusinessUnits();
    await nextTick(); 
    console.log('Business Units after fetch:', businessUnits.value);

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
  finally {
    loading.value = false;  
  }
});

const addUser = async () => {
      const userData = {
        userFullName: userFullName.value,
        email: email.value,
        role: role.value,
        department: department.value,
        jobTitle: jobTitle.value,
        phoneNumber: phoneNumber.value,
        address: address.value,
        businessUnit: businessUnit.value,
        createdBy: createdBy.value,
      };

      try {
        await store.addUser(userData); 
        console.log('User added successfully');
        document.getElementById('myModal').style.display = 'none'; 
      } catch (error) {
        console.error('Error adding user:', error);
      }
    };


const addDepartment = async () => {
  if (
    option.value.trim() !== '' 
  ) {
    await departmentsStore.addDepartment(
      option.value.trim()
    );

    option.value = '';
    console.log("Department added");
  }
};

const addBusinessUnit = async () => {
  if (
    option.value.trim() !== '' 
  ) {
    await businessUnitsStore.addBusinessUnit(
      option.value.trim()
    );

    option.value = '';
    console.log("Business unit added");
  }
};

const addRole = async () => {

  if (option.value) {
    if (option.value.trim() !== '') {
      await rolesStore.addRole(
        option.value.trim()
      );

      option.value = '';

      console.log("Role added");
    } else {
      console.error("One or more fields are empty");
    }
  } else {
    console.error("One or more fields are undefined");
  }
};


const handleSubmit = async () => {
      console.log({
        userFullName: userFullName.value,
        email: email.value,
        role: role.value,
        department: department.value,
        jobTitle: jobTitle.value,
        phoneNumber: phoneNumber.value,
        address: address.value,
        businessUnit: businessUnit.value,
        createdBy: createdBy.value,
      });

      await addUser(); // Add user logic
      console.log("User added");
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


//  const onSelectChange = () => {
//   // eslint-disable-next-line no-self-assign
//   selectedValue.value = selectedValue.value
//   console.log("Selected department ID:", departmentId.value);
// }

const editUser = (user) => {
  editingUser.value = { ...user };
  email.value = user.email;
  userFullName.value = user.userFullName;
  createdBy.value = user.createdBy;
  role.value = user.role;
  department.value = user.department;
  jobTitle.value = user.jobTitle;
  phoneNumber.value = user.phoneNumber;
  address.value = user.address;
  businessUnit.value = user.businessUnit;
  
  document.getElementById('myModal').style.display = 'block';
};

const updateUser = async () => {
  if (editingUser.value) {
    editingUser.value.email = email.value;
    editingUser.value.userFullName = userFullName.value;
    editingUser.value.createdBy = createdBy.value;
    editingUser.value.role = role.value;
    editingUser.value.department = department.value;
    editingUser.value.jobTitle = jobTitle.value;
    editingUser.value.phoneNumber = phoneNumber.value;
    editingUser.value.address = address.value;
    editingUser.value.businessUnit = businessUnit.value;
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
  
  option.value = biz.option;
  businessUnitDescription.value = biz.businessUnitDescription;
  lastModifiedBy.value = biz.lastModifiedBy;
  
  document.getElementById('myModal3').style.display = 'block';
};

const updateBusinessUnit = async () => {
  if (editingBusinessUnit.value) {
    editingBusinessUnit.value.option = option.value;
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
    <!-- <form method="post" @submit.prevent="editingUser ? updateUser() : handleSubmit"> -->
    <form method="post" @submit.prevent="handleSubmit">
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
                  <input type="text" v-model="userFullName" placeholder="Full Name" required>
                </div>
                <div class="right">
                  <h4>Email</h4>
                  <input type="email" v-model="email" placeholder="Email" required>
                </div>
              </div>

              <div class="goal">
                <div class="left">
                  <h4>Role</h4>
                  <select v-if="!loading && rolesStore.roles.length > 0" class="form-select" v-model.number="role" required>
                    <option v-for="roleOption in rolesStore.roles" :key="roleOption.id" :value="roleOption.id">
                      {{ roleOption.option }}
                    </option>
                  </select>
                </div>
                <div class="right">
                  <h4>Department</h4>
                  <select class="form-select" v-model.number="department" required>
                    <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                      {{ dept.option }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="goal">
                <div class="left">
                  <h4>Job Title</h4>
                  <input type="text" v-model="jobTitle" placeholder="Job Title" required>
                </div>
                <div class="right">
                  <h4>Phone Number</h4>
                  <input type="tel" v-model="phoneNumber" placeholder="Phone Number" required>
                </div>
              </div>

              <div class="goal">
                <div class="left">
                  <h4>Address</h4>
                  <input type="text" v-model="address" placeholder="Address" required>
                </div>
                <div class="right">
                  <h4>Business Unit</h4>
                  <select class="form-select" v-model.number="businessUnit" required>
                    <option v-for="unit in businessUnits" :key="unit.id" :value="unit.id">
                      {{ unit.option }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="goal">
                <div class="left">
                  <h4>Created By</h4>
                  <input type="number" v-model.number="createdBy" placeholder="Creator ID" required>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button type="submit" class="btn btn-success" data-bs-dismiss="modal">
                <!-- {{ editingUser ? 'Update' : 'Submit' }} -->
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>

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
                  <h4 class="">Department</h4>

                  <input type="text" v-model="option" placeholder="Department">

                </div>
                <div class="right">

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

                  <input type="text" v-model="option" placeholder="Role">
                </div>
                <div class="right">

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
                  <h4 class="">Business Unit</h4>
                  <input type="text" v-model="option" placeholder="Business Unit">
                </div>
                <div class="right">

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

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Name </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Role </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Title </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Phone Number </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Address </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Department </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Business Unit </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span>Created By </span>

                          </div>
                        </th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="user in userData" :key="user.id" @dblclick="editUser(user)">
                        <td>{{ user.userId }}</td>
                        <td>{{ user.userFullName }}</td>
                        <td>{{ user.role.option }}</td>
                        <td>{{ user.jobTitle }}</td>
                        <td>{{ user.phoneNumber }}</td>
                        <td>{{ user.address }}</td>
                        <td>{{ user.department?.option }}</td>
                        <td>{{ user.businessUnit?.option || 'N/A' }}</td>
                        <td>{{ user.createdBy?.userFullName || 'N/A' }}</td>
                        <td>
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

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Department</span>

                          </div>
                        </th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="department in departs" :key="department.id" @dblclick="editDepartment(department)">
                        <td>{{ department.id }}</td>
                        <td>{{ department.option }}</td>

                        <td>
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

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Role </span>

                          </div>
                        </th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="role in rolesStore.roles" :key="role.id" @dblclick="editRole(role)">
                        <td>{{ role.id }}</td>
                        <td>{{ role.option }}</td>
                        <td>

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

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span>Business Unit </span>

                          </div>
                        </th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="biz in businessUnits" :key="biz.id" @dblclick="editBusinessUnit(biz)">
                        <td>{{ biz.id }}</td>
                        <td>{{ biz.option }}</td>
                        <td>
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
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1040;
}

.modal {
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: auto;
}

main {
  height: 1450px;
}

.text-deep-purple-accent-4 {
  color: #227cbf !important;
}

.dev h3 {
  color: var(--Black, #000);
  font-family: Roboto, sans-serif;
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
  width: 190px;
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
  margin-left: 15%;
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
  font-family: Roboto, sans-serif;
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

.right input,
.left input {
  width: 320px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
}

.left h4,
.right h4 {
  color: var(--Black, #000);
  font-family: Roboto, sans-serif;
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
  border: 1px solid #ddd;
  border-radius: 5px;
}

.goal textarea::placeholder,
.left input::placeholder,
.right input::placeholder {
  font-size: 12px;
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
  font-family: Roboto, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 14.4px;
}
tr td {
  color: var(--Grey-Dark, #808080);
  font-family: Roboto, sans-serif;
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

@media (max-width: 1024px) {
  .modal-dialog {
    width: 800px;
    --bs-modal-width: 800px;
    margin-left: 6.5%;
  }
}

@media (max-width: 768px) {
  #myModal1 .modal-dialog,
  #myModal2 .modal-dialog,
  #myModal3 .modal-dialog {
    width: 600px;
    height: 600px;
    margin-left: 9%;
  }

  .modal-dialog {
    margin-left: 18%;
  }
  .modal-body {
    flex-direction: column;
  }

  .right input,
  .right textarea,
  .left textarea,
  .left input {
    width: 450px;
  }

  .goal {
    flex-direction: column;
    align-items: stretch;
  }

  .goal .left,
  .goal .right {
    width: 100%;
  }

  textarea,
  input,
  select {
    font-size: 12px;
    padding: 8px;
  }

  .modal-footer button {
    width: 100%;
  }
}

@media (max-width: 576px) {
  #myModal1 .modal-dialog,
  #myModal2 .modal-dialog,
  #myModal3 .modal-dialog {
    width: 400px;
    height: 600px;
    margin-left: 2%;
  }

  #myModal2 .modal-dialog {
    margin-left: 12.5%;
  }

  #myModal2 .modal-body {
    width: 100%;
  }

  .right input,
  .right textarea,
  .left textarea,
  .left input,
  .goal textarea,
  .goal .form-select {
    width: 250px;
  }

  .modal-dialog {
    width: 500px;
    margin-left: 4%;
  }

  .modal-body {
    padding: 15px;
  }

  .goal {
    margin-bottom: 15px;
  }

  h4 {
    font-size: 16px;
  }

  textarea,
  input,
  select {
    font-size: 12px;
    padding: 6px;
  }

  .modal-footer button {
    width: 100%;
    padding: 10px;
  }
}

@media (max-width: 400px) {
  #myModal1 .modal-dialog,
  #myModal2 .modal-dialog,
  #myModal3 .modal-dialog {
    margin-top: 20%;
    margin-left: 6%;
    height: 600px;
    width: 320px;
  }
  .modal-dialog {
    width: 320px;
    margin-left: 4%;
  }

  .modal-body {
    padding: 10px;
  }

  .goal textarea,
  .form-select,
  .right input,
  .right textarea,
  .left input,
  .goal .form-select {
    width: 200px;
  }

  h4 {
    font-size: 14px;
  }

  textarea,
  input,
  select {
    font-size: 10px;
    padding: 5px;
  }

  .modal-footer button {
    font-size: 14px;
    padding: 8px;
  }
}
</style>