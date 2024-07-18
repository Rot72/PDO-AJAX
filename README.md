# PDO-AJAX Project

This project is based on the PHP AJAX CRUD tutorial by Ruhid Chowdhury available at [https://github.com/ruhid206/php-ajax-crud-yt](https://github.com/ruhid206/php-ajax-crud-yt). The original code was refactored from MySQLi to PDO for database operations and includes additional enhancements.

## Description

This repository demonstrates the usage of PDO (PHP Data Objects) with AJAX for creating a CRUD (Create, Read, Update, Delete) application in PHP. It includes several features to enhance functionality and user experience.

## Features

- **PDO Integration**: Utilizes PDO for database operations, providing a secure and efficient way to interact with databases.
- **Dynamic Country Selection**: Uses the REST Countries API (`https://restcountries.com/v3.1/all`) to dynamically populate country information instead of static options.
- **Unique Email Validation**: Prevents duplicate email registrations to maintain data integrity.
- **Dynamic Button Control**: Enables submit and edit buttons conditionally based on form field completion using `checkFields.js`.
- **Reusable Form Fields**: To minimize code duplication, common form fields used across multiple forms are included in a PHP file (`common-fields.php`).

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Rot72/PDO-AJAX.git

2. Configure your web server to point to the project directory.

3. Create a table named *crud_pdo* inside your MySQL database using the following code.

```sql
CREATE TABLE `users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
)
```   

4. Update the database connection settings in config.php file with your database credentials.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please create a pull request or open an issue on GitHub.

## License

This project is licensed under the MIT License - see the LICENSE file for details.