import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
const options = {
  method: 'GET',
  url: 'https://dad-jokes.p.rapidapi.com/random/joke',
  headers: {
    'X-RapidAPI-Key': '31ea9bebf9msh1a4621b7fbf6a4dp1e9695jsnf9e6826d6df3',
    'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
  }
};
app.get("/dad", async (req, res) => {
  try {
	const response = await axios.request(options);
	console.log(response.data);
    res.json(response.data);
} catch (error) {
	console.error(error.message);
}
});

app.get("/", async(req,res) => {
 const randomJoke =  await axios.request(options);
  res.render("dad.ejs",{data:randomJoke.data});
});

app.post("/", async (req, res) => {
 try {
  const result = await axios.request(options);
  res.render("dad.ejs",{data:result.data});
 } catch (error) {
   console.log(error.message);
 }
  // Step 2: Play around with the drop downs and see what gets logged.
  // Use axios to make an API request to the /filter endpoint. Making
  // sure you're passing both the type and participants queries.
  // Render the index.ejs file with a single *random* activity that comes back
  // from the API request.
  // Step 3: If you get a 404 error (resource not found) from the API request.
  // Pass an error to the index.ejs to tell the user:
  // "No activities that match your criteria."
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
