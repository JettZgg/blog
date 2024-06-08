---
title: SQL Note 0 - Normal Form, Data Types, JOIN, LIKE, ORDER BY, Functions
date: "2024-01-27T22:25:07"
---

## 3 Normal Forms
1. A primary key is required for every table
<figure align="center">
  <img src="assets/images/SQL-note-0/image-1.png" alt="Alt text" width="100%">
  <figcaption>1NF</figcaption>
</figure>

2. non-key attributes are dependent on whole key
<figure align="center">
  <img src="assets/images/SQL-note-0/image-2.png" alt="Alt text" width="100%">
  <figcaption>2NF</figcaption>
</figure>

3. non-key attributes are denpedent on nothing but the whole key
<figure align="center">
  <img src="assets/images/SQL-note-0/image-3.png" alt="Alt text" width="100%">
  <figcaption>3NF</figcaption>
</figure>

## Surrogate Key
- A **Surrogate Key** is a type of primary key that is used in database design for the sole purpose of uniquely identifying a record within a table.

```sql
CREATE TABLE Employees (
    EmployeeNumber INT AUTO_INCREMENT,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    BirthDate DATE,
    PRIMARY KEY (EmployeeNumber)
);
```

In this table, `EmployeeNumber` is the surrogate key

## Data Types

### Basics
- **BIGINT**: `-9,223,372,036,854,775,808` to `9,223,372,036,854,775,807`
- **INT**: `-2,147,483,648` to `2,147,483,647`
- **SMALLINT**: `-32768` to `32767`
- **TINYINT**: `0` to `255`
- **BIT**: `0` to `1`
- **DECIMAL(precision, scale)**: `-10^(precision - scale)` to `10^(precision - scale) - (1/10^scale)`
- **NUMERIC**: `-10^38+1` to `10^38-1`
- **FLOAT**: `-1.79E + 308` to `1.79E + 308`
- **REAL**: `-3.40E + 38` to `3.40E + 38`
- **DATE**: `Jan 1, 1753` to `Dec 31, 9999`
- **SMALLDATATIME**: `Jan 1, 1900` to `Jun 6, 2079`
- **TIME**: `00:00 AM` to `00:00 PM`

### Characters/ String
- **CHAR**: Maximum length of 8,000 characters. (Fixed length non-Unicode characters)
- **VARCHAR**: Maximum of 8,000 characters. (Variable-length non-Unicode data).
- **VARCHAR(MAX)**: Maximum length of 231characters, Variable-length non-Unicode data (SQL Server).
- **TEXT**: Variable-length non-Unicode data with a maximum length of 2,147,483,647 characters.

### Unicode charactres/ String
- **NCHAR**: Maximum length of 4,000 characters. (Fixed length Unicode)
- **NVARCHAR**: Maximum length of 4,000 characters. (Variable length Unicode)
- **NVARCHAR(MAX)**: Maximum length of 231characters (SQL Server only). (Variable length Unicode)
- **NTEXT**: Maximum length of 1,073,741,823 characters. (Variable length Unicode )

### Binary
- **BINARY**: Maximum length of 8,000 bytes (Fixed-length binary data)
- **VARBINARY**: Maximum length of 8,000 bytes. (Variable length binary data)
- **VARBINARY(MAX)**: Maximum length of 231 bytes (SQL Server only). (Variable length Binary data)
- **IMAGE**: Maximum length of 2,147,483,647 bytes. (Variable length Binary Data)

### Miscellaneous
- **SQL_VARIANT**: Stores values of various SQL Server-supported data types, except text, ntext, and timestamp.
- **TIMESTAMP**: Stores a database-wide unique number that gets updated every time a row gets updated
- **UNIQUEIDENTIFIER**: Store a globally unique identifier (GUID)
- **XML**: Stores XML instances in a column or variable (SQL Server)
- **CURSOR**: Reference to a cursor object.
- **TABLE**: Stores a result set for later processing

## Join

### Cartesian Join
<figure align="center">
  <img src="assets/images/SQL-note-0/image-4.png" alt="Alt text" width="100%">
  <figcaption>Cartesian Join</figcaption>
</figure>

### Self Join
<figure align="center">
  <img src="assets/images/SQL-note-0/image-5.png" alt="Alt text" width="100%">
  <figcaption>Self Join</figcaption>
</figure>

### Inner Join
<figure align="center">
  <img src="assets/images/SQL-note-0/image-6.png" alt="Alt text" width="100%">
  <figcaption>Inner Join</figcaption>
</figure>

### Left Join
<figure align="center">
  <img src="assets/images/SQL-note-0/image-7.png" alt="Alt text" width="100%">
  <figcaption>Left Join, keep the left table</figcaption>
</figure>

### Right Join
<figure align="center">
  <img src="assets/images/SQL-note-0/image-8.png" alt="Alt text" width="100%">
  <figcaption>Right Join, keep the right table</figcaption>
</figure>

### Full Outer Join
<figure align="center">
  <img src="assets/images/SQL-note-0/image-9.png" alt="Alt text" width="100%">
  <figcaption>Full Outer Join, keep both table</figcaption>
</figure>


## LIKE
- "%": 0, 1, or more characters
- "_": any 1 character

Example:
```sql
-- Finds any records where the customer's name starts with 'J'
SELECT * FROM customers WHERE name LIKE 'J%';

-- Finds any records where the customer's name has 'an' in any position
SELECT * FROM customers WHERE name LIKE '%an%';

-- Finds any records where the customer's name ends with 'son'
SELECT * FROM customers WHERE name LIKE '%son';

-- Finds any records where the customer's name is five characters long and starts with 'J'
SELECT * FROM customers WHERE name LIKE 'J____';

-- Finds any records where the customer's name starts with 'J' and the third letter is 'n'
SELECT * FROM customers WHERE name LIKE 'J_n%';
```

### Combining SELECT and INSERT statements
<figure align="center">
  <img src="assets/images/SQL-note-0/image-10.png" alt="Alt text" width="100%">
</figure>

Also, it's important to mention that this syntax is specific to SQL Server. In other SQL database systems, such as MySQL or PostgreSQL, the approach to insert data into an already existing table would be different, often using `INSERT INTO ... SELECT ...` syntax.

## ORDER BY
<figure align="center">
  <img src="assets/images/SQL-note-0/image-11png" alt="Alt text" width="100%">
</figure>

## Aggregate functions
- MIN: return smallest value
- MAX: return largest value
- SUM: return cumulative value
- AVG: return mean value
- COUNT: return num (not NULL) value
- COUNT(*): return num (NULL included) rows
 
<figure align="center">
  <img src="assets/images/SQL-note-0/image-12.png" alt="Alt text" width="100%">
  <figcaption>Some examples using aggregate functions</figcaption>
</figure>

<figure align="center">
  <img src="assets/images/SQL-note-0/image-13.png" alt="Alt text" width="100%">
  <figcaption>Example 2</figcaption>
</figure>

<figure align="center">
  <img src="assets/images/SQL-note-0/image-14.png" alt="Alt text" width="100%">
  <figcaption>Example 3 based on the Employees table</figcaption>
</figure>
