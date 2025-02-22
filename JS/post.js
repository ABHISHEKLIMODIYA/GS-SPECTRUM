import { ClubAdmin, Student, ClubEvent, ClubNotification, ClubRequirement, ClubMember, ClubWork } from "../JS/models";

// 1️⃣ Post an Event
const postEvent = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const newEvent = new ClubEvent({ title, description, date, createdBy: req.user.id });
        await newEvent.save();
        res.json({ message: "Event posted successfully", event: newEvent });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// 2️⃣ Create a Notification
const createNotification = async (req, res) => {
    try {
        const { message } = req.body;
        const newNotification = new ClubNotification({ message, createdBy: req.user.id });
        await newNotification.save();
        res.json({ message: "Notification created successfully", notification: newNotification });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// 3️⃣ Add a Member
const addMember = async (req, res) => {
    try {
        const { userId } = req.body;
        const newMember = new ClubMember({ userId, role: "Member" });
        await newMember.save();
        res.json({ message: "Member added successfully", member: newMember });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// 4️⃣ Remove a Member
const removeMember = async (req, res) => {
    try {
        const { userId } = req.body;
        await ClubMember.findOneAndDelete({ userId });
        res.json({ message: "Member removed successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// 5️⃣ Assign Work
const assignWork = async (req, res) => {
    try {
        const { userId, task } = req.body;
        const newWork = new ClubWork({ assignedTo: userId, task });
        await newWork.save();
        res.json({ message: "Work assigned successfully", work: newWork });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// 6️⃣ Promote & Demote Members
const updateMemberRole = async (req, res) => {
    try {
        const { userId, role } = req.body;
        await ClubMember.findOneAndUpdate({ userId }, { role });
        res.json({ message: "Member role updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// 📌 POST request to add a club requirement
const postRequirment= async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: "Requirement name is required" });

        const newRequirement = new ClubRequirement({ name });
        await newRequirement.save();

        res.status(201).json({ message: "Requirement added", requirement: newRequirement });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export default { postEvent, createNotification, addMember, removeMember, assignWork, updateMemberRole, postRequirment };

