import { Schema, model } from "mongoose";

// Students Schema
const studentSchema = new Schema({
username: { type: String, required: true },
password: { type: String, required: true },
});
const Student = mongoose.model('Student', studentSchema);

// ClubAdmins Schema
const ClubAdminSchema = new Schema({
username: { type: String, required: true },
password: { type: String, required: true },
});
const ClubAdmin = mongoose.model('ClubAdmin', ClubAdminSchema);

// Events Schama
const ClubEventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});
const ClubEvent=mongoose.model('clubEvent', ClubEventSchema);

// Notification Schema
const ClubNotificationSchema = new mongoose.Schema({
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});
const ClubNotification=mongoose.model('ClubNotification', ClubNotificationSchema);

// Members Schema
const ClubMemberSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, enum: ["Member", "Moderator", "Admin"], default: "Member" }
});
const ClubMember=mongoose.model('ClubMember', ClubMemberSchema);

// Requirement Schema
const requirementSchema = new mongoose.Schema({
    title: String,
    description: String,
    clubAdmin: String,  // Who posted it
    applicants: [{ studentUsername: String, status: { type: String, default: "Pending" } }] 
});
const ClubRequirement = mongoose.model('Requirement', requirementSchema);

// Assign Work Schema
const ClubWorkSchema = new mongoose.Schema({
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    task: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Completed"], default: "Pending" }
});
const ClubWork=mongoose.model('ClubWork',ClubWorkSchema);


module.exports = { ClubAdmin, Student, ClubEvent, ClubNotification, ClubRequirement, ClubMember, ClubWork };