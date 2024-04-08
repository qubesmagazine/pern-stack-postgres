const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json()); // req.body

// Routes

// Create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    // <-- Add this catch block
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodo = await pool.query("SELECT * FROM todo");
  res.json(allTodo.rows)
  } catch (err) {
    console.error(err.message);
  }
});

//get ID


app.get("/todos/:id", async (req, res) => {
  try {
    
const {id} = req.params;
const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
res.json(todo.rows[0])
  } catch (err) {
    console.error(err.message);
  }

});


//update a todo

app.put("/todos/:id", async (req, res) => {
try {
   const {id} = req.params;
   const {description} = req.body;
const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",
[description, id])

    res.json("Todo was updated")
} catch (err) {
    console.error(err.message)
}


})


//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])

res.json("Todo was deleted")
  } catch (err) {

    console.error(err.message)
    
  }



})




app.listen(5000, () => {
  console.log("Server has started on port 5000");
});

//get all todos

//update a todo

//delete a todo
