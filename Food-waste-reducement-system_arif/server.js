import express from 'express';
import cors from 'cors';
import fs from 'fs';
import dotenv from 'dotenv';
import multer from 'multer';  // Import multer
import { connection, run_query } from './connection.js';
import { error } from 'console';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Example route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
    // Handle the uploaded file here
    console.log(req.file); // This logs the file info
    res.send('File uploaded successfully');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


//start from here

app.post("/users/customer_signup", async (req, res) => {
  const user = req.body;

 
  console.log("Received user data:", user);
  

 
  if (!user.name || !user.nid || !user.dob || !user.phone || !user.city || !user.district || !user.division || !user.streetno || !user.password) {
      res.status(400).json({ message: "All fields are required" });
      return;
  }
  if (user.phone.length !== 11) {
      res.status(400).json({ error: "Phone number must be 11 digits" });
      return;
  }

  

  try {
     
      const query = `
          INSERT INTO Customer (NAME, NID,EMAIL, DATE_OF_BIRTH, PHONE, CITY, DISTRICT, DIVISION, STREETNO, PASSWORD)
          VALUES (:name, :nid,:email,TO_DATE(:dob, 'yyyy-mm-dd'), :phone, :city, :district, :division, :streetno, :password)
      `;

      const params = {
          name: user.name,
          nid: user.nid,
          email: user.email,
          dob: user.dob,
          phone: user.phone,
          city: user.city,
          district: user.district,
          division: user.division,
          streetno: user.streetno,
          password: user.password
      };

      await run_query(query, params);
      res.status(201).json({ message: "Registration Successful" });
  } catch (err) {
      console.error("Error while handling signup:", err);
      if(err.code === 'ORA-00001'){
          return res.status(400).json({error: "User already exists"});
      }
      res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/users/donor_signup", async (req, res) => {


  const user = req.body;
  console.log("Received user data:", user);
  if (user.phone.length !== 11) {
      res.status(400).json({ error: "Phone number must be 11 digits" });
      return;
  }
 
  

  try {
      const query = `
        INSERT INTO DONOR (EMAIL, PASSWORD, INSTITUTION_NAME, INSTITUTION_TYPE, CITY, DISTRICT, DIVISION, STREETNO, PHONE, VERIFIED, POINTS, VOLUNTEER_ID, DATE_D)
        VALUES (:email, :password, :institution_name, :institution_type, :city, :district, :division, :streetno, :phone, :verified, :points, :volunteer_id, :date_d)
      `;
  
      const params = {
        email: user.email,
        password: user.password,
        institution_name: user.institution_name,
        institution_type: user.institution_type,
        city: user.city,
        district: user.district,
        division: user.division,
        streetno: user.streetNo,
        phone: user.phone,
        verified: user.verified,
        points: user.points,
        volunteer_id: user.volunteer_id,
        date_d: new Date(),
      }; 
   
      await run_query(query, params);
      res.status(201).json({ message: "Registration Successful" }); 
    } catch (err) {
      console.error("Error while handling signup:", err);
      if(err.code === 'ORA-00001'){
          return res.status(400).json({error: "User already exists"});
      }
      res.status(500).json({ error: "Internal server error" });
  }

});


app.post("/users/volunteer_signup", async (req, res) => {
  const user = req.body;

  console.log("Received user data:", user); 
  if (user.phone.length !== 11) {
      res.status(400).json({ error: "Phone number must be 11 digits" });
      return;
  }

  try {
      const query = `
        INSERT INTO VOLUNTEER (EMAIL, PASSWORD, NAME, DATE_OF_BIRTH, CITY, DISTRICT, DIVISION, STREETNO, PHONE)
        VALUES (:email, :password, :name, TO_DATE(:dob, 'yyyy-mm-dd'), :city, :district, :division, :streetno, :phone)
      `;

      const params = {
          email: user.email,
          password: user.password,
          name: user.name,
          dob: user.dob,
          city: user.city,
          district: user.district,
          division: user.division,
          streetno: user.streetNo,
          phone: user.phone 
      };

      await run_query(query, params);
      res.status(201).json({ message: "Registration Successful" }); 
  } catch (err) {
      console.error("Error while handling signup:", err);
      if(err.code === 'ORA-00001'){
          return res.status(400).json({error: "User already exists"});
      }
      res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/users/receiver_signup", async (req, res) => {
  const user = req.body;
  console.log("Received user data:", user);
  if (user.phone.length !== 11) {
      res.status(400).json({ error: "Phone number must be 11 digits" });
      return;
  }

  try {
      const query = `
        INSERT INTO RECIPIENT (EMAIL, PASSWORD, INSTITUTION_NAME, INSTITUTION_TYPE, CITY, DISTRICT, DIVISION, STREETNO, PHONE, VOLUNTEER_ID, DATE_R, VERIFIED)
        VALUES (:email, :password, :institution_name, :institution_type, :city, :district, :division, :streetno, :phone, :volunteer_id, :date_r, :verified)
      `;

      const params = {
        email: user.email,
        password: user.password,
        institution_name: user.institution_name,
        institution_type: user.institution_type,
        city: user.city,
        district: user.district,
        division: user.division,
        streetno: user.streetNo,
        phone: user.phone,
        volunteer_id: user.volunteer_id,
        date_r: NULL,
        verified: user.verified
      };

      await run_query(query, params);
      res.status(201).json({ message: "Registration Successful" });
  } catch (err) {
      console.error("Error while handling signup:", err);
      if(err.code === 'ORA-00001'){
          return res.status(400).json({error: "User already exists"});
      }
      res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/users/request_food", async (req, res) => {
  const { people, date, email } = req.body; 
  console.log("Received request data:", req.body);

  // Log the individual fields for debugging
  console.log("People:", people);
  console.log("Date:", date);
  console.log("Email:", email);

  if (!people || !date || !email) {
      return res.status(400).json({ error: "All fields are required" });
  }

  try {
      const updateQuery = `
          UPDATE RECIPIENT
          SET NUMBER_OF_PEOPLE = :people_param, DATE_R = TO_DATE(:date_param, 'yyyy-mm-dd')
          WHERE EMAIL = :email_param
      `;

      const params = {
          people_param: people,
          date_param: date, 
          email_param: email
      };

      await run_query(updateQuery, params);
      res.status(200).json({ message: "Request updated successfully" });
  } catch (err) {
      console.error("Error while updating recipient:", err);
      res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/users/request_history', async (req, res) => {
  const email = req.query.email;
  console.log(email);
  if (!email) {
      return res.status(400).json({ error: 'Email is required' });
  }

  try {
      const query = `
          SELECT
              INSTITUTION_NAME AS "institutionName",
              INSTITUTION_TYPE AS "institutionType",
              NUMBER_OF_PEOPLE AS "numberOfPeople",
              TO_CHAR(DATE_R, 'YYYY-MM-DD') AS "date"
          FROM
              RECIPIENT
          WHERE
              email = :email
          ORDER BY
              DATE_R DESC
      `;
      const result = await run_query(query, {email});
      console.log(result);
    res.status(200).send(result[0]);
  } catch (err) {
      console.error('Error fetching request history:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
});
//contact information

app.post("/users/contact", async (req, res) => {
  const user = req.body;
  console.log("Received user message:", user);
  if (user.phone.length !== 11) {
      res.status(400).json({ error: "Phone number must be 11 digits" });
      return;
  }

  try {
      const query = `
        INSERT INTO CONTACT (EMAIL,PHONE,MESSAGE)
        VALUES (:email, :phone, :message)
      `;

      const params = {
        email: user.email,
        phone: user.phone,
        message: user.comment 
      };
      

      await run_query(query, params);
      res.status(201).json({ message: "Your Query has been sent to the Admin" });
  } catch (err) {
      console.error("Error while handling signup:", err);
  }
});







//login mechanism

app.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  const normalizedRole = role.toLowerCase();
  console.log(role);
  let tableName;
  switch (normalizedRole) {
      case 'volunteer':
          tableName = 'VOLUNTEER';
          break;
      case 'donor':
          tableName = 'DONOR';
          break;
      case 'recipient':
          tableName = 'RECIPIENT';
          break;
      case 'manager':
          tableName = 'MANAGER';
          break;
      case 'customer':
          tableName = 'Customer';
          break;
      default:
          return res.status(400).json({ message: 'Invalid role' }); 
  }

  console.log(tableName);

  const query = `SELECT * FROM ${tableName} WHERE EMAIL = :email AND PASSWORD = :password`;
  const params = [email, password];
  console.log(email);
  console.log(password);

  try {
      const users = await run_query(query, params);
      console.log(users);
      if (users.length > 0) {
          return res.status(200).json({ message: 'Login successful' });
      } else {
          return res.status(401).json({ error: 'Invalid credentials' });
      }
  } catch (error) {
      console.error('Error querying the database:', error);
      return res.status(500).json({ error: 'Internal server error' });
  }
});


app.get("/users/:username",(req, res) => {

  const name= req.params.username;
  const exists= fs.existsSync(`./users/${name}.json`);
  if(!exists){
      res.status(404).json("User does not exist");
      return;
  }
  fs.readFile(`./users/${name}.json`, "utf8", (err,data)=>{
  
      if(!err){
          res.status(200).json(JSON.parse(data));

      }
      else
      {
          res.status(500).json("Error reading user data");
      }

  });

});
//avobe is copied from my own management-arif


//logout mechanism

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to log out' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});



//get user detail
app.get('/admin/current-user', (req, res) => {
  console.log('user ingfo :',req.session.user,req.sessionStore,req.sessionID)
  if (req.session.user) {
      res.json(req.session.user);
  } else {
      res.status(401).json({ message: 'Unauthorized' });
  }
});








// Add to your existing server.js
app.get("/admin/dashboard-info", async (req, res) => {
  try {
    console.log(req.session.user)
    const query = "SELECT * FROM FETCH_INFO";
    const result = await run_query(query, {});
    console.log(result);
    res.status(200).json(result[0]); 
  } catch (err) {
    console.error("Error while fetching dashboard info:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


//get rows of donor whom are verifyed
app.get("/admin/verified-donors", async (req, res) => {
  try {
    const query = "SELECT * FROM VERIFIED_DONOR";
    const result = await run_query(query, {});
    res.status(200).json(result);
  } catch (err) {
    console.error("Error while fetching verified donors:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.get('/admin/volunteers', async (req, res) => {
  try {
      const query = 'SELECT * FROM VOLUNTEER_INFO';
      const result = await run_query(query, {});
      res.json(result);
  } catch (error) {
      console.error('Error fetching volunteers:', error);
      res.status(500).send('Server error');
  }
});


app.get('/admin/recipients', async (req, res) => {
  try {
      const query = 'SELECT * from recipient_INFO';
      const result = await run_query(query, {});
      res.json(result);
  } catch (error) {
      console.error('Error fetching recipient:', error);
      res.status(500).send('Server error');
  }
});





// Multer setup for handling file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });


//donor/donation
// Endpoint to handle file upload and data insertion
app.post('/donor/donation', upload.single('food-image'), async (req, res) => {

  console.log('listing');
  const { originalname, buffer } = req.file;
  const { 'food-name': foodName, quantity, 'exp-date': expDate } = req.body;

  try {
      const query = `
          INSERT INTO FOOD (NAME, QUANTITY, EXP_DATE, PHOTO, VERIFIED, VOLUNTEER_ID, DONOR_ID, DATE_F, SELL_OR_DONATE)
          VALUES (:name, :quantity, TO_DATE(:expDate, 'YYYY-MM-DD'), :photo, 'N', null, null, SYSDATE, 'DONATE')
      `;
      const params = {
          name: foodName,
          quantity: parseInt(quantity, 10),
          expDate: expDate,
          photo: buffer
      };

      await run_query(query, params);

      res.status(200).json({ message: 'Food donation recorded successfully!' });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Failed to donate food.' });
  }
});


//donation//sells

app.post('/sell/food', upload.single('food-photo'), async (req, res) => {
  const { 'food-name': foodName, quantity, 'exp-date': expDate, 'original-price': originalPrice, 'discounted-price': discountedPrice } = req.body;
  const photo = req.file.buffer;
  const verified = 'N';
  const volunteerId = null; // Adjust as needed
  const donorId = 1; // Adjust as needed
  const dateF = new Date().toISOString().split('T')[0];
  const sellOrDonate = 'SELL';
  const nid = 1; // Adjust as needed 
  const dateS = new Date().toISOString().split('T')[0];

  const query = `
      BEGIN
          InsertFoodAndSell(
              :name, :quantity, TO_DATE(:expDate, 'YYYY-MM-DD'), :photo, :verified, :volunteerId, :donorId, TO_DATE(:dateF, 'YYYY-MM-DD'), :sellOrDonate,
              :nid, :originalPrice, :discountedPrice, TO_DATE(:dateS, 'YYYY-MM-DD')
          );
      END;
  `;

  const params = {
      name: foodName,
      quantity: parseInt(quantity, 10),
      expDate: expDate,
      photo: photo,
      verified: verified,
      volunteerId: volunteerId,
      donorId: donorId,
      dateF: dateF,
      sellOrDonate: sellOrDonate,
      nid: nid,
      originalPrice: parseFloat(originalPrice),
      discountedPrice: parseFloat(discountedPrice),
      dateS: dateS
  };
  console.log(params);

  try {
      await run_query(query, params);
      
      res.status(200).json({ message: 'Food sell recorded successfully!' });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Failed to sell food.' });
  }
});












app.get('/admin/donation-history', async (req, res) => {
  let conn;
  try {
    conn = await connection();
    const query = 'SELECT * FROM donation_history';
    const result = await conn.execute(query);

    // Process the result to handle BLOBs
    const donations = await Promise.all(result.rows.map(async row => {
      const foodImage = row[2]; // Assuming BLOB is at index 2
      const base64Image = await blobToBase64(foodImage);
      return [
        row[0], // Donor_Name
        row[1], // Food_Name
        base64Image, // Food_Image as Base64
        row[3], // Food_Quantity
        row[4], // Exp_Date
        row[5], // Recipient_Name
        row[6], // Institution_Type
        row[7], // Number_Of_People
        row[8]  // Food_Date
      ];
    }));
    console.log(donations)
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donation history:', error);
    res.status(500).send('Server error');
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error('Failed to close connection:', err);
      }
    }
  }
});



app.get('/admin/verified-food', async (req, res) => {
  let conn;
  try {
    conn = await connection();
    const query = 'SELECT * FROM donor_food_view';
    const result = await conn.execute(query);
   // console(result);
   // Process the result to handle BLOBs
    const donations = await Promise.all(result.rows.map(async row => {
      const foodImage = row[2]; // Assuming BLOB is at index 2
      const base64Image = await blobToBase64(foodImage);
      return [
        row[0], // Donor_Name
        row[1], // Food_Name
        base64Image, // Food_Image as Base64
        row[3], // Food_Quantity
        row[4], // Exp_Date
        row[8]  // Food_Date
      ];
    }));
    console.log(donations)
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donation history:', error);
    res.status(500).send('Server error');
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error('Failed to close connection:', err);
      }
    }
  }
});
      
      // Function to convert BLOB to Base64
      const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
          if (blob === null) {
            resolve(null);
            return;
          }
      
          const chunks = [];
          blob.on('data', (chunk) => {
            chunks.push(chunk);
          });
          blob.on('end', () => {
            const buffer = Buffer.concat(chunks);
            resolve(buffer.toString('base64'));
          });
          blob.on('error', (err) => {
            reject(err);
          });
        });
      };




      // request table

// Endpoint to get combined requests
app.get('/admin/combined-requests', async (req, res) => {
  const query = "SELECT * FROM COMBINEDREQUEST";
  try {
    const data = await run_query(query,{});
    res.json(data);
  } catch (error) {
    res.status(500).send("Error fetching combined requests");
  }
});

// Endpoint to get available volunteers
app.get('/admin/available-volunteers', async (req, res) => {
  const query = "SELECT * FROM available_volunteer";
  try {
    const data = await run_query(query,{});
    res.json(data);
  } catch (error) {
    res.status(500).send("Error fetching available volunteers");
  }
});










// Endpoint to get donor food donation requests
app.get('/admin/donor-food-donation-requests', async (req, res) => {
  let conn;
  try {
    conn = await connection();
    const query = "SELECT * FROM DONOR_FOOD_DONATION_REQUEST";
    const result = await conn.execute(query);
   // console(result);
   // Process the result to handle BLOBs
    const donations = await Promise.all(result.rows.map(async row => {
      const foodImage = row[2]; // Assuming BLOB is at index 2
      const base64Image = await blobToBase64(foodImage);
      return [
        row[0], // Donor_Name
        row[1], // Food_Name
        base64Image, // Food_Image as Base64
        row[3], // Food_Quantity
        row[4], // Exp_Date
        row[5]  // Food_Date
      ];
    }));
    console.log(donations)
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donation history:', error);
    res.status(500).send('Server error');
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error('Failed to close connection:', err);
      }
    }
  }
});




