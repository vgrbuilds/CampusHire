import service from "./auth.service.js";

const register = async (req, res) => {
    try {
        if (req.body.email) req.body.email = req.body.email.trim();
        const result = await service.register(req.body);
        res.status(201).json(result);
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await service.login(email.trim(), password);
        res.json(result);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

export default {
    register,
    login
};
