<template>
  <form>
    <div class="row g-2">

      <div class="col-6">
        <label class="form-label">First Name
          <input type="text" class="form-control">
        </label>
      </div>
      <div class="col-6">
        <label class="form-label">Last Name
          <input type="text" class="form-control">
        </label>
      </div>
      <div class="col-6">
        <label class="form-label">Phone Number
          <input type="text" class="form-control">
        </label>
      </div>
      <div class="col-6">
        <label class="form-label">Email Address
          <input type="email" class="form-control">
        </label>
      </div>
      <div class="col-6">
        <label class="form-label">Company Name
        </label>
        <input type="text" class="form-control">
      </div>
      <div class="col-6">
        <label class="form-label">Sector
        </label>
        <select class="form-select" aria-label="Default select example">
          <option selected>Inputs to infracstructure</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div class="col-6">
        <label class="form-label">Referred Source Name
        </label>
        <input type="text" class="form-control">
      </div>
      <div class="col-6">
        <label for="lead-source" class="form-label">Lead Source </label>
        <select class="form-select" id="lead-source" aria-label="Default select example">
          <option selected>Email</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>

    <div class="d-flex justify-content-end mr-2 mt-3">
      <button type="submit" class="submit-button">Update</button>
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
