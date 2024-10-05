<script setup>
import authService from '../../services/authService';
import TabMenu from '../../components/Tabs/TabMenu.vue';
import TableSeven from '../../components/Tables/TableSeven.vue'
import {useEngagementStore} from "@/store/engagements"
import { ref, onMounted, computed} from 'vue'
import html2pdf from 'html2pdf.js';

const store = useEngagementStore();
console.log(store.engagements);


// eslint-disable-next-line no-unused-vars
const engagements = ref([])
  const eventDescription = ref('')
  // const organization = ref('')
  const eventDate = ref('')
  const eventCountry = ref('')
  const eventCategory  = ref('')
  const representative = ref('')
  const contactPerson = ref('')
  const contactPhone = ref('')
  const contactEmail = ref('')
  const status = ref('')
  const topicTheme = ref('')
  const sponsorship = ref('')
  const createdBy = ref('')
  const lastModifiedBy = ref('')
  const recordOwner = ref('')
  const selectedValue = ref('')

const fetchData = async () => {
  try {
    await store.fetchEngagements();

    engagements.value = store.engagements;


    console.log('Engagements:', engagements.value);

    await authService.initialize();
    const msalInstance = authService.getMsalInstance();
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length) {
      createdBy.value = accounts[0].username; 
      lastModifiedBy.value = accounts[0].username; 
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    console.error('Error during MSAL initialization:', error);
  }
};



onMounted(async () => {
  
  await fetchData();

  try {
    await authService.initialize();
    const msalInstance = authService.getMsalInstance();
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length) {
      createdBy.value = accounts[0].username; 
      lastModifiedBy.value = accounts[0].username; 
      recordOwner.value = accounts[0].username; 
    }
  } catch (error) {
    console.error('Error during MSAL initialization:', error);
  }
});

const addEngagement = async () => {
  if (eventDescription.value.trim() !== '' || eventDate.value.trim() !== ''
    || eventCountry.value.trim() !== ''
    || eventCategory.value.trim() !== '' || representative.value.trim() !== '' || contactEmail.value.trim() !== '' || contactPerson.value.trim() !== '' || contactPhone.value.trim() !== '' || status.value.trim() !== '' || topicTheme.value.trim() !== '' || sponsorship.value.trim() !== '' || createdBy.value.trim() !== '' || lastModifiedBy.value.trim() !== '' || recordOwner.value.trim() !== '') {
    await store.addEngagement(eventDescription.value.trim(), eventDate.value.trim(),
       eventCountry.value.trim(), eventCategory.value.trim(), representative.value.trim(), contactEmail.value.trim(), contactPerson.value.trim(), contactPhone.value.trim(), status.value.trim(), topicTheme.value.trim(), sponsorship.value.trim(), createdBy.value.trim(), lastModifiedBy.value.trim(), recordOwner.value.trim());
  
  }
};

const handleSubmit = () => {
  addEngagement();
  console.log("Engagement added")
}; 

 const onSelectChange = () => {
  // eslint-disable-next-line no-self-assign
  selectedValue.value = selectedValue.value
}

const itemsPerPage = 10; 
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(engagements.value.length / itemsPerPage));

const paginatedEngagement = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return engagements.value.slice(startIndex, endIndex);
});

