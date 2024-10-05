<script>
import { ref, onMounted, computed } from 'vue';
import TabMenu from '../../components/TabMenu.vue';
import ToolBar from '../../components/ToolBar.vue';
import AdministrationHeader from '../../components/Cards/AdministrationHeader.vue'
import administrationsService from '../../services/administrationsService';
import settingsService from '../../services/settingsServices';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";

const stores = useDashOptionStore(pinia);
export default {
    data: () => ({
        tab: null,
        text: 'dealUsers',
        dialog: false,
        edit: false,
        dialogDelete: false,
        users: [],
        disableEmail: false,
        firstName: '',
        departments: '',
        businessUnits: '',
        selectedDepartment: '',
        selectedBusinessUnit: '',
        jobTitle: '',
        errorMessage: '',
        lastName: '',
        fullName: '',
        selectedLevel: '',
        selectedUserRole: '',
        levels: [],
        userStatus: true,
        selectedUserStatus: '',
        userRoles: '',
        userEmail: '',
        originationTarget: 0,
        guaranteePipelineTarget: 0,
        mandateOriginatedTarget: 0,
        ccapprovalTarget: 0,
        feeLetterTarget: 0,
        financialCloseTarget: 0,
        filterOption: '',
        searchValue: '',
        dialogOpen: false,
        size: 20,
        totalArrayValue: '',
        firstValue: '',
        secondValue: '',
        pageNumber: 1
    }),
    components: {
        AdministrationHeader,
        TabMenu: TabMenu,
        ToolBar: ToolBar
    },

    async created() {
        this.users = await administrationsService.getUserRoles()
        this.levels = await settingsService.getLevels()
        this.userRoles = await administrationsService.getRoles()
        this.departments = await settingsService.getDepartments()
        this.businessUnits = await settingsService.getBusinessUnits()
    },
    computed: {
        pageCount() {
            let l = this.totalArrayValue,
                s = this.size;
            return Math.ceil(l / s);

        },
        indexStart() {
            return (this.pageNumber - 1) * this.size;
        },
        indexEnd() {
            return this.indexStart + this.size;
        },
        allDealUsers() {
            let dealUsers = this.users
            if (this.text == 'dealUsers') {
                dealUsers = dealUsers.filter(o =>o.creditCommitteeApprovalTarget > 0)
            }
            else if (this.text == 'noneDealUsers') {
                dealUsers = dealUsers.filter(o => o.creditCommitteeApprovalTarget == 0 || o.creditCommitteeApprovalTarget == null )
            }
            this.totalArrayValue = dealUsers.length

            if (this.searchValue != '' && this.searchValue) {
                dealUsers = dealUsers.filter((item) => {
                    return item.userId
                        .toLowerCase()
                        .includes(this.searchValue.toLowerCase()) ||
                        item.userFullName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
                        item.roleName.toLowerCase().includes(this.searchValue.toLowerCase())
                })
            }
            // Sort by alphabetical order
            dealUsers = dealUsers.sort((a, b) => {
                if (this.filterOption == 'asc') {
                    let fa = a.userFullName.toLowerCase(), fb = b.userFullName.toLowerCase()

                    if (fa > fb) {
                        return 1
                    }
                    if (fa < fb) {
                        return -1
                    }
                    return 0

                }
                else if (this.filterOption == 'dsc') {
                    let fa = a.userFullName.toLowerCase(), fb = b.userFullName.toLowerCase()

                    if (fa < fb) {
                        return 1
                    }
                    if (fa > fb) {
                        return -1
                    }
                    return 0

                }
            })

            if (dealUsers.length > 0) {
                dealUsers.forEach((element, index, array) => {
                    array[index].count = index + 1
                });

                let ps = dealUsers.slice(this.indexStart, this.indexEnd)
                this.firstValue = ps[0].count;
                this.secondValue = ps[ps.length - 1].count
            }
            return dealUsers.slice(this.indexStart, this.indexEnd)
        },
    },
    methods: {
        async createUsersSubmit() {
            this.fullName = this.firstName.concat(' ', this.lastName)
            let ps = await administrationsService.createUsers(this.userEmail, this.fullName, this.selectedUserRole, this.jobTitle, '', '', this.selectedDepartment, this.selectedBusinessUnit, this.selectedLevel, this.feeLetterTarget, this.financialCloseTarget, this.originationTarget, this.guaranteePipelineTarget, this.mandateOriginatedTarget, this.ccapprovalTarget, stores.signedInUserEmail, stores.signedInUserEmail)
            if (ps == true) {
                this.dialog = false
                toast.success("User Created Successfully")
                this.userEmail = '', this.fullName = '', this.selectedUserRole = '', this.jobTitle = '', this.selectedDepartment = '', this.selectedBusinessUnit = '', this.selectedLevel = '', this.feeLetterTarget = '', this.financialCloseTarget = '', this.originationTarget = '', this.guaranteePipelineTarget = '', this.mandateOriginatedTarget = '', this.ccapprovalTarget = ''
                setTimeout(async () => {
                    this.users = await administrationsService.getUserRoles();
                }, 2000);
            }
            else {
                if (ps.request.response.includes("Violation of PRIMARY KEY constraint 'PK__Users__1788CC4CE72132F6'")) {
                    return this.errorMessage = 'User Exists, cannot recreate User'
                }
                return this.errorMessage = 'An Error Occured, please try again'
            }
        },

        deleteItem(item) {
            this.editedIndex = this.industries.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        async deleteItemConfirm() {
            let ps = await administrationsService.deleteUsers(this.userEmail)
            if (ps == 200) {
                toast.success("User Deleted Successfully")
                setTimeout(async () => {
                    this.dialogDelete = false
                    this.users = await administrationsService.getUserRoles();
                }, 1500);
            }
            if(ps==500){
                toast.error("User Mapped to Existing Deal/Lead")
            }
        },
        editUser(item) {
            this.dialog = true
            this.edit = true
            let fullName = item.userFullName.split(" ")
            this.firstName = fullName[0]
            this.lastName = fullName[1]
            this.originationTarget = item.originationTarget
            this.selectedUserStatus = item.userStatus
            this.guaranteePipelineTarget = item.guaranteePipelineTarget
            this.mandateOriginatedTarget = item.mandateOriginatedTarget
            this.ccapprovalTarget = item.creditCommitteeApprovalTarget
            this.feeLetterTarget = item.feeLetterTarget
            this.financialCloseTarget = item.financialCloseTarget
            this.selectedLevel = item.levelId
            this.selectedUserRole = item.roleId
            this.userEmail = item.userId
            this.selectedDepartment = item.departmentId
            this.selectedBusinessUnit = item.businessUnitId
            this.jobTitle = item.jobTitle
            this.disableEmail = true
        },
        async editUserSubmit() {
            this.fullName = this.firstName.concat(' ', this.lastName)
            let ps = await administrationsService.editUser(this.userEmail, this.fullName, this.selectedUserRole, this.selectedUserStatus, this.jobTitle, '', '', this.selectedDepartment, this.selectedBusinessUnit, this.selectedLevel, this.feeLetterTarget, this.financialCloseTarget, this.originationTarget, this.guaranteePipelineTarget, this.mandateOriginatedTarget, this.ccapprovalTarget, stores.signedInUserEmail, stores.signedInUserEmail)
            if (ps == 200) {
                toast.success("User Edited")
                setTimeout(async () => {
                    this.dialog = false
                    this.edit = false
                    this.users = await administrationsService.getUserRoles();
                }, 2000);
            }
            else { toast.error("An error Occured, Please try again") }
        },


        onFilterSelected(isCorrect) {
            this.filterOption = isCorrect
        },
        onSearchValuesEntered(isCorrect) {
            this.searchValue = isCorrect

        },
        pageMovement(isCorrect) {
            if (isCorrect == 'Next') {
                this.pageNumber++;
            }
            else if (isCorrect == 'Previous') {
                this.pageNumber--;
            }
        }
    },
}
</script>


<template>
  <main class="wrapper" style="min-height: 87vh;">
    <TabMenu />

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this User?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialogDelete = false">Cancel</v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" transition="slide-y-transition" content-class="my-custom-dialog" height="100%" width="750">
      <v-card id="style-4">
        <v-card-title>
          <div class="d-flex justify-content-between mt-3">
            <span class="text-h5 ml-5" v-if="edit == false">Create a new User</span>
            <span class="text-h5 ml-5" v-else>Edit User</span>
            <p class="mr-5" style="cursor: pointer;" @click="dialog = false">X</p>
          </div>
        </v-card-title>
        <v-card-text>
          <v-container style="margin-top: -30px">
            <v-row>
              <v-col cols="12" sm="6">
                <label>First name*</label>
                <v-text-field required density="compact" variant="outlined" v-model="firstName"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <label>Last name*</label>
                <v-text-field density="compact" variant="outlined" required v-model="lastName"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <label>Email*</label>
                <v-text-field density="compact" variant="outlined" required v-model="userEmail" :disabled="disableEmail"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <label>Level</label>
                <v-select :items="levels" required density="compact" variant="outlined" item-title="description" item-value="id" v-model="selectedLevel"></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <label>Status</label>
                <v-select :items="[{ name: 'Inactive', key: false }, { name: 'Active', key: true }]" density="compact" variant="outlined" v-model="selectedUserStatus" item-title="name" item-value="key"></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <label>Job Title</label>
                <v-text-field density="compact" variant="outlined" required v-model="jobTitle"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <label>Department</label>
                <v-select :items="departments" required density="compact" variant="outlined" item-title="departmentDescription" item-value="id" v-model="selectedDepartment"></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <label>Business Unit</label>
                <v-select :items="businessUnits" required density="compact" variant="outlined" item-title="businessUnitDescription" item-value="id" v-model="selectedBusinessUnit"></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <label>User Role</label>
                <v-select :items="userRoles" required density="compact" variant="outlined" item-title="name" item-value="id" v-model="selectedUserRole"></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <label>Origination (N'BN)</label>
                <v-text-field density="compact" variant="outlined" type="number" v-model="originationTarget"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <label>Guarantee Pipeline</label>
                <v-text-field density="compact" variant="outlined" type="number" v-model="guaranteePipelineTarget"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <label>Mandates Originated</label>
                <v-text-field density="compact" variant="outlined" type="number" v-model="mandateOriginatedTarget"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <label>Credit Committee Approval Target</label>
                <v-text-field density="compact" variant="outlined" type="number" v-model="ccapprovalTarget"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <label>Fee Letter Target</label>
                <v-text-field density="compact" variant="outlined" type="number" v-model="feeLetterTarget"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <label>Financial Close Target</label>
                <v-text-field density="compact" variant="outlined" type="number" v-model="financialCloseTarget"></v-text-field>
              </v-col>
            </v-row>
          </v-container><small style="margin-left: 20px; color: red">{{ errorMessage }}</small>
          <div class="mt-4 d-flex justify-content-end">
            <button class="rfqbtn" @click="createUsersSubmit()" v-if="edit == false">Create</button>
            <button class="rfqbtn" @click="editUserSubmit()" v-else>Submit</button>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <div class="administration">
      <div class="intro mt-4 ">
        <h3> Administration</h3>
      </div>
      <div class="d-flex justify-content-between">
        <div>
          <AdministrationHeader />
        </div>
        <div class="toggleButton mt-2">
          <v-btn-toggle v-model="text" color='#298729' group mandatory variant="elevated">
            <v-btn size="x-small" density="compact" value="dealUsers" v-on:click="text = 'dealUsers'">
              Deal Users
            </v-btn>
            <v-btn size="x-small" density="compact" value="noneDealUsers" v-on:click="text = 'noneDealUsers'">
              Non-Deal Users
            </v-btn>
          </v-btn-toggle>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <button class="rfqbtn" @click="dialog = true">
            Create New Deal User
          </button>
        </div>
      </div>

      <div>&nbsp;</div>
      <ToolBar @filterOptions="onFilterSelected" @searchValues="onSearchValuesEntered" :pageCounts="pageCount" :firstVal="firstValue" :lastVal="secondValue" :totalValue="totalArrayValue" :pageNum="pageNumber" @pageDetails="pageMovement" />
      <v-card-text>
        <v-window v-model="tab" style="border-radius: 12px; min-height: 700px;">
          <v-window-item value="one">
            <v-table class="table-stripped">
              <thead>
                <tr>
                  <th class="text-left">
                    Full Name
                  </th>
                  <th class="text-left">
                    Level
                  </th>
                  <th class="text-left">
                    Status
                  </th>
                  <th class="text-left">
                    Fee Letter Target
                  </th>
                  <th class="text-left">
                    Financial Close Target
                  </th>
                  <th class="text-left">
                    Origination Amount
                  </th>
                  <th class="text-left">
                    Guarantee Pipeline
                  </th>
                  <th class="text-left">
                    Mandate Letter
                  </th>
                  <th class="text-left">
                    Credit Commitee Approval Target
                  </th>
                  <th class="text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in allDealUsers" :key="item.userId" @dblclick="editUser(item)" style="cursor: pointer;">
                  <td>{{ item.userFullName }}</td>
                  <td>{{ item.levelDescription }}</td>
                  <td v-if="item.userStatus == true">Active</td>
                  <td v-else>Inactive</td>
                  <td>{{ item.feeLetterTarget }}</td>
                  <td>{{ item.financialCloseTarget }}</td>
                  <td>{{ item.originationTarget }}</td>
                  <td>{{ item.guaranteePipelineTarget }}</td>
                  <td>{{ item.mandateOriginatedTarget }}</td>
                  <td>{{ item.creditCommitteeApprovalTarget }}</td>
                  <td>
                    <div class="dropdown" style="cursor: pointer;">
                      <button class="btn btn-none" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <v-icon>mdi-dots-vertical</v-icon>
                      </button>
                      <ul class="dropdown-menu" style="">
                        <li><a class="dropdown-item" @click="editUser(item)">Edit User</a></li>
                        <li><a class="dropdown-item">View User Details</a></li>
                        <li><a class="dropdown-item" @click="dialogDelete = true; userEmail = item.userId">Delete</a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-window-item>
        </v-window>
      </v-card-text>
    </div>
  </main>
</template>

<style scoped>
.administration > * {
  padding-left: 0;
}

.v-dialog >>> .my-custom-dialog {
  align-self: flex-end;
  right: 0px;
  margin: 0px;
  min-height: 100%;
}

.v-tab {
  text-transform: none !important;
  letter-spacing: normal !important;
}

.intro h3 {
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
}

.v-text-field {
  height: 30px !important;
}

.intro p {
  font-size: 16px;
  font-weight: 400;
  line-height: 19.2px;
}

#style-4::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

#style-4::-webkit-scrollbar {
  width: 7px;
  background-color: #f5f5f5;
}

#style-4::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}

.rfqbtn {
  font-family: 'Inter';
  font-size: 16px;
  color: #ffffff;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 40px;
  background: linear-gradient(90deg, #227cbf 0%, #47b65c 100%);
  border-radius: 50px;
}

.rfqbtn:hover {
  background: linear-gradient(90deg, #47b65c 0%, #227cbf 100%);
  transition: 0.7s;
}

.text-left {
  color: black !important;
}

.v-btn-toggle {
  bordlefter: 1px solid black;
  width: 200px;
  justify-content: center;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 3px 0px;
  box-sizing: border-box;
  height: 33px;
  background: #ffffff;
  border: 1px solid #d4d4d8;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
}

tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

.v-dialog {
  font-family: 'Inter';
}
</style>
