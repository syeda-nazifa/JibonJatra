import Announcement from "../models/Announcement.js";

export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    const announcement = new Announcement({
      title: req.body.title,
      message: req.body.message,
      createdBy: req.user.id,
    });
    await announcement.save();
    res.status(201).json(announcement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, message: req.body.message },
      { new: true }
    );
    if (!announcement) return res.status(404).json({ message: "Not found" });
    res.json(announcement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
