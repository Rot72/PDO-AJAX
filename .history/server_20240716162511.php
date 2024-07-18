<?php
include "config/db_conn.php";

if ($_GET["action"] === "fetchData") {

  try {
      $stmt = $conn->query("SELECT * FROM users");
      $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
      header('Content-Type: application/json');
      echo json_encode([
          "data" => $data
      ]);
  } catch(PDOException $e) {
      echo json_encode([
          "statusCode" => 500,
          "message" => "Failed to fetch data: " . $e->getMessage()
      ]);
  }
}


// insert data to database
if ($_GET["action"] === "insertData") {

  try {
      $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, email, image, country, gender) VALUES (?, ?, ?, ?, ?, ?)");

      $stmt->bindParam(1, $_POST["first_name"]);
      $stmt->bindParam(2, $_POST["last_name"]);
      $stmt->bindParam(3, $_POST["email"]);

      // Rename the file before saving to the database
      $original_name = $_FILES["image"]["name"];
      $new_name = uniqid() . time() . "." . pathinfo($original_name, PATHINFO_EXTENSION);
      move_uploaded_file($_FILES["image"]["tmp_name"], "uploads/" . $new_name);

      $stmt->bindParam(4, $new_name);
      $stmt->bindParam(5, $_POST["country"]);
      $stmt->bindParam(6, $_POST["gender"]);

      if ($stmt->execute()) {
          echo json_encode([
              "statusCode" => 200,
              "message" => "Data inserted successfully 😀"
          ]);
      } else {
          echo json_encode([
              "statusCode" => 500,
              "message" => "Failed to insert data 😓"
          ]);
      }
  } catch(PDOException $e) {
      echo json_encode([
          "statusCode" => 500,
          "message" => "Failed to insert data: " . $e->getMessage()
      ]);
  }
}



if ($_GET["action"] === "fetchSingle") {

  // Checks if the ID was sent via POST
  if (isset($_POST["id"])) {
      $id = $_POST["id"];

      try {
          // Prepare the SQL query with a placeholder for the ID
          $stmt = $conn->prepare("SELECT * FROM users WHERE id = :id");
          $stmt->bindParam(":id", $id);
          $stmt->execute();

          // Check if any users were found
          if ($stmt->rowCount() > 0) {
              $data = $stmt->fetch(PDO::FETCH_ASSOC);
              header("Content-Type: application/json");
              echo json_encode([
                  "statusCode" => 200,
                  "data" => $data
              ]);
          } else {
              echo json_encode([
                  "statusCode" => 404,
                  "message" => "No user found with this id 😓"
              ]);
          }
      } catch(PDOException $e) {
          echo json_encode([
              "statusCode" => 500,
              "message" => "Failed to fetch user: " . $e->getMessage()
          ]);
      }
  } else {
      echo json_encode([
          "statusCode" => 400,
          "message" => "ID parameter is missing 🙁"
      ]);
  }
}


// Check if the action is "updateData"
else if ($_GET["action"] === "updateData") {

    // Check if all required fields are not empty
    if (!empty($_POST["first_name"]) && !empty($_POST["last_name"]) && !empty($_POST["email"]) && !empty($_POST["country"]) && !empty($_POST["gender"])) {
        try {
            // Begin a transaction
            $conn->beginTransaction();

            // Assign variables from form data
            $id = $_POST["id"];
            $first_name = $_POST["first_name"];
            $last_name = $_POST["last_name"];
            $email = $_POST["email"];
            $country = $_POST["country"];
            $gender = $_POST["gender"];

            // Check if a new image file is uploaded
            if ($_FILES["image"]["size"] != 0) {
                // Rename the image before saving to database
                $original_name = $_FILES["image"]["name"];
                $new_name = uniqid() . time() . "." . pathinfo($original_name, PATHINFO_EXTENSION);
                move_uploaded_file($_FILES["image"]["tmp_name"], "uploads/" . $new_name);

                // Remove the old image from uploads directory (optional)
                unlink("uploads/" . $_POST["image_old"]);
            } else {
                // Use the existing image name if no new image is uploaded
                $new_name = $_POST["image_old"];
            }

            // Prepare SQL statement for updating user data
            $stmt = $conn->prepare("UPDATE users SET first_name = ?, last_name = ?, email = ?, image = ?, country = ?, gender = ? WHERE id = ?");
            $stmt->execute([$first_name, $last_name, $email, $new_name, $country, $gender, $id]);

            // Commit the transaction
            $conn->commit();

            // Return success message as JSON
            echo json_encode([
                "statusCode" => 200,
                "message" => "Data updated successfully 😀"
            ]);
        } catch (PDOException $e) {
            // Rollback the transaction on failure
            $conn->rollback();

            // Return error message as JSON
            echo json_encode([
                "statusCode" => 500,
                "message" => "Failed to update data: " . $e->getMessage()
            ]);
        }
    } else {
        // Return error message if required fields are not filled
        echo json_encode([
            "statusCode" => 400,
            "message" => "Please fill all the required fields 🙏"
        ]);
    }
}
?>




// function to delete data
if ($_GET["action"] === "deleteData") {
  $id = $_POST["id"];
  $delete_image = $_POST["delete_image"];

  $sql = "DELETE FROM users WHERE `id`=$id";

  if (mysqli_query($conn, $sql)) {
    // remove the image
    unlink("uploads/" . $delete_image);
    echo json_encode([
      "statusCode" => 200,
      "message" => "Data deleted successfully 😀"
    ]);
  } else {
    echo json_encode([
      "statusCode" => 500,
      "message" => "Failed to delete data 😓"
    ]);
  }
}
