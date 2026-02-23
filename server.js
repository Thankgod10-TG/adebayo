const express = require("express");
const app = express();

app.use(express.json())

let users = []

app.post('/users', (req, res) => {
    const {name, email} = req.body;

    const user = {
      id: users.length +1,
      name,
      email
    }; 

    users.push(user);

    res.status(201).json({
      message: "User Created Successfully", 
      user
    });
})

app.get('/users', (req, res)=> {
  res.json(users)
})

app.put('/users/:id', (req, res) => {
   const id = parseInt(req.params.id);
   const {name, email} = req.body;

   const user = users.find(u => u.id === id);

   if(!user){
    return res.status(404).json({
      message: "User not found"
    })
   }

   if(name) user.name = name;
   if(email) user.email = email;

   res.json({
    message: "User Updated Successfully",
    user
   })
})

app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

    const userIndex = users.findIndex(u => u.id === id)

    if (userIndex === -1){
      return res.status(404).json({
        message: "User Not Found"
      })
    }

    const deletedUser = users.splice(userIndex, 1);

    res.json({
      message: "User delete successfully",
      user: deletedUser[0]
    })
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})