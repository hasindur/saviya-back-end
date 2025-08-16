// controllers/homeController.js
import Home from '../models/home.js';

// ✅ Create a new Home
export const createHome = async (req, res) => {
    try {
        console.log("POST /api/home called with body:", req.body);

        const { name, registrationNumber, type, location, contactNumber, email, picture,description } = req.body;

        const existingHome = await Home.findOne({ registrationNumber });
        if (existingHome) {
            console.log("Home already exists with registrationNumber:", registrationNumber);
            return res.status(400).json({ message: "Home with this registration number already exists" });
        }

        const home = new Home({
            name,
            registrationNumber,
            type,
            location,
            contactNumber,
            email,
            picture,
            description
        });

        const savedHome = await home.save();
        console.log("Home created successfully:");
        res.status(201).json(savedHome);

    } catch (error) {
        console.error("Error creating home:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Get all Homes
export const getHomes = async (req, res) => {
    try {
        const homes = await Home.find();
        console.log("Homes fetched:", homes.length);
        res.status(200).json(homes);
    } catch (error) {
        console.error("Error fetching homes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Get single Home by ID
export const getHomeById = async (req, res) => {
    if (req.user.role !== 'admin' ) {
        res.status(403).json({ message: "Access denied" });
        return;
    }
    try {
        console.log("GET /api/home/:id called with ID:", req.params.id);
        const home = await Home.findById(req.params.id);
        if (!home) {
            console.log("Home not found with ID:", req.params.id);
            return res.status(404).json({ message: "Home not found" });
        }
        console.log("Home fetched:", home);
        res.status(200).json(home);
    } catch (error) {
        console.error("Error fetching home:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Update Home
export const updateHome = async (req, res) => {
    try {
        console.log("PUT /api/home/:id called with ID:", req.params.id, "and body:", req.body);
        const updatedHome = await Home.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // returns updated document
        );

        if (!updatedHome) {
            console.log("Home not found with ID:", req.params.id);
            return res.status(404).json({ message: "Home not found" });
        }

        console.log("Home updated successfully:", updatedHome);
        res.status(200).json(updatedHome);

    } catch (error) {
        console.error("Error updating home:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Delete Home
export const deleteHome = async (req, res) => {
    try {
        console.log("DELETE /api/home/:id called with ID:", req.params.id);
        const deletedHome = await Home.findByIdAndDelete(req.params.id);
        if (!deletedHome) {
            console.log("Home not found with ID:", req.params.id);
            return res.status(404).json({ message: "Home not found" });
        }
        console.log("Home deleted successfully:", deletedHome);
        res.status(200).json({ message: "Home deleted successfully" });
    } catch (error) {
        console.error("Error deleting home:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
