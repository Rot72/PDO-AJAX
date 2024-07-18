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

      // Renomear o arquivo antes de salvar no banco de dados
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

  // Verifica se o ID foi enviado via POST
  if (isset($_POST["id"])) {
      $id = $_POST["id"];

      try {
          // Prepara a consulta SQL com um placeholder para o ID
          $stmt = $conn->prepare("SELECT * FROM users WHERE id = :id");
          $stmt->bindParam(":id", $id);
          $stmt->execute();

          // Verifica se encontrou algum usuário
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


// function to update data
if ($_GET["action"] === "updateData") {
  if (!empty($_POST["first_name"]) && !empty($_POST["last_name"]) && !empty($_POST["email"]) && !empty($_POST["country"]) && !empty($_POST["gender"])) {
    $id = mysqli_real_escape_string($conn, $_POST["id"]);
    $first_name = mysqli_real_escape_string($conn, $_POST["first_name"]);
    $last_name = mysqli_real_escape_string($conn, $_POST["last_name"]);
    $email = mysqli_real_escape_string($conn, $_POST["email"]);
    $country = mysqli_real_escape_string($conn, $_POST["country"]);
    $gender = mysqli_real_escape_string($conn, $_POST["gender"]);

    if ($_FILES["image"]["size"] != 0) {
      // rename the image before saving to database
      $original_name = $_FILES["image"]["name"];
      $new_name = uniqid() . time() . "." . pathinfo($original_name, PATHINFO_EXTENSION);
      move_uploaded_file($_FILES["image"]["tmp_name"], "uploads/" . $new_name);
      // remove the old image from uploads directory
      unlink("uploads/" . $_POST["image_old"]);
    } else {
      $new_name = mysqli_real_escape_string($conn, $_POST["image_old"]);
    }
    $sql = "UPDATE `users` SET `first_name`='$first_name',`last_name`='$last_name',`email`='$email',`image`='$new_name',`country`='$country',`gender`='$gender' WHERE `id`=$id";
    if (mysqli_query($conn, $sql)) {
      echo json_encode([
        "statusCode" => 200,
        "message" => "Data updated successfully 😀"
      ]);
    } else {
      echo json_encode([
        "statusCode" => 500,
        "message" => "Failed to update data 😓"
      ]);
    }
    mysqli_close($conn);
  } else {
    echo json_encode([
      "statusCode" => 400,
      "message" => "Please fill all the required fields 🙏"
    ]);
  }
}



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
