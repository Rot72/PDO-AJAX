<div class="row mb-3">
    <div class="col">
        <label class="form-label">First Name</label>
        <input type="text" class="form-control" name="first_name">
    </div>
    <div class="col">
        <label class="form-label">Last Name</label>
        <input type="text" class="form-control" name="last_name" placeholder="Tesla">
    </div>
</div>
<div class="mb-3">
    <label class="form-label">Email</label>
    <input type="email" class="form-control" name="email" placeholder="name@example.com">
</div>
<div class="row mb-3">
    <label class="form-label">Upload Image</label>
    <div class="col-2">
        <img class="preview_img" src="images/default_profile.jpg">
    </div>
    <div class="col-10">
        <div class="file-upload text-secondary">
            <input type="file" class="image" name="image" accept="image/*">
            <input type="hidden" name="image_old" id="image_old">
            <span class="fs-4 fw-2">Choose file...</span>
            <span>or drag and drop file here</span>
        </div>
    </div>
</div>
<div class="mb-3">
    <label class="form-label">Country</label>       
    <select name="country" class="form-control">
        <option value="">Select a country...</option>
    </select>
</div>
<div class="form-group mb-3">
    <label class="form-label">Gender:</label>
    &nbsp;&nbsp;
    <input type="radio" class="form-check-input" name="gender" value="male">
    <label class="form-input-label">Male</label>
    &nbsp;
    <input type="radio" class="form-check-input" name="gender" value="female">
    <label class="form-input-label">Female</label>
</div>