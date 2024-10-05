<script setup>
import TabMenuFour from '../../components/Tabs/TabMenuFour.vue';
import TableSeven from '../../components/Tables/TableSeven.vue'
import {useEngagementStore} from "@/store/engagements"
import { ref, onMounted} from 'vue'

const store = useEngagementStore();
console.log(store.engagements);

const addEngagement = () => {
  if (organization.value.trim() !== '' || event.value.trim() !== '' || date.value.trim() !== ''
    || country.value.trim() !== ''
    || category.value.trim() !== '' || representative.value.trim() !== '' || contactPerson.value.trim() !== '' || status.value.trim() !== '' || topicTheme.value.trim() !== '' || sponsorship.value.trim() !== '' ) {
    store.addEngagement(organization.value.trim(), event.value.trim(), date.value.trim(),
       country.value.trim(), category.value.trim(), representative.value.trim(), contactPerson.value.trim(), status.value.trim(), topicTheme.value.trim(), sponsorship.value.trim());
  
  }
};


// eslint-disable-next-line no-unused-vars
const engagements = ref([])
  const event = ref('')
  const organization = ref('')
  const date = ref('')
  const country = ref('')
  const category  = ref('')
  const representative = ref('')
  const contactPerson = ref('')
  const status = ref('')
  const topicTheme = ref('')
  const sponsorship = ref('')
  const selectedValue = ref('')

const handleSubmit = () => {
  addEngagement();
  console.log("Engagement added")
};


onMounted(() => {
  
  store.fetchEngagements();
});


 

 const onSelectChange = () => {
  // eslint-disable-next-line no-self-assign
  selectedValue.value = selectedValue.value
}

</script>


<template>
  <main class="wrapper">
    <TabMenuFour />
    <form method="post" action="" @submit.prevent="handleSubmit">
      <div class="modal" id="myModal1">
        <div class="modal-dialog">
          <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">Speaking Engagement Form</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">

              <div class="first">
                <div class="frame">
                  <h6>Organization</h6>
                  <textarea v-model="organization" name="Organization" id="" cols="30" rows="10" placeholder="Organization"></textarea>
                </div>
                <div class="frame">
                  <h6>Event</h6>

                  <textarea v-model="event" name="Event" id="" cols="30" rows="10" placeholder="Event"></textarea>
                </div>
              </div>
              <div class="second">
                <div class="frame">
                  <h6>Date</h6>
                  <input v-model="date" type="date">
                </div>
                <div class="frame">
                  <h6>Country</h6>
                  <textarea v-model="country" name="Country" id="" cols="30" rows="10" placeholder="Country"></textarea>
                </div>
              </div>

              <div class="third">
                <div class="frame">
                  <h6>Category</h6>
                  <select v-model="category" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                    <option selected>Select Category</option>
                    <option value="Panelist">Panelist</option>
                    <option value="Speaker">Speaker</option>
                    <option value="Attendee">Attendee</option>
                  </select>

                </div>
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
            </div>

            <!-- Modal footer -->
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
          <button data-bs-toggle="modal" data-bs-target="#myModal1" type="button">Speaking Request</button>

        </div>
        <div class="lines"></div>
      </div>

      <div class="table">
        <TableSeven />
      </div>

    </div>
  </main>
</template>

<style scoped>
main {
  height: 1450px;
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
  font-family: Roboto;
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
  font-family: Roboto;
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

.modal {
  margin-left: 21%;
}
.modal-dialog {
  --bs-modal-width: 800px;
  width: 800px;
  height: 700px;
  display: inline-flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--Grey-Light, #eee);
}

.modal-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}
.modal-body {
  display: flex;
  padding: 20px 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 10px;
  background: #fff;
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
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.frame input {
  width: 320px;
  height: 40px;
}
.frame textarea {
  display: flex;
  width: 320px;
  height: 50px;
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
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
.form-select {
  width: 320px;
  color: var(--Grey-Dark, #808080);
  font-family: Roboto;
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
  font-family: Roboto;
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
