

<script setup>

</script>

<template>
  <form>
    <div class="row g-2">

      <div class="col-12 mb-1">
        <label class="form-label">Company Description</label>
        <textarea class="form-control" rows="2"></textarea>
      </div>
      <div class="col-6">
        <label class="form-label">Currency
        </label>
        <input type="text" class="form-control" value="NGN Naira">
      </div>
      <div class="col-6">
        <label class="form-label">Sector
        </label>
        <select class="form-select">
          <option selected>Inputs to infracstructure</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div class="col-12 mb-1">
        <label class="form-label">Project Description
        </label>
        <textarea class="form-control" rows="2"></textarea>
      </div>
      <div class="col-6">
        <label class="form-label">Project Type
        </label>
        <select class="form-select" aria-label="Default select example">
          <option selected>Brown Field</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div class="col-6">
        <label class="form-label">Project Stage
        </label>
        <select class="form-select" aria-label="Default select example">
          <option selected>Concept</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div class="col-6">
        <label class="form-label">Categorization
        </label>
        <select class="form-select" aria-label="Default select example">
          <option selected>Core Asset</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div class="col-6">
        <label class="form-label">Initial Info/PIC
        </label>
        <select class="form-select" aria-label="Default select example">
          <option selected>No</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

      <div class="col-12 mb-1">
        <label class="form-label">Status Comment
        </label>
        <textarea class="form-control" rows="2"></textarea>
      </div>
      <div class="col-12 mb-1">
        <label class="form-label">Next Steps/Action Plan
        </label>
        <textarea class="form-control" rows="2"></textarea>
      </div>

      <div class="col-6">
        <label class="form-label">Total Project Size (Indicative)
        </label>
        <input type="text" class="form-control">
      </div>

      <div class="col-6">
        <label class="form-label">Debit Size (Indicative)
        </label>
        <input type="text" class="form-control">
      </div>

      <div class="col-6">
        <label class="form-label">Project Preparatory Support Required
        </label>
        <select class="form-select" aria-label="Default select example">
          <option selected>No</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div class="col-6">
        <label class="form-label">Meeting Minutes Highlights
          Available?
        </label>
        <select class="form-select" aria-label="Default select example">
          <option selected>No</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

      <div class="col-12 mb-1">
        <label class="form-label">Details of project preparatory support/Tech Assist
        </label>
        <textarea class="form-control" rows="2"></textarea>
      </div>

      <div class="col-12 mb-1">
        <label class="form-label">Use of Proceeds
        </label>
        <textarea class="form-control" rows="2"></textarea>
      </div>

      <div class="col-6">
        <label class="form-label">Initial Contact Date
        </label>
        <input type="date" class="form-control">
      </div>

      <div class="col-6">
        <label class="form-label">Mandated Client
        </label>
        <input type="text" class="form-control">
      </div>

      <div class="col-6">
        <label class="form-label">Day of Last Contact
        </label>
        <input type="date" class="form-control">
      </div>

      <div class="col-6">
        <label class="form-label">Company Anniversary Date
        </label>
        <input type="date" class="form-control">
      </div>

      <div class="col-6">
        <label class="form-label">Nature of Last Interaction
        </label>
        <select class="form-select" aria-label="Default select example">
          <option selected>No</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div class="col-6">
        <label class="form-label">Deal Fact Sheet
        </label>
        <select class="form-select" aria-label="Default select example">
          <option selected>No</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

      <div class="col-12 mb-1">
        <label class="form-label">Deal Issues/Challenges
        </label>
        <textarea class="form-control" rows="2"></textarea>
      </div>

      <div class="d-flex justify-content-end mr-2 mt-3">
        <button type="submit" class="submit-button">Update</button>
      </div>

    </div>
  </form>
</template>



<style scoped>
label.form-label {
  /* Capion Bold */
  font-size: 12px;
  font-weight: 700;
  line-height: 14.4px;
}

input,
select {
  padding: 10px 20px 10px 10px;
  align-items: center;

  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
}
</style>