const downloadPDF = () => {
  const table = document.querySelector('.table-responsive');

  html2pdf(table, {
    margin: 10,
    filename: 'table-data.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  });
};

</script>


<template>
  <main class="wrapper">
    <TabMenu />
    <!-- <div class="modal" id="myModal2">
      <div class="modal-dialog">
        <div class="modal-content">

          
          <div class="modal-header">
            <h4 class="modal-title">Speaking Engagement</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <div class="table-responsive d-flex flex-column">
              <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
              <v-btn color="#47b65c" @click="downloadPDF">Download as PDF</v-btn>
              <table class="full">
                <thead>
                  <tr>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink">S/N</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Event Description</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Event Date</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Event Country</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Event Category</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Representative</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Contact Person </span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Contact Phone </span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Contact Email </span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Status </span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Topic Theme </span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Sponsorship </span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in paginatedEngagement" :key="index" @click="selectItem(item)">
                    <td>{{item.id}}</td>
                    <td>{{item.eventDescription}}</td>
                    <td>{{item.eventDate}}</td>
                    <td>{{item.eventCountry}}</td>
                    <td>{{item.eventCategory}}</td>
                    <td>{{item.representative}}</td>
                    <td>{{item.contactPerson}}</td>
                    <td>{{item.contactPhone}}</td>
                    <td>{{item.contactEmail}}</td>
                    <td>{{item.status}}</td>
                    <td>{{item.topicTheme}}</td>
                    <td>{{item.sponsorship}}</td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>

        </div>
      </div>
    </div> -->
    <form method="post" action="" @submit.prevent="handleSubmit">
      <div class="modal" id="myModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Speaking Engagement Form</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><b></b></button>
            </div>

            <div class="modal-body">

              <div class="first">
                <div class="frame">
                  <h6>Event Description</h6>
                  <textarea v-model="eventDescription" name="Event Description" id="" cols="30" rows="10" placeholder="Event Description"></textarea>
                </div>
                <div class="frame">
                  <h6>Country</h6>

                  <textarea v-model="eventCountry" name="Country" id="" cols="30" rows="10" placeholder="Country"></textarea>
                </div>
              </div>
              <div class="second">
                <div class="frame">
                  <h6>Date</h6>
                  <input v-model="eventDate" type="date">
                </div>
                <div class="frame">
                  <h6>Category</h6>
                  <select v-model="eventCategory" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                    <option selected>Select Category</option>
                    <option value="Panelist">Panelist</option>
                    <option value="Speaker">Speaker</option>
                    <option value="Attendee">Attendee</option>
                  </select>
                </div>

              </div>
              <div class="third">
                <div class="frame">
                  <h6>Representative</h6>
                  <textarea v-model="representative" name="Representative" id="" cols="30" rows="10" placeholder="Representative"></textarea>
                </div>

              </div>
              <div class="fourth">
                <div class="frame">
                  <h6>Contact Person</h6>
                  <textarea v-model="contactPerson" name="Contact Person" id="" cols="30" rows="10" placeholder="Contact Person"></textarea>
                </div>
                <div class="frame">
                  <h6>Contact Phone</h6>
                  <textarea v-model="contactPhone" name="Contact Phone" id="" cols="30" rows="10" placeholder="Contact Phone"></textarea>
                </div>

              </div>
              <div class="fourth">
                <div class="frame">
                  <h6>Contact Email</h6>
                  <textarea v-model="contactEmail" name="Contact Email" id="" cols="30" rows="10" placeholder="Contact Email"></textarea>
                </div>
                <div class="frame">
                  <h6>Status</h6>
                  <select v-model="status" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                    <option selected>Select Status</option>
                    <option value="Concluded">Concluded</option>
                    <option value="Conflict">Conflict</option>
                    <option value="Declined">Completed</option>
                  </select>
                </div>

              </div>
              <div class="fifth">
                <div class="frame">
                  <h6>Topic/Theme</h6>
                  <textarea v-model="topicTheme" name="Topic/Theme" id="" cols="30" rows="10" placeholder="Topic/Theme"></textarea>
                </div>
                <div class="frame">
                  <h6>Sponsorship</h6>
                  <select v-model="sponsorship" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                    <option selected>Select Sponsorship</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>

                  </select>
                </div>

              </div>
              <div class="fifth">
                <div class="frame">
                  <h6>Created By</h6>
                  <input type="text" v-model="createdBy" placeholder="Created By" disabled>
                </div>
                <div class="frame">
                  <h6>Modified By</h6>
                  <input type="text" v-model="lastModifiedBy" placeholder="Last Modified By" disabled>
                </div>

              </div>
            </div>

            <div class="modal-footer">
              <button type="submit" data-bs-dismiss="modal">Submit Request</button>
            </div>

          </div>
        </div>
      </div>

    </form>
    <div class="skill mt-4">
      <div class="header">
        <div class="title mb-4">
          <h3>Speaking Engagement</h3>
          <button data-bs-toggle="modal" data-bs-target="#myModal" type="button">Create Speaking Engagement</button>

        </div>
        <div class="lines"></div>
      </div>

      <div class="table">
        <button class="view" data-bs-toggle="modal" data-bs-target="#myModal2" type="button">View All</button>
        <TableSeven :engagements="engagements" />
      </div>

    </div>
  </main>
</template>

<style scoped>
main {
  height: 1450px;
}
.view {
  display: flex;
  padding: 10px 30px;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: var(--White, #fff);
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}

.skill {
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
  border-radius: 10px;
  background: #fff;
  height: 1300px;
}
.skill h3 {
  color: var(--Black, #000);
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28.8px;
}
.header {
  display: flex;
  flex-direction: column;
  align-self: stretch;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}
.title button {
  display: flex;
  padding: 10px 30px;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);

  color: var(--White, #fff);
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.lines {
  width: 100%;
  height: 1px;
  background: #808080;
}
.chart {
  display: flex;

  padding: 30px;
  align-items: center;
  gap: 40px;
  align-self: stretch;
  border-radius: 7.622px;
  background: #fff;
  box-shadow: 1.52441px 1.52441px 15.24414px 0px rgba(0, 0, 0, 0.1);
}
.auto {
  margin: auto;
}
th span {
  font-size: 13px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  height: 30px !important;
}
.modal-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  color: var(--Black, #000);
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}
.modal-body {
  gap: 20px;
  background: #fff;
  margin-top: 0px !important;
}

.modal-dialog {
  --bs-modal-width: 950px;
  width: 950px;
  height: 900px;
  margin-left: 15%;
  display: inline-flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--Grey-Light, #fff);
}
#myModal2 {
  margin-left: 4%;
}
#myModal2 tr td {
  font-size: 13px;
}
#myModal2 .modal-content {
  width: 100%;
}
.modal-body[data-v-bf8ca16e] {
  width: 100%;
}
#myModal2 .modal-dialog {
  width: 1200px;
  --bs-modal-width: 1200px;
  margin-left: 1%;
  display: inline-flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
}
.first,
.second,
.third,
.fourth,
.fifth {
  display: flex;
  gap: 30px;
}
.frame {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}
.frame h6 {
  color: var(--Black, #000);
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.frame input {
  width: 400px;
  height: 40px;
}
.frame textarea {
  display: flex;
  width: 400px;
  height: 80px;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 5px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--White, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.frame textarea::placeholder {
  color: var(--Grey-Dark, #808080);
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
.form-select {
  width: 400px;
  height: 40px;
  color: var(--Grey-Dark, #808080);
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
.modal-footer {
  display: flex;
  height: 60px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
}
.modal-footer button {
  display: flex;
  padding: 10px 30px;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: var(--White, #fff);
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.rating {
  width: 320px;
}
.frame button {
  width: 145px;
  display: flex;
  padding: 5px 20px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: #fff;
  margin-top: 10px;
}
.rating input[type='radio']:not(:nth-of-type(0)) {
  /* hide visually */
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
.rating [type='radio']:not(:nth-of-type(0)) + label {
  display: none;
}

label[for]:hover {
  cursor: pointer;
}

.rating .stars label:before {
  content: '★';
  font-size: 24px;
}

.stars label {
  color: lightgray;
}

.stars label:hover {
  text-shadow: 0 0 1px #000;
}

.rating [type='radio']:nth-of-type(1):checked ~ .stars label:nth-of-type(-n + 1),
.rating [type='radio']:nth-of-type(2):checked ~ .stars label:nth-of-type(-n + 2),
.rating [type='radio']:nth-of-type(3):checked ~ .stars label:nth-of-type(-n + 3),
.rating [type='radio']:nth-of-type(4):checked ~ .stars label:nth-of-type(-n + 4),
.rating [type='radio']:nth-of-type(5):checked ~ .stars label:nth-of-type(-n + 5) {
  color: orange;
}

.rating [type='radio']:nth-of-type(1):focus ~ .stars label:nth-of-type(1),
.rating [type='radio']:nth-of-type(2):focus ~ .stars label:nth-of-type(2),
.rating [type='radio']:nth-of-type(3):focus ~ .stars label:nth-of-type(3),
.rating [type='radio']:nth-of-type(4):focus ~ .stars label:nth-of-type(4),
.rating [type='radio']:nth-of-type(5):focus ~ .stars label:nth-of-type(5) {
  color: darkorange;
}
</style>
