const API_BASE = "http://127.0.0.1:8000/api";
const SERVER_BASE = "http://127.0.0.1:8000";

const runHealthCheck = async () => {
    console.log("=== CampusHire API Health Check ===\n");
    let token = "";
    let testDriveId = "";
    
    // 1. Check Server Base / DB connection
    try {
        console.log("1. Testing Base Server/DB Connection...");
        const res = await fetch(SERVER_BASE + "/db-test");
        if (!res.ok) throw new Error("Bad status: " + res.status);
        const data = await res.json();
        console.log("   ✅ Server is up and Database connected:", data.message);
    } catch (e) {
        console.error("   ❌ Failed to connect to server. Is it running?", e.message);
        return; // Stop if server isn't running
    }

    // 2. Test Auth & Get Token
    try {
        console.log("\n2. Testing Authentication...");
        const mockUser = {
            name: "Health Checker",
            email: "healthcheck_" + Date.now() + "@example.com",
            password: "testpassword",
            role: "recruiter"
        };
        
        // Register
        const regRes = await fetch(API_BASE + "/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mockUser)
        });
        if (!regRes.ok) {
            const errTxt = await regRes.text();
            throw new Error("Registration failed: " + regRes.status + " " + errTxt);
        }

        // Login
        const loginRes = await fetch(API_BASE + "/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: mockUser.email, password: mockUser.password })
        });
        
        if (!loginRes.ok) {
            const errTxt = await loginRes.text();
            throw new Error("Login failed: " + loginRes.status + " " + errTxt);
        }
        const loginData = await loginRes.json();
        token = loginData.token;
        console.log("   ✅ Authentication working (Token received)");

    } catch (e) {
        console.error("   ❌ Authentication failed:", e.message);
    }

    // 3. Test Protected Routes (Create & Fetch Drive)
    if (token) {
        try {
            console.log("\\n3. Testing Protected Endpoints (Drives)...");
            
            // Create Drive
            const createRes = await fetch(API_BASE + "/drives", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    campus_name: "Health Check University",
                    start_date: "2026-05-01",
                    end_date: "2026-05-02"
                })
            });

            if (!createRes.ok) throw new Error("Failed to create drive: " + createRes.status);
            const createdDrive = await createRes.json();
            testDriveId = createdDrive.id;
            console.log("   ✅ POST /api/drives (Drive Created)");

            // Get Drives
            const getRes = await fetch(API_BASE + "/drives", {
                headers: { "Authorization": "Bearer " + token }
            });
            if (!getRes.ok) throw new Error("Failed to fetch drives: " + getRes.status);
            console.log("   ✅ GET /api/drives (Drives Fetched)");

        } catch (e) {
            console.error("   ❌ Protected Endpoints failed:", e.message);
        }
    }

    // 4. Cleanup
    if (token && testDriveId) {
        try {
            console.log("\\n4. Testing Cleanup / DELETE endpoint...");
            const delRes = await fetch(API_BASE + "/drives/" + testDriveId, {
                method: "DELETE",
                headers: { "Authorization": "Bearer " + token }
            });
            if (!delRes.ok) throw new Error("Deletion failed: " + delRes.status);
            console.log("   ✅ DELETE /api/drives/:id (Cleanup Successful)\\n");
        } catch (e) {
            console.error("   ❌ Cleanup failed:", e.message);
        }
    }

    console.log("=== Health Check Complete ===");
};

runHealthCheck();
