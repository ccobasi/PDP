<template>
  <form>
    <div class="row g-2">

      <div class="col-3">
        <label class="form-label">First Name
          <input type="text" class="form-control">
        </label>
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
