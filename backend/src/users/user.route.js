const express = require('express');
const User = require('./user.model');
const generateToken = require('../middleware/generateToken');
//const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

//registration 
router.post("/register", async(req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password })
        await user.save()
        //console.log(req.body);
        res.status(201).send({ message: 'User registered successfully...' })

    } catch (error) {
console.log('Error registering user ..', error);
        res.status(500).send({message: 'Error registering user ..'})        
    }
})

//login
router.post("/login", async(req, res) => {
    try {
        //console.log(req.body);
        const { email, password } = req.body;
        const user = await User.findOne({ email })

        if(!user){
            res.status(404).send({ message: 'User not found...' })
        }

        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            res.status(401).send({ message: 'Passwords did not match...' })
        }

        const token = await generateToken(user._id)
        //console.log(token);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })

        res.status(200).send({ message: 'Logged in successfully...', token, user: {
            _id: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
            profileImage: user.profileImage,
            bio: user.bio,
            profession: user.profession,
        } })

    } catch (error) {
        console.log('Error logged in user ..', error);
        res.status(500).send({message: 'Error logged in user ..'})
    }
})

//all users
// router.get('/users', verifyToken, async(req, res) => {
//     res.send({ message: "Protected Users"})
// })


//logout endpoints
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    return res.status(200).send({ message: 'Logged out successfully' })
})

//delete a user
router.delete('/users/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            res.status(404).send({message: 'User not found ..'})
        }
        res.status(200).send({message: 'User deleted successfully ..'})
    } catch (error) {
        console.log('Error deleting a user ..', error);
        res.status(500).send({message: 'Error deleting user ..'})
    }
})


//get all users
router.get('/users', async(req, res) => {
    try {
        const users = await User.find({}, 'id email role').sort({ createdAt: -1 });
        res.status(200).send(users)
    } catch (error) {
        console.log('Error fetching user ..', error);
        res.status(500).send({message: 'Error fetching user ..'})
    }
})

//update user role
router.put('/users/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(id, {role}, {new: true})

        if (!user) {
            res.status(404).send({message: 'User not found ..'})
        }
        res.status(200).send({message: 'User role successfully updated..', user})
    } catch (error) {
        console.log('Error updating role ..', error);
        res.status(500).send({message: 'Error updating role  ..'})
    }
})


//edit or update profile
router.patch('/edit-profile', async(req, res) => {
    try {
        const { userId, username, profileImage, bio, profession } = req.body;

        if (!userId) {
            res.status(404).send({message: 'User ID is required ..'})
        }
        const user = await User.findById(userId)
        console.log(user);

        if(!user){
            res.status(404).send({message: 'User not found ..'})
        }
        
        if(username !== undefined) user.username = username;
        if(profileImage !== undefined) user.profileImage = profileImage;
        if(bio !== undefined) user.bio = bio;
        if(profession !== undefined) user.profession = profession;

        await user.save()
        res.status(200).send({ message: 'Profile updated successfully...', user: {
            _id: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
            profileImage: user.profileImage,
            bio: user.bio,
            profession: user.profession,
        } })

    } catch (error) {
        console.log('Error updating profile ..', error);
        res.status(500).send({message: 'Error updating profile  ..'})
    }
})

module.exports = router;