// Temporary user storage
let users = [];

// Register
exports.register = (req, res) => {
    const { username, password, role } = req.body;

    // Validate role
    if (!role || (role !== "admin" && role !== "student")) {
        return res.status(400).json({
            message: "Role must be either admin or student"
        });
    }

    // Check if user exists
    const userExists = users.find(u => u.username === username);
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Add new user
    users.push({ username, password, role });

    res.json({ message: "User registered successfully" });
};

// Login
exports.login = (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
        message: "Login successful",
        role: user.role
    });
};