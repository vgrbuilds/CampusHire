import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import query from "./auth.query.js";

const register = async (userData) => {
    const { name, email, password, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await query.insertUser({ name, email, password: hashedPassword, role });
};

const login = async (email, password) => {
    const user = await query.findUserByEmail(email);
    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

export default {
    register,
    login
};
