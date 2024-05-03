import authenticateUser from "../middleware/auth.js";
import Lead from "../models/lead.js";
import { Router } from "express";

const leadRouter = Router();

leadRouter.get("/getAllLeads",  async (req, res) => {
  try {
    const leads = await Lead.find(
      {},
      "_id firstName lastName companyName linkedinProfile jobTitle phone"
    );
    res.json(leads);
  } catch (error) {
    res.status(400).json(error);
  }
});

leadRouter.get("/getLeadEmail/:id", async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    res.json(lead);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default leadRouter;
